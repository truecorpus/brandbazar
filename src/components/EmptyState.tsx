import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, FileText, Bell, MapPin, Image, Star, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  type?: "orders" | "products" | "quotes" | "notifications" | "addresses" | "artwork" | "reviews" | "returns";
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const iconMap = {
  orders: ShoppingCart,
  products: Package,
  quotes: FileText,
  notifications: Bell,
  addresses: MapPin,
  artwork: Image,
  reviews: Star,
  returns: RotateCcw,
};

const EmptyState = ({ icon, type, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) => {
  const IconComponent = type ? iconMap[type] : null;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6">
        {icon || (IconComponent && <IconComponent className="w-8 h-8 text-muted-foreground" />)}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionLabel && (actionHref ? (
        <Button asChild>
          <Link to={actionHref}>{actionLabel}</Link>
        </Button>
      ) : onAction ? (
        <Button onClick={onAction}>{actionLabel}</Button>
      ) : null)}
    </div>
  );
};

export default EmptyState;
