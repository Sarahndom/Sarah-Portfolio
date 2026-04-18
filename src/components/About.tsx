"use client";
import { useEffect, useRef } from "react";

const CARDS = [
  { icon: "🎯", title: "Product-First Thinking",  text: "I care about the user experience, not just the code. Every decision is made with the end product in mind." },
  { icon: "🤖", title: "AI Developer",            text: "Hands-on experience with OpenAI, Claude, and Supabase AI — wiring LLMs into real production features, not just demos." },
  { icon: "⚙️", title: "Full-Stack Comfort",      text: "From React UI to Supabase RLS policies, Edge Functions, and Vercel deployments — I own the whole thing." },
  { icon: "🔍", title: "Debugging as a Skill",    text: "I trace issues across the full stack — TypeScript errors, RLS misconfigurations, CI/CD failures. The hard problems don't scare me." },
  { icon: "🌍", title: "Remote-Ready & Reliable", text: "3+ years working across remote environments. I communicate clearly, deliver consistently, and don't need hand-holding." },
];

export default function About() {
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
    <section id="about" className="border-t border-[rgba(59,130,246,0.18)] py-24 relative z-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div className="reveal">
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-5">
              About
            </span>
            <h2
              className="font-syne font-extrabold tracking-tight leading-tight mb-6 text-white"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              Engineer by instinct.<br />
              <span className="text-blue-400">Builder by choice.</span>
            </h2>
            <div className="space-y-4 text-[#7b90b8] font-light leading-[1.9]">
              <p>I'm a software engineer based in Lagos, Nigeria. I don't just write code — I build things that <strong className="text-white font-medium">work in production</strong>, handle edge cases, and hold up under real users.</p>
              <p>My background spans <strong className="text-white font-medium">frontend architecture, full-stack development, and AI integration</strong>. I've shipped features at ScreenerHQ, built a complete streaming platform from scratch, and integrated LLM APIs into production workflows using OpenAI and Anthropic Claude.</p>
              <p>What sets me apart: I'm <strong className="text-white font-medium">comfortable owning the full stack</strong> — from React component to Supabase Edge Function to Vercel deployment. I debug across the entire system and I don't disappear when things break.</p>
              <p>Currently open to <strong className="text-white font-medium">remote and hybrid roles</strong> — frontend, full-stack, or AI engineering. If you need someone who treats your codebase like it matters, let's talk.</p>
            </div>
            <div className="mt-8">
              <a
                href="/resume/Sarah Ndo CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
              >
                Download CV ↗
              </a>
            </div>
          </div>

          {/* Right — Cards */}
          <div className="reveal flex flex-col gap-3.5">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-2xl p-5 flex gap-4 items-start transition-all duration-300 hover:border-[rgba(59,130,246,0.38)] hover:-translate-y-0.5"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{c.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm mb-1">{c.title}</div>
                  <div className="text-[#7b90b8] text-sm leading-[1.6]">{c.text}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}