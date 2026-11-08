import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointers (desktop mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [role='button'], .spotlight-card");
      setIsPointer(!!interactive);

      const dataCursor = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setCursorText(dataCursor || "");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer Follower Ring / Glow */}
      <motion.div
        className="absolute top-0 left-0 rounded-full flex items-center justify-center font-mono font-bold text-[9px] uppercase tracking-wider backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 64 : isPointer ? 36 : 20,
          height: cursorText ? 64 : isPointer ? 36 : 20,
          backgroundColor: isPointer
            ? "rgba(34, 211, 238, 0.12)"
            : "rgba(255, 255, 255, 0.03)",
          borderColor: isPointer
            ? "rgba(34, 211, 238, 0.6)"
            : "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorText && (
          <span className="text-cyan-300 drop-shadow-sm select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}

