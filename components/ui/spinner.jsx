import React from "react";

export function Spinner({ className = "", size = 32, color = "#FFE353" }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
      style={{ width: size, height: size, color }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
} 