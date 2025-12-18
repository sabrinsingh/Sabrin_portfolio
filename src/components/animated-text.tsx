import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
    text: string;
    className?: string;
    once?: boolean;
}

export function AnimatedText({ text, className = "", once = true }: AnimatedTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const words = text.split(" ");

    return (
        <span ref={ref} className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut",
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

export function GlowingText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="absolute inset-0 blur-xl bg-gradient-to-r from-primary/50 to-teal-400/50 opacity-50" />
            <span className="relative">{children}</span>
        </span>
    );
}
