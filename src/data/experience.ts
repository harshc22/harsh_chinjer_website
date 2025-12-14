export type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  link?: string;
  logo?: string;
};

export const experiences: ExperienceItem[] = [
  {
    role: "Software Validation – AI Trainer",
    company: "Data Annotation Tech",
    location: "Freelance",
    start: "May 2024",
    end: "Present",
    summary:
      "Validated and improved AI-generated responses across multiple programming languages, ensuring correctness, reliability, and safety of LLM outputs.",
    highlights: [
      "Reviewed 1,000+ prompts spanning Python, JavaScript, and C++ to validate correctness and improve LLM reliability",
      "Delivered structured evaluations across 10+ AI models, improving output safety and reducing hallucinations",
      "Worked with repository-scale tasks, debugging multi-file logic and assessing model reasoning quality"
    ],
    tags: ["Python", "JavaScript", "C++", "LLMs", "AI Evaluation"],
  },
  {
    role: "Software Developer Intern",
    company: "Ford Motor Company",
    location: "Ottawa, ON",
    start: "September 2023",
    end: "December 2023",
    summary:
      "Built internal developer tools and data-processing utilities supporting vehicle connectivity, diagnostics, and debugging workflows.",
    highlights: [
      "Developed a C++ wrapper tool enabling 20+ engineers to read/write Qualcomm EFS & NV parameters previously locked behind vendor tooling",
      "Built a custom DLT plugin with a Qt-based UI to filter critical signals from log files of 50,000+ entries, saving engineers hours per debugging session",
      "Automated processing of 50+ fault codes per session with Python scripts, cutting manual Excel review time by 70% and speeding Jira ticket creation"
    ],
    tags: ["C++", "Qt", "Python", "Tooling", "Automation"],
  },
  {
    role: "System Engineer Intern",
    company: "PAL Aerospace",
    location: "Halifax, NS",
    start: "May 2023",
    end: "August 2023",
    summary:
      "Automated deployment workflows for aircraft mission systems software, improving reliability and reducing manual configuration time.",
    highlights: [
      "Automated offline installation & configuration for AIMS-ISR using Ansible, reducing manual setup effort by 60%",
      "Packaged playbooks into a Linux container for consistent, repeatable installs, cutting environment setup time by 40%",
      "Collaborated with cross-functional engineering teams using Agile, Jira, and Confluence to streamline deployment pipelines"
    ],
    tags: ["Ansible", "Linux", "Automation", "DevOps", "Containers"],
  },
];
