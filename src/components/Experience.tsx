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
    <section id="experience" className="text-center border-t border-[rgba(59,130,246,0.18)] py-20 relative z-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="reveal mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Experience
          </span>
          <h2 className="font-syne font-extrabold tracking-tight leading-tight"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
Industry Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #2563eb, transparent)" }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="reveal grid grid-cols-[4rem_1fr] gap-6">
                {/* Dot */}
                <div className="flex flex-col items-center pt-1.5">
                  <div
                    className="w-3 h-3 rounded-full bg-blue flex-shrink-0"
                    style={{ boxShadow: "0 0 0 3px rgba(37,99,235,0.3)", border: "2px solid #050a14" }}
                  />
                </div>

                {/* Card */}
                <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(59,130,246,0.35)]">
                  <div className="font-syne font-bold text-snow text-base">{job.role}</div>
                  <div className="text-blue-400 font-semibold text-sm mt-0.5">{job.company}</div>
                  <div className="text-muted text-xs mt-1 mb-4">{job.period}</div>
                  <ul className="flex flex-col gap-2">
                    {job.points.map((pt, i) => (
                      <li key={i} className="text-muted text-sm leading-[1.6] pl-4 relative">
                        <span className="absolute left-0 top-0.5 text-blue-400 text-xs">→</span>
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