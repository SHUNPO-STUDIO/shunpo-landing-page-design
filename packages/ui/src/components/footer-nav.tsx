import { cn } from "../lib/cn.ts";

interface FooterNavLink {
  label: string;
  href: string;
}

interface FooterNavProps {
  title: string;
  links: FooterNavLink[];
  className?: string;
}

/* One titled column of footer links. Place inside `FooterColumns`. */
export function FooterNav({ title, links, className }: FooterNavProps) {
  return (
    <nav
      aria-label={title}
      data-slot="footer-nav"
      className={cn("flex flex-col gap-3 lg:col-span-2", className)}
    >
      <p aria-hidden="true" className="text-xs font-medium text-muted-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex min-h-6 items-center text-sm text-foreground decoration-current/40 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
