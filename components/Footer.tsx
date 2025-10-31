export default function Footer() {
  return (
    <footer className="divider">
      <div className="section container-narrow py-8 text-center text-sm muted">
        © {new Date().getFullYear()} James Victor Alvarez — Built with Next.js & Tailwind
      </div>
    </footer>
  );
}
