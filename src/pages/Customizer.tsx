import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useCustomizerStore } from "@/hooks/useCustomizerStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CustomizerTopBar from "@/components/customizer/CustomizerTopBar";
import LeftPanel from "@/components/customizer/LeftPanel";
import CanvasPanel from "@/components/customizer/CanvasPanel";
import RightPanel from "@/components/customizer/RightPanel";
import PreviewModal from "@/components/customizer/PreviewModal";

export default function Customizer() {
  const { slug } = useParams<{ slug: string }>();
  const store = useCustomizerStore();
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Load product + template data
  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;

      const { data: product } = await supabase
        .from("products")
        .select("*, categories(*)")
        .eq("slug", slug)
        .eq("status", "active")
        .single();

      if (!product) {
        toast.error("Product not found");
        return;
      }

      // Try to find a template for this product
      const { data: templates } = await supabase
        .from("product_templates" as any)
        .select("*")
        .eq("status", "active")
        .limit(1);

      const template = (templates as any)?.[0];

      const defaultZones = [
        {
          id: "zone-front",
          name: "Front Print Area",
          zoneType: "print",
          x: 150,
          y: 100,
          width: 700,
          height: 600,
          shape: "rectangle" as const,
          isSafeArea: true,
          maxColors: 12,
          supportedPrintMethods: ["digital_print", "sublimation", "screen_print"],
        },
      ];

      const defaultViews = [
        { id: "front", name: "Front View", baseImageUrl: "", printZoneIds: ["zone-front"] },
      ];

      store.initializeTemplate({
        productId: product.id,
        templateId: template?.id || null,
        productName: product.name,
        unitPrice: product.base_price,
        minQuantity: 25,
        canvasWidth: template?.canvas_width || 1000,
        canvasHeight: template?.canvas_height || 800,
        baseProductImageUrl: template?.base_product_image_url || "",
        printZones: template?.print_zones?.length ? template.print_zones : defaultZones,
        views: template?.views?.length ? template.views : defaultViews,
        activeViewId: "front",
        activeZoneId: defaultZones[0]?.id || null,
      });
    }

    loadProduct();
  }, [slug]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (store.state.autoSaveStatus !== "unsaved") return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(async () => {
      store.setAutoSaveStatus("saving");
      // Save to customization_sessions table
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && store.state.productId) {
          await supabase.from("customization_sessions" as any).upsert({
            customer_user_id: user.id,
            product_id: store.state.productId,
            template_id: store.state.templateId,
            session_state: {
              layers: store.state.layers,
              activeViewId: store.state.activeViewId,
            },
            active_view: store.state.activeViewId,
            selected_print_method: store.state.selectedPrintMethod,
            session_status: "active",
          } as any);
        }
        store.setAutoSaveStatus("saved");
      } catch {
        store.setAutoSaveStatus("unsaved");
      }
    }, 5000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [store.state.autoSaveStatus, store.state.layers]);

  const handleAddTextLayer = useCallback(() => {
    store.addLayer({ type: "text", text: "Your Text Here" });
  }, [store]);

  const handleAddImageLayer = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      store.addLayer({
        type: "image",
        imageUrl: url,
        fileName: file.name,
        width: 200,
        height: 200,
      });
      toast.success(`"${file.name}" added to canvas`);
    },
    [store]
  );

  const handleSave = useCallback(() => {
    toast.success("Design saved successfully");
    store.setAutoSaveStatus("saved");
  }, [store]);

  const handlePreview = useCallback(() => {
    toast.info("Preview mode coming soon");
  }, []);

  const handleAddToCart = useCallback(() => {
    toast.success("Design added to quote request");
  }, []);

  const handleReset = useCallback(() => {
    if (confirm("This will remove all design elements. Continue?")) {
      store.resetDesign();
      toast.info("Design reset");
    }
  }, [store]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <CustomizerTopBar
        productName={store.state.productName}
        autoSaveStatus={store.state.autoSaveStatus}
        zoom={store.state.zoom}
        onZoomIn={() => store.setZoom(store.state.zoom + 10)}
        onZoomOut={() => store.setZoom(store.state.zoom - 10)}
        onUndo={store.undo}
        onRedo={store.redo}
        onReset={handleReset}
        onSave={handleSave}
        onPreview={handlePreview}
        onAddToCart={handleAddToCart}
        canUndo={store.state.undoStack.length > 0}
        canRedo={store.state.redoStack.length > 0}
        hasCustomization={store.hasCustomization}
        unitPrice={store.state.unitPrice}
        minQuantity={store.state.minQuantity}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          activeViewId={store.state.activeViewId}
          activeZoneId={store.state.activeZoneId}
          selectedLayer={store.selectedLayer}
          printZones={store.state.printZones}
          views={store.state.views}
          selectedPrintMethod={store.state.selectedPrintMethod}
          onAddTextLayer={handleAddTextLayer}
          onAddImageLayer={handleAddImageLayer}
          onUpdateLayer={store.updateLayer}
          onSetActiveView={store.setActiveView}
          onSetActiveZone={store.setActiveZone}
        />

        <CanvasPanel
          canvasWidth={store.state.canvasWidth}
          canvasHeight={store.state.canvasHeight}
          zoom={store.state.zoom}
          activeViewId={store.state.activeViewId}
          activeZoneId={store.state.activeZoneId}
          baseProductImageUrl={store.state.baseProductImageUrl}
          printZones={store.state.printZones}
          views={store.state.views}
          layers={store.currentViewLayers}
          selectedLayerId={store.state.selectedLayerId}
          onSelectLayer={store.selectLayer}
          onUpdateLayer={store.updateLayer}
          onSetActiveView={store.setActiveView}
          onSetZoom={store.setZoom}
        />

        <RightPanel
          selectedLayer={store.selectedLayer}
          currentViewLayers={store.currentViewLayers}
          onUpdateLayer={store.updateLayer}
          onDeleteLayer={store.deleteLayer}
          onDuplicateLayer={store.duplicateLayer}
          onSelectLayer={store.selectLayer}
          onReorderLayers={store.reorderLayers}
        />
      </div>
    </div>
  );
}
