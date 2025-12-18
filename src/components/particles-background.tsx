import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;

        // Configuration
        const particleCount = 60;
        const connectionDistance = 150;
        const mouseDistance = 200;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    particle.vx += forceDirectionX * force * 0.05;
                    particle.vy += forceDirectionY * force * 0.05;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

                // Theme awareness hack: Check a CSS variable or body class? 
                // For now, let's use a color that works for both or check computed style.
                // We'll use the primary color from CSS variables if possible, or a neutral teal.
                const isDark = document.documentElement.classList.contains("dark");
                ctx.fillStyle = isDark ? "rgba(45, 212, 191, 0.7)" : "rgba(13, 115, 119, 0.7)"; // Teal-400 / Teal-700
                ctx.fill();

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = isDark
                            ? `rgba(45, 212, 191, ${0.15 * (1 - distance / connectionDistance)})`
                            : `rgba(13, 115, 119, ${0.15 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        // Initial setup
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-0 pointer-events-none" // pointer-events-none allows clicks to pass through, but we want mousemove... 
            // Actually, for mouse interaction to work well on the *whole* hero, we might want pointer-events-none 
            // but capture mouse on window (which we did).
            style={{ width: "100%", height: "100%" }}
        />
    );
}
