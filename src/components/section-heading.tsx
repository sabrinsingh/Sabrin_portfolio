import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

interface SectionHeadingProps {
    /** Two-digit position in the narrative, e.g. "01". */
    index: string;
    eyebrow: string;
    title: ReactNode;
    description?: string;
    /** Extra content rendered on the right of the heading rule. */
    aside?: ReactNode;
}

/**
 * The one consistent device that stitches the sections together:
 * index + eyebrow, a hairline that runs to the edge, then the headline.
 * Sections vary around this constant — they do not vary the constant.
 */
export function SectionHeading({
    index,
    eyebrow,
    title,
    description,
    aside,
}: SectionHeadingProps) {
    return (
        <Reveal className="mb-10 md:mb-14" amount={0.4}>
            <div className="flex items-center gap-4">
                <span className="eyebrow shrink-0">{index}</span>
                <span className="eyebrow shrink-0">{eyebrow}</span>
                <span
                    className="h-px flex-1"
                    style={{ background: "hsl(var(--hairline))" }}
                    aria-hidden="true"
                />
                {aside ? (
                    <span className="hidden sm:inline shrink-0">{aside}</span>
                ) : null}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-10">
                <h2 className="lg:col-span-7 text-editorial text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem] text-foreground">
                    {title}
                </h2>
                {description ? (
                    <p className="lg:col-span-5 self-end text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>
        </Reveal>
    );
}
