import { mug, tshirt, cap, lamp, idcard, keychain } from "@/assets/products";

const products = [
  { name: "Custom Mugs", image: mug, color: "217 91% 50%" },
  { name: "T-Shirts", image: tshirt, color: "142 71% 45%" },
  { name: "Caps & Hats", image: cap, color: "262 60% 55%" },
  { name: "Lamps", image: lamp, color: "36 100% 49%" },
  { name: "ID Cards", image: idcard, color: "346 77% 50%" },
  { name: "Keychains", image: keychain, color: "190 80% 42%" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[380px]">
      {products.map((product, i) => (
        <div
          key={product.name}
          className={`animate-fade-up stagger-${i + 1} group relative bg-background rounded-2xl border border-border p-4 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:-translate-y-1`}
          style={{ boxShadow: 'var(--shadow-sm)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              width={64}
              height={64}
            />
          </div>
          <span className="text-[12px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
            {product.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
