import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate rapid loading (400-800ms)
        const duration = 600;
        const interval = 20;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress(Math.min((currentStep / steps) * 100, 100));
            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 150); // slight delay after 100%
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "circIn" }}
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            >
                <div className="w-full max-w-sm px-6 flex flex-col gap-4">
                    <div className="flex justify-between items-end font-mono text-xs text-muted-foreground uppercase tracking-widest">
                        <span>SLS | INITIALIZING</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    
                    <div className="h-0.5 w-full bg-secondary overflow-hidden rounded-full">
                        <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    
                    <div className="flex gap-2 font-mono text-[10px] text-muted-foreground/60">
                        <span className={progress > 10 ? "text-primary" : ""}>DATA</span> /
                        <span className={progress > 50 ? "text-primary" : ""}>QUALITY</span> /
                        <span className={progress > 80 ? "text-primary" : ""}>ENGINEERING</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
