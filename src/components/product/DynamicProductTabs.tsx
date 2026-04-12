import { useState } from "react";
import { Star, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type CustomizationOption = Database["public"]["Tables"]["customization_options"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

interface ReviewStats {
  averageRating: number;
  totalCount: number;
  breakdown: { stars: number; count: number; percent: number }[];
}

interface Props {
  product: Product;
  customizationOptions: CustomizationOption[];
  reviews: Review[];
  reviewStats?: ReviewStats;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Specifications", "Customization", "Reviews"];

const DynamicProductTabs = ({ product, customizationOptions, reviews, reviewStats, activeTab, onTabChange }: Props) => {
  const isMobile = useIsMobile();
  const [visibleReviews, setVisibleReviews] = useState(5);

  const displayedReviews = isMobile ? reviews.slice(0, visibleReviews) : reviews;
  const hasMoreReviews = isMobile && visibleReviews < reviews.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      {/* Horizontal scroll tabs on mobile */}
      <div className="overflow-x-auto scrollbar-hide border-b border-border mb-6 lg:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-0 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 lg:px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {tab === "Reviews" && reviewStats ? ` (${reviewStats.totalCount})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div key={activeTab}>
        {activeTab === "Specifications" && (
          <div className="max-w-3xl">
            {product.long_description && (
              <div className="prose prose-sm max-w-none text-foreground mb-8">
                <p className="whitespace-pre-line">{product.long_description}</p>
              </div>
            )}
            <div className="rounded-lg border border-border overflow-hidden">
              {product.hsn_code && (
                <div className="flex items-start gap-4 px-4 lg:px-5 py-3 text-sm bg-card">
                  <span className="font-medium text-foreground w-28 lg:w-40 shrink-0">HSN Code</span>
                  <span className="text-foreground">{product.hsn_code}</span>
                </div>
              )}
              <div className="flex items-start gap-4 px-4 lg:px-5 py-3 text-sm bg-secondary">
                <span className="font-medium text-foreground w-28 lg:w-40 shrink-0">GST Rate</span>
                <span className="text-foreground">{product.gst_rate || 18}%</span>
              </div>
              <div className="flex items-start gap-4 px-4 lg:px-5 py-3 text-sm bg-card">
                <span className="font-medium text-foreground w-28 lg:w-40 shrink-0">Base Price</span>
                <span className="text-foreground">₹{product.base_price}/unit</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Customization" && (
          <div className="space-y-4 lg:space-y-6 max-w-3xl">
            {customizationOptions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No customization options available for this product yet. Contact us for custom requirements.</p>
            ) : (
              customizationOptions.map((opt) => {
                const values = Array.isArray(opt.option_values) ? opt.option_values as any[] : [];
                return (
                  <div key={opt.id} className="bg-card rounded-lg border border-border p-4 lg:p-5">
                    <h4 className="font-semibold text-sm text-foreground mb-2 lg:mb-3">
                      {opt.option_label}
                      {opt.is_required && <span className="text-destructive ml-1">*</span>}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 lg:mb-3">Type: {opt.option_type}</p>
                    <div className="space-y-2">
                      {values.map((val: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Check size={14} className="text-primary shrink-0" />
                          <span className="text-foreground">{val.label || val.value || String(val)}</span>
                          {val.extra_cost && <span className="text-muted-foreground ml-auto">+₹{val.extra_cost}/unit</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-6 lg:space-y-8">
            {reviewStats && reviewStats.totalCount > 0 ? (
              <>
                <div className="bg-card rounded-lg border border-border p-4 lg:p-6 flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                  <div className="text-center shrink-0">
                    <p className="font-semibold text-4xl lg:text-5xl text-foreground">{reviewStats.averageRating}</p>
                    <div className="flex gap-0.5 justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} className={i <= Math.round(reviewStats.averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{reviewStats.totalCount} reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {reviewStats.breakdown.map((r) => (
                      <div key={r.stars} className="flex items-center gap-2 text-xs">
                        <span className="w-6 text-right text-muted-foreground">{r.stars}★</span>
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${r.percent}%` }} />
                        </div>
                        <span className="w-8 text-muted-foreground">{r.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Single column on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {displayedReviews.map((r) => (
                    <div key={r.id} className="bg-card rounded-lg border border-border p-4 lg:p-6">
                      <div className="flex gap-0.5 mb-2 lg:mb-3">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={14} className={j < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                        ))}
                      </div>
                      {r.review_title && <p className="font-medium text-sm text-foreground mb-1">{r.review_title}</p>}
                      {r.review_body && <p className="text-sm text-muted-foreground leading-relaxed mb-3 lg:mb-4">"{r.review_body}"</p>}
                      <div className="border-t border-border pt-2 lg:pt-3 flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                        </p>
                        {r.is_verified_purchase && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-emerald-50 text-emerald-600">✓ Verified</span>
                        )}
                      </div>
                      {r.admin_response && (
                        <div className="mt-2 lg:mt-3 p-3 rounded bg-secondary text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">BrandBazaar: </span>{r.admin_response}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Load more on mobile */}
                {hasMoreReviews && (
                  <div className="text-center">
                    <Button variant="outline" onClick={() => setVisibleReviews((v) => v + 5)}>
                      Load more reviews
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 lg:py-12">
                <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this product!</p>
                <Button variant="outline">Write a Review</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicProductTabs;
