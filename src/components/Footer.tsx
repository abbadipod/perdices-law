import { navLinks } from "@/content/site";
import CrestMark from "@/components/CrestMark";

export default function Footer() {
  return (
    <footer className="bg-ink px-7 pb-11 pt-14">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-wrap items-center justify-between gap-7 border-b border-comet/30 pb-[26px]">
          <a href="#top" className="flex items-center gap-2.5">
            <CrestMark size={30} />
            <span className="font-display text-xs uppercase tracking-[0.18em] text-paper">
              Perdices Law
            </span>
          </a>
          <ul className="flex flex-wrap gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  // Inline padding: enlarges the tap target without changing
                  // the footer's layout.
                  className="py-2 text-[10px] uppercase tracking-[0.2em] text-sidewalk transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-[80ch] text-xs leading-[1.7] text-comet">
          Atty. Jose Mari V. Perdices is admitted to practice law in the
          Philippines (Roll of Attorneys No. 51416) and in Washington State,
          USA (WSBA No. 61514). The firm practises Philippine law; his United
          States experience was gained in non-attorney roles. This website is
          for informational purposes only and does not constitute legal advice.
          Prior results do not guarantee a similar outcome.
        </p>
        <p className="mt-3.5 text-xs text-comet">
          © {new Date().getFullYear()} Perdices Law. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
