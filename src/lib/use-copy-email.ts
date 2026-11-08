import { useCallback, useEffect, useRef, useState } from "react";

export const CONTACT_EMAIL = "sabrinlalsingh@gmail.com";

/**
 * Copy-to-clipboard with a self-resetting confirmation state.
 * Falls back to opening the mail client when the clipboard API is blocked.
 */
export function useCopyEmail() {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = `mailto:${CONTACT_EMAIL}`;
        }
    }, []);

    return { copied, copy, email: CONTACT_EMAIL };
}
