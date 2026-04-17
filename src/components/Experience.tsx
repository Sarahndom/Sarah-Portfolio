"use client";
import { useEffect, useRef } from "react";
import { EXPERIENCE } from "@/src/data/projects";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    // ✅ removed text-center from section — bullets were inheriting it
    <section id="experience" className="border-t border-[rgba(59,130,246,0.18)] py-24 relative z-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="reveal mb-12 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Experience
          </span>
          <h2
            className="font-syne font-extrabold tracking-tight leading-tight text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            Industry Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, #2563eb, transparent)" }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="reveal grid grid-cols-[4rem_1fr] gap-6">
                {/* Dot */}
                <div className="flex flex-col items-center pt-2">
                  <div
                    className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0"
                    style={{ boxShadow: "0 0 0 3px rgba(37,99,235,0.3)", border: "2px solid #050a14" }}
                  />
                </div>

                {/* Card — text-left so bullets align correctly */}
                <div className="text-left bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(59,130,246,0.38)]">
                  <div className="font-syne font-bold text-white text-base">{job.role}</div>
                  <div className="text-blue-400 font-semibold text-sm mt-0.5">{job.company}</div>
                  <div className="text-[#7b90b8] text-xs mt-1 mb-5 italic">{job.period}</div>
                  <ul className="flex flex-col gap-2.5">
                    {job.points.map((pt, i) => (
                      <li key={i} className="text-[#7b90b8] text-sm leading-[1.65] pl-5 relative">
                        <span className="absolute left-0 top-0.5 text-blue-400 text-xs font-bold">→</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}