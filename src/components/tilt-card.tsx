import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (max 10 degrees)
        const maxRotation = 10;
        const rotateYValue = (mouseX / (rect.width / 2)) * maxRotation;
        const rotateXValue = -(mouseY / (rect.height / 2)) * maxRotation;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{
                rotateX,
                rotateY,
                scale: isHovered ? 1.02 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {/* Glare effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                animate={{
                    background: isHovered
                        ? `linear-gradient(${135 + rotateY * 5}deg, rgba(255,255,255,0.1) 0%, transparent 50%)`
                        : "transparent",
                }}
                transition={{ duration: 0.2 }}
            />
            {children}
        </motion.div>
    );
}
