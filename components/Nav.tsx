export default function Nav() {
  const links = [
    { name: "about", href: "#home" },       // or "/about"
    { name: "posts", href: "#" },           // wire later
    { name: "misc",  href: "#" },           // wire later
  ];

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="section container-wide h-12 flex items-center">
        <div className="ml-auto flex items-center gap-6 text-sm">
          {links.map(l => (
            <a
              key={l.name}
              href={l.href}
              className="no-underline text-neutral-700 hover:text-black underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-600"
            >
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
