import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export function HeroCinematicPhoto() {
  const [isPlaying] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // 3D tilt tracking on photo
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Periodic cinematic HUD glitch scan effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 380);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-sm sm:max-w-md mx-auto perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Cyber Backlight Aura */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(16,185,129,0.2) 50%, transparent 80%)",
        }}
      />

      {/* Main 3D Interactive Framed Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/80 shadow-2xl backdrop-blur-xl group"
      >
        {/* Top Cinematic Status Strip */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-slate-300 font-semibold tracking-wide">FEED_ID // SABRIN_LAL_SINGH</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>24FPS // HDR</span>
          </div>
        </div>

        {/* Video / Photo Motion Container */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
          {/* Subtle Live Cinematic CRT Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 3px, rgba(0, 0, 0, 0.4) 4px)",
            }}
          />

          {/* Animated Sweeping Radar Laser Beam */}
          <motion.div
            animate={{
              top: ["-10%", "110%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 pointer-events-none opacity-80"
          />

          {/* The High-Resolution Profile Photo with Cinematic Zoom & Breathing Animation */}
          <motion.img
            src="/images/profile.webp"
            alt="Sabrin Lal Singh — Senior Data QA & Analytics Engineer"
            className="w-full h-full object-cover object-top transition-transform duration-700"
            initial={{ scale: 1.15, filter: "contrast(1.08) brightness(0.95)" }}
            animate={{
              scale: isPlaying ? [1.02, 1.05, 1.02] : 1.02,
              filter: glitchActive
                ? "contrast(1.4) brightness(1.15) hue-rotate(15deg)"
                : "contrast(1.08) brightness(0.98)",
            }}
            transition={{
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              filter: { duration: 0.2 },
            }}
            loading="eager"
            decoding="async"
          />

          {/* Vignette & Contrast Depth Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10 pointer-events-none" />

          {/* Interactive HUD Corner Reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 z-20 pointer-events-none" />

          {/* Bottom Overlay Telemetry Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-2.5 rounded-lg bg-slate-950/85 border border-slate-800/90 backdrop-blur-md font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-semibold">ENGINEERING_LEAD</span>
            </div>
            <span className="text-cyan-400 text-[11px]">9+ YRS PROD</span>
          </div>
        </div>

        {/* Live Playback Indicator Bar */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Play className="w-3 h-3 fill-emerald-400 animate-pulse" />
            <span>LIVE_TELEMETRY_ONLINE</span>
          </div>
          <span className="text-slate-500">KATHMANDU, NP</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
