import { Activity, AlertTriangle, BarChart3, Users } from "lucide-react";

interface AppSidebarProps {
  stats: {
    total: number;
    active: number;
    monitoring: number;
    resolved: number;
    totalAffected: number;
    avgPriority: number;
    totalResourcesAllocated: number;
  };
}

export default function AppSidebar({ stats }: AppSidebarProps) {
  const statItems = [
    { label: "Active Incidents", value: stats.active, icon: AlertTriangle },
    { label: "Total Tracked", value: stats.total, icon: Activity },
    { label: "People Affected", value: stats.totalAffected.toLocaleString(), icon: Users },
    { label: "Avg Priority", value: stats.avgPriority, icon: BarChart3 },
  ];

  return (
    <aside className="w-[280px] shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-accent-foreground tracking-tight">DisasterOS</h1>
            <p className="text-xs text-sidebar-foreground">Resource Allocation</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4 space-y-1 flex-1">
        <p className="text-xs font-medium text-sidebar-foreground px-2 pb-2 uppercase tracking-wider">Overview</p>
        {statItems.map(item => (
          <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sidebar-accent transition-colors duration-150">
            <item.icon className="w-4 h-4 text-sidebar-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-sidebar-foreground">{item.label}</p>
              <p className="text-sm font-semibold text-sidebar-accent-foreground font-mono tabular-nums">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground">Innovates 2026 Hackathon</p>
        <p className="text-xs text-sidebar-foreground mt-0.5">v1.0.0 — Prototype</p>
      </div>
    </aside>
  );
}
