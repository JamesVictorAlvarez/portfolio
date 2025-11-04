export default function Experience() {
  const items = [
    {
      role: "Software Intern",
      org: "MR Control Systems International",
      period: "May – Aug 2024",
      points: [
        "Built IoT automation dashboards.",
        "Integrated Sinolta data sources; improved ops efficiency.",
      ],
    },
    {
      role: "GameJam UdeM",
      org: "Université de Montréal",
      period: "May 2025",
      points: [
        "Designed and developed an educational 3D game that helps teachers understand how students feel and learn through interactive level-based experiences",
        "Built in Unity using C#, with each level presenting unique challenges",
      ],
    },
    {
      role: "ConUHacks IX",
      org: "Concordia University",
      period: "Feb 2025",
      points: [
        "Helped implement a first-person ray-casting engine from scratch in C++ using SDL2 for rendering and real-time graphics",
        "Developed a multiplayer architecture supporting both TCP and UDP sockets",
      ],
    },
    {
      role: "JACHacks",
      org: "John Abott College",
      period: "May 2024",
      points: [
        "Winner of Valnet Mini Challenge",
        "Built an AI-driven web-scraping system to measure news timeliness and implemented keyword extraction using NLP/AI models to identify content overlaps",
        "Automated data extraction from Excel sheets, GameRant articles, and Twitter posts, handling rate limits and structural differences across websites",
      ],
    },
    {
      role: "GameJam DINGO",
      org: "Vanier College",
      period: "Jan 2024",
      points: [
        "Developed a 2D platformer in Unity where players use magic abilities that dynamically alter parkour mechanics and character effects",
      ],
    },
  ];

  return (
    <section id="experience" className="section container-narrow">
      <h2 className="h2 mb-8">Experience</h2>
      <div className="space-y-8">
        {items.map((e, i) => (
          <div key={i}>
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="h3">{e.role}</h3>
              <span className="muted">• {e.org}</span>
              <span className="muted ml-auto text-sm">{e.period}</span>
            </div>
            <ul className="list-disc pl-6 muted mt-2 space-y-1">
              {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
