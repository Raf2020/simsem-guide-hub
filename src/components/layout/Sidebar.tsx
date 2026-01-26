import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  MapPin, 
  Gift, 
  Users, 
  Plane, 
  CreditCard, 
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutGrid, label: "Home", href: "/" },
  { icon: MapPin, label: "Experiences", href: "/experiences" },
  { icon: Star, label: "Reviews", href: "/reviews", active: true },
  { icon: Gift, label: "Promotions", href: "/promotions" },
  { icon: Users, label: "Hosts", href: "/hosts" },
  { icon: Plane, label: "Travelers", href: "/travelers", badge: "SOON" },
  { icon: CreditCard, label: "Payments", href: "/payments", badge: "SO..." },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-sidebar-primary text-4xl font-script">Simsem</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  item.active 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon size={20} className={item.active ? "text-sidebar-primary" : ""} />
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-warning text-warning-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-semibold">
            S
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-sidebar-foreground/70">Logged in as:</p>
              <p className="text-sm font-medium truncate">admin@email.com</p>
            </div>
          )}
        </div>
        <button className={cn(
          "flex items-center gap-3 w-full px-4 py-3 mt-4 rounded-lg hover:bg-sidebar-accent/50 transition-colors",
          collapsed && "justify-center px-2"
        )}>
          <LogOut size={20} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
