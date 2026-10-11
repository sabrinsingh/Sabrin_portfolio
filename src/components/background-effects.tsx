import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

interface AuroraField {
    baseX: number;
    baseY: number;
    radiusX: number;
    radiusY: number;
    speedX: number;
    speedY: number;
    phaseX: number;
    phaseY: number;
    rgb: [number, number, number];
    alpha: number;
}

interface ConstellationNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    baseAlpha: number;
    phase: number;
    neighbors: number[];
}

interface DataPacket {
    fromIndex: number;
    toIndex: number;
    progress: number;
    speed: number;
    size: number;
    alpha: number;
}

export function BackgroundEffects() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { theme } = useTheme();
    const isDarkRef = useRef(true);
    const mousePosRef = useRef({ x: 0.5, y: 0.3, active: false });
    const smoothMouseRef = useRef({ x: 0.5, y: 0.3 });

    useEffect(() => {
        const root = document.documentElement;
        isDarkRef.current =
            theme === "dark" ||
            (theme === "system" && root.classList.contains("dark")) ||
            (theme !== "light" && root.classList.contains("dark"));
        if (theme === "light") isDarkRef.current = false;
        if (theme === "dark") isDarkRef.current = true;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let prefersReducedMotion = motionQuery.matches;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const isLowPower =
            "connection" in navigator &&
            Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

        let width = window.innerWidth;
        let height = window.innerHeight;
        let scrollY = window.scrollY;
        let dpr = 1;
        let rafId = 0;
        let isRunning = !document.hidden;
        let lastFrameTime = 0;
        const targetFpsInterval = isCoarse || isLowPower ? 1000 / 30 : 1000 / 60;

        // 6 Multi-octave floating energy fields
        const fields: AuroraField[] = [
            {
                baseX: 0.18,
                baseY: 0.16,
                radiusX: 0.6,
                radiusY: 0.52,
                speedX: 0.044,
                speedY: 0.036,
                phaseX: 0.4,
                phaseY: 1.1,
                rgb: [24, 76, 214], // Royal Sapphire
                alpha: 0.52,
            },
            {
                baseX: 0.82,
                baseY: 0.22,
                radiusX: 0.54,
                radiusY: 0.56,
                speedX: 0.036,
                speedY: 0.05,
                phaseX: 1.9,
                phaseY: 0.6,
                rgb: [38, 128, 240], // Electric Cobalt
                alpha: 0.44,
            },
            {
                baseX: 0.48,
                baseY: 0.58,
                radiusX: 0.68,
                radiusY: 0.48,
                speedX: 0.028,
                speedY: 0.042,
                phaseX: 2.6,
                phaseY: 1.8,
                rgb: [76, 52, 188], // Deep Midnight Violet
                alpha: 0.42,
            },
            {
                baseX: 0.86,
                baseY: 0.72,
                radiusX: 0.46,
                radiusY: 0.42,
                speedX: 0.04,
                speedY: 0.062,
                phaseX: 1.2,
                phaseY: 2.6,
                rgb: [215, 126, 36], // Warm Bullion Amber
                alpha: 0.26,
            },
            {
                baseX: 0.12,
                baseY: 0.84,
                radiusX: 0.52,
                radiusY: 0.46,
                speedX: 0.025,
                speedY: 0.048,
                phaseX: 1.5,
                phaseY: 0.8,
                rgb: [28, 80, 192], // Deep Ocean Cobalt
                alpha: 0.45,
            },
            {
                baseX: 0.4,
                baseY: 0.34,
                radiusX: 0.46,
                radiusY: 0.38,
                speedX: 0.046,
                speedY: 0.038,
                phaseX: 3.0,
                phaseY: 2.4,
                rgb: [14, 168, 198], // Celestial Cyan
                alpha: 0.32,
            },
        ];

        // Constellation nodes & dynamic streaming data packets
        const nodes: ConstellationNode[] = [];
        const packets: DataPacket[] = [];

        const initGraph = () => {
            nodes.length = 0;
            packets.length = 0;
            const count = Math.min(Math.floor((width * height) / 26000), isCoarse ? 22 : 46);

            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.28,
                    vy: (Math.random() - 0.5) * 0.24,
                    radius: 1.0 + Math.random() * 1.8,
                    baseAlpha: 0.35 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    neighbors: [],
                });
            }

            // Pre-seed streaming data packets
            const packetCount = isCoarse ? 6 : 14;
            for (let i = 0; i < packetCount; i++) {
                const f = Math.floor(Math.random() * count);
                const t = (f + 1 + Math.floor(Math.random() * (count - 1))) % count;
                packets.push({
                    fromIndex: f,
                    toIndex: t,
                    progress: Math.random(),
                    speed: 0.0035 + Math.random() * 0.0045,
                    size: 1.6 + Math.random() * 1.4,
                    alpha: 0.7 + Math.random() * 0.3,
                });
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, isCoarse ? 1.0 : 1.5);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initGraph();
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isCoarse) return;
            mousePosRef.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
                active: true,
            };
        };

        const handleMouseLeave = () => {
            mousePosRef.current.active = false;
        };

        const handleMotionPreference = () => {
            prefersReducedMotion = motionQuery.matches;
            if (prefersReducedMotion) {
                renderStatic();
            } else if (isRunning) {
                lastFrameTime = performance.now();
                rafId = requestAnimationFrame(renderDynamic);
            }
        };

        const handleVisibilityChange = () => {
            isRunning = !document.hidden;
            if (isRunning && !prefersReducedMotion) {
                lastFrameTime = performance.now();
                rafId = requestAnimationFrame(renderDynamic);
            } else {
                cancelAnimationFrame(rafId);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        document.addEventListener("visibilitychange", handleVisibilityChange);
        motionQuery.addEventListener("change", handleMotionPreference);

        // High-fidelity static render for reduced motion
        const renderStatic = () => {
            const isDark = isDarkRef.current;
            ctx.clearRect(0, 0, width, height);

            // Base aurora gradient fields
            fields.forEach((node) => {
                const cx = node.baseX * width;
                const cy = node.baseY * height;
                const r = Math.max(width, height) * node.radiusX * 0.8;
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                const alpha = (isDark ? node.alpha : node.alpha * 0.35) * 0.9;

                grad.addColorStop(0, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},${alpha})`);
                grad.addColorStop(0.4, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},${alpha * 0.38})`);
                grad.addColorStop(1, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.ellipse(cx, cy, r, r * (node.radiusY / node.radiusX), 0, 0, Math.PI * 2);
                ctx.fill();
            });

            // Static contour lines
            const lineCount = 7;
            ctx.lineWidth = 1;
            for (let i = 0; i < lineCount; i++) {
                const base = height * (0.16 + i * 0.11);
                const alpha = isDark ? 0.18 * (1 - i * 0.06) : 0.1 * (1 - i * 0.06);
                ctx.strokeStyle = isDark
                    ? `rgba(180, 215, 255, ${alpha})`
                    : `rgba(24, 54, 120, ${alpha})`;
                ctx.beginPath();
                const step = Math.max(12, Math.floor(width / 70));
                for (let x = 0; x <= width; x += step) {
                    const nx = x / width;
                    const y = base + Math.sin(nx * 5.2 + i * 0.85) * height * 0.028;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        };

        // Cinematic dynamic render loop
        const renderDynamic = (currentTime: number) => {
            if (!isRunning) return;

            if (prefersReducedMotion) {
                renderStatic();
                return;
            }

            const elapsed = currentTime - lastFrameTime;
            if (elapsed < targetFpsInterval) {
                rafId = requestAnimationFrame(renderDynamic);
                return;
            }
            lastFrameTime = currentTime - (elapsed % targetFpsInterval);

            const t = currentTime * 0.00082;
            const isDark = isDarkRef.current;
            const maxScroll = Math.max(document.documentElement.scrollHeight - height, 1);
            const scrollRatio = Math.min(scrollY / maxScroll, 1);

            // Smooth cursor spring interpolation
            const mouse = mousePosRef.current;
            if (mouse.active) {
                smoothMouseRef.current.x += (mouse.x - smoothMouseRef.current.x) * 0.06;
                smoothMouseRef.current.y += (mouse.y - smoothMouseRef.current.y) * 0.06;
            }

            const mouseOffsetX = mouse.active ? (smoothMouseRef.current.x - 0.5) * 0.09 : 0;
            const mouseOffsetY = mouse.active ? (smoothMouseRef.current.y - 0.5) * 0.09 : 0;

            ctx.clearRect(0, 0, width, height);

            // ─── LAYER 1: RADIANT VOLUMETRIC AURORA ENERGY FIELDS ───
            fields.forEach((node, idx) => {
                const swayX = Math.sin(t * node.speedX + node.phaseX) * 0.09 + mouseOffsetX * (idx % 2 === 0 ? 1 : -1);
                const swayY = Math.cos(t * node.speedY + node.phaseY) * 0.07 + mouseOffsetY * (idx % 2 === 0 ? 1 : -1);
                const breathe = 1 + Math.sin(t * (0.22 + idx * 0.04) + idx) * 0.18;

                const scrollParallaxX = (idx % 2 === 0 ? 1 : -1) * scrollRatio * 0.06;
                const scrollParallaxY = scrollRatio * 0.08;

                const cx = (node.baseX + swayX + scrollParallaxX) * width;
                const cy = (node.baseY + swayY + scrollParallaxY) * height;
                const r = Math.max(width, height) * node.radiusX * breathe * 0.82;

                const pulseAlpha =
                    (isDark ? node.alpha : node.alpha * 0.36) *
                    (0.85 + Math.sin(t * 0.26 + idx * 1.15) * 0.18);

                const grad = ctx.createRadialGradient(cx, cy, r * 0.04, cx, cy, r);
                grad.addColorStop(0, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},${pulseAlpha})`);
                grad.addColorStop(0.35, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},${pulseAlpha * 0.42})`);
                grad.addColorStop(0.7, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},${pulseAlpha * 0.12})`);
                grad.addColorStop(1, `rgba(${node.rgb[0]},${node.rgb[1]},${node.rgb[2]},0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                const rotation = Math.sin(t * 0.065 + idx) * 0.45;
                ctx.ellipse(cx, cy, r, r * (node.radiusY / node.radiusX) * 0.95, rotation, 0, Math.PI * 2);
                ctx.fill();
            });

            // Interactive desktop mouse spotlight aura
            if (mouse.active && !isCoarse) {
                const mx = smoothMouseRef.current.x * width;
                const my = smoothMouseRef.current.y * height;
                const mr = Math.max(width, height) * 0.26;
                const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
                mouseGrad.addColorStop(0, isDark ? "rgba(59, 130, 246, 0.14)" : "rgba(37, 99, 235, 0.08)");
                mouseGrad.addColorStop(0.5, isDark ? "rgba(30, 64, 175, 0.04)" : "rgba(37, 99, 235, 0.02)");
                mouseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = mouseGrad;
                ctx.beginPath();
                ctx.arc(mx, my, mr, 0, Math.PI * 2);
                ctx.fill();
            }

            // ─── LAYER 2: FLUID TOPOGRAPHIC ISO-CONTOURS (ELEVATION CURVES) ───
            const lineCount = isCoarse ? 5 : 8;
            ctx.lineWidth = 1;

            for (let i = 0; i < lineCount; i++) {
                const baseHeight = height * (0.13 + i * 0.098 + scrollRatio * 0.075);
                const lineAlpha = (isDark ? 0.22 : 0.12) * (1 - i * 0.05);

                // Dynamic gradient stroke across width
                const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
                if (isDark) {
                    lineGrad.addColorStop(0, `rgba(56, 189, 248, ${lineAlpha * 0.5})`); // Cyan
                    lineGrad.addColorStop(0.35, `rgba(147, 197, 253, ${lineAlpha})`); // Light Blue
                    lineGrad.addColorStop(0.75, `rgba(167, 139, 250, ${lineAlpha * 0.8})`); // Indigo
                    lineGrad.addColorStop(1, `rgba(251, 191, 36, ${lineAlpha * 0.4})`); // Amber
                } else {
                    lineGrad.addColorStop(0, `rgba(14, 116, 144, ${lineAlpha * 0.7})`);
                    lineGrad.addColorStop(0.5, `rgba(29, 78, 216, ${lineAlpha})`);
                    lineGrad.addColorStop(1, `rgba(180, 83, 9, ${lineAlpha * 0.6})`);
                }

                ctx.strokeStyle = lineGrad;
                ctx.beginPath();
                const step = Math.max(10, Math.floor(width / 64));

                for (let x = 0; x <= width; x += step) {
                    const nx = x / width;
                    const wave1 = Math.sin(nx * 5.2 + t * 0.22 + i * 0.72) * height * 0.028;
                    const wave2 = Math.sin(nx * 11.8 + t * 0.14 + i * 1.05) * height * 0.013;
                    const wave3 = Math.cos(nx * 2.6 - t * 0.08 + scrollRatio * 1.7) * height * 0.016;
                    const y = baseHeight + wave1 + wave2 + wave3;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();

                // Telemetry micro-elevation ticks along every second contour
                if (!isCoarse && i % 2 === 0) {
                    ctx.strokeStyle = isDark ? `rgba(186, 218, 255, ${lineAlpha * 0.6})` : `rgba(28, 64, 136, ${lineAlpha * 0.5})`;
                    const tickInterval = 160;
                    for (let x = 80; x < width - 60; x += tickInterval) {
                        const nx = x / width;
                        const y = baseHeight +
                            Math.sin(nx * 5.2 + t * 0.22 + i * 0.72) * height * 0.028 +
                            Math.sin(nx * 11.8 + t * 0.14 + i * 1.05) * height * 0.013 +
                            Math.cos(nx * 2.6 - t * 0.08 + scrollRatio * 1.7) * height * 0.016;

                        ctx.beginPath();
                        ctx.moveTo(x, y - 2.5);
                        ctx.lineTo(x, y + 2.5);
                        ctx.stroke();
                    }
                }
            }

            // ─── LAYER 3: CONSTELLATION MESH & STREAMING DATA PACKETS ───
            // Update node positions
            nodes.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                p.neighbors.length = 0;
            });

            const connectionDist = Math.min(width, height) * 0.12;
            ctx.lineWidth = 0.65;

            // Compute neighbors & draw interconnect links
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        nodes[i].neighbors.push(j);
                        nodes[j].neighbors.push(i);

                        const linkAlpha = (1 - dist / connectionDist) * (isDark ? 0.2 : 0.11);
                        ctx.strokeStyle = isDark
                            ? `rgba(186, 222, 255, ${linkAlpha})`
                            : `rgba(28, 68, 142, ${linkAlpha})`;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Connect nearest nodes to cursor spotlight
            if (mouse.active && !isCoarse) {
                const mx = smoothMouseRef.current.x * width;
                const my = smoothMouseRef.current.y * height;
                const mouseConnectDist = connectionDist * 1.35;

                for (let i = 0; i < nodes.length; i++) {
                    const dx = nodes[i].x - mx;
                    const dy = nodes[i].y - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouseConnectDist) {
                        const linkAlpha = (1 - dist / mouseConnectDist) * (isDark ? 0.35 : 0.2);
                        ctx.strokeStyle = isDark
                            ? `rgba(96, 165, 250, ${linkAlpha})`
                            : `rgba(37, 99, 235, ${linkAlpha})`;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mx, my);
                        ctx.stroke();

                        // Gentle mouse gravitational attraction
                        nodes[i].x -= (dx / dist) * 0.2;
                        nodes[i].y -= (dy / dist) * 0.2;
                    }
                }
            }

            // Draw nodes with subtle luminous halos
            nodes.forEach((p) => {
                const twinkle = 0.4 + (Math.sin(t * 1.5 + p.phase) * 0.5 + 0.5) * 0.6;
                const alpha = (isDark ? p.baseAlpha : p.baseAlpha * 0.4) * twinkle;

                ctx.fillStyle = isDark
                    ? `rgba(215, 238, 255, ${alpha})`
                    : `rgba(28, 64, 136, ${alpha})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // ─── LAYER 4: STREAMING DATA PACKETS (PHOTONS ALONG LINKS) ───
            packets.forEach((pkt) => {
                const fromNode = nodes[pkt.fromIndex];
                const toNode = nodes[pkt.toIndex];

                if (!fromNode || !toNode) return;

                pkt.progress += pkt.speed;
                if (pkt.progress >= 1) {
                    pkt.progress = 0;
                    pkt.fromIndex = pkt.toIndex;
                    // Route to one of the connected neighbors if available, else pick random
                    const currentNeighbors = toNode.neighbors;
                    if (currentNeighbors.length > 0) {
                        pkt.toIndex = currentNeighbors[Math.floor(Math.random() * currentNeighbors.length)];
                    } else {
                        pkt.toIndex = Math.floor(Math.random() * nodes.length);
                    }
                }

                const px = fromNode.x + (toNode.x - fromNode.x) * pkt.progress;
                const py = fromNode.y + (toNode.y - fromNode.y) * pkt.progress;

                // Glowing photon packet
                const pktAlpha = isDark ? pkt.alpha : pkt.alpha * 0.5;
                ctx.fillStyle = isDark
                    ? `rgba(240, 249, 255, ${pktAlpha})`
                    : `rgba(29, 78, 216, ${pktAlpha})`;

                ctx.beginPath();
                ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // ─── LAYER 5: MICRO TECHNICAL GRID CROSSHAIRS ───
            if (!isCoarse) {
                const gridSpacing = 140;
                const crossAlpha = isDark ? 0.07 : 0.045;
                ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${crossAlpha})` : `rgba(0, 0, 0, ${crossAlpha})`;
                ctx.lineWidth = 0.5;

                for (let x = gridSpacing; x < width; x += gridSpacing) {
                    for (let y = gridSpacing; y < height; y += gridSpacing) {
                        ctx.beginPath();
                        ctx.moveTo(x - 2.5, y);
                        ctx.lineTo(x + 2.5, y);
                        ctx.moveTo(x, y - 2.5);
                        ctx.lineTo(x, y + 2.5);
                        ctx.stroke();
                    }
                }
            }

            rafId = requestAnimationFrame(renderDynamic);
        };

        if (prefersReducedMotion) {
            renderStatic();
        } else {
            rafId = requestAnimationFrame(renderDynamic);
        }

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            motionQuery.removeEventListener("change", handleMotionPreference);
        };
    }, []);

    return (
        <div className="site-atmosphere" aria-hidden="true">
            <div className="aurora-fallback" />
            <canvas ref={canvasRef} className="atmosphere-canvas" />
            <div className="atmosphere-grid" />
            <div className="atmosphere-vignette" />
            <div className="atmosphere-grain" />
        </div>
    );
}
