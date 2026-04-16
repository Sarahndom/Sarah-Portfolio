import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarah Ndom — Software Engineer & AI Developer",
  description:
    "Sarah Ndom — Software Engineer specialising in React, TypeScript, Next.js and AI integration. Building full-stack products that ship.",
  keywords: ["Sarah Ndom", "Software Engineer", "React", "TypeScript", "Next.js", "AI Developer", "Lagos Nigeria"],
  openGraph: {
    title: "Sarah Ndom — Software Engineer & AI Developer",
    description: "Building full-stack products that ship.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}