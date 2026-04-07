import { useRef, useEffect, useCallback, useState } from "react";

export interface DesignElement {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  // text props
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
  italic?: boolean;
  // image props
  imageData?: HTMLImageElement;
  fileName?: string;
}

interface MugDesignCanvasProps {
  elements: DesignElement[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<DesignElement>) => void;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  backgroundColor?: string;
}

const CANVAS_W = 1024;
const CANVAS_H = 512;
// Safe print area
const SAFE_X = 40;
const SAFE_Y = 30;
const SAFE_W = CANVAS_W - 80;
const SAFE_H = CANVAS_H - 60;

export default function MugDesignCanvas({
  elements,
  selectedId,
  onSelect,
  onUpdate,
  onCanvasReady,
  backgroundColor = "#FFFFFF",
}: MugDesignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);

  // Hidden canvas for texture (no UI borders)
  useEffect(() => {
    const tc = document.createElement("canvas");
    tc.width = CANVAS_W;
    tc.height = CANVAS_H;
    textureCanvasRef.current = tc;
    onCanvasReady(tc);
  }, [onCanvasReady]);

  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, showGuides: boolean) => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      // Background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw elements
      for (const el of elements) {
        ctx.save();
        ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
        ctx.rotate((el.rotation * Math.PI) / 180);

        if (el.type === "image" && el.imageData) {
          ctx.drawImage(el.imageData, -el.width / 2, -el.height / 2, el.width, el.height);
        } else if (el.type === "text" && el.text) {
          const style = `${el.bold ? "bold" : ""} ${el.italic ? "italic" : ""}`.trim();
          ctx.font = `${style} ${el.fontSize || 32}px ${el.fontFamily || "Arial"}`;
          ctx.fillStyle = el.fontColor || "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Word wrap
          const words = el.text.split(" ");
          const lines: string[] = [];
          let currentLine = "";
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (ctx.measureText(testLine).width > el.width) {
              if (currentLine) lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) lines.push(currentLine);
          const lineH = (el.fontSize || 32) * 1.2;
          const startY = -(lines.length - 1) * lineH * 0.5;
          lines.forEach((line, i) => {
            ctx.fillText(line, 0, startY + i * lineH);
          });
        }
        ctx.restore();
      }

      // Safe area guides (only on visible canvas)
      if (showGuides) {
        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(SAFE_X, SAFE_Y, SAFE_W, SAFE_H);
        ctx.setLineDash([]);

        // Label
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)";
        ctx.font = "11px sans-serif";
        ctx.fillText("Safe Print Area", SAFE_X + 4, SAFE_Y + 14);

        // Selection highlight
        const sel = elements.find((e) => e.id === selectedId);
        if (sel) {
          ctx.strokeStyle = "rgba(37, 99, 235, 0.8)";
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          ctx.save();
          ctx.translate(sel.x + sel.width / 2, sel.y + sel.height / 2);
          ctx.rotate((sel.rotation * Math.PI) / 180);
          ctx.strokeRect(-sel.width / 2 - 4, -sel.height / 2 - 4, sel.width + 8, sel.height + 8);
          // Resize handle
          ctx.fillStyle = "rgba(37, 99, 235, 0.9)";
          ctx.fillRect(sel.width / 2 - 2, sel.height / 2 - 2, 8, 8);
          ctx.restore();
        }
      }
    },
    [elements, selectedId, backgroundColor]
  );

  // Redraw both canvases
  useEffect(() => {
    const canvas = canvasRef.current;
    const tc = textureCanvasRef.current;
    if (!canvas || !tc) return;

    const ctx = canvas.getContext("2d");
    const tCtx = tc.getContext("2d");
    if (!ctx || !tCtx) return;

    drawCanvas(ctx, true);
    drawCanvas(tCtx, false);
  }, [drawCanvas]);

  // Mouse handlers for drag
  const getCanvasPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getCanvasPos(e);
    // Find clicked element (reverse order for z-index)
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (pos.x >= el.x && pos.x <= el.x + el.width && pos.y >= el.y && pos.y <= el.y + el.height) {
        onSelect(el.id);
        setDragging({ id: el.id, offsetX: pos.x - el.x, offsetY: pos.y - el.y });
        return;
      }
    }
    onSelect(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const pos = getCanvasPos(e);
    onUpdate(dragging.id, {
      x: Math.max(0, Math.min(CANVAS_W - 50, pos.x - dragging.offsetX)),
      y: Math.max(0, Math.min(CANVAS_H - 50, pos.y - dragging.offsetY)),
    });
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <div className="relative w-full">
      <p className="text-[10px] text-muted-foreground mb-1 text-center uppercase tracking-widest">2D Design Canvas — Drag elements to position</p>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="w-full border border-border rounded-lg cursor-crosshair bg-white"
        style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}

export { CANVAS_W, CANVAS_H };
