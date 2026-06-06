import Link from "next/link";
import { Palette, Layers, ShoppingCart, MessageSquare, LayoutDashboard, ImageIcon } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Artworks", icon: Palette },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/site-images", label: "Site Images", icon: ImageIcon },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/commissions", label: "Commissions", icon: MessageSquare },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20 min-h-screen">
      <div className="flex">
        <aside className="hidden lg:block w-64 border-r min-h-[calc(100vh-5rem)] p-6 shrink-0">
          <h2 className="font-serif text-lg mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t">
            <LogoutButton />
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
