import type { IconType } from "react-icons";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { certifications } from "@/data/portfolio";

interface Group {
    issuer: string;
    items: { name: string; year: string; icon: IconType }[];
}

/** Grouped by issuer — a credential wall reads better than twelve equal tiles. */
const groups: Group[] = Object.values(
    certifications.reduce<Record<string, Group>>((acc, cert) => {
        const key = cert.issuer;
        if (!acc[key]) acc[key] = { issuer: key, items: [] };
        acc[key].items.push({ name: cert.name, year: cert.year, icon: cert.icon });
        return acc;
    }, {}),
).sort((a, b) => b.items.length - a.items.length);

export function Credentials() {
    return (
        <section
            id="certifications"
            className="surface-tint border-y py-16 md:py-24"
            style={{ borderColor: "hsl(var(--hairline))" }}
        >
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="07"
                    eyebrow="Credentials"
                    title={
                        <>
                            Twelve certifications,{" "}
                            <em className="text-editorial-italic text-primary">six</em>{" "}
                            issuers.
                        </>
                    }
                    description="Databricks, IBM, Microsoft, Snowflake, Oracle and Coursera — grouped by who signed them."
                />

                <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {groups.map((group, i) => {
                        const Icon = group.items[0].icon;
                        return (
                            <Reveal key={group.issuer} delay={(i % 3) * 0.06} y={16}>
                                <div className="flex items-baseline justify-between gap-3 border-b pb-2" style={{ borderColor: "hsl(var(--hairline))" }}>
                                    <span
                                        className="eyebrow flex items-center gap-2"
                                        style={{ color: "hsl(var(--foreground))" }}
                                    >
                                        <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                                        {group.issuer}
                                    </span>
                                    <span className="font-mono text-[11px] text-muted-foreground">
                                        ×{group.items.length}
                                    </span>
                                </div>

                                <ul className="mt-3 space-y-2.5">
                                    {group.items.map((cert) => (
                                        <li
                                            key={cert.name}
                                            className="flex items-baseline justify-between gap-3 text-sm leading-snug"
                                        >
                                            <span className="text-foreground/85">{cert.name}</span>
                                            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                                                {cert.year}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
