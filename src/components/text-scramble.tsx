import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEF0123456789_<>[]{}*#+=~$";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
}

export function TextScramble({ text, className = "", trigger = true, speed = 25 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        hasAnimated.current = true;
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return (
    <span ref={elementRef} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
}
