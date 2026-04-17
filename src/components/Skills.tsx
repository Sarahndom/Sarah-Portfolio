"use client";
import { useEffect, useRef } from "react";
import { SKILLS } from "@/src/data/projects";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Auto horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const iv = setInterval(() => {
      container.scrollBy({ left: 280, behavior: "smooth" });
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        setTimeout(() => container.scrollTo({ left: 0, behavior: "smooth" }), 600);
      }
    }, 3800);
    return () => clearInterval(iv);
  }, []);

  // Mouse glow per card
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".skill-glow-card");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    cards.forEach((card) => {
      const fn = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      };
      card.addEventListener("mousemove", fn);
      handlers.push([card, fn]);
    });
    return () => handlers.forEach(([card, fn]) => card.removeEventListener("mousemove", fn));
  }, []);

  return (
    <section id="skills" className="pt-28 pb-10 relative z-10" ref={ref}>
      <div className="border-t border-[rgba(59,130,246,0.18)] max-w-[1200px] mx-auto pt-12 px-6">

        <div className="text-center reveal mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Expertise
          </span>
          <h2
            className="font-syne font-extrabold tracking-tight leading-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            What I Build With
          </h2>
          <p className="text-[#7b90b8] text-lg font-light max-w-[480px] mx-auto">
            A cross-disciplinary stack covering AI, frontend, backend, and deployment.
          </p>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="reveal overflow-x-auto scroll-hide pb-4"
        >
          <div className="flex flex-nowrap gap-5 px-1">
            {SKILLS.map((s) => (
              <div
                key={s.title}
                className="skill-glow-card group min-w-[240px] max-w-[260px] flex-shrink-0 rounded-2xl bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.22)] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(37,99,235,0.2)] flex items-center justify-center text-lg flex-shrink-0">
                    {s.icon}
                  </div>
                  <div className="font-syne font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[0.7rem] font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#7b90b8] transition-all duration-200 group-hover:border-blue-400/30 group-hover:text-blue-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}