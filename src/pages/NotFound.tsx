import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, ShoppingBag, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <SEOHead title="Page Not Found — BrandBazaar" description="The page you're looking for doesn't exist." noindex />
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-primary/[0.06] border border-primary/[0.12] flex items-center justify-center">
          <span className="text-6xl font-heading font-bold text-primary/40">404</span>
        </div>

        <h1 className="text-2xl font-heading font-semibold text-foreground mb-3">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The page <code className="px-1.5 py-0.5 bg-background rounded text-xs border border-border">{location.pathname}</code> doesn't exist.
          It may have been moved or the link might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home size={16} />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">
              <ShoppingBag size={16} />
              Browse Products
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help? <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Contact us <ArrowRight size={10} /></a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
