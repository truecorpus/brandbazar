import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCustomizerStore } from "@/hooks/useCustomizerStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CustomizerTopBar from "@/components/customizer/CustomizerTopBar";
import LeftPanel from "@/components/customizer/LeftPanel";
import CanvasPanel from "@/components/customizer/CanvasPanel";
import RightPanel from "@/components/customizer/RightPanel";
import PreviewModal from "@/components/customizer/PreviewModal";
import BulkPersonalizationPanel from "@/components/customizer/BulkPersonalizationPanel";

interface ProductVariantData {
  id: string;
  variant_name: string;
  color: string | null;
  size: string | null;
  material: string | null;
  additional_price: number | null;
  stock_quantity: number | null;
  variant_image_urls: string[] | null;
}

interface FontData {
  id: string;
  font_name: string;
  font_family: string;
  category: string;
  font_file_url: string | null;
  is_safe_for_print: boolean | null;
  min_recommended_size: number | null;
}

interface DesignElementData {
  id: string;
  element_name: string;
  element_type: string;
  category: string;
  image_url: string | null;
  svg_content: string | null;
  tags: string[] | null;
  is_premium: boolean | null;
}

export default function Customizer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const store = useCustomizerStore();
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [variants, setVariants] = useState<ProductVariantData[]>([]);
  const [fonts, setFonts] = useState<FontData[]>([]);
  const [designElements, setDesignElements] = useState<DesignElementData[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Load product + template + variants + fonts + elements
  useEffect(() => {
    async function loadAll() {
      if (!slug) return;

      // Fetch product
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

      // Fetch variants, fonts, design elements in parallel
      const [variantsRes, fontsRes, elementsRes] = await Promise.all([
        supabase
          .from("product_variants")
          .select("*")
          .eq("product_id", product.id)
          .eq("status", "active"),
        supabase
          .from("font_library")
          .select("*")
          .eq("is_active", true)
          .order("font_name"),
        supabase
          .from("design_elements")
          .select("*")
          .order("usage_count", { ascending: false })
          .limit(60),
      ]);

      if (variantsRes.data) {
        setVariants(variantsRes.data as ProductVariantData[]);
        const firstColor = variantsRes.data.find((v: any) => v.color)?.color;
        if (firstColor) setSelectedColor(firstColor);
        const firstSize = variantsRes.data.find((v: any) => v.size)?.size;
        if (firstSize) setSelectedSize(firstSize);
      }
      if (fontsRes.data) setFonts(fontsRes.data as FontData[]);
      if (elementsRes.data) setDesignElements(elementsRes.data as DesignElementData[]);

      // Template lookup
      const categoryName = (product as any).categories?.name?.toLowerCase() || "";
      const typeMap: Record<string, string> = {
        mugs: "mug", "ceramic mugs": "mug", "magic mugs": "mug",
        "t-shirts": "tshirt", tshirts: "tshirt", polo: "tshirt",
        caps: "cap", hats: "cap",
        "id cards": "idcard", cards: "idcard",
      };
      const productType = typeMap[categoryName] || null;

      let template: any = null;
      if (productType) {
        const { data: templates } = await supabase
          .from("product_templates")
          .select("*")
          .eq("status", "active")
          .eq("product_type", productType as any)
          .limit(1);
        template = templates?.[0] || null;
      }
      if (!template) {
        const { data: templates } = await supabase
          .from("product_templates")
          .select("*")
          .eq("status", "active")
          .limit(1);
        template = templates?.[0] || null;
      }

      const defaultZones = [
        {
          id: "zone-front",
          name: "Front Print Area",
          zoneType: "print",
          x: 150, y: 100, width: 700, height: 600,
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

    loadAll();
  }, [slug]);

  // Auto-save
  useEffect(() => {
    if (store.state.autoSaveStatus !== "unsaved") return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(async () => {
      store.setAutoSaveStatus("saving");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && store.state.productId) {
          await supabase.from("customization_sessions" as any).upsert({
            customer_user_id: user.id,
            product_id: store.state.productId,
            template_id: store.state.templateId,
            session_state: { layers: store.state.layers, activeViewId: store.state.activeViewId },
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

    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [store.state.autoSaveStatus, store.state.layers]);

  const handleAddTextLayer = useCallback(() => {
    store.addLayer({ type: "text", text: "Your Text Here" });
  }, [store]);

  const handleAddImageLayer = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      store.addLayer({ type: "image", imageUrl: url, fileName: file.name, width: 200, height: 200 });
      toast.success(`"${file.name}" added to canvas`);
    },
    [store]
  );

  const handleAddClipart = useCallback(
    (element: DesignElementData) => {
      if (element.image_url) {
        store.addLayer({
          type: "clipart",
          imageUrl: element.image_url,
          fileName: element.element_name,
          elementId: element.id,
          width: 150,
          height: 150,
        });
        toast.success(`"${element.element_name}" added`);
      }
    },
    [store]
  );

  const handleSave = useCallback(() => {
    toast.success("Design saved successfully");
    store.setAutoSaveStatus("saved");
  }, [store]);

  const handlePreview = useCallback(() => setShowPreview(true), []);

  const handleAddToCart = useCallback(async () => {
    if (!user) {
      toast.error("Please log in to place an order");
      navigate(`/login?redirect=/customize/${slug}`);
      return;
    }

    if (!store.state.productId) {
      toast.error("Product not loaded");
      return;
    }

    try {
      const quantity = store.state.minQuantity || 25;
      const unitPrice = store.state.unitPrice || 0;
      const subtotal = unitPrice * quantity;
      const gstRate = 18;
      const gstAmount = Math.round(subtotal * (gstRate / 100) * 100) / 100;
      const totalAmount = subtotal + gstAmount;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          order_type: "retail",
          subtotal,
          gst_amount: gstAmount,
          total_amount: totalAmount,
          payment_status: "pending",
          order_status: "pending_payment",
          special_instructions: store.state.selectedPrintMethod
            ? `Print method: ${store.state.selectedPrintMethod}`
            : undefined,
        })
        .select("id")
        .single();

      if (orderError || !order) {
        toast.error("Failed to create order");
        console.error("Order creation error:", orderError);
        return;
      }

      // Create order item
      const { error: itemError } = await supabase
        .from("order_items")
        .insert([{
          order_id: order.id,
          product_id: store.state.productId,
          quantity,
          unit_price: unitPrice,
          customization_selections: {
            layers: store.state.layers,
            activeViewId: store.state.activeViewId,
            selectedPrintMethod: store.state.selectedPrintMethod,
          } as any,
        }]);

      if (itemError) {
        toast.error("Failed to add item to order");
        console.error("Order item error:", itemError);
        return;
      }

      toast.success("Order created! Redirecting to checkout...");
      navigate(`/checkout?order=${order.id}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  }, [user, store, slug, navigate]);

  const handleReset = useCallback(() => {
    if (confirm("This will remove all design elements. Continue?")) {
      store.resetDesign();
      setBulkMode(false);
      toast.info("Design reset");
    }
  }, [store]);

  const handleBulkToggle = useCallback(() => setBulkMode((p) => !p), []);

  const handleBulkProceed = useCallback((data: any) => {
    toast.success(`Quote ready: ${data.totalQty} units (${data.personalizedQty} personalized)`);
    setBulkMode(false);
  }, []);

  // Extract unique colors and sizes from variants
  const uniqueColors = [...new Set(variants.filter((v) => v.color).map((v) => v.color!))];
  const uniqueSizes = [...new Set(variants.filter((v) => v.size).map((v) => v.size!))];

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
        onBulkPersonalization={store.state.minQuantity >= 25 ? handleBulkToggle : undefined}
        isBulkMode={bulkMode}
        canUndo={store.state.undoStack.length > 0}
        canRedo={store.state.redoStack.length > 0}
        hasCustomization={store.hasCustomization}
        unitPrice={store.state.unitPrice}
        minQuantity={store.state.minQuantity}
      />

      <div className="flex flex-1 overflow-hidden">
        {!bulkMode && (
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
            productColors={uniqueColors}
            productSizes={uniqueSizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onSelectColor={setSelectedColor}
            onSelectSize={setSelectedSize}
            fonts={fonts}
            designElements={designElements}
            onAddClipart={handleAddClipart}
          />
        )}

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

        {bulkMode ? (
          <BulkPersonalizationPanel
            layers={store.currentViewLayers}
            canvasWidth={store.state.canvasWidth}
            canvasHeight={store.state.canvasHeight}
            unitPrice={store.state.unitPrice}
            onProceedToQuote={handleBulkProceed}
          />
        ) : (
          <RightPanel
            selectedLayer={store.selectedLayer}
            currentViewLayers={store.currentViewLayers}
            onUpdateLayer={store.updateLayer}
            onDeleteLayer={store.deleteLayer}
            onDuplicateLayer={store.duplicateLayer}
            onSelectLayer={store.selectLayer}
            onReorderLayers={store.reorderLayers}
          />
        )}
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        productName={store.state.productName}
        unitPrice={store.state.unitPrice}
        minQuantity={store.state.minQuantity}
        layers={store.state.layers}
        views={store.state.views}
        printZones={store.state.printZones}
        activeViewId={store.state.activeViewId}
        selectedPrintMethod={store.state.selectedPrintMethod}
        baseProductImageUrl={store.state.baseProductImageUrl}
        canvasWidth={store.state.canvasWidth}
        canvasHeight={store.state.canvasHeight}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
