"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  // 👇 YOUR IMAGES HERE
  const images = [
    "/images/bdpic.png",
    "/images/myimg.png",
    "/images/post.png",
  ];

  const [current, setCurrent] = useState(0);

  // Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = e.clientX + "px";
      glowRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          transition: "left 0.12s ease, top 0.12s ease",
        }}
      />

      <section
        id="hero"
        className="min-h-screen flex items-center pt-20 relative z-10"
      >
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="flex flex-col gap-16 items-center">

            {/* TEXT */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[rgba(37,99,235,0.12)] border border-[rgba(59,130,246,0.25)] px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 tracking-widest uppercase mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                Available for hire — Remote & Global
              </div>

              <h1
                className="font-syne font-extrabold leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}
              >
                <span className="block bg-gradient-to-br from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Sarah Ndom
                </span>
                <span className="block text-snow opacity-90">
                  Software Engineer & AI Developer
                </span>
              </h1>

              <p className="text-muted text-lg leading-[1.8] mb-10 font-light mx-auto">
                I build{" "}
                <strong className="text-snow font-medium">
                  full-stack products that ship
                </strong>{" "}
                — from pixel-perfect UIs to Supabase backends, Edge Functions, and LLM-integrated features.
                React · TypeScript · Next.js ·{" "}
                <strong className="text-snow font-medium">AI APIs</strong>.
                3+ years in production.
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <a
                  href="#projects"
                  className="bg-blue text-blue-500 hover:text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)] shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="bg-transparent text-snow border border-[rgba(59,130,246,0.18)] px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-250 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-400"
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative flex-shrink-0 mx-auto">
              {/* Ring */}
              <div
                className="rounded-full p-[3px]"
                style={{
                  width: 280,
                  height: 280,
                  background:
                    "linear-gradient(135deg,#2563eb,#06b6d4,#2563eb)",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#050a14]">

                  {/* 🔥 FADE IMAGES */}
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
                          `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' 
                          width='280' height='280'><rect width='280' height='280' fill='%230a1128'/>
                          <text x='140' y='155' text-anchor='middle' font-size='80' fill='%232563eb'
                          font-family='sans-serif'>SN</text></svg>`;
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 bg-bg2 border border-[rgba(59,130,246,0.18)] px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 whitespace-nowrap">
                📍 Lagos, Nigeria
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}