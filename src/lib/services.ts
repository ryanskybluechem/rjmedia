export interface Service {
  slug: string;
  num: string;
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  tools: string[];
  approach: string;
}

export const allServices: Service[] = [
  {
    slug: "web-design-development",
    num: "01",
    title: "Web Design & Development",
    headline: "Pixel to production.\nNo handoffs.",
    description:
      "Every site is designed and built by one person — no game of telephone between a designer and a developer. That means faster iteration, tighter execution, and a final product that actually matches the vision. Custom-built from scratch on modern frameworks, optimized for speed, SEO, and conversion.",
    capabilities: [
      "Custom website design",
      "Responsive development",
      "CMS integration",
      "E-commerce builds",
      "Landing pages & funnels",
      "Performance optimization",
    ],
    tools: ["Next.js", "React", "Framer", "Headless CMS", "Vercel", "HTML/CSS/JS"],
    approach: "Design in the browser. Ship fast. Iterate faster.",
  },
  {
    slug: "marketing-strategy",
    num: "02",
    title: "Marketing Strategy",
    headline: "Growth isn't a guess.\nIt's a system.",
    description:
      "Five years running the full marketing stack at Al's.com — email flows that generated millions, SEO strategies that compounded over time, and paid campaigns that actually converted. Not theory. Not frameworks from a textbook. Real results from real campaigns, applied to your brand.",
    capabilities: [
      "Email marketing & automation",
      "SEO strategy & execution",
      "Paid media management",
      "Content strategy",
      "Analytics & reporting",
      "Conversion optimization",
    ],
    tools: ["Klaviyo", "Google Analytics", "SEO Tools", "Paid Platforms", "A/B Testing"],
    approach: "Measure everything. Double down on what works. Cut what doesn't.",
  },
  {
    slug: "creative-direction",
    num: "03",
    title: "Creative Direction",
    headline: "The visual layer\nthat separates.",
    description:
      "Photography, brand identity, content creation — the things that make people stop scrolling. Years of shooting product photography, building brand systems, and creating content that doesn't look like stock. Every visual decision is intentional, every asset is crafted to work across every channel.",
    capabilities: [
      "Brand identity design",
      "Product photography",
      "Content creation",
      "Art direction",
      "Visual strategy",
      "Asset production",
    ],
    tools: ["Canon", "Photoshop", "Illustrator", "Final Cut", "Building Signs", "Paper Prints"],
    approach: "If it looks like everyone else, it's already invisible.",
  },
  {
    slug: "data-operations",
    num: "04",
    title: "Data & Operations",
    headline: "Chaos in.\nClarity out.",
    description:
      "Custom dashboards, automated workflows, and data systems that actually make sense. From spreadsheet hell to clean pipelines — building the operational backbone that lets you focus on the work instead of wrestling with your tools. If it can be automated, it should be.",
    capabilities: [
      "Custom dashboards",
      "Workflow automation",
      "Data management & pipelines",
      "Reporting systems",
      "Tool integration",
      "Process optimization",
    ],
    tools: ["Supabase", "Excel", "Sheets", "Claude", "Custom Tools", "Automation"],
    approach: "Automate the boring stuff. Surface what matters.",
  },
];
