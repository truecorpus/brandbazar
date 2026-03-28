import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, ShoppingBag, FileText, Palette, MapPin,
  Settings, Bell, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "My Quotes", href: "/dashboard/quotes", icon: FileText, corporateOnly: true },
  { label: "Artwork & Mockups", href: "/dashboard/artwork", icon: Palette },
  { label: "Addresses", href: "/dashboard/addresses", icon: MapPin },
  { label: "Profile Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
];

const corporateNavItems = [
  { label: "Corporate Home", href: "/dashboard/corporate", icon: LayoutDashboard },
  { label: "Bulk Orders", href: "/dashboard/corporate/bulk-order", icon: ShoppingBag },
  { label: "Brand Assets", href: "/dashboard/corporate/brand-assets", icon: Palette },
  { label: "Team Members", href: "/dashboard/corporate/team", icon: Settings },
  { label: "Invoices & Billing", href: "/dashboard/corporate/invoices", icon: FileText },
];

const DashboardLayout = () => {
  const { user, profile, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCorporate = role === "corporate_client";
  const filteredNav = navItems.filter((item) => !item.corporateOnly || isCorporate);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? location.pathname === "/dashboard" : location.pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border shrink-0">
        <Link to="/" className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-semibold text-sm">B</span>
          </div>
          <span className="text-lg font-heading font-semibold tracking-tight ml-1.5">
            <span className="text-foreground">Brand</span>
            <span className="text-primary">Bazaar</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {filteredNav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
              isActive(item.href)
                ? "bg-primary/[0.08] text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}

        {isCorporate && (
          <>
            <div className="pt-4 pb-1 px-3">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Corporate</p>
            </div>
            {corporateNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-primary/[0.08] text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-border p-4 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {(profile?.full_name || user?.email || "U").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{profile?.full_name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-destructive gap-2" onClick={handleSignOut}>
          <LogOut size={16} /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[240px] shrink-0 bg-background border-r border-border flex-col fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-background shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-20">
          <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <Link to="/dashboard/notifications" className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
