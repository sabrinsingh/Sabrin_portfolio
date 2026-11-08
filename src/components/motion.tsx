import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Single source of truth for entrance choreography.
 *
 * Reveals run on transform + opacity only, fire once, and never gate
 * readability: content is rendered immediately and merely offset until it
 * scrolls into view. Under `prefers-reduced-motion` the wrapper renders its
 * children statically with no animation at all.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealTag = "div" | "section" | "article" | "li" | "p" | "span" | "figure";

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  figure: motion.figure,
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Vertical offset in px. */
  y?: number;
  duration?: number;
  /** How much of the element must be visible before it triggers. */
  amount?: number;
  as?: RevealTag;
  id?: string;
  style?: CSSProperties;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.7,
  amount = 0.2,
  as = "div",
  id,
  style,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = TAGS[as];

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} id={id} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
