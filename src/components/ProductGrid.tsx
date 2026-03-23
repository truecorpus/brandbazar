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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
      {products.map((product, i) => (
        <div
          key={product.name}
          className={`animate-fade-up stagger-${i + 1} card-modern group p-6 flex flex-col items-center gap-3 cursor-pointer`}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/[0.06] flex items-center justify-center group-hover:bg-primary/[0.12] transition-colors duration-300">
            <span className="text-2xl">{product.emoji}</span>
          </div>
          <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
            {product.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
