import { Skeleton } from "@/components/ui/skeleton";

const ProductPageSkeleton = () => (
  <div className="space-y-8 pb-12">
    <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12">
      {/* Gallery skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-md" />
          ))}
        </div>
      </div>

      {/* Info skeleton */}
      <div className="space-y-5">
        {/* Breadcrumb */}
        <Skeleton className="h-4 w-48" />
        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-[60%]" />
          <Skeleton className="h-8 w-[40%]" />
        </div>
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        {/* Rating */}
        <Skeleton className="h-4 w-40" />
        {/* Pricing box */}
        <Skeleton className="h-52 w-full rounded-lg" />
        {/* Options */}
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        {/* CTA */}
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>

    {/* Tabs skeleton */}
    <div className="border-t border-border pt-8">
      <div className="flex gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default ProductPageSkeleton;
