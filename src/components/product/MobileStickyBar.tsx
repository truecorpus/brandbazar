import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  pricePerUnit: number;
  productSlug: string;
  isOutOfStock: boolean;
}

const MobileStickyBar = ({ pricePerUnit, productSlug, isOutOfStock }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border h-[72px] px-4 flex items-center justify-between lg:hidden"
      style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.06)" }}
    >
      <div className="shrink-0">
        <p className="text-lg font-semibold text-foreground">₹{pricePerUnit.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted-foreground">/unit</span></p>
      </div>
      {isOutOfStock ? (
        <Button variant="outline" className="ml-4 flex-1 max-w-[60%] h-11 rounded-lg text-sm font-medium">
          Notify Me
        </Button>
      ) : (
        <Link to={`/customize/${productSlug}`} className="ml-4 flex-1 max-w-[60%]">
          <Button className="w-full h-11 rounded-lg text-sm font-medium bg-primary hover:bg-primary/90">
            Customize & Quote
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MobileStickyBar;
