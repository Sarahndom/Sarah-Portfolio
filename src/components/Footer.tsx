"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/src/data/projects";

/* =========================
   PROJECT CARD
========================= */
function ProjectCard({ p }: { p: Project }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const isLong = p.desc.length > 160;

  // Image slider
  useEffect(() => {
    if (!p.image || !Array.isArray(p.image) || p.image.length < 2) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % p.image!.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [p.image]);

  useEffect(() => {
    setIndex(0);
  }, [p.id]);

  return (
    <article className="h-full bg-white/[0.04] border border-blue-500/20 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

      {/* MEDIA */}
      <div className="relative aspect-video overflow-hidden bg-[#0a1128]">
        {p.video ? (
          <video
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={p.video} type="video/mp4" />
          </video>
        ) : p.image ? (
          Array.isArray(p.image) ? (
            <img
              src={p.image[index]}
              alt={p.name}
              className="w-full h-full object-cover transition-all duration-700"
            />
          ) : (
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          )
        ) : null}

        {/* BADGE */}
        <div className="absolute top-3 left-3 px-3 py-1 text-[0.7rem] font-bold rounded-full bg-blue-500/20 border border-blue-400 text-white">
          {p.badge}
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-syne font-bold text-base text-white mb-2">
          {p.name}
        </h3>

        {/* DESCRIPTION */}
        <div className="flex-1">
          <p
            className={`text-white/90 text-sm leading-[1.6] ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {p.desc}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition"
            >
              {expanded ? "View less" : "... View more"}
            </button>
          )}
        </div>

        {/* STACK */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {p.stack.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[0.7rem] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* LINKS */}
        <div className="flex gap-2">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg text-center hover:bg-blue-700 transition"
          >
            Live Demo ↗
          </a>

          <a
            href={p.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-blue-500/20 text-white/70 text-sm py-2 rounded-lg text-center hover:text-blue-400 hover:border-blue-400 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

/* =========================
   PROJECTS SECTION
========================= */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );

    ref.current?.querySelectorAll(".reveal").forEach((el) =>
      obs.observe(el)
    );

    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative py-16 overflow-hidden z-10"
      ref={ref}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#060b18]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(59,130,246,0.15),transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative max-w-[1100px] mx-auto px-5">

        {/* HEADER */}
        <div className="text-center reveal mb-8">
          <span className="inline-block text-xs font-bold uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-4">
            Work
          </span>

          <h2 className="font-syne font-extrabold text-white mb-3 text-2xl sm:text-3xl">
            Selected Projects
          </h2>

          <p className="text-white/70 text-sm sm:text-base max-w-[480px] mx-auto">
            Real products, shipped. Not tutorials — things that work in production.
          </p>
        </div>

        {/* SCROLL */}
        <div className="mt-10 overflow-x-auto">
          <div className="flex gap-4 w-max">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] max-w-[300px]"
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