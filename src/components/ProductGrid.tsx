const products = [
  { name: "Custom Mugs", emoji: "☕" },
  { name: "T-Shirts", emoji: "👕" },
  { name: "Caps & Hats", emoji: "🧢" },
  { name: "Lamps", emoji: "💡" },
  { name: "ID Cards", emoji: "🪪" },
  { name: "Keychains", emoji: "🔑" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
      {products.map((product, i) => (
        <div
          key={product.name}
          className={`animate-fade-up stagger-${i + 1} group bg-background rounded-xl border border-border p-5 flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer hover:border-primary hover:shadow-[0_2px_8px_rgba(26,115,232,0.15)]`}
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <span className="text-3xl">{product.emoji}</span>
          <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
            {product.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
