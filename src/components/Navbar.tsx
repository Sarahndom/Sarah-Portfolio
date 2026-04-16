"use client";
import { useState, useEffect } from "react";

const LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Work",       href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav
      className={`
 fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(5,10,20,0.92)] backdrop-blur-xl border-b border-[rgba(59,130,246,0.18)]"
              : "bg-blue-600"
      }`}
    >
      <div className=" max-w-[1200px] mx-auto px-6 flex items-center justify-between relative z-10">
        {/* Logo */}
        <a
          href="#hero"
          className="font-syne font-extrabold text-xl tracking-tight bg-gradient-to-br from-white to-blue-400 bg-clip-text text-transparent"
        >
          SN
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted font-medium tracking-wide hover:text-snow transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume/SarahN CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-snow text-2xl bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(5,10,20,0.98)] border-b border-[rgba(59,130,246,0.18)] px-6 py-4 flex flex-col z-50">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="text-white color py-3 border-b border-[rgba(59,130,246,0.15)] text-sm font-medium last:border-none hover:text-blue-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume/Sarah N CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="hover:text-blue-500 mt-3 text-center bg-blue text-white py-2.5 rounded-lg font-semibold text-sm"
          >
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
}