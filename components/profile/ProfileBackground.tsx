"use client";

import { useEffect, useRef } from "react";
import type { PageData, Theme } from "@/types";

function ParticleField({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.25 + 0.05,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let frameId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.vy;
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
      }
      frameId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}

export function ProfileBackground({
  page,
  theme,
}: {
  page: PageData;
  theme: Theme;
}) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% -10%, ${theme.accentSoft}, transparent 60%), linear-gradient(180deg, ${theme.bgFrom}, ${theme.bgTo})`,
        }}
      />

      {page.backgroundType === "image" && page.backgroundValue && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${page.backgroundValue})` }}
        />
      )}

      {page.backgroundType === "video" && page.backgroundValue && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={page.backgroundValue}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {page.backgroundType === "color" && <ParticleField color={theme.accent} />}

      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
