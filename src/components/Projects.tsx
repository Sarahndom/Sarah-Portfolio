"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/src/data/projects";

function ProjectCard({ p }: { p: Project }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const isLong = p.desc.length > 160;

  useEffect(() => {
    if (!Array.isArray(p.image) || p.image.length < 2) return;
    const t = setInterval(() => setImgIndex((prev) => (prev + 1) % (p.image as string[]).length), 3000);
    return () => clearInterval(t);
  }, [p.image]);

  return (
    <article className="h-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-[20px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(59,130,246,0.45)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)]">

      {/* Media */}
      <div className="relative overflow-hidden aspect-video" style={{ background: p.bg ?? "#0a1128" }}>
        {p.video ? (
          <video controls preload="metadata" className="w-full h-full object-cover project-video">
            <source src={p.video} type="video/mp4" />
          </video>
        ) : Array.isArray(p.image) && p.image.length > 0 ? (
          <img src={p.image[imgIndex]} alt={p.name} className="w-full h-full object-cover transition-all duration-700" />
        ) : null}

        {/* Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.68rem] font-bold tracking-wide backdrop-blur-sm border ${
          p.featured
            ? "bg-[rgba(37,99,235,0.35)] border-blue-400 text-white"
            : "bg-[rgba(5,10,20,0.82)] border-[rgba(59,130,246,0.25)] text-blue-400"
        }`}>
          {p.badge}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-2">{p.name}</h3>

        <div className="flex-1">
          <p className={`text-[#7b90b8] text-sm leading-[1.65] ${expanded ? "" : "line-clamp-3"}`}>{p.desc}</p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 text-xs text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              {expanded ? "View less" : "... View more"}
            </button>
          )}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {p.stack.map((tag) => (
            <span key={tag} className="bg-[rgba(37,99,235,0.1)] border border-[rgba(59,130,246,0.22)] text-blue-400 text-[0.68rem] font-semibold px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <a
            href={p.live} target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-all hover:bg-blue-700"
          >
            Live Demo ↗
          </a>
          <a
            href={p.code} target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-transparent text-[#7b90b8] text-sm font-semibold py-2.5 rounded-lg text-center border border-[rgba(59,130,246,0.18)] transition-all hover:border-blue-400 hover:text-blue-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    const amt = () => (window.innerWidth < 640 ? 270 : 370);
    const start = () => {
      if (ivRef.current) return;
      ivRef.current = setInterval(() => {
        c.scrollBy({ left: amt(), behavior: "smooth" });
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth - 10) {
          setTimeout(() => c.scrollTo({ left: 0, behavior: "smooth" }), 600);
        }
      }, 4200);
    };
    const stop = () => { if (ivRef.current) { clearInterval(ivRef.current); ivRef.current = null; } };
    c.addEventListener("mouseenter", stop);
    c.addEventListener("mouseleave", start);
    c.addEventListener("touchstart", stop);
    c.addEventListener("touchend", start);
    start();
    return () => { stop(); c.removeEventListener("mouseenter", stop); c.removeEventListener("mouseleave", start); };
  }, []);

  return (
    <section id="projects" className="pt-24 pb-16 relative z-10" ref={ref}>
      <div className="border-t border-[rgba(59,130,246,0.18)] max-w-[1200px] mx-auto pt-12 px-4 sm:px-6">

        <div className="text-center reveal mb-10">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Work
          </span>
          <h2
            className="font-syne font-extrabold tracking-tight leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}
          >
            Selected Projects
          </h2>
          <p className="text-[#7b90b8] text-sm sm:text-base font-light max-w-[480px] mx-auto">
            Real products, shipped. Not tutorials — things that work in production.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="reveal mt-10 overflow-x-auto scroll-hide scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex gap-4 sm:gap-5 px-1">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="snap-center min-w-[270px] max-w-[290px] sm:min-w-[320px] sm:max-w-[360px] flex-shrink-0"
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}