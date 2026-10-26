import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Hero backdrop: a quiet schematic of a data pipeline.
 *
 * Hairline lanes run across the hero and a single luminous packet travels each
 * one. Everything is transform/opacity driven and fully decorative
 * (`aria-hidden`), so it never competes with the copy or the reading order.
 */

interface Lane {
    top: string;
    left: string;
    width: string;
    duration: number;
    delay: number;
}

const LANES: Lane[] = [
    { top: "21%", left: "3%", width: "44%", duration: 9, delay: 0 },
    { top: "33%", left: "28%", width: "60%", duration: 12, delay: 1.8 },
    { top: "46%", left: "6%", width: "34%", duration: 8, delay: 3.4 },
    { top: "57%", left: "44%", width: "50%", duration: 11, delay: 0.9 },
    { top: "70%", left: "10%", width: "54%", duration: 10, delay: 2.6 },
    { top: "83%", left: "36%", width: "46%", duration: 13, delay: 4.2 },
];

/** Junction diamonds sitting on the lanes, breathing slowly. */
const NODES = [
    { top: "21%", left: "47%" },
    { top: "33%", left: "28%" },
    { top: "46%", left: "40%" },
    { top: "57%", left: "94%" },
    { top: "70%", left: "64%" },
    { top: "83%", left: "36%" },
    { top: "46%", left: "6%" },
    { top: "70%", left: "10%" },
];

/** Short vertical drops that tie lanes together into one graph. */
const RISERS = [
    { top: "21%", left: "47%", height: "12%" },
    { top: "46%", left: "40%", height: "11%" },
    { top: "70%", left: "64%", height: "13%" },
];

export function HeroFlow() {
    const reduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : 80]);
    const fade = useTransform(scrollY, [0, 700], [1, reduceMotion ? 1 : 0.15]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Structured technical grid — the site's recurring visual motif */}
            <div className="grid-motif grid-motif-fade absolute inset-0" />

            <motion.div
                style={{ y, opacity: fade }}
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(ellipse 100% 85% at 65% 45%, #000 25%, transparent 80%)",
                        maskImage:
                            "radial-gradient(ellipse 100% 85% at 65% 45%, #000 25%, transparent 80%)",
                    }}
                >
                    {RISERS.map((r, i) => (
                        <div
                            key={`r-${i}`}
                            className="absolute"
                            style={{
                                top: r.top,
                                left: r.left,
                                height: r.height,
                                borderLeft: "1px solid hsl(var(--hairline) / 0.9)",
                            }}
                        />
                    ))}

                    {LANES.map((lane, i) => (
                        <div
                            key={`lane-${i}`}
                            className="flow-lane"
                            style={{
                                top: lane.top,
                                left: lane.left,
                                width: lane.width,
                            }}
                        >
                            <span
                                className="flow-packet"
                                style={{
                                    animationDuration: `${lane.duration}s`,
                                    animationDelay: `${lane.delay}s`,
                                }}
                            />
                        </div>
                    ))}

                    {NODES.map((node, i) => (
                        <span
                            key={`node-${i}`}
                            className="flow-node"
                            style={{
                                top: node.top,
                                left: node.left,
                                animationDelay: `${i * 0.55}s`,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
