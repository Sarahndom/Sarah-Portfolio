export default function Footer() {
  return (
    <footer className="border-t border-[rgba(59,130,246,0.18)] py-10 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <a href="#hero" className="block">
  <div className="font-syne font-extrabold text-xl bg-gradient-to-br from-white to-blue-400 bg-clip-text text-transparent">
    Sarah Ndom
  </div>
</a>
          <div className="flex gap-6">
            {[
                            { label: "LinkedIn", href: "https://www.linkedin.com/in/sarah-ndom001"    },
              { label: "X",   href: "https://x.com/NdomSarah99918"                 },
              { label: "Email",    href: "mailto:sarahndom620@gmail.com"                },
            ].map((l) => (
              <a
                key={l.label} href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[#7b90b8] text-sm hover:text-blue-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-[#7b90b8] text-xs mt-6">
          © {new Date().getFullYear()} Sarah Ndom — Built with precision 🩵
        </p>
      </div>
    </footer>
  );
}