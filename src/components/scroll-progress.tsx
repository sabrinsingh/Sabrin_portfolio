import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] progress-gradient origin-left z-[100]"
            style={{ scaleX, boxShadow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.3)" }}
        />
    );
}
