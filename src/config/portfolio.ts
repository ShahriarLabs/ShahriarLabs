/**
 * =========================================================================
 * SHAHRIARLABS PORTFOLIO CONFIGURATION
 * =========================================================================
 * You can easily update your project count, personal details, and links here.
 */

// =========================================================================
// PROJECT COUNTER CONFIGURATION
// =========================================================================
/**
 * Update this variable with your actual total completed/shipped project count.
 * Used by the animated count-up statistics section on the landing page.
 */
export const PROJECT_COUNT = 16; // Configurable placeholder; easily change to your actual total number

export const PORTFOLIO_CONFIG = {
  brand: {
    name: "ShahriarLabs",
    title: "Software Developer",
    availabilityText: "Available for select opportunities",
    isAvailable: true,
  },
  hero: {
    eyebrow: "SOFTWARE DEVELOPER",
    headline: "Building digital experiences with precision.",
    subheadline: "I design and develop reliable, thoughtful software solutions.",
    typewriterWords: [
      "Software Developer",
      "Problem Solver",
      "Builder",
    ],
    primaryCta: {
      label: "Explore Projects",
      href: "#work",
    },
    secondaryCta: {
      label: "Get in Touch",
      href: "#contact",
    },
  },
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "shahriar@shahriarlabs.dev",
  },
  projects: [
    {
      id: "01",
      title: "Distributed Task Scheduler",
      category: "Systems & Cloud",
      description: "A resilient, fault-tolerant job queue and workflow scheduler built with Go and Redis, implementing distributed locks and automated failover.",
      tech: ["Go", "Redis", "Docker", "gRPC"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
    },
    {
      id: "02",
      title: "Real-Time Telemetry Dashboard",
      category: "Web Applications",
      description: "High-throughput metric streaming interface rendering sub-second data updates using WebSockets, WebGL time-series rendering, and React.",
      tech: ["TypeScript", "React", "Node.js", "WebSockets", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
    },
    {
      id: "03",
      title: "Headless CMS Engine & API",
      category: "Backend Architecture",
      description: "Extensible content modeling platform offering GraphQL and REST interfaces, role-based access control, and low-latency cache management.",
      tech: ["Node.js", "TypeScript", "PostgreSQL", "GraphQL", "Prisma"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
    },
    {
      id: "04",
      title: "Developer CLI & Scaffold Toolkit",
      category: "Developer Tooling",
      description: "Zero-configuration CLI utility designed to standardize microservice scaffolding, configuration validation, and local container orchestration.",
      tech: ["TypeScript", "Node.js", "Commander", "Shell"],
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Go", "Python", "SQL", "HTML/CSS"],
    },
    {
      category: "Frameworks & UI",
      items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Vite"],
    },
    {
      category: "Databases & Cloud",
      items: ["PostgreSQL", "Redis", "MongoDB", "Docker", "AWS", "Git"],
    },
    {
      category: "Engineering Focus",
      items: ["REST & GraphQL APIs", "Distributed Systems", "Performance Tuning", "Type Safety"],
    },
  ],
};
