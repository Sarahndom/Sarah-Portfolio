"use client";
import { useEffect, useRef, useState } from "react";

const CONTACT_ITEMS = [
  { icon: "✉️", label: "EMAIL", value: "sarahndom620@gmail.com", href: "mailto:sarahndom620@gmail.com" },
  { icon: "📞", label: "PHONE", value: "+234 707 733 5336", href: "tel:+2347077335336" },
  { icon: "💼", label: "LINKEDIN", value: "linkedin.com/in/sarah-ndom001", href: "https://www.linkedin.com/in/sarah-ndom001" },
  { icon: "🐙", label: "GITHUB", value: "github.com/Sarahndom", href: "https://github.com/Sarahndom" },
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
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
          headers: {
            
    "Content-Type": "application/json", // 👈 Add this
  },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("✅ Message sent successfully!");
        form.reset();
      
      } else {
        setStatus("❌ Failed to send. Try again.");
      }
    } catch (err) {

      setStatus("❌ Network error. Try again.");
    }

    setLoading(false);
  }

  return (
    <section id="contact" className="border-t border-[rgba(59,130,246,0.18)] text-center py-20 relative z-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="reveal mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-blue-400 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] px-3 py-1.5 rounded-full mb-4">
            Contact
          </span>

          <h2 className="font-syne font-extrabold tracking-tight leading-tight mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Let's Build Something
          </h2>

          <p className="text-muted text-lg font-light max-w-[520px]">
            Open to roles, contracts, and collaborations. Don't overthink it — just reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Contact Items */}
          <div className="reveal flex flex-col gap-4">
            {CONTACT_ITEMS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] p-4 rounded-xl transition-all duration-300 hover:border-[rgba(59,130,246,0.35)] group"
              >
                <div className="w-10 h-10 bg-[rgba(37,99,235,0.15)] rounded-xl flex items-center justify-center text-lg">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-muted">{c.label}</div>
                  <div className="font-semibold text-snow text-sm group-hover:text-blue-400 transition">
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form className="reveal flex flex-col gap-4" onSubmit={handleSubmit}>
            {[
              { name: "name", label: "YOUR NAME", type: "text", placeholder: "Jane Smith" },
              { name: "email", label: "EMAIL ADDRESS", type: "email", placeholder: "jane@company.com" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-xs text-muted font-semibold mb-2">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-xl px-4 py-3 text-snow text-sm outline-none focus:border-blue-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-muted font-semibold mb-2">MESSAGE</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Hi Sarah, I'd love to discuss..."
                className=" w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(59,130,246,0.18)] rounded-xl px-4 py-3 text-snow text-sm outline-none focus:border-blue-400 resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue text-blue-500 hover:text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

            {status && (
              <p className="text-blue-400 text-sm font-medium mt-2">
                {status}
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}