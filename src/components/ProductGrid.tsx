const products = [
  { name: "Custom Mugs", emoji: "☕", delay: "animate-float" },
  { name: "T-Shirts", emoji: "👕", delay: "animate-float-delayed" },
  { name: "Caps & Hats", emoji: "🧢", delay: "animate-float" },
  { name: "Lamps", emoji: "💡", delay: "animate-float-delayed" },
  { name: "ID Cards", emoji: "🪪", delay: "animate-float" },
  { name: "Keychains", emoji: "🔑", delay: "animate-float-delayed" },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
      {products.map((product, i) => (
        <div
          key={product.name}
          className={`${product.delay} animate-fade-up stagger-${i + 1} group relative bg-surface-elevated rounded-xl border border-border p-6 flex flex-col items-center gap-3 shadow-brand hover:shadow-brand-lg hover:border-accent/30 transition-all duration-300 cursor-pointer`}
        >
          <span className="text-4xl">{product.emoji}</span>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors font-body text-center">
            {product.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
