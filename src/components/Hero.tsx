"use client";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/bdpic.png",
  "/images/myimg.png",
  "/images/post.png",
];

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = e.clientX + "px";
      glowRef.current.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Photo rotation
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed w-[420px] h-[420px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          transition: "left 0.12s ease, top 0.12s ease",
        }}
      />

      <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative z-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 w-full">

          {/* ── TWO COLUMN: text left, photo right ── */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

            {/* LEFT — Text */}
            <div className="flex-1 min-w-0 text-center md:text-left">

              {/* Available badge */}
              <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.12)] border border-[rgba(59,130,246,0.28)] px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 tracking-widest uppercase mb-7">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot flex-shrink-0" />
                Available for hire — Remote &amp; Global
              </div>

              {/* Name — mobile min is 2rem so it never bleeds off screen */}
              <h1
                className="font-syne font-extrabold leading-[1.1] tracking-[-0.02em] mb-6 break-words"
                style={{ fontSize: "clamp(2rem, 8vw, 5.2rem)" }}
              >
                <span className="block bg-gradient-to-br from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Sarah Ndom
                </span>
                <span className="block text-[#f0f4ff] opacity-90">
                  Software Engineer &amp; AI Developer
                </span>
              </h1>

              {/* Description */}
              <p className="text-[#7b90b8] text-base sm:text-lg leading-[1.85] mb-10 font-light max-w-[520px] mx-auto md:mx-0">
                I build{" "}
                <strong className="text-[#f0f4ff] font-medium">full-stack products that ship</strong>
                {" "}— from pixel-perfect UIs to Supabase backends, Edge Functions, and LLM-integrated features.
                React · TypeScript · Next.js ·{" "}
                <strong className="text-[#f0f4ff] font-medium">AI APIs</strong>.
                3+ years in production.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                <a
                  href="#projects"
                  className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="bg-transparent text-[#f0f4ff] border border-[rgba(59,130,246,0.22)] px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-400"
                >
                  Let's Talk
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 sm:gap-10 mt-12 pt-10 border-t border-[rgba(59,130,246,0.18)] justify-center md:justify-start">
                {[
                  { n: "3+", l: "Years Building"    },
                  { n: "8+", l: "Projects Shipped"  },
                  { n: "3",  l: "AI APIs Integrated" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-syne font-extrabold text-2xl sm:text-3xl text-white">{s.n}</div>
                    <div className="text-xs text-[#7b90b8] mt-0.5 tracking-wide">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Photo: 200px on mobile, 280px on md+ */}
            <div className="relative flex-shrink-0">
              <div
                className="spin-ring rounded-full p-[3px]"
                style={{
                  width: "min(200px, 55vw)",
                  height: "min(200px, 55vw)",
                  background: "linear-gradient(135deg,#2563eb,#06b6d4,#2563eb)",
                }}
              >
                <div
                  className="spin-ring-r w-full h-full rounded-full overflow-hidden relative bg-[#050a14]"
                >
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Sarah Ndom"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        i === current ? "opacity-100" : "opacity-0"
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Crect width='280' height='280' fill='%230a1128'/%3E%3Ctext x='140' y='155' text-anchor='middle' font-size='80' fill='%232563eb' font-family='sans-serif'%3ESN%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Location tag */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#080f1e] border border-[rgba(59,130,246,0.22)] px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 whitespace-nowrap z-10">
                📍 Lagos, Nigeria
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}