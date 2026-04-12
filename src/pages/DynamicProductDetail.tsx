import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import BackToTop from "@/components/BackToTop";
import SEOHead from "@/components/SEOHead";
import { useProductDetail } from "@/hooks/useProductDetail";
import DynamicProductGallery from "@/components/product/DynamicProductGallery";
import DynamicProductInfo from "@/components/product/DynamicProductInfo";
import DynamicProductTabs from "@/components/product/DynamicProductTabs";
import DynamicRelatedProducts from "@/components/product/DynamicRelatedProducts";
import MobileStickyBar from "@/components/product/MobileStickyBar";
import ProductPageSkeleton from "@/components/product/ProductPageSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

const DynamicProductDetail = () => {
  const { productSlug } = useParams<{ categorySlug: string; productSlug: string }>();

  const {
    product, variants, images, customizationOptions, reviews,
    reviewStats, relatedProducts, category, bulkTiers, priceCalc,
    availableColors, availableSizes,
    selectedVariant, selectedVariantId, setSelectedVariantId,
    quantity, setQuantity, activeImageIndex, setActiveImageIndex,
    activeTab, setActiveTab,
    isLoading, notFound,
  } = useProductDetail(productSlug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <ProductPageSkeleton />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            This product doesn't exist or has been removed from our catalog.
          </p>
          <Link to="/shop">
            <Button>
              Browse all products <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = selectedVariant ? (selectedVariant.stock_quantity ?? 0) <= 0 : false;
  const primaryImage = images.find((i) => i.is_primary)?.image_url || images[0]?.image_url;
  const pageTitle = product.meta_title || `${product.name} | Custom Print from ₹${product.base_price} | BrandBazaar`;
  const pageDescription = product.meta_description || product.short_description || `Customize ${product.name} with your brand logo. Bulk pricing available.`;

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description || product.long_description || "",
    brand: { "@type": "Brand", name: "BrandBazaar" },
    offers: {
      "@type": "Offer",
      price: product.base_price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: window.location.href,
    },
  };

  if (reviewStats && reviewStats.totalCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalCount,
    };
  }

  if (primaryImage) {
    jsonLd.image = primaryImage;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        ogImage={primaryImage}
        ogType="product"
        canonical={window.location.href}
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* Back link - desktop only */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-0 pb-4 lg:pb-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-6 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <DynamicProductGallery
              images={images}
              activeIndex={activeImageIndex}
              onIndexChange={setActiveImageIndex}
              productName={product.name}
            />
          </div>
          <div>
            <DynamicProductInfo
              product={product}
              variants={variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariantId}
              quantity={quantity}
              onQuantityChange={setQuantity}
              priceCalc={priceCalc}
              bulkTiers={bulkTiers}
              availableColors={availableColors}
              availableSizes={availableSizes}
              customizationOptions={customizationOptions}
              reviewStats={reviewStats || undefined}
              category={category}
            />
          </div>
        </div>
      </article>

      <div className="border-t border-border">
        <DynamicProductTabs
          product={product}
          customizationOptions={customizationOptions}
          reviews={reviews}
          reviewStats={reviewStats || undefined}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {relatedProducts.length > 0 && (
        <DynamicRelatedProducts
          products={relatedProducts}
          categoryName={category?.name || "Similar Products"}
        />
      )}

      <Footer />

      {/* WhatsApp FAB - positioned above sticky bar on mobile */}
      <div className="lg:bottom-6 bottom-[88px] fixed right-4 lg:right-6 z-50">
        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'd like to inquire about ${product.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group block"
        >
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <div className="relative w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </a>
      </div>

      {/* Mobile sticky CTA bar */}
      <MobileStickyBar
        pricePerUnit={priceCalc.pricePerUnit}
        productSlug={product.slug}
        isOutOfStock={isOutOfStock}
      />

      <BackToTop />
    </div>
  );
};

export default DynamicProductDetail;
