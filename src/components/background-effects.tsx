import { motion } from "framer-motion";

export function BackgroundEffects() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-background">
            {/* Ambient Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>

            {/* Glowing Orb 1 - Top Left */}
            <motion.div
                animate={{
                    x: [0, 80, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[120px] mix-blend-screen dark:mix-blend-lighten"
            />

            {/* Glowing Orb 2 - Bottom Right */}
            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, -80, 0],
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-[15%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/15 blur-[140px] mix-blend-screen dark:mix-blend-lighten"
            />
            
            {/* Glowing Orb 3 - Center moving */}
            <motion.div
                animate={{
                    x: [0, 150, -150, 0],
                    y: [0, -150, 150, 0],
                    scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[35%] left-[30%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[130px] mix-blend-screen dark:mix-blend-lighten"
            />
            
            {/* Noise overlay for premium texture */}
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
}
