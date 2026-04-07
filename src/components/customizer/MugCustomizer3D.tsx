import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Mug3DScene from "./Mug3DScene";
import MugDesignCanvas, { type DesignElement, CANVAS_W, CANVAS_H } from "./MugDesignCanvas";
import MugCustomizerSidebar from "./MugCustomizerSidebar";

let idCounter = 0;
const nextId = () => `el-${++idCounter}`;

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#ccc" wireframe />
    </mesh>
  );
}

export default function MugCustomizer3D() {
  const navigate = useNavigate();
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mugColor, setMugColor] = useState("#FFFFFF");
  const [autoRotate, setAutoRotate] = useState(true);
  const [textureCanvas, setTextureCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setTextureCanvas(canvas);
  }, []);

  const handleAddImage = useCallback((file: File) => {
    const img = new Image();
    img.onload = () => {
      const aspect = img.width / img.height;
      const h = 200;
      const w = h * aspect;
      setElements((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "image",
          x: CANVAS_W / 2 - w / 2,
          y: CANVAS_H / 2 - h / 2,
          width: w,
          height: h,
          rotation: 0,
          imageData: img,
          fileName: file.name,
        },
      ]);
      toast.success(`"${file.name}" added`);
    };
    img.src = URL.createObjectURL(file);
  }, []);

  const handleAddText = useCallback(() => {
    setElements((prev) => [
      ...prev,
      {
        id: nextId(),
        type: "text",
        x: CANVAS_W / 2 - 150,
        y: CANVAS_H / 2 - 25,
        width: 300,
        height: 50,
        rotation: 0,
        text: "Your Brand",
        fontFamily: "Arial",
        fontSize: 36,
        fontColor: "#000000",
      },
    ]);
  }, []);

  const handleUpdate = useCallback((id: string, updates: Partial<DesignElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
    toast.info("Element removed");
  }, [selectedId]);

  const handleReset = useCallback(() => {
    if (confirm("Remove all design elements?")) {
      setElements([]);
      setSelectedId(null);
      setMugColor("#FFFFFF");
      toast.info("Design reset");
    }
  }, []);

  const handleExportPNG = useCallback(() => {
    if (!textureCanvas) return;
    const link = document.createElement("a");
    link.download = "mug-design.png";
    link.href = textureCanvas.toDataURL("image/png");
    link.click();
    toast.success("Design exported as PNG");
  }, [textureCanvas]);

  const handleExportJSON = useCallback(() => {
    const data = {
      mugColor,
      elements: elements.map(({ imageData, ...rest }) => rest),
      canvasWidth: CANVAS_W,
      canvasHeight: CANVAS_H,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.download = "mug-design.json";
    link.href = URL.createObjectURL(blob);
    link.click();
    toast.success("Design saved as JSON");
  }, [mugColor, elements]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0">
        <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <div className="h-5 w-px bg-border" />
        <h1 className="text-sm font-semibold text-foreground">3D Mug Customizer</h1>
        <span className="text-[11px] text-muted-foreground">• 11oz Sublimation Coffee Mug</span>
        <div className="ml-auto flex gap-2">
          <Button size="sm" className="h-8 text-xs">Add to Quote</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <MugCustomizerSidebar
          elements={elements}
          selectedId={selectedId}
          mugColor={mugColor}
          autoRotate={autoRotate}
          onAddImage={handleAddImage}
          onAddText={handleAddText}
          onUpdateElement={handleUpdate}
          onDeleteElement={handleDelete}
          onSetMugColor={setMugColor}
          onSetAutoRotate={setAutoRotate}
          onReset={handleReset}
          onExportPNG={handleExportPNG}
          onExportJSON={handleExportJSON}
        />

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 3D Viewport */}
          <div className="flex-1 relative" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #d4d4d4 50%, #c8c8c8 100%)" }}>
            <Canvas
              camera={{ position: [0, 1.2, 5.5], fov: 38 }}
              shadows="soft"
              gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.15,
                outputColorSpace: THREE.SRGBColorSpace,
              }}
              dpr={[1, 2]}
            >
              {/* Studio lighting */}
              <ambientLight intensity={0.3} color="#f5f0eb" />
              
              {/* Key light — warm, front-left */}
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.4}
                color="#fff8f0"
                castShadow
                shadow-mapSize={2048}
                shadow-bias={-0.0004}
                shadow-normalBias={0.04}
              >
                <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
              </directionalLight>

              {/* Fill light — cool, right side */}
              <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#e8eef5" />

              {/* Rim light — behind for edge highlight */}
              <spotLight
                position={[-2, 5, -4]}
                intensity={0.8}
                color="#ffffff"
                angle={0.5}
                penumbra={0.8}
                distance={15}
              />

              {/* Subtle bottom bounce */}
              <pointLight position={[0, -2, 3]} intensity={0.15} color="#f0e8df" />

              <Suspense fallback={<SceneLoader />}>
                <Center>
                  <Mug3DScene
                    designTexture={textureCanvas}
                    mugColor={mugColor}
                    autoRotate={autoRotate}
                  />
                </Center>

                {/* Contact shadow */}
                <ContactShadows
                  position={[0, -1.76, 0]}
                  opacity={0.4}
                  scale={6}
                  blur={2.5}
                  far={4}
                  color="#2a2a2a"
                />

                {/* Ground plane shadow catcher */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.77, 0]} receiveShadow>
                  <planeGeometry args={[12, 12]} />
                  <shadowMaterial transparent opacity={0.15} />
                </mesh>

                {/* HDRI Environment */}
                <Environment preset="studio" environmentIntensity={1.2} />
              </Suspense>

              {/* Post-processing */}
              <EffectComposer>
                <Bloom
                  intensity={0.08}
                  luminanceThreshold={0.9}
                  luminanceSmoothing={0.4}
                  mipmapBlur
                />
              </EffectComposer>

              <OrbitControls
                enablePan={false}
                minDistance={3.5}
                maxDistance={9}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.6}
                enableDamping
                dampingFactor={0.06}
              />
            </Canvas>

            {/* Overlay labels */}
            <div className="absolute top-3 left-3 bg-card/70 backdrop-blur-md rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground border border-border/50 shadow-sm">
              Drag to rotate • Scroll to zoom
            </div>
          </div>

          {/* 2D Design Canvas */}
          <div className="h-[240px] shrink-0 border-t border-border bg-card p-3 overflow-auto">
            <MugDesignCanvas
              elements={elements}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onUpdate={handleUpdate}
              onCanvasReady={handleCanvasReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
