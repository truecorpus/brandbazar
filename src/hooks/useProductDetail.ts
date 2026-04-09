import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type Variant = Database["public"]["Tables"]["product_variants"]["Row"];
type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
type CustomizationOption = Database["public"]["Tables"]["customization_options"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

interface BulkPriceTier {
  min_qty: number;
  max_qty: number | null;
  price_per_unit: number;
  label?: string;
}

interface PriceCalculation {
  pricePerUnit: number;
  totalPrice: number;
  savingsAmount: number;
  savingsPercent: number;
  appliedTier: BulkPriceTier | null;
  gstAmount: number;
  totalWithGst: number;
  basePrice: number;
}

interface ReviewStats {
  averageRating: number;
  totalCount: number;
  breakdown: { stars: number; count: number; percent: number }[];
}

// Fetch product by slug
const fetchProduct = async (slug: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();
  if (error) throw error;
  return data;
};

const fetchVariants = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .eq("status", "active")
    .order("additional_price", { ascending: true });
  if (error) throw error;
  return data || [];
};

const fetchImages = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("is_primary", { ascending: false })
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data || [];
};

const fetchCustomizationOptions = async (productId: string) => {
  const { data, error } = await supabase
    .from("customization_options")
    .select("*")
    .eq("product_id", productId);
  if (error) throw error;
  return data || [];
};

const fetchReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data || [];
};

const fetchAllReviewStats = async (productId: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", productId)
    .eq("status", "approved");
  if (error) throw error;

  const ratings = data || [];
  const totalCount = ratings.length;
  const sum = ratings.reduce((a, r) => a + r.rating, 0);
  const averageRating = totalCount > 0 ? Math.round((sum / totalCount) * 10) / 10 : 0;

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratings.filter((r) => r.rating === stars).length;
    return { stars, count, percent: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0 };
  });

  return { averageRating, totalCount, breakdown } as ReviewStats;
};

const fetchRelatedProducts = async (categoryId: string | null, currentProductId: string) => {
  if (!categoryId) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(image_url, is_primary)")
    .eq("category_id", categoryId)
    .eq("status", "active")
    .neq("id", currentProductId)
    .order("is_featured", { ascending: false })
    .limit(6);
  if (error) throw error;
  return data || [];
};

export function useProductDetail(productSlug: string) {
  // State
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});

  // Primary query
  const productQuery = useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => fetchProduct(productSlug),
    enabled: !!productSlug,
    staleTime: 5 * 60 * 1000,
  });

  const product = productQuery.data;
  const productId = product?.id;

  // Secondary queries (depend on productId)
  const variantsQuery = useQuery({
    queryKey: ["product-variants", productId],
    queryFn: () => fetchVariants(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const imagesQuery = useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => fetchImages(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const customizationQuery = useQuery({
    queryKey: ["product-customization", productId],
    queryFn: () => fetchCustomizationOptions(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const reviewsQuery = useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => fetchReviews(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const reviewStatsQuery = useQuery({
    queryKey: ["product-review-stats", productId],
    queryFn: () => fetchAllReviewStats(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const relatedQuery = useQuery({
    queryKey: ["related-products", product?.category_id, productId],
    queryFn: () => fetchRelatedProducts(product?.category_id || null, productId!),
    enabled: !!productId && !!product?.category_id,
    staleTime: 5 * 60 * 1000,
  });

  const variants = variantsQuery.data || [];
  const images = imagesQuery.data || [];
  const customizationOptions = customizationQuery.data || [];
  const reviews = reviewsQuery.data || [];
  const reviewStats = reviewStatsQuery.data;
  const relatedProducts = relatedQuery.data || [];

  // Set default variant
  useEffect(() => {
    if (variants.length > 0 && !selectedVariantId) {
      setSelectedVariantId(variants[0].id);
    }
  }, [variants, selectedVariantId]);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || null;

  // Parse bulk pricing tiers
  const bulkTiers = useMemo<BulkPriceTier[]>(() => {
    if (!product?.bulk_price_tiers) return [];
    try {
      const tiers = product.bulk_price_tiers as any[];
      if (!Array.isArray(tiers)) return [];
      return tiers.map((t: any) => ({
        min_qty: t.min_qty || t.min || 0,
        max_qty: t.max_qty || t.max || null,
        price_per_unit: t.price_per_unit || t.price || 0,
        label: t.label || `${t.min_qty || t.min}${t.max_qty || t.max ? `–${t.max_qty || t.max}` : "+"} units`,
      }));
    } catch {
      return [];
    }
  }, [product?.bulk_price_tiers]);

  // Price calculation
  const priceCalc = useMemo<PriceCalculation>(() => {
    const basePrice = product?.base_price || 0;
    const variantExtra = selectedVariant?.additional_price || 0;
    const gstRate = product?.gst_rate || 18;

    // Find applicable bulk tier
    let appliedTier: BulkPriceTier | null = null;
    for (const tier of bulkTiers) {
      if (quantity >= tier.min_qty && (tier.max_qty === null || quantity <= tier.max_qty)) {
        appliedTier = tier;
      }
    }

    const tierPrice = appliedTier ? appliedTier.price_per_unit : basePrice;
    const pricePerUnit = tierPrice + variantExtra;
    const totalPrice = pricePerUnit * quantity;
    const fullPrice = (basePrice + variantExtra) * quantity;
    const savingsAmount = fullPrice - totalPrice;
    const savingsPercent = fullPrice > 0 ? Math.round((savingsAmount / fullPrice) * 100) : 0;
    const gstAmount = Math.round(totalPrice * (gstRate / 100) * 100) / 100;
    const totalWithGst = totalPrice + gstAmount;

    return {
      pricePerUnit,
      totalPrice,
      savingsAmount,
      savingsPercent,
      appliedTier,
      gstAmount,
      totalWithGst,
      basePrice: basePrice + variantExtra,
    };
  }, [product, selectedVariant, quantity, bulkTiers]);

  // Unique colors/sizes from variants
  const availableColors = useMemo(() => {
    const colors = variants.filter((v) => v.color).map((v) => v.color!);
    return [...new Set(colors)];
  }, [variants]);

  const availableSizes = useMemo(() => {
    const sizes = variants.filter((v) => v.size).map((v) => v.size!);
    return [...new Set(sizes)];
  }, [variants]);

  // Realtime subscription for stock updates
  useEffect(() => {
    if (!productId) return;
    const channel = supabase
      .channel(`variants-stock-${productId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "product_variants", filter: `product_id=eq.${productId}` },
        () => {
          variantsQuery.refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [productId]);

  // Category info
  const category = useMemo(() => {
    if (!product) return null;
    const cats = product as any;
    return cats.categories ? { name: cats.categories.name, slug: cats.categories.slug } : null;
  }, [product]);

  return {
    // Data
    product,
    variants,
    images,
    customizationOptions,
    reviews,
    reviewStats,
    relatedProducts,
    category,
    bulkTiers,
    priceCalc,
    availableColors,
    availableSizes,

    // Selection state
    selectedVariant,
    selectedVariantId,
    setSelectedVariantId,
    quantity,
    setQuantity,
    activeImageIndex,
    setActiveImageIndex,
    activeTab,
    setActiveTab,
    selectedCustomizations,
    setSelectedCustomizations,

    // Loading/error
    isLoading: productQuery.isLoading,
    isError: productQuery.isError,
    notFound: productQuery.isSuccess && !product,
    error: productQuery.error,
  };
}
