export default function Experience() {
  const experiences = [
    {
      role: "Software Intern",
      company: "MR Control Systems International",
      period: "May – Aug 2024",
      details: [
        "Built IoT automation dashboards and modules in React.",
        "Integrated Sinolta data sources for automation workflows.",
      ],
    },
    {
      role: "Teaching Assistant",
      company: "Concordia University",
      period: "Jan – Apr 2025",
      details: ["Led labs in Data Structures (COMP-352).", "Reviewed code and complexity analyses."],
    },
  ];

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Experience</h2>
      <div className="grid gap-6">
        {experiences.map((exp, i) => (
          <div key={i} className="border rounded-xl p-6 bg-white shadow-sm">
            <h3 className="font-semibold text-xl">{exp.role}</h3>
            <p className="text-sm text-neutral-600">{exp.company} • {exp.period}</p>
            <ul className="list-disc pl-6 text-sm text-neutral-600 mt-2">
              {exp.details.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
