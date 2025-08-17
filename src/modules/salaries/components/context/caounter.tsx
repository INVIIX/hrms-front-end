import React, { useEffect, useState } from "react";

type CounterProps = {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
  format?: (val: number) => string;
  isPercentage?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1000,
  decimals = 1,
  className,
  format,
  isPercentage = false,
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    let frame: number;

    function animate() {
      start += increment;
      if (start < value) {
        setDisplay(start);
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  let formatted: string;
  if (format) {
    formatted = format(Number(display.toFixed(decimals)));
  } else if (isPercentage) {
    formatted = `${display.toFixed(decimals)}%`;
  } else {
    formatted = display.toLocaleString("id-ID", {
      maximumFractionDigits: decimals,
    });
  }

  return <span className={className}>{formatted}</span>;
};

export default Counter;
