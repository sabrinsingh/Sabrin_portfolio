import type { Variants } from "framer-motion";

/** Shared entrance variants for staggered groups (kept out of component files
 *  so fast-refresh stays clean). */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};
