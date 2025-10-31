export default function Experience() {
  const items = [
    {
      role: "Software Intern",
      org: "MR Control Systems International",
      period: "May – Aug 2024",
      points: [
        "Built IoT automation dashboards in React.",
        "Integrated Sinolta data sources; improved ops efficiency.",
      ],
    },
    {
      role: "Lorem Ipsum)",
      org: "Concordia University",
      period: "Jan – Apr 2025",
      points: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper sagittis tincidunt. Donec vitae ornare sapien. Aenean sed quam vel sapien gravida aliquam non vitae sapien. ",
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
