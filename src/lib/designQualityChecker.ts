import type { DesignLayer, PrintZone } from "@/hooks/useCustomizerStore";

export interface QualityWarning {
  severity: "error" | "warning" | "info";
  message: string;
  layerId?: string;
}

export function checkDesignQuality(
  layers: DesignLayer[],
  printZones: PrintZone[]
): QualityWarning[] {
  const warnings: QualityWarning[] = [];

  // Empty design check
  if (layers.length === 0) {
    warnings.push({
      severity: "error",
      message: "Your design is empty. Add text, images, or elements before proceeding.",
    });
    return warnings;
  }

  const visibleLayers = layers.filter((l) => l.visible);

  if (visibleLayers.length === 0) {
    warnings.push({
      severity: "error",
      message: "All layers are hidden. Make at least one layer visible.",
    });
    return warnings;
  }

  for (const layer of visibleLayers) {
    // Small text check
    if (layer.type === "text") {
      if ((layer.fontSize || 24) < 8) {
        warnings.push({
          severity: "warning",
          message: `"${layer.name}" has very small text (${layer.fontSize}pt). Text below 8pt may not print clearly.`,
          layerId: layer.id,
        });
      }
      if (!layer.text || layer.text.trim() === "" || layer.text === "Your Text Here") {
        warnings.push({
          severity: "warning",
          message: `"${layer.name}" still has placeholder text. Did you forget to edit it?`,
          layerId: layer.id,
        });
      }
    }

    // Image resolution check (approximate based on display size)
    if (layer.type === "image") {
      if (layer.width < 50 || layer.height < 50) {
        warnings.push({
          severity: "info",
          message: `"${layer.name}" is very small on canvas. Consider making it larger for better visibility.`,
          layerId: layer.id,
        });
      }
    }

    // Out-of-bounds check against print zones
    const zone = printZones.find((z) => z.id === layer.printZoneId);
    if (zone) {
      const outLeft = layer.x < zone.x;
      const outTop = layer.y < zone.y;
      const outRight = layer.x + layer.width > zone.x + zone.width;
      const outBottom = layer.y + layer.height > zone.y + zone.height;

      if (outLeft || outTop || outRight || outBottom) {
        warnings.push({
          severity: "warning",
          message: `"${layer.name}" extends outside the print area "${zone.name}". It may be cropped during printing.`,
          layerId: layer.id,
        });
      }
    }
  }

  // Check for too many colors in embroidery zones
  for (const zone of printZones) {
    if (zone.zoneType === "embroidery") {
      const zoneLayers = visibleLayers.filter((l) => l.printZoneId === zone.id);
      const uniqueColors = new Set<string>();
      zoneLayers.forEach((l) => {
        if (l.fontColor) uniqueColors.add(l.fontColor);
        if (l.fillColor) uniqueColors.add(l.fillColor);
        if (l.strokeColor && l.strokeColor !== "transparent") uniqueColors.add(l.strokeColor);
      });
      if (uniqueColors.size > zone.maxColors) {
        warnings.push({
          severity: "warning",
          message: `"${zone.name}" has ${uniqueColors.size} colors but embroidery supports max ${zone.maxColors}. Reduce colors for best results.`,
        });
      }
    }
  }

  return warnings;
}
