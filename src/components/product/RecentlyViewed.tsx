import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RecentItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  categorySlug?: string;
}

const STORAGE_KEY = "bb_recently_viewed";
const MAX_ITEMS = 10;

export function trackRecentlyViewed(item: RecentItem) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentItem[];
    const filtered = stored.filter((s) => s.id !== item.id);
    filtered.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

interface Props {
  currentProductId: string;
}

const RecentlyViewed = ({ currentProductId }: Props) => {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentItem[];
      setItems(stored.filter((s) => s.id !== currentProductId).slice(0, 6));
    } catch {}
  }, [currentProductId]);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-5">Recently Viewed</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.categorySlug || "_"}/${item.slug}`}
              className="shrink-0 w-[160px] lg:w-[200px] snap-start bg-card rounded-lg border border-border p-3 flex flex-col transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="w-full h-24 lg:h-28 rounded bg-secondary overflow-hidden flex items-center justify-center mb-2">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" loading="lazy" />
                ) : (
                  <span className="text-muted-foreground text-xs">No image</span>
                )}
              </div>
              <p className="text-xs font-medium text-foreground line-clamp-2 mb-1">{item.name}</p>
              <p className="text-xs font-semibold text-foreground">From ₹{item.price}/unit</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
