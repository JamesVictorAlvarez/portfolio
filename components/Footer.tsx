import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="">
      <div className="section container-narrow py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/JamesVictorAlvarez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/jv-alvarez/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="mailto:jamesvictoralvarez@gmail.com"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] no-underline transition-colors"
            aria-label="Email"
          >
            <HiOutlineMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
