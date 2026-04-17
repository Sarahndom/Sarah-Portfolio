"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/src/data/projects";

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
    <article
      className={`reveal h-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-[16px] sm:rounded-[20px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(59,130,246,0.45)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.2)] ${
        p.featured ? "md:min-w-[420px]" : ""
      }`}
    >
      {/* Media */}
      <div
        className="relative overflow-hidden aspect-video"
        style={{ background: p.bg ?? "#0a1128" }}
      >
        {p.video ? (
          <video
            controls
            preload="metadata"
            className="w-full h-full object-cover project-video"
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

        {/* Badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[0.65rem] sm:text-[0.7rem] font-bold tracking-wide backdrop-blur-sm border ${
            p.featured
              ? "bg-[rgba(37,99,235,0.3)] border-blue-400 text-white"
              : "bg-[rgba(5,10,20,0.8)] border-[rgba(59,130,246,0.18)] text-blue-400"
          }`}
        >
          {p.badge}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="font-syne font-bold text-base sm:text-lg text-snow mb-2">
          {p.name}
        </h3>

        {/* Description */}
        <div className="flex-1">
          <p
            className={`text-muted text-xs sm:text-sm leading-[1.6] sm:leading-[1.7] ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {p.desc}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 text-[11px] sm:text-xs text-blue-400 font-semibold hover:text-blue-300 transition underline underline-offset-2"
            >
              {expanded ? "View less" : "... View more"}
            </button>
          )}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 my-3 sm:my-4">
          {p.stack.map((tag) => (
            <span
              key={tag}
              className="bg-[rgba(37,99,235,0.1)] border border-[rgba(59,130,246,0.2)] text-blue-400 text-[0.65rem] sm:text-[0.72rem] font-semibold px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue text-blue-500 hover:text-white text-xs sm:text-sm font-semibold py-2 rounded-lg text-center transition-all hover:bg-blue-700"
          >
            Live Demo ↗
          </a>

          <a
            href={p.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-transparent text-muted text-xs sm:text-sm font-semibold py-2 rounded-lg text-center border border-[rgba(59,130,246,0.18)] transition-all hover:border-blue-400 hover:text-blue-400"
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Smart auto-scroll (responsive)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const getScrollAmount = () =>
      window.innerWidth < 640 ? 260 : 360;

    const start = () => {
      if (intervalRef.current) return;

      intervalRef.current = setInterval(() => {
        container.scrollBy({
          left: getScrollAmount(),
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
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
    container.addEventListener("touchstart", stop);
    container.addEventListener("touchend", start);
    container.addEventListener("click", stop);

    const videos =
      container.querySelectorAll<HTMLVideoElement>(".project-video");

    videos.forEach((video) => {
      video.addEventListener("play", stop);
      video.addEventListener("pause", start);
      video.addEventListener("ended", start);
    });

    start();

    return () => {
      stop();
      container.removeEventListener("mouseenter", stop);
      container.removeEventListener("mouseleave", start);
      container.removeEventListener("touchstart", stop);
      container.removeEventListener("touchend", start);
      container.removeEventListener("click", stop);

      videos.forEach((video) => {
        video.removeEventListener("play", stop);
        video.removeEventListener("pause", start);
        video.removeEventListener("ended", start);
      });
    };
  }, []);

  return (
    <section id="projects" className="pt-20 sm:pt-28 pb-12 sm:pb-15 relative z-10" ref={ref}>
      <div className="pt-10 border-t border-[rgba(59,130,246,0.18)] max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center reveal mb-6">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Work
          </span>

          <h2
            className="font-syne font-extrabold tracking-tight leading-tight mb-3"
            style={{ fontSize: "clamp(1.6rem,5vw,3rem)" }}
          >
            Selected Projects
          </h2>

          <p className="text-black text-sm sm:text-lg font-light max-w-xl mx-auto">
            Real products, shipped. Not tutorials — things that work in production.
          </p>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="projects-scroll mt-8 sm:mt-12 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex gap-4 sm:gap-6 px-2 sm:px-0 justify-start sm:justify-center">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="snap-center min-w-[260px] max-w-[280px] sm:min-w-[320px] sm:max-w-[360px] flex-shrink-0"
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