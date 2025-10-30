export default function Skills() {
  const skills = ["Java", "C", "Python", "TypeScript", "React", "Node.js", "Docker", "SQL", "Git", "Linux"];
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">Skills</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map(skill => (
          <span key={skill} className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-700">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
