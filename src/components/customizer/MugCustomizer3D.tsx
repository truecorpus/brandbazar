import { useState, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Mug3DScene from "./Mug3DScene";
import MugDesignCanvas, { type DesignElement, CANVAS_W, CANVAS_H } from "./MugDesignCanvas";
import MugCustomizerSidebar from "./MugCustomizerSidebar";

let idCounter = 0;
const nextId = () => `el-${++idCounter}`;

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
          <div className="flex-1 relative bg-secondary/30">
            <Canvas
              camera={{ position: [0, 1, 6], fov: 40 }}
              shadows
              gl={{ preserveDrawingBuffer: true, antialias: true }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
              <directionalLight position={[-3, 4, -3]} intensity={0.4} />
              <pointLight position={[0, 5, 0]} intensity={0.3} />

              <Suspense fallback={null}>
                <Mug3DScene
                  designTexture={textureCanvas}
                  mugColor={mugColor}
                  autoRotate={autoRotate}
                />
                <ContactShadows position={[0, -1.7, 0]} opacity={0.25} scale={8} blur={2} />
                <Environment preset="studio" />
              </Suspense>

              <OrbitControls
                enablePan={false}
                minDistance={3.5}
                maxDistance={10}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>

            {/* Overlay labels */}
            <div className="absolute top-3 left-3 bg-card/80 backdrop-blur-sm rounded px-2.5 py-1 text-[11px] text-muted-foreground border border-border">
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
