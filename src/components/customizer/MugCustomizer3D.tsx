import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { toast } from "sonner";
import { ArrowLeft, RotateCw, ZoomIn, ShoppingCart } from "lucide-react";
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
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshBasicMaterial color="#ddd" wireframe />
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
  const [showCanvas, setShowCanvas] = useState(true);

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
      toast.success(`"${file.name}" added to design`);
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
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0 shadow-sm">
        <Button size="sm" variant="ghost" className="h-9 gap-1.5 text-xs" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="h-6 w-px bg-border" />
        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-foreground leading-tight">Mug Customizer</h1>
          <span className="text-[10px] text-muted-foreground leading-tight">11oz White Sublimation Ceramic Mug</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">Starting at ₹199</span>
          <Button size="sm" className="h-9 text-xs gap-1.5">
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Quote
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
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
          <div
            className="flex-1 relative"
            style={{
              background: "linear-gradient(160deg, #c8c4c0 0%, #b8b4b0 40%, #a8a4a0 100%)",
            }}
          >
            <Canvas
              camera={{ position: [2.5, 1.0, 3.5], fov: 30 }}
              shadows="soft"
              gl={{
                preserveDrawingBuffer: true,
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0,
                outputColorSpace: THREE.SRGBColorSpace,
              }}
              dpr={[1, 2]}
            >
              {/* Ambient fill */}
              <ambientLight intensity={0.35} color="#f8f5f0" />

              {/* Key light — soft warm, front-left above */}
              <directionalLight
                position={[4, 7, 5]}
                intensity={1.3}
                color="#fffaf0"
                castShadow
                shadow-mapSize={2048}
                shadow-bias={-0.0003}
                shadow-normalBias={0.04}
              >
                <orthographicCamera attach="shadow-camera" args={[-4, 4, 4, -4, 0.1, 20]} />
              </directionalLight>

              {/* Fill light — cool tone from right */}
              <directionalLight position={[-4, 4, 3]} intensity={0.45} color="#e6edf5" />

              {/* Rim/back light — for edge definition */}
              <spotLight
                position={[-2, 6, -5]}
                intensity={0.7}
                color="#ffffff"
                angle={0.45}
                penumbra={0.9}
                distance={18}
              />

              {/* Bottom bounce */}
              <pointLight position={[0, -2, 4]} intensity={0.12} color="#f0e8df" />

              <Suspense fallback={<SceneLoader />}>
                <Center>
                  <Mug3DScene
                    designTexture={textureCanvas}
                    mugColor={mugColor}
                    autoRotate={autoRotate}
                  />
                </Center>

                {/* Contact shadow under mug */}
                <ContactShadows
                  position={[0, -1.21, 0]}
                  opacity={0.45}
                  scale={5}
                  blur={2.2}
                  far={3}
                  color="#333333"
                />

                {/* Ground plane for soft shadow */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, 0]} receiveShadow>
                  <planeGeometry args={[12, 12]} />
                  <shadowMaterial transparent opacity={0.15} />
                </mesh>

                {/* Studio HDRI environment */}
                <Environment preset="studio" environmentIntensity={1.5} />
              </Suspense>

              {/* Subtle bloom for highlights */}
              <EffectComposer>
                <Bloom
                  intensity={0.06}
                  luminanceThreshold={0.92}
                  luminanceSmoothing={0.5}
                  mipmapBlur
                />
              </EffectComposer>

              <OrbitControls
                enablePan={false}
                minDistance={3.8}
                maxDistance={8.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.7}
                enableDamping
                dampingFactor={0.05}
              />
            </Canvas>

            {/* Overlay hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-card/60 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] text-muted-foreground border border-border/40 shadow-sm flex items-center gap-3">
              <span className="flex items-center gap-1"><RotateCw className="w-3 h-3" /> Drag to rotate</span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Scroll to zoom</span>
            </div>
          </div>

          {/* 2D Design Canvas - collapsible */}
          <div className={`shrink-0 border-t border-border bg-card transition-all duration-300 ${showCanvas ? 'h-[220px]' : 'h-9'}`}>
            <button
              onClick={() => setShowCanvas(!showCanvas)}
              className="w-full h-9 flex items-center justify-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors border-b border-border/50"
            >
              <span className="font-medium uppercase tracking-wider">
                {showCanvas ? '▼ Design Canvas' : '▲ Show Design Canvas'}
              </span>
            </button>
            {showCanvas && (
              <div className="p-3 overflow-auto h-[calc(100%-36px)]">
                <MugDesignCanvas
                  elements={elements}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onUpdate={handleUpdate}
                  onCanvasReady={handleCanvasReady}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
