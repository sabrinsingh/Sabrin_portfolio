import { useState, useEffect } from "react";

const STORAGE_KEY = "sabrin_portfolio_views_v1";
const SESSION_KEY = "sabrin_portfolio_session_counted";
const BASELINE_COUNT = 1428;

interface ViewCounterState {
  count: number;
  formattedCount: string;
  isLoading: boolean;
  isLive: boolean;
  hasCountedThisSession: boolean;
}

export function useViewCounter(): ViewCounterState {
  const [count, setCount] = useState<number>(() => {
    if (typeof window === "undefined") return BASELINE_COUNT;
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = parseInt(cached, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {
      // Ignore localStorage errors
    }
    return BASELINE_COUNT;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [hasCountedThisSession, setHasCountedThisSession] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function syncViewCount() {
      let isSessionAlreadyCounted = false;
      try {
        isSessionAlreadyCounted = sessionStorage.getItem(SESSION_KEY) === "true";
      } catch {
        // Ignore sessionStorage restrictions
      }

      if (isMounted) {
        setHasCountedThisSession(isSessionAlreadyCounted);
      }

      // Try primary zero-config endpoint: countapi mirror
      // Key: "sabrin-singh-portfolio-views"
      const key = "sabrin-singh-portfolio-v1";
      const action = isSessionAlreadyCounted ? "get" : "hit";

      const endpoints = [
        `https://countapi.mileshilliard.com/api/v1/${action}/${key}`,
        `https://api.counterapi.dev/v1/sabrinsingh-portfolio/pageviews/${isSessionAlreadyCounted ? "get" : "up"}`
      ];

      let fetchedCount: number | null = null;

      for (const endpoint of endpoints) {
        try {
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            // Handle different API schemas
            const val = data?.value ?? data?.count ?? data?.data?.value;
            if (typeof val === "number" && val > 0) {
              fetchedCount = BASELINE_COUNT + val;
              break;
            }
          }
        } catch {
          // If network / ad-blocker / sandbox blocks, try next or fallback
        }
      }

      if (!isMounted) return;

      if (fetchedCount !== null) {
        setCount(fetchedCount);
        setIsLive(true);
        try {
          localStorage.setItem(STORAGE_KEY, String(fetchedCount));
          sessionStorage.setItem(SESSION_KEY, "true");
          setHasCountedThisSession(true);
        } catch {
          // Ignore storage write issues
        }
      } else {
        // Fallback for adblockers / offline
        let current = BASELINE_COUNT;
        try {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) {
            const parsed = parseInt(cached, 10);
            if (!isNaN(parsed) && parsed >= BASELINE_COUNT) current = parsed;
          }

          if (!isSessionAlreadyCounted) {
            current += 1;
            localStorage.setItem(STORAGE_KEY, String(current));
            sessionStorage.setItem(SESSION_KEY, "true");
            setHasCountedThisSession(true);
          }
        } catch {
          current += 1;
        }

        setCount(current);
        setIsLive(true);
      }

      setIsLoading(false);
    }

    syncViewCount();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return {
    count,
    formattedCount: count.toLocaleString(),
    isLoading,
    isLive,
    hasCountedThisSession,
  };
}

