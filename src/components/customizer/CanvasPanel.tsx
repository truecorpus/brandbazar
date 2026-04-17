import { useEffect, useRef, useCallback, useState } from "react";
import { Canvas, Rect, IText, FabricImage, Circle } from "fabric";
import type { DesignLayer, PrintZone, ProductView } from "@/hooks/useCustomizerStore";

interface CanvasPanelProps {
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  activeViewId: string;
  activeZoneId: string | null;
  baseProductImageUrl: string;
  printZones: PrintZone[];
  views: ProductView[];
  layers: DesignLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, updates: Partial<DesignLayer>) => void;
  onSetActiveView: (viewId: string) => void;
  onSetZoom: (zoom: number) => void;
}

export default function CanvasPanel({
  canvasWidth,
  canvasHeight,
  zoom,
  activeViewId,
  activeZoneId,
  baseProductImageUrl,
  printZones,
  views,
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onSetActiveView,
  onSetZoom,
}: CanvasPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const isUpdatingRef = useRef(false);
  const [canvasReady, setCanvasReady] = useState(0); // bumps each time fabric canvas is (re)created

  // Initialize Fabric canvas ONCE; size is updated via setDimensions in the zoom effect.
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#F8F9FA",
      selection: true,
    });

    fabricRef.current = canvas;
    setCanvasReady((v) => v + 1);

    // Selection events — ignore programmatic changes (during sync)
    canvas.on("selection:created", (e) => {
      if (isUpdatingRef.current) return;
      const selected = e.selected?.[0];
      if (selected && (selected as any).layerId) {
        onSelectLayer((selected as any).layerId);
      }
    });

    canvas.on("selection:updated", (e) => {
      if (isUpdatingRef.current) return;
      const selected = e.selected?.[0];
      if (selected && (selected as any).layerId) {
        onSelectLayer((selected as any).layerId);
      }
    });

    canvas.on("selection:cleared", () => {
      if (isUpdatingRef.current) return;
      onSelectLayer(null);
    });

    // Object modified
    canvas.on("object:modified", (e) => {
      const obj = e.target;
      if (obj && (obj as any).layerId && !isUpdatingRef.current) {
        onUpdateLayer((obj as any).layerId, {
          x: Math.round(obj.left || 0),
          y: Math.round(obj.top || 0),
          width: Math.round((obj.width || 100) * (obj.scaleX || 1)),
          height: Math.round((obj.height || 100) * (obj.scaleY || 1)),
          rotation: Math.round(obj.angle || 0),
        });
      }
    });

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
    // Intentionally only run once on mount; resizing handled separately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track current sync generation to discard stale async image loads
  const syncGenRef = useRef(0);

  // Sync layers to canvas (NOT triggered by selection changes — selection handled separately)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    isUpdatingRef.current = true;
    syncGenRef.current += 1;
    const myGen = syncGenRef.current;

    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = "#F8F9FA";

    // Draw print zones
    printZones.forEach((zone) => {
      const isActive = zone.id === activeZoneId;
      const rect = new Rect({
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
        fill: isActive ? "rgba(26,115,232,0.06)" : "rgba(232,240,254,0.4)",
        stroke: "#1A73E8",
        strokeWidth: 1.5,
        strokeDashArray: [6, 4],
        selectable: false,
        evented: false,
      });
      canvas.add(rect);

      // Safe area indicator (inner)
      if (zone.isSafeArea) {
        const padding = 15;
        const safeRect = new Rect({
          left: zone.x + padding,
          top: zone.y + padding,
          width: zone.width - padding * 2,
          height: zone.height - padding * 2,
          fill: "transparent",
          stroke: "#F5A623",
          strokeWidth: 1,
          strokeDashArray: [3, 3],
          selectable: false,
          evented: false,
        });
        canvas.add(safeRect);
      }
    });

    // Draw design layers
    layers.forEach((layer) => {
      if (!layer.visible) return;

      if (layer.type === "text") {
        const text = new IText(layer.text || "Text", {
          left: layer.x,
          top: layer.y,
          fontSize: layer.fontSize || 24,
          fontFamily: layer.fontFamily || "Inter",
          fill: layer.fontColor || "#202124",
          fontWeight: (layer.fontWeight as any) || "normal",
          fontStyle: (layer.fontStyle as any) || "normal",
          textAlign: layer.textAlign || "left",
          charSpacing: (layer.letterSpacing || 0) * 10,
          lineHeight: layer.lineHeight || 1.4,
          opacity: layer.opacity,
          angle: layer.rotation,
          selectable: !layer.locked,
          lockMovementX: layer.locked,
          lockMovementY: layer.locked,
          lockRotation: layer.locked,
          lockScalingX: layer.locked,
          lockScalingY: layer.locked,
          hasControls: !layer.locked,
          cornerColor: "#1A73E8",
          cornerStyle: "circle",
          cornerSize: 8,
          transparentCorners: false,
          borderColor: "#1A73E8",
          borderScaleFactor: 1.5,
        });
        (text as any).layerId = layer.id;

        // Text editing sync
        text.on("editing:exited", () => {
          onUpdateLayer(layer.id, { text: text.text || "" });
        });

        canvas.add(text);
      } else if (layer.type === "shape") {
        const shape = new Rect({
          left: layer.x,
          top: layer.y,
          width: layer.width,
          height: layer.height,
          fill: layer.fillColor || "#1A73E8",
          stroke: layer.strokeColor || "transparent",
          strokeWidth: layer.strokeWidth || 0,
          rx: layer.cornerRadius || 0,
          ry: layer.cornerRadius || 0,
          opacity: layer.opacity,
          angle: layer.rotation,
          selectable: !layer.locked,
          lockMovementX: layer.locked,
          lockMovementY: layer.locked,
          lockRotation: layer.locked,
          lockScalingX: layer.locked,
          lockScalingY: layer.locked,
          hasControls: !layer.locked,
          cornerColor: "#1A73E8",
          cornerStyle: "circle",
          cornerSize: 8,
          transparentCorners: false,
          borderColor: "#1A73E8",
        });
        (shape as any).layerId = layer.id;
        canvas.add(shape);
      } else if ((layer.type === "image" || layer.type === "clipart") && layer.imageUrl) {
        // blob: and data: URLs must NOT use crossOrigin — it causes silent load failure.
        const isLocal = layer.imageUrl.startsWith("blob:") || layer.imageUrl.startsWith("data:");
        const loadOpts = isLocal ? {} : { crossOrigin: "anonymous" as const };

        FabricImage.fromURL(layer.imageUrl, loadOpts).then((img) => {
          if (!fabricRef.current) return;
          if (syncGenRef.current !== myGen) return; // stale, abandon
          const naturalW = img.width || 1;
          const naturalH = img.height || 1;
          // If layer has no size yet, fit to default 200px max preserving aspect ratio
          const targetW = layer.width || 200;
          const targetH = layer.height || (200 * naturalH) / naturalW;
          img.set({
            left: layer.x,
            top: layer.y,
            scaleX: targetW / naturalW,
            scaleY: targetH / naturalH,
            opacity: layer.opacity,
            angle: layer.rotation,
            selectable: !layer.locked,
            lockMovementX: layer.locked,
            lockMovementY: layer.locked,
            lockRotation: layer.locked,
            lockScalingX: layer.locked,
            lockScalingY: layer.locked,
            hasControls: !layer.locked,
            cornerColor: "#1A73E8",
            cornerStyle: "circle",
            cornerSize: 8,
            transparentCorners: false,
            borderColor: "#1A73E8",
          });
          (img as any).layerId = layer.id;
          fabricRef.current!.add(img);
          fabricRef.current!.renderAll();
        }).catch((err) => {
          console.error("[Canvas] Failed to load image:", layer.imageUrl, err);
        });
      }
    });

    canvas.renderAll();
    isUpdatingRef.current = false;
  }, [layers, printZones, activeZoneId, canvasReady]);

  // Sync selection separately — don't rebuild canvas on selection change
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    isUpdatingRef.current = true;
    if (!selectedLayerId) {
      canvas.discardActiveObject();
    } else {
      const obj = canvas.getObjects().find((o: any) => o.layerId === selectedLayerId);
      if (obj && canvas.getActiveObject() !== obj) {
        canvas.setActiveObject(obj);
      }
    }
    canvas.requestRenderAll();
    isUpdatingRef.current = false;
  }, [selectedLayerId, layers]);

  // Zoom
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const scale = zoom / 100;
    canvas.setZoom(scale);
    canvas.setDimensions({
      width: canvasWidth * scale,
      height: canvasHeight * scale,
    });
  }, [zoom, canvasWidth, canvasHeight]);

  // Mouse wheel zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      onSetZoom(zoom + delta);
    },
    [zoom, onSetZoom]
  );

  const activeView = views.find((v) => v.id === activeViewId);

  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-auto relative" style={{ backgroundColor: "#F8F9FA" }}>
      {/* View thumbnails strip */}
      {views.length > 1 && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => onSetActiveView(v.id)}
              className="w-14 h-14 rounded-lg border-2 overflow-hidden transition-all"
              style={{
                borderColor: activeViewId === v.id ? "#1A73E8" : "#DADCE0",
                backgroundColor: "white",
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-[9px] font-medium" style={{ color: "#5F6368" }}>
                {v.name}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Canvas */}
      <div
        className="relative"
        onWheel={handleWheel}
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <canvas ref={canvasRef} />
      </div>

      {/* View tabs below canvas */}
      {views.length > 1 && (
        <div className="flex gap-4 mt-4">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => onSetActiveView(v.id)}
              className="text-xs font-medium pb-1 transition-all"
              style={{
                color: activeViewId === v.id ? "#1A73E8" : "#5F6368",
                borderBottom: activeViewId === v.id ? "2px solid #1A73E8" : "2px solid transparent",
              }}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}

      {/* Out-of-bounds warning */}
      {layers.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden" id="oob-warning">
          <div className="px-4 py-2 rounded-lg text-xs" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
            Part of your design is outside the safe print area. It may be cropped during printing.
          </div>
        </div>
      )}
    </div>
  );
}
