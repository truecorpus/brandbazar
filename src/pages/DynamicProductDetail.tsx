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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: window.location.origin },
      { "@type": "ListItem", position: 2, name: "Products", item: `${window.location.origin}/shop` },
      ...(category
        ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${window.location.origin}/shop?category=${category.slug}` }]
        : []),
      { "@type": "ListItem", position: category ? 4 : 3, name: product.name },
    ],
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12">
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
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default DynamicProductDetail;
