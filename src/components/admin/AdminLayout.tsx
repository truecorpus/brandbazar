import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, ShoppingCart, Factory, Package, MessageSquareQuote,
  RotateCcw, Box, FolderTree, Palette, Warehouse, Users, Building2,
  Star, Image, Layers, Activity, Ticket, FileImage, Mail,
  CreditCard, FileText, Receipt, TrendingUp, Settings, Truck,
  Calculator, UserCog, ScrollText, ChevronDown, ChevronRight,
  LogOut, Menu, X, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSection {
  label: string;
  items: { to: string; icon: React.ElementType; label: string }[];
}

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Orders",
    items: [
      { to: "/admin/orders", icon: ShoppingCart, label: "All Orders" },
      { to: "/admin/production", icon: Factory, label: "Production Queue" },
      { to: "/admin/bulk-orders", icon: Package, label: "Bulk Orders" },
      { to: "/admin/quotes", icon: MessageSquareQuote, label: "Quote Requests" },
      { to: "/admin/returns", icon: RotateCcw, label: "Returns & Refunds" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { to: "/admin/products", icon: Box, label: "Products" },
      { to: "/admin/categories", icon: FolderTree, label: "Categories" },
      { to: "/admin/customization", icon: Palette, label: "Customization Options" },
      { to: "/admin/inventory", icon: Warehouse, label: "Inventory" },
    ],
  },
  {
    label: "Customers",
    items: [
      { to: "/admin/customers", icon: Users, label: "All Customers" },
      { to: "/admin/corporate", icon: Building2, label: "Corporate Accounts" },
      { to: "/admin/reviews", icon: Star, label: "Customer Reviews" },
    ],
  },
  {
    label: "Design & Production",
    items: [
      { to: "/admin/artwork", icon: Image, label: "Artwork Reviews" },
      { to: "/admin/mockups", icon: Layers, label: "Mockup Manager" },
      { to: "/admin/tracker", icon: Activity, label: "Production Tracker" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/admin/coupons", icon: Ticket, label: "Coupons & Offers" },
      { to: "/admin/cms", icon: FileImage, label: "Banners & CMS" },
      { to: "/admin/email-campaigns", icon: Mail, label: "Email Campaigns" },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/admin/payments", icon: CreditCard, label: "Payments" },
      { to: "/admin/invoices", icon: FileText, label: "Invoices" },
      { to: "/admin/gst-reports", icon: Receipt, label: "GST Reports" },
      { to: "/admin/payouts", icon: TrendingUp, label: "Payout Tracker" },
    ],
  },
  {
    label: "Settings",
    items: [
      { to: "/admin/settings", icon: Settings, label: "Store Settings" },
      { to: "/admin/shipping", icon: Truck, label: "Shipping Settings" },
      { to: "/admin/tax", icon: Calculator, label: "Tax Settings" },
      { to: "/admin/staff", icon: UserCog, label: "Staff Accounts" },
      { to: "/admin/audit-log", icon: ScrollText, label: "Audit Log" },
    ],
  },
];

const AdminLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setCollapsedSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BB</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-[15px] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              BrandBazaar
            </h1>
            <p className="text-[11px] text-gray-400 -mt-0.5">Admin Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin">
        {navSections.map((section) => {
          const isCollapsed = collapsedSections[section.label];
          return (
            <div key={section.label}>
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-2 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
              >
                {section.label}
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/admin"}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                          isActive
                            ? "bg-[#1A73E8] text-white shadow-lg shadow-blue-500/20"
                            : "text-gray-300 hover:bg-white/[0.08] hover:text-white"
                        )
                      }
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User section */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#1A73E8]/20 flex items-center justify-center text-[#8AB4F8] text-xs font-semibold">
            {profile?.full_name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-medium truncate">{profile?.full_name || "Admin"}</p>
            <p className="text-gray-400 text-[11px]">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-white/[0.08] rounded-lg text-[13px] transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#202124] transition-all duration-300 flex-shrink-0",
          sidebarOpen ? "w-[260px]" : "w-0 overflow-hidden"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-[280px] bg-[#202124] flex flex-col h-full shadow-2xl">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-[#DADCE0] flex items-center justify-between px-4 lg:px-6 flex-shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth >= 1024) setSidebarOpen(!sidebarOpen);
                else setMobileSidebarOpen(!mobileSidebarOpen);
              }}
              className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5 text-[#5F6368]" /> : <Menu className="w-5 h-5 text-[#5F6368]" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-[#5F6368]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
