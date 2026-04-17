"use client";
import { useEffect, useRef, useState } from "react";

const CONTACT_ITEMS = [
  { icon: "✉️", label: "EMAIL",    value: "sarahndom620@gmail.com",          href: "mailto:sarahndom620@gmail.com"           },
  { icon: "📞", label: "PHONE",    value: "+234 707 733 5336",               href: "tel:+2347077335336"                       },
  { icon: "💼", label: "LINKEDIN", value: "linkedin.com/in/sarah-ndom001",   href: "https://www.linkedin.com/in/sarah-ndom001"},
  { icon: "🐙", label: "GITHUB",   value: "github.com/Sarahndom",            href: "https://github.com/Sarahndom"            },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus("Sending…");
    const form = e.currentTarget;
    const data = {
      name:    form.elements.namedItem("name")    ? (form.elements.namedItem("name")    as HTMLInputElement).value : "",
      email:   form.elements.namedItem("email")   ? (form.elements.namedItem("email")   as HTMLInputElement).value : "",
      message: form.elements.namedItem("message") ? (form.elements.namedItem("message") as HTMLTextAreaElement).value : "",
    };
    try {
      const res    = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) { setStatus("✅ Message sent! I'll be in touch soon."); form.reset(); }
      else                  setStatus("❌ Failed to send. Email me directly.");
    } catch {
      setStatus("❌ Network error. Email me directly.");
    }
    setLoading(false);
  }

  return (
    <section id="contact" className="border-t border-[rgba(59,130,246,0.18)] py-24 relative z-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="reveal mb-12 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Contact
          </span>
          <h2
            className="font-syne font-extrabold tracking-tight leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            Let's Build Something
          </h2>
          <p className="text-[#7b90b8] text-lg font-light max-w-[480px] mx-auto">
            Open to roles, contracts, and collaborations. Don't overthink it — just reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 items-start">

          {/* Contact items */}
          <div className="reveal flex flex-col gap-4">
            {CONTACT_ITEMS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] p-4 rounded-xl transition-all duration-300 hover:border-[rgba(59,130,246,0.4)] group"
              >
                <div className="w-10 h-10 bg-[rgba(37,99,235,0.15)] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {c.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs text-[#7b90b8] tracking-wide mb-0.5">{c.label}</div>
                  <div className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form className="reveal flex flex-col gap-4" onSubmit={handleSubmit}>
            {[
              { name: "name",  label: "YOUR NAME",     type: "text",  placeholder: "Jane Smith"        },
              { name: "email", label: "EMAIL ADDRESS",  type: "email", placeholder: "jane@company.com"  },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs text-[#7b90b8] font-semibold tracking-wide mb-2">{f.label}</label>
                <input
                  type={f.type} name={f.name} required placeholder={f.placeholder}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-400 transition-colors placeholder:text-[#7b90b8]"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-[#7b90b8] font-semibold tracking-wide mb-2">MESSAGE</label>
              <textarea
                name="message" rows={5} required placeholder="Hi Sarah, I'd love to discuss..."
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-400 transition-colors placeholder:text-[#7b90b8] resize-y min-h-[120px]"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send Message →"}
            </button>
            {status && <p className="text-blue-400 text-sm font-medium">{status}</p>}
          </form>

        </div>
      </div>
    </section>
  );
}