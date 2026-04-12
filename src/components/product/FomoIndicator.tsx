import { useEffect, useState } from "react";

const FomoIndicator = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setVisible(hour >= 9 && hour < 21);
  }, []);

  if (!visible) return null;

  // Generate a stable-ish "realistic" number based on current date
  const viewCount = 8 + (new Date().getDate() % 9); // 8-16

  return (
    <p className="text-xs italic text-muted-foreground">
      🔥 {viewCount} people have viewed this product today
    </p>
  );
};

export default FomoIndicator;
