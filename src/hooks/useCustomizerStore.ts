import { useState, useCallback, useRef } from "react";

export interface DesignLayer {
  id: string;
  type: "text" | "image" | "clipart" | "shape";
  name: string;
  viewId: string;
  printZoneId: string;
  visible: boolean;
  locked: boolean;
  order: number;
  // Common
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  // Text-specific
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  letterSpacing?: number;
  lineHeight?: number;
  textEffect?: "none" | "outline" | "shadow" | "curved";
  curveRadius?: number;
  // Image-specific
  imageUrl?: string;
  fileName?: string;
  // Shape-specific
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  // Clipart
  elementId?: string;
  // Filters
  filter?: string;
}

export interface PrintZone {
  id: string;
  name: string;
  zoneType: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape: "rectangle" | "circle";
  isSafeArea: boolean;
  maxColors: number;
  supportedPrintMethods: string[];
}

export interface ProductView {
  id: string;
  name: string;
  baseImageUrl: string;
  printZoneIds: string[];
}

export interface CustomizerState {
  productId: string | null;
  templateId: string | null;
  activeViewId: string;
  activeZoneId: string | null;
  selectedLayerId: string | null;
  selectedVariantId: string | null;
  selectedPrintMethod: string;
  zoom: number;
  layers: DesignLayer[];
  views: ProductView[];
  printZones: PrintZone[];
  canvasWidth: number;
  canvasHeight: number;
  baseProductImageUrl: string;
  productName: string;
  unitPrice: number;
  minQuantity: number;
  autoSaveStatus: "saved" | "saving" | "unsaved";
  undoStack: DesignLayer[][];
  redoStack: DesignLayer[][];
}

const initialState: CustomizerState = {
  productId: null,
  templateId: null,
  activeViewId: "front",
  activeZoneId: null,
  selectedLayerId: null,
  selectedVariantId: null,
  selectedPrintMethod: "digital_print",
  zoom: 100,
  layers: [],
  views: [],
  printZones: [],
  canvasWidth: 1000,
  canvasHeight: 1000,
  baseProductImageUrl: "",
  productName: "",
  unitPrice: 0,
  minQuantity: 1,
  autoSaveStatus: "saved",
  undoStack: [],
  redoStack: [],
};

export function useCustomizerStore() {
  const [state, setState] = useState<CustomizerState>(initialState);
  const layerCounter = useRef(0);

  const pushUndo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      undoStack: [...prev.undoStack.slice(-30), prev.layers],
      redoStack: [],
      autoSaveStatus: "unsaved",
    }));
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.undoStack.length === 0) return prev;
      const newUndo = [...prev.undoStack];
      const restored = newUndo.pop()!;
      return {
        ...prev,
        undoStack: newUndo,
        redoStack: [...prev.redoStack, prev.layers],
        layers: restored,
        autoSaveStatus: "unsaved",
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.redoStack.length === 0) return prev;
      const newRedo = [...prev.redoStack];
      const restored = newRedo.pop()!;
      return {
        ...prev,
        redoStack: newRedo,
        undoStack: [...prev.undoStack, prev.layers],
        layers: restored,
        autoSaveStatus: "unsaved",
      };
    });
  }, []);

  const addLayer = useCallback(
    (layer: Partial<DesignLayer> & { type: DesignLayer["type"] }) => {
      pushUndo();
      layerCounter.current += 1;
      const id = `layer-${Date.now()}-${layerCounter.current}`;
      const defaultName =
        layer.type === "text"
          ? `Text ${layerCounter.current}`
          : layer.type === "image"
          ? layer.fileName || `Image ${layerCounter.current}`
          : layer.type === "clipart"
          ? `Clipart ${layerCounter.current}`
          : `Shape ${layerCounter.current}`;

      setState((prev) => {
        const newLayer: DesignLayer = {
          id,
          name: defaultName,
          viewId: prev.activeViewId,
          printZoneId: prev.activeZoneId || prev.printZones[0]?.id || "",
          visible: true,
          locked: false,
          order: prev.layers.length,
          x: 100,
          y: 100,
          width: 150,
          height: layer.type === "text" ? 40 : 150,
          rotation: 0,
          opacity: 1,
          fontSize: 24,
          fontFamily: "Inter",
          fontColor: "#202124",
          fontWeight: "normal",
          fontStyle: "normal",
          textAlign: "left",
          letterSpacing: 0,
          lineHeight: 1.4,
          textEffect: "none",
          text: layer.type === "text" ? "Your Text Here" : undefined,
          fillColor: "#1A73E8",
          strokeColor: "transparent",
          strokeWidth: 0,
          filter: "none",
          ...layer,
        };
        return {
          ...prev,
          layers: [...prev.layers, newLayer],
          selectedLayerId: id,
          autoSaveStatus: "unsaved",
        };
      });
      return id;
    },
    [pushUndo]
  );

  const updateLayer = useCallback(
    (id: string, updates: Partial<DesignLayer>) => {
      pushUndo();
      setState((prev) => ({
        ...prev,
        layers: prev.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        autoSaveStatus: "unsaved",
      }));
    },
    [pushUndo]
  );

  const deleteLayer = useCallback(
    (id: string) => {
      pushUndo();
      setState((prev) => ({
        ...prev,
        layers: prev.layers.filter((l) => l.id !== id),
        selectedLayerId: prev.selectedLayerId === id ? null : prev.selectedLayerId,
        autoSaveStatus: "unsaved",
      }));
    },
    [pushUndo]
  );

  const duplicateLayer = useCallback(
    (id: string) => {
      setState((prev) => {
        const layer = prev.layers.find((l) => l.id === id);
        if (!layer) return prev;
        return prev;
      });
      const layer = state.layers.find((l) => l.id === id);
      if (layer) {
        addLayer({ ...layer, x: layer.x + 20, y: layer.y + 20 });
      }
    },
    [state.layers, addLayer]
  );

  const reorderLayers = useCallback(
    (fromIndex: number, toIndex: number) => {
      pushUndo();
      setState((prev) => {
        const viewLayers = prev.layers
          .filter((l) => l.viewId === prev.activeViewId)
          .sort((a, b) => a.order - b.order);
        const otherLayers = prev.layers.filter(
          (l) => l.viewId !== prev.activeViewId
        );
        const [moved] = viewLayers.splice(fromIndex, 1);
        viewLayers.splice(toIndex, 0, moved);
        const reordered = viewLayers.map((l, i) => ({ ...l, order: i }));
        return { ...prev, layers: [...otherLayers, ...reordered], autoSaveStatus: "unsaved" };
      });
    },
    [pushUndo]
  );

  const setActiveView = useCallback((viewId: string) => {
    setState((prev) => ({
      ...prev,
      activeViewId: viewId,
      selectedLayerId: null,
    }));
  }, []);

  const setActiveZone = useCallback((zoneId: string | null) => {
    setState((prev) => ({ ...prev, activeZoneId: zoneId }));
  }, []);

  const selectLayer = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedLayerId: id }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => ({
      ...prev,
      zoom: Math.max(50, Math.min(300, zoom)),
    }));
  }, []);

  const setAutoSaveStatus = useCallback(
    (status: "saved" | "saving" | "unsaved") => {
      setState((prev) => ({ ...prev, autoSaveStatus: status }));
    },
    []
  );

  const resetDesign = useCallback(() => {
    pushUndo();
    setState((prev) => ({ ...prev, layers: [], selectedLayerId: null, autoSaveStatus: "unsaved" }));
  }, [pushUndo]);

  const initializeTemplate = useCallback(
    (config: Partial<CustomizerState>) => {
      setState((prev) => ({ ...prev, ...config }));
    },
    []
  );

  const selectedLayer = state.layers.find(
    (l) => l.id === state.selectedLayerId
  );

  const currentViewLayers = state.layers
    .filter((l) => l.viewId === state.activeViewId)
    .sort((a, b) => a.order - b.order);

  const hasCustomization = state.layers.length > 0;

  return {
    state,
    selectedLayer,
    currentViewLayers,
    hasCustomization,
    addLayer,
    updateLayer,
    deleteLayer,
    duplicateLayer,
    reorderLayers,
    setActiveView,
    setActiveZone,
    selectLayer,
    setZoom,
    setAutoSaveStatus,
    resetDesign,
    undo,
    redo,
    initializeTemplate,
  };
}
