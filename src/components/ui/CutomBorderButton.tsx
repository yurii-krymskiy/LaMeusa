import React from "react";

const CutomBorderButton = ({ text, className, variant }: { text: string, className: string, variant: "blue" | "white" }) => {
  return (
    <button
      style={{
        border: variant === "blue" ? "2px solid #2E3E7B" : "2px solid #FFFFFF",
        color: variant === "blue" ? "#2E3E7B" : "#FFFFFF"
      }}
      className={`outline-none title cursor-pointer uppercase font-bold ${className} transition duration-200 ease-in-out hover:scale-105 active:scale-95`}
    >
      {text}
    </button>
  );
};

export default CutomBorderButton;
