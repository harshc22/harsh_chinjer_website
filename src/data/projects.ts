export type ProjectItem = {
  title: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
  github?: string;
  live?: string;
  screenshots?: string[];
  featured?: boolean;
};

export const projects: ProjectItem[] = [
  {
    title: "Anmol Makeovers",
    summary:
      "Production-ready portfolio and quoting platform for a makeup business that streamlines client bookings and travel fee calculations.",
    bullets: [
      "Built a secure quote request flow with multi-step forms, server-side validation, reCAPTCHA, and automated email notifications",
      "Improved performance with caching, a responsive image gallery, and mobile-first design",
      "Automated travel fee calculations to reduce manual coordination"
    ],
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Nodemailer"],
    github: "https://github.com/harshc22/Anmol-Makeovers",
    screenshots: ["/projects/anmol_makeovers.png"],
    featured: true,
    live: "https://www.anmolmakeovers.ca/",
  },
  {
    title: "Herd Management ML Capstone",
    summary:
      "ML system predicting milk production and health traits in dairy cow offspring using parental and genetic data.",
    bullets: [
      "Partnered with Cattleytics Inc. to train models on 10,000+ records",
      "Built a full-stack prototype with a TypeScript frontend and Go middleware",
      "Served ML models via gRPC and stored results in PostgreSQL"
    ],
    tags: ["PyTorch", "gRPC", "Go", "PostgreSQL", "Next.js"],
    screenshots: ["/projects/ml_herd_management.png"],
  },
  {
    title: "Fit Sphere",
    summary:
      "Fitness platform with BMR calculator, workout videos, diet insights, and interactive charts.",
    bullets: [
      "Integrated ExerciseDB, Ninja API, and Google Maps API for personalized guidance",
      "Built responsive UI and nearby gym discovery with map-based exploration"
    ],
    tags: ["HTML", "CSS", "JavaScript", "jQuery", "APIs"],
    github: "https://github.com/harshc22/FitSphere",
  },
];
