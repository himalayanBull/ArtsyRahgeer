import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-tight">
              Artsy Rahgeer
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              Original canvas paintings by Pragya Shah. Each piece captures
              the beauty of nature, emotion, and the human experience — a
              unique journey from inspiration to creation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/collections", label: "Collections" },
                { href: "/story", label: "Artist Story" },
                { href: "/commission", label: "Commissions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact" },
                { href: "https://www.instagram.com/artsy.rahgeer/", label: "Instagram" },
                { href: "#", label: "Newsletter" },
                { href: "#", label: "Studio Visits" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Artsy Rahgeer. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Admin
          </Link>
          <p className="text-xs text-muted-foreground">
            Every painting tells a story
          </p>
        </div>
      </div>
    </footer>
  );
}
