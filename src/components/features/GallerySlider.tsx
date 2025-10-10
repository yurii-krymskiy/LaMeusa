
import { useEffect, useMemo, useRef, useState, type TransitionEvent } from "react";

// Automatic infinite slider with center-focused active slide.
// - Active slide: w-[900px] h-[500px]
// - Inactive slides: h-[420px] and opacity 0.9 (width kept 900 to stabilize layout)
// - Smooth transitions; side slides are partially visible in the viewport
const GallerySlider = () => {
  // Config (px)
  const SLIDE_WIDTH = 900; // matches w-[900px]
  const GAP = 24; // Tailwind gap-6 (1.5rem)
  const AUTOPLAY_MS = 3000; // change slide every 3s
  const TRANSITION_MS = 600; // slide animation duration

  const slides = useMemo(
    () => [
      { src: "/images/header/gallery-1.png", alt: "Gallery image 1" },
      { src: "/images/header/gallery-2.png", alt: "Gallery image 2" },
      { src: "/images/header/gallery-3.png", alt: "Gallery image 3" },
    ],
    []
  );

  // Duplicate slides to allow seamless infinite looping
  const extendedSlides = useMemo(
    () => [...slides, ...slides, ...slides],
    [slides]
  );

  const baseIndex = slides.length; // start at the middle copy
  const [index, setIndex] = useState(baseIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [viewportWidth, setViewportWidth] = useState<number>(1200); // default; will measure
  const isSlidingRef = useRef(false);
  const [isJumping, setIsJumping] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Measure viewport width to compute centering offset and allow partial neighbors to peek
  useEffect(() => {
    const measure = () => {
      const w = viewportRef.current?.clientWidth ?? 1200;
      setViewportWidth(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Autoplay
  useEffect(() => {
    const id = window.setInterval(() => {
      if (isSlidingRef.current) return;
      isSlidingRef.current = true;
      setIndex((prev) => prev + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, []);

  // When transition ends and we've entered the third copy, jump back by one copy without animation.
  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    // Only handle the container's transform transition, ignore bubbled image transitions
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;
    const copyLen = slides.length;
    if (index >= copyLen * 2) {
      // Moved into the last copy; jump back by one copy
      setIsTransitioning(false);
      setIsJumping(true);
      setIndex((prev) => prev - copyLen);
      // Re-enable transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setIsJumping(false);
          isSlidingRef.current = false;
        });
      });
    } else if (index < copyLen) {
      // If moving backwards were added, handle opposite jump
      setIsTransitioning(false);
      setIsJumping(true);
      setIndex((prev) => prev + copyLen);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setIsJumping(false);
          isSlidingRef.current = false;
        });
      });
    } else {
      isSlidingRef.current = false;
    }
  };

  // Compute transform to keep active slide centered inside viewport
  const itemStride = SLIDE_WIDTH + GAP; // width plus gap between items
  const centerOffset = (viewportWidth - SLIDE_WIDTH) / 2;
  const translateX = -(index * itemStride) + centerOffset;

  return (
    <div className="w-full flex justify-center">
      {/* Viewport defines how much of neighbors is visible; tweak max-w to change peeking amount */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
      >
        <div
          className="flex items-center"
          style={{
            gap: `${GAP}px`,
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning
              ? `transform ${TRANSITION_MS}ms ease`
              : "none",
            willChange: "transform",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, i) => {
            const isActive = i === index;
            const imgDurationClass = isJumping ? "duration-0" : "duration-500";
            return (
              <div
                key={`${slide.src}-${i}`}
                className="flex-shrink-0"
                style={{ width: SLIDE_WIDTH, height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className={[
                    "w-[900px] h-[500px] object-cover select-none",
                    "transition-all ease-in-out",
                    imgDurationClass,
                    isActive ? "opacity-100 scale-y-100" : "opacity-90 scale-y-[0.84]",
                  ].join(" ")}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
