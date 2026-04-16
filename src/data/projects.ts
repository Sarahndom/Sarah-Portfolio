export interface Project {
  id: string;
  name: string;
  desc: string;
  badge: string;
  stack: string[];
  live: string;
  code: string;
  video?: string;
  image?: string[];
  featured?: boolean;
  bg?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "starflix",
    name: "StarFlix — Animation Streaming Platform",
    desc: "Full-stack streaming platform built solo from blank file to live deployment. Cinematic hero slider, in-app video player, admin CMS with scheduled releases, AI-powered search, role-based auth, IndexedDB offline downloads, biometric support, and real account deletion via Supabase Edge Functions.",
    badge: "⭐ Featured · AI-Powered",
    stack: ["React", "Supabase", "Tailwind", "Vite", "Edge Functions", "AI Search", "IndexedDB"],
    live: "https://star-flix-nu.vercel.app/",
    code: "https://github.com/Sarahndom/StarFlix",
    video: "/videos/Video-Project.mp4",
    featured: true,
  },
  
 {
    id: "able",
    name: "Able Enterprises — Electronics Marketplace",
    desc: "A premium e-commerce platform for high-end electronics built with Next.js and TypeScript. Features include real-time inventory management via Supabase, server-side rendering for SEO, and a streamlined checkout flow.",
    badge: "🚀 Next.js",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    live: "https://able-app.vercel.app/",
    code: "https://github.com/Sarahndom/AbleApp",
    image: [ "/images/ableapp.png",
      "/images/able.png"],
    bg: "#0d0a1a",
},

  
   {
    id: "nextask",
    name: "NexTask — Food Delivery App",
    desc: "A full-stack food ordering platform featuring real-time order tracking, dynamic menu filtering, and a seamless checkout experience powered by Supabase and Next.js.",
    badge: "🍔 Next.js",
    stack: ["Next.js", "TypeScript",  "Redux Toolkit", "Supabase", "Tailwind CSS"],
    live: "https://order-manager-assessment.vercel.app/",
    code: "https://github.com/Sarahndom/React-Food-App",
    video: "/videos/Food-video.mp4",
    bg: "#0a100a",
},

  {
    id: "extensions",
    name: "Browser Extensions Manager UI",
    desc: "Interactive dashboard with advanced DOM manipulation, state-based filtering, and a custom theme switcher. Responsive across all breakpoints.",
    badge: "🧩 DOM · JS",
    stack: ["JavaScript", "CSS3", "DOM API", "Theme Switcher"],
    live: "https://browser-manager-extension.netlify.app/",
    code: "https://github.com/Sarahndom/Browser-extension",
    video: "/videos/extension-video-demo.mp4",
  },
  {
    id: "ticket-app",
    name: "Ticket Management App",
    desc: "Vanilla JavaScript app with custom client-side router, persistent localStorage state, and real-time notification system — built with modular ES6 architecture.",
    badge: "🎫 Vanilla JS",
    stack: ["Vanilla JS", "ES6 Modules", "localStorage", "Custom Router"],
    live: "https://ticket-app-ql9q-f7qyboy0e-sarahs-projects-d4ca6872.vercel.app/",
    code: "https://github.com/Sarahndom/ticket-app",
    video: "/videos/Project-760.mp4",
  },
 
  
 {
    id: "quickeats",
    name: "QuickEats — Food Delivery App",
    desc: "A lightweight food ordering interface built with pure JavaScript. Features high-performance search filtering, a custom-built shopping cart system, and responsive design layouts.",
    badge: "🍦 Vanilla JS",
    stack: ["JavaScript", "HTML5", "CSS3", "Firebase"],
    live: "https://food-app-ten-blond-35.vercel.app/",
    code: "https://github.com/Sarahndom/Food-App",
    video: "videos/Food-App-Video.mp4",
    bg: "#0a1a0a",
},

  {
    id: "weather",
    name: "Weather App",
    desc: "Responsive app integrated with OpenWeather API. Optimised fetching logic, error handling, and dynamic UI updates based on real-time meteorological data.",
    badge: "🌤️ API Integration",
    stack: ["React", "OpenWeather API", "Responsive", "Error Handling"],
    live: "https://weather-app-cocm.vercel.app/",
    code: "https://github.com/Sarahndom/weather-app",
    image: ["/images/weatherapp.png"],
    bg: "#050a18",
  },


  {
    id: "conference",
    name: "Conference Ticket Generator",
    desc: "High-performance generator with complex form validation and local file processing via the File API. Real-time data binding delivers instant, personalised event tickets.",
    badge: "🎟️ File API",
    stack: ["React", "File API", "Form Validation", "Real-time Binding"],
    live: "https://ticket-gene.netlify.app/",
    code: "https://github.com/Sarahndom/Conference-ticket-generator",
    video: "/videos/Video-Project-760.mp4",
    bg: "#0a0a1a",
  },

];

export const SKILLS = [
  { icon: "⚡", title: "Core Languages",       tags: ["TypeScript","JavaScript ES6+","HTML5","CSS3","Python"] },
  { icon: "⚛️", title: "Frontend Frameworks",  tags: ["React.js","Next.js 14+","Tailwind CSS","Redux Toolkit","Vite","Bootstrap 5"] },
  { icon: "🤖", title: "AI / LLM Engineering", tags: ["OpenAI API","Anthropic Claude API","Prompt Engineering","LLM Integration","AI-Assisted UI"] },
  { icon: "🗄️", title: "Backend & Database",   tags: ["Supabase","PostgreSQL","Firebase","REST APIs","Edge Functions","RLS Policies"] },
  { icon: "🚀", title: "DevOps & Tooling",     tags: ["Git / GitHub","GitHub Actions","Vercel","CI/CD","Chrome DevTools","Figma"] },
  { icon: "📱", title: "Mobile & More",        tags: ["React Native","Android Builds","IndexedDB","PWA","SEO","Accessibility (A11y)"] },
];

export const EXPERIENCE = [
  {
    role: "Junior Software Engineer",
    company: "ScreenerHQ",
    period: "Oct 2025 – Present · Remote · Lagos, Nigeria",
    points: [
      "Integrated LLM-powered features using OpenAI API — intelligent search filtering and AI-generated content suggestions shipped to production.",
      "Engineered modular React + TypeScript components reducing code duplication by ~15% and improving design system consistency.",
      "Improved Core Web Vitals by 25% via Next.js Server Components, lazy-loading, and strategic code splitting.",
      "Configured GitHub Actions CI/CD pipelines, cutting deployment errors by 10%.",
      "Resolved 50+ cross-browser layout issues ensuring visual consistency across Chrome, Safari, and Firefox.",
    ],
  },
  {
    role: "Junior Software Engineer — Internship",
    company: "Xerax Labs Inc.",
    period: "Mar 2024 – Feb 2025 · Hybrid · Lagos, Nigeria",
    points: [
      "Built dynamic UI components integrated with RESTful APIs, handling client-server data flow end-to-end.",
      "Led mobile-first UI refactor across three core landing pages — directly contributed to a 20% increase in mobile user adoption.",
      "Wrote custom JavaScript logic for multi-step forms and modal workflows, reducing user input errors by 15%.",
      "Managed Git branching, pull requests, and code reviews within an agile sprint environment.",
      "Recognised formally for independently resolving long-standing cross-device bugs ahead of deadline.",
    ],
  },
];