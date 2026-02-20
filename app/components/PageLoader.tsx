"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Animate progress bar to 100% over ~1.6s
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        // Short pause then fade out
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => setHidden(true), 900);
        }, 250);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{
        opacity: hiding ? 0 : 1,
        transition: hiding
          ? "opacity 0.9s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: hiding ? 0 : 1,
          transform: hiding ? "translateY(-12px)" : "translateY(0)",
          transition: hiding
            ? "opacity 0.7s ease, transform 0.7s ease"
            : "none",
        }}
      >
        <Image
          src="/YORELOGO.png"
          alt="YORE"
          width={160}
          height={62}
          className="invert brightness-200"
          priority
        />
      </div>

      {/* Season label */}
      <p
        className="text-white/20 text-[9px] tracking-[0.55em] uppercase mt-5 mb-12"
        style={{
          fontFamily: "var(--font-body), sans-serif",
          opacity: hiding ? 0 : 1,
          transition: hiding ? "opacity 0.5s ease" : "none",
        }}
      >
        SS26 — Nitra
      </p>

      {/* Progress bar */}
      <div
        className="w-32 h-px bg-white/10 overflow-hidden"
        style={{
          opacity: hiding ? 0 : 1,
          transition: hiding ? "opacity 0.4s ease" : "none",
        }}
      >
        <div
          className="h-full bg-white"
          style={{
            width: `${progress}%`,
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Counter */}
      <span
        className="text-white/15 text-[9px] tracking-[0.3em] mt-3"
        style={{
          fontFamily: "var(--font-body), sans-serif",
          opacity: hiding ? 0 : 1,
          transition: hiding ? "opacity 0.4s ease" : "none",
        }}
      >
        {Math.round(progress).toString().padStart(2, "0")}
      </span>
    </div>
  );
}
