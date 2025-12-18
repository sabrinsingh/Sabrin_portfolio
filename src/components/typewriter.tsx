import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string[];
    speed?: number;
    waitTime?: number;
    deleteSpeed?: number;
}

export function Typewriter({
    text,
    speed = 100,
    waitTime = 2000,
    deleteSpeed = 50
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % text.length;
            const fullText = text[i];

            setDisplayedText(
                isDeleting
                    ? fullText.substring(0, displayedText.length - 1)
                    : fullText.substring(0, displayedText.length + 1)
            );

            // Typing speed logic
            setTypingSpeed(isDeleting ? deleteSpeed : speed);

            if (!isDeleting && displayedText === fullText) {
                // Finished typing line, wait before deleting
                setTimeout(() => setIsDeleting(true), waitTime);
            } else if (isDeleting && displayedText === "") {
                // Finished deleting, move to next line
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, text, speed, waitTime, deleteSpeed, typingSpeed]);

    return (
        <span className="inline-block min-w-[20ch] text-left">
            {displayedText}
            <span className="animate-pulse">|</span>
        </span>
    );
}
