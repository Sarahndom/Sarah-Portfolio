"use client";
import { useEffect, useRef } from "react";
import { SKILLS } from "@/src/data/projects";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.12 }
    );

    ref.current?.querySelectorAll(".reveal").forEach((el) =>
      obs.observe(el)
    );

    return () => obs.disconnect();
  }, []);

  // ✅ Auto horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 280;

    const interval = setInterval(() => {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }, 600);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Mouse glow effect
useEffect(() => {
  const cards = document.querySelectorAll<HTMLElement>(".skill-card");

  cards.forEach((card) => {
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    card.addEventListener("mousemove", handleMove);

    // cleanup (important)
    return () => {
      card.removeEventListener("mousemove", handleMove);
    };
  })
  }, []);

  return (
    <section id="skills" className=" pt-28 relative z-10" ref={ref}>
      <div className=" border-t border-[rgba(59,130,246,0.18)] max-w-[1200px] mx-auto pt-10 px-6">

        <div className="text-center reveal mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Expertise
          </span>

          <h2
            className="font-syne font-extrabold tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            What I Build With
          </h2>

          <p className="text-center text-lg font-light ">
            A cross-disciplinary stack covering AI, frontend, backend, and deployment.
          </p>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div
          ref={scrollRef}
          className="reveal overflow-x-auto overflow-y-hidden"
        >
          <div className="flex flex-nowrap gap-5">

            {SKILLS.map((s) => (
              <div
                key={s.title}
                className="skill-card group relative min-w-[240px] max-w-[260px] flex-shrink-0 rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1.5"
              >
<div className="relative h-full w-full rounded-2xl bg-blue-500/10 border border-blue-500/40 p-5 overflow-hidden backdrop-blur-sm">
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -inset-[1px] rounded-2xl bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(37,99,235,0.25),transparent_40%)]" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
<div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">                        {s.icon}
                      </div>

                      <div className="font-syne font-bold text-sm text-snow group-hover:text-blue-400 transition">
                        {s.title}
                      </div>
                    </div>

                    <div className=" flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[0.7rem] font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-muted transition-all duration-200 group-hover:border-blue-400/30 group-hover:text-blue-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}