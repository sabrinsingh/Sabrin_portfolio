import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

export function HeroCinematicPhoto() {
  // Ultra-smooth, subtle 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mx-auto select-none"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft, High-End Ambient Halo (Subtle warm/cyan depth instead of harsh neon) */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Main Framed Card with 3D Spring Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 bg-slate-900/40 shadow-2xl transition-colors duration-300 backdrop-blur-sm"
      >
        {/* Photo Container: Clean 1:1 Aspect Ratio matching the 800x800 portrait */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
          <motion.img
            src="/images/profile.webp"
            alt="Sabrin Lal Singh — Lead Data Analytics & Quality Engineer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="eager"
            decoding="async"
          />

          {/* Elegant bottom gradient fade for contrast with overlay pill */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating Minimalist Status Pill */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:translate-y-[-2px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-100 truncate">
                  Sabrin Lal Singh
                </p>
                <p className="text-[11px] font-mono text-slate-400 truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0 inline" />
                  Kathmandu, Nepal
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right pl-3 border-l border-slate-800/80 font-mono text-[10px] text-emerald-400">
              <span className="block font-semibold">LEAD ARCHITECT</span>
              <span className="text-slate-400">9+ YRS PROD</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
