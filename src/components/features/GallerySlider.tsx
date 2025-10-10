import { useEffect, useRef, useState } from "react";

const GallerySlider = () => {
  const originals = [
    "/images/header/gallery-1.png",
    "/images/header/gallery-2.png",
    "/images/header/gallery-3.png",
  ];

  const images = [...originals, ...originals, ...originals];
  const realLen = originals.length;

  const [index, setIndex] = useState(realLen);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const transitionRef = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const resettingRef = useRef(false);

  const SLIDE_W = 900;
  const GAP = 20; 

  useEffect(() => {
    autoplayRef.current = window.setInterval(() => setIndex((i) => i + 1), 3000);

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      if (transitionRef.current) window.clearTimeout(transitionRef.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const totalSlideW = SLIDE_W + GAP;
    const centerOffset = -index * totalSlideW + (window.innerWidth / 2 - SLIDE_W / 2);

    el.style.transition = resettingRef.current ? "none" : "transform 600ms ease";
    el.style.transform = `translateX(${centerOffset}px)`;

    if (!resettingRef.current) {
      if (index >= realLen * 2) {
        if (transitionRef.current) window.clearTimeout(transitionRef.current);
        transitionRef.current = window.setTimeout(() => {
          // perform reset to keep us in the middle copy
          resettingRef.current = true;
          const resetIndex = index - realLen;
          const resetOffset = -resetIndex * totalSlideW + (window.innerWidth / 2 - SLIDE_W / 2);
          el.style.transition = "none";
          el.style.transform = `translateX(${resetOffset}px)`;
          setIndex(resetIndex);
          window.setTimeout(() => (resettingRef.current = false), 50);
        }, 650);
      }
      if (index < realLen) {
        if (transitionRef.current) window.clearTimeout(transitionRef.current);
        transitionRef.current = window.setTimeout(() => {
          resettingRef.current = true;
          const resetIndex = index + realLen;
          const resetOffset = -resetIndex * totalSlideW + (window.innerWidth / 2 - SLIDE_W / 2);
          el.style.transition = "none";
          el.style.transform = `translateX(${resetOffset}px)`;
          setIndex(resetIndex);
          window.setTimeout(() => (resettingRef.current = false), 50);
        }, 650);
      }
    }
  }, [index, realLen]);

  useEffect(() => {
    const onResize = () => {
      const el = containerRef.current;
      if (!el) return;
      const totalSlideW = SLIDE_W + GAP;
      const centerOffset = -index * totalSlideW + (window.innerWidth / 2 - SLIDE_W / 2);
      el.style.transition = "none";
      el.style.transform = `translateX(${centerOffset}px)`;
      window.setTimeout(() => (el.style.transition = "transform 600ms ease"), 20);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  return (
    <div className="relative w-full" style={{ height: 500 }}>
      <div
        ref={containerRef}
        className="absolute left-0 top-0 flex items-center"
        style={{ height: 500, gap: GAP }}
      >
        {images.map((src, i) => {
          // const isActive = i === index;
          // const height = isActive ? 500 : 480;
          // const opacity = isActive ? 1 : 0.9;
          return (
            <div
              key={i + "-slide"}
              className="flex-shrink-0 flex items-center justify-center"
              // apply opacity to the wrapper so it transitions together with height
              style={{ width: SLIDE_W, transition: "height 600ms ease, opacity 600ms ease" }}
            >
              <img
                src={src}
                alt={`gallery-${i}`}
                className="object-cover"
                // image itself keeps width/height but opacity/height transitions are handled by wrapper
                style={{ width: SLIDE_W }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GallerySlider;
