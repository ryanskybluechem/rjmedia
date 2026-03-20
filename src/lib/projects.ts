export interface Project {
  slug: string;
  title: string;
  category: string;
  role: string;
  year: string;
  description: string;
  tags: string[];
  metrics: { value: string; label: string }[];
}

export const allProjects: Project[] = [
  {
    slug: "als-com",
    title: "Al's.com",
    category: "E-Commerce / Marketing",
    role: "Lead Designer & Web Marketing Manager",
    year: "5 Years",
    description:
      "Managed the entire digital operation for a major e-commerce brand over five years, generating millions in revenue. Owned email marketing flows, content creation, photography, web design, and data management — full stack, one person.",
    tags: ["Email Flows", "Content Creation", "Photography", "Web Design", "E-Commerce"],
    metrics: [
      { value: "$M+", label: "Revenue Generated" },
      { value: "5", label: "Years" },
      { value: "Full", label: "Stack Ownership" },
    ],
  },
  {
    slug: "sky-blue-chemical",
    title: "Sky Blue Chemical",
    category: "Web / Marketing",
    role: "Designer, Builder & Marketer",
    year: "1 Year",
    description:
      "Designed and built the complete web presence for a chemical manufacturing company. Handled all aspects from design to development and marketing — delivered on Framer.",
    tags: ["Web Design", "Framer", "Marketing", "Brand Identity"],
    metrics: [
      { value: "1", label: "Year" },
      { value: "Framer", label: "Platform" },
      { value: "Full", label: "Build" },
    ],
  },
  {
    slug: "troy-allan-homes",
    title: "Troy Allan Homes",
    category: "Real Estate / Web",
    role: "Designer & Builder",
    year: "2024",
    description:
      "Designed and built a polished web presence for a custom home builder. Clean, conversion-focused design delivered on the Framer platform.",
    tags: ["Web Design", "Framer", "Real Estate"],
    metrics: [
      { value: "Custom", label: "Design" },
      { value: "Framer", label: "Platform" },
      { value: "Full", label: "Build" },
    ],
  },
  {
    slug: "best-deal-guide",
    title: "Best Deal Guide",
    category: "Web / Data",
    role: "Designer, Builder & Data Manager",
    year: "2024–Present",
    description:
      "Designed and built a deal aggregation website with robust data management on the backend. Handles content, structure, and data pipelines — all delivered on Framer.",
    tags: ["Web Design", "Framer", "Data Management"],
    metrics: [
      { value: "Custom", label: "Design" },
      { value: "Framer", label: "Platform" },
      { value: "Data", label: "Management" },
    ],
  },
  {
    slug: "quick-and-clean",
    title: "Quick & Clean",
    category: "Web App",
    role: "Designer, Builder & Data Manager",
    year: "2025–Present",
    description:
      "Full-stack web application built from the ground up. Designed the interface, built the frontend and backend, and manages the data layer — powered by Vercel and Supabase.",
    tags: ["Web App", "Vercel", "Supabase", "Full Stack", "Data Management"],
    metrics: [
      { value: "Full", label: "Stack App" },
      { value: "Vercel", label: "Frontend" },
      { value: "Supabase", label: "Backend" },
    ],
  },
];
