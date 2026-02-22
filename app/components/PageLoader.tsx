"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PASSWORD = "ILOVEYORE!";

export default function PageLoader() {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Check sessionStorage so refresh doesn't re-ask
  useEffect(() => {
    if (sessionStorage.getItem("yore_unlocked") === "1") {
      setUnlocked(true);
    } else {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  // Start loading animation only after unlocked
  useEffect(() => {
    if (!unlocked) return;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => setHidden(true), 900);
        }, 250);
      }
    };
    requestAnimationFrame(tick);
  }, [unlocked]);

  const attempt = () => {
    if (input === PASSWORD) {
      sessionStorage.setItem("yore_unlocked", "1");
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  if (hidden) return null;

  // ── Password gate ──────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-8">
        <Image
          src="/YORELOGO.png"
          alt="YORE"
          width={140}
          height={54}
          className="invert brightness-200 mb-2"
          priority
        />
        <p
          className="text-white/20 text-[9px] tracking-[0.55em] uppercase"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          SS26 — Nitra
        </p>

        <div
          className="flex flex-col items-center gap-3 w-64"
          style={{
            animation: shake ? "shake 0.5s ease" : "none",
          }}
        >
          <input
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="Enter password"
            className="w-full bg-transparent border border-white/20 focus:border-white/50 outline-none text-white text-[11px] tracking-[0.3em] uppercase text-center py-3 px-4 placeholder:text-white/20 transition-colors duration-300"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
            autoComplete="off"
          />
          {error && (
            <span
              className="text-red-400/70 text-[9px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Incorrect password
            </span>
          )}
          <button
            onClick={attempt}
            className="w-full border border-white/20 hover:border-white/50 text-white/40 hover:text-white text-[9px] tracking-[0.45em] uppercase py-3 transition-all duration-300"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Enter
          </button>
        </div>

        <style>{`
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
          }
        `}</style>
      </div>
    );
  }

  // ── Loading screen ─────────────────────────────────────────────
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
