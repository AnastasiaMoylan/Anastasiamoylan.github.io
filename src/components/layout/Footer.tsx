export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12">
      <div className="content-container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <ul className="list-none p-0 m-0 flex flex-wrap gap-6">
          <li>
            <a
              href="mailto:anastasiamoylan@gmail.com"
              className="text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
            >
              anastasiamoylan@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/anastasia-novelly-moylan-76a70052"
              className="text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="/resume"
              className="text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
            >
              Resume
            </a>
          </li>
        </ul>
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Anastasia Novelly Moylan
          </span>
          <a
            href="#top"
            className="text-sm text-accent hover:text-foreground no-underline transition-colors duration-150"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
