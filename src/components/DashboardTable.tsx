import { Disaster, getPriorityLevel } from "@/lib/disasters";
import { ArrowUpDown } from "lucide-react";

interface DashboardTableProps {
  disasters: Disaster[];
}

export default function DashboardTable({ disasters }: DashboardTableProps) {
  const priorityBadge = (score: number) => {
    const level = getPriorityLevel(score);
    const styles: Record<string, string> = {
      critical: "bg-destructive/10 text-destructive",
      high: "bg-destructive/10 text-destructive/80",
      medium: "bg-amber-500/10 text-amber-600",
      low: "bg-muted text-muted-foreground",
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    );
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-primary/10 text-primary",
      monitoring: "bg-amber-500/10 text-amber-600",
      resolved: "bg-muted text-muted-foreground",
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || ""}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-card-foreground tracking-tight">
          Active Incidents
          <span className="ml-2 text-xs font-normal text-muted-foreground">Sorted by priority</span>
        </h2>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowUpDown className="w-3 h-3" />
          <span>Priority</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted">
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Population</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Damage</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Shortage</th>
              <th className="text-right py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Level</th>
            </tr>
          </thead>
          <tbody>
            {disasters.map((d, i) => (
              <tr key={d.id} className="border-b border-muted/50 hover:bg-accent transition-colors duration-150">
                <td className="py-3 px-4 font-medium text-card-foreground">
                  {i === 0 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive mr-2 animate-pulse" />}
                  {d.location}
                </td>
                <td className="py-3 px-4 text-muted-foreground">{d.type}</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-card-foreground">{d.population.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-card-foreground">{d.damage}/10</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-card-foreground">{d.shortage}/10</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-card-foreground">{d.priority}</td>
                <td className="py-3 px-4">{statusBadge(d.status)}</td>
                <td className="py-3 px-4">{priorityBadge(d.priority)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
