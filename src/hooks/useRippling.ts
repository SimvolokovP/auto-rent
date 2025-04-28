import { useState } from "react";

export const useRippling = () => {
  const [{ x, y }, setCoordinates] = useState({ x: -1, y: -1 });

  const isRippling = x !== -1 && y !== -1;

  const handleRippleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCoordinates({
      x: e.clientX - left,
      y: e.clientY - top,
    });

    setTimeout(() => {
      setCoordinates({ x: -1, y: -1 });
    }, 300);
  };

  return {
    x,
    y,
    handleRippleOnClick,
    isRippling,
  };
};
