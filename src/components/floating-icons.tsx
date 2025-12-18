import { motion } from "framer-motion";

const icons = [
    { emoji: "📊", delay: 0 },
    { emoji: "🔧", delay: 0.5 },
    { emoji: "☁️", delay: 1 },
    { emoji: "⚡", delay: 1.5 },
    { emoji: "🔒", delay: 2 },
    { emoji: "📈", delay: 2.5 },
];

export function FloatingIcons() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
            {icons.map((icon, index) => (
                <motion.div
                    key={index}
                    className="absolute text-3xl opacity-20"
                    initial={{
                        x: `${10 + (index * 15)}%`,
                        y: "110%",
                    }}
                    animate={{
                        y: "-10%",
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        y: {
                            repeat: Infinity,
                            duration: 15 + index * 2,
                            delay: icon.delay,
                            ease: "linear",
                        },
                        rotate: {
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                        },
                    }}
                >
                    {icon.emoji}
                </motion.div>
            ))}
        </div>
    );
}
