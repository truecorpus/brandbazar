const products = [
  { name: "Custom Mugs", emoji: "☕", color: "217 91% 50%" },
  { name: "T-Shirts", emoji: "👕", color: "142 71% 45%" },
  { name: "Caps & Hats", emoji: "🧢", color: "262 60% 55%" },
  { name: "Lamps", emoji: "💡", color: "36 100% 49%" },
  { name: "ID Cards", emoji: "🪪", color: "346 77% 50%" },
  { name: "Keychains", emoji: "🔑", color: "190 80% 42%" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[380px]">
      {products.map((product, i) => (
        <div
          key={product.name}
          className={`animate-fade-up stagger-${i + 1} group relative bg-background rounded-2xl border border-border p-5 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:-translate-y-1`}
          style={{ boxShadow: 'var(--shadow-sm)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `hsl(${product.color} / 0.08)` }}
          >
            <span className="text-2xl">{product.emoji}</span>
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
