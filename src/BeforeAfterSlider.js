// src/BeforeAfterSlider.js
import React, { useRef, useState, useEffect } from "react";
import "./BeforeAfterSlider.css";

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const margin = 5; // Margin in percentage

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newSliderPosition = Math.max(
        margin,
        Math.min(100 - margin, (offsetX / rect.width) * 100)
      );
      setSliderPosition(newSliderPosition);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // handleMouseMove(e); // Update position on mouse down
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.touches[0].clientX - rect.left;
    const newSliderPosition = Math.max(
      margin,
      Math.min(100 - margin, (offsetX / rect.width) * 100)
    );
    setSliderPosition(newSliderPosition);
  };

  return (
    <div
      ref={containerRef}
      className="before-after-slider"
      onTouchMove={handleTouchMove}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      <img
        src={beforeImage}
        alt="Before"
        className="before-image"
        onDragStart={(e) => e.preventDefault()}
      />
      <img
        src={afterImage}
        alt="After"
        className="after-image"
        style={{
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
        }}
        onDragStart={(e) => e.preventDefault()}
      />
      <div
        className="slider"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
    </div>
  );
};

export default BeforeAfterSlider;
