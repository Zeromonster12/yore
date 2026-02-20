"use client";
import Image from "next/image";
import { useState } from "react";

const HERO_BG = "/photos/YORE%20NITRA/IMG_7099.JPG";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: implement auth logic
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── Nav ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <a href="/">
          <Image
            src="/YORELOGO.png"
            alt="YORE"
            width={72}
            height={28}
            className="invert brightness-200"
            priority
          />
        </a>
        <span
          className="text-white/25 text-[9px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          Member Access
        </span>
      </nav>

      {/* ── Full-screen split layout ─────────────────────────────── */}
      <div className="flex min-h-screen">
        {/* Left — photo panel (hidden on mobile) */}
        <div className="hidden md:block relative w-1/2">
          <Image
            src={HERO_BG}
            alt=""
            fill
            className="object-cover grayscale"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/80" />
          {/* watermark */}
          <div className="absolute inset-0 flex items-end justify-start p-10 pointer-events-none select-none">
            <p
              className="text-white/[0.06] text-[10vw] font-black uppercase leading-none tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              YORE
            </p>
          </div>
          <div className="absolute bottom-8 left-10">
            <span
              className="text-white/20 text-[9px] tracking-[0.5em] uppercase"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              YORE — SS26 — Nitra, Slovakia
            </span>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center px-8 md:px-16 pt-24 pb-12">
          {/* mobile background */}
          <div className="md:hidden absolute inset-0 -z-10">
            <Image
              src={HERO_BG}
              alt=""
              fill
              className="object-cover grayscale opacity-20"
              sizes="100vw"
            />
          </div>

          <div className="w-full max-w-[360px]">
            {/* heading */}
            <div className="mb-10">
              <p
                className="text-white/35 text-[9px] tracking-[0.5em] uppercase mb-3"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Welcome back
              </p>
              <h1
                className="text-white font-black uppercase text-5xl tracking-[-0.02em] leading-none"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Sign In
              </h1>
              <div className="mt-4 h-px w-12 bg-white/20" />
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[9px] tracking-[0.4em] uppercase text-white/50"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/15 text-white px-0 py-2.5 text-sm outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/15"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                  placeholder="you@example.com"
                />
              </div>

              {/* password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-[9px] tracking-[0.4em] uppercase text-white/50"
                    style={{ fontFamily: "var(--font-body), sans-serif" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[9px] tracking-[0.3em] uppercase text-white/50 hover:text-white/60 transition-colors duration-300 border-b border-white/15 pb-px"
                    style={{ fontFamily: "var(--font-body), sans-serif" }}
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/15 text-white px-0 py-2.5 text-sm outline-none focus:border-white/60 transition-colors duration-300 placeholder:text-white/15"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                  placeholder="••••••••"
                />
              </div>

              {/* submit — sliding fill, same as main CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex items-center overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                  <span
                    className="relative z-10 pl-8 pr-[calc(2rem+0.5em)] py-4 text-white group-hover:text-black text-xs font-black uppercase tracking-[0.5em] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {loading ? "Signing in…" : "Sign In"}
                  </span>
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 border-l border-white/20 group-hover:border-black/20 text-white/60 group-hover:text-black transition-all duration-500">
                    {loading ? (
                      <svg
                        className="animate-spin h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"
                      >
                        <path
                          d="M1 13L13 1M13 1H4M13 1V10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="absolute inset-0 border border-white/25 group-hover:border-white transition-colors duration-300 pointer-events-none" />
                </button>
              </div>
            </form>

            {/* divider */}
            <div className="flex items-center gap-5 my-8">
              <div className="h-px flex-1 bg-white/10" />
              <span
                className="text-white/20 text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                No account?
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <a
              href="#"
              className="group relative flex items-center justify-center overflow-hidden"
            >
              <span
                className="text-white/40 group-hover:text-white text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 border-b border-white/15 group-hover:border-white/50 pb-px"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Request Access
              </span>
            </a>
          </div>

          {/* footer strip */}
          <div className="absolute bottom-8 flex items-center gap-8">
            <span
              className="text-white/10 text-[9px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              © {new Date().getFullYear()} YORE
            </span>
            <div className="h-3 w-px bg-white/10" />
            <a
              href="#"
              className="text-white/15 text-[9px] tracking-[0.35em] uppercase hover:text-white/40 transition-colors"
              style={{ fontFamily: "var(--font-body), sans-serif" }}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
