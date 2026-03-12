import { Disaster, getPriorityLevel } from "@/lib/disasters";
import { useDisasters } from "@/hooks/useDisasters";
import { ArrowUpDown, Package, Play, Pause, CheckCircle2, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardTableProps {
  disasters: Disaster[];
}

export default function DashboardTable({ disasters }: DashboardTableProps) {
  const { assignResource, updateDisasterStatus, deleteDisaster } = useDisasters();

  const priorityBadge = (score: number) => {
    const level = getPriorityLevel(score);
    const styles: Record<string, string> = {
      critical: "bg-destructive/10 text-destructive border border-destructive/20",
      high: "bg-destructive/10 text-destructive/80 border border-destructive/10",
      medium: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
      low: "bg-muted text-muted-foreground border border-border",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold h-7 ${styles[level]} shadow-sm`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  const statusBadge = (status: Disaster["status"]) => {
    const styles: Record<Disaster["status"], string> = {
      active: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
      monitoring: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
      resolved: "bg-muted text-muted-foreground border border-border",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold h-7 ${styles[status]} shadow-sm`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStatusIcon = (status: Disaster["status"]) => {
    switch (status) {
      case "active": return Play;
      case "monitoring": return Pause;
      case "resolved": return CheckCircle2;
      default: return Play;
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 bg-gradient-to-r from-card via-card to-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-card-foreground tracking-tight">
              Incident Management
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{disasters.length} active incidents • Priority sorted</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <ArrowUpDown className="w-3 h-3" />
            <span>Priority ↓</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/20 bg-muted/30">
              {[
                { label: "Location", align: "left" as const },
                { label: "Type", align: "left" as const },
                { label: "Population", align: "right" as const },
                { label: "Damage", align: "right" as const },
                { label: "Resources", align: "right" as const },
                { label: "Priority", align: "right" as const },
                { label: "", align: "right" as const },
              ].map((header) => (
                <th 
                  key={header.label}
                  className={`py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${header.align === "right" ? "text-right" : "text-left"}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {disasters.map((d, i) => {
              const StatusIcon = getStatusIcon(d.status);
              return (
                <tr 
                  key={d.id} 
                  className="group/table border-b border-border/10 hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/20 transition-all duration-300"
                >
                  {/* Location */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      {i === 0 && (
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse shadow-lg shadow-destructive/25" />
                      )}
                      <div>
                        <div className="font-semibold text-card-foreground group-hover/table:font-bold transition-all">
                          {d.location}
                        </div>
                        <div className="text-xs text-muted-foreground">{d.type}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Population */}
                  <td className="py-5 px-6 text-right">
                    <span className="text-sm font-mono tabular-nums text-card-foreground">
                      {d.population.toLocaleString()}
                    </span>
                  </td>

                  {/* Damage */}
                  <td className="py-5 px-6 text-right">
                    <div className="text-sm font-mono tabular-nums text-destructive font-semibold">
                      {d.damage}/10
                    </div>
                  </td>

                  {/* Resources */}
                  <td className="py-5 px-6 text-right">
                    <div className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shadow-sm h-10 ${
                      (d.assignedResources || 0) > 0 
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                        : "bg-muted/50 text-muted-foreground border border-border"
                    }`}>
                      <Package className="w-4 h-4" />
                      {(d.assignedResources || 0).toLocaleString()}
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="py-5 px-6 text-right">
                    <div className="font-mono text-lg font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
                      {d.priority}
                    </div>
                  </td>

                  {/* Status & Actions */}
                  <td className="py-5 px-6 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-9 h-9 gap-1.5 p-1.5 rounded-xl shadow-sm ${d.status === "active" ? "bg-emerald-500/10" : d.status === "monitoring" ? "bg-amber-500/10" : "bg-muted/50"}`}>
                        <StatusIcon className={`w-4 h-4 ${d.status === "active" ? "text-emerald-600" : d.status === "monitoring" ? "text-amber-600" : "text-muted-foreground"}`} />
                      </div>
                      {statusBadge(d.status)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {disasters.length === 0 && (
        <div className="p-16 text-center border-t border-border/50">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
            <ArrowUpDown className="w-8 h-8 text-muted-foreground rotate-12" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No incidents yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Add your first disaster report using the form above</p>
        </div>
      )}
    </div>
  );
}

