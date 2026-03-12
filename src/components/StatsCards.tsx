import { useEffect, useState } from "react";
import { AlertTriangle, Activity, Users, BarChart3, Truck, Package } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  trend: "up" | "down" | "stable";
  icon: React.ElementType;
  color: "destructive" | "primary" | "secondary" | "accent";
}

interface StatsCardsProps {
  total: number;
  active: number;
  monitoring: number;
  resolved: number;
  totalAffected: number;
  avgPriority: number;
  totalResourcesAllocated: number;
}

const StatItemCard = ({ item }: { item: StatItem }) => {
  const Icon = item.icon;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = typeof item.value === "number" ? item.value : 0;
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [item.value]);

  const formattedValue = typeof item.value === "number" 
    ? item.value.toLocaleString() 
    : item.value;

  return (
    <div className="group relative bg-card hover:bg-card/80 p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 h-[120px] flex flex-col justify-between overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${item.color === "destructive" ? "from-destructive to-destructive/80" : item.color === "primary" ? "from-primary to-primary/80" : "from-accent to-secondary"}`}>
        <Icon className="w-6 h-6 text-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
          {item.label}
        </p>
        <p className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${item.color === "destructive" ? "from-destructive via-destructive/90 to-destructive" : "from-foreground to-muted-foreground"}`}>
          {count.toLocaleString()}
        </p>
        {item.change && (
          <p className={`text-xs font-medium mt-0.5 flex items-center gap-1 ${item.trend === "up" ? "text-green-500" : "text-destructive"}`}>
            {item.trend === "up" ? "↗" : "↘"} {item.change}
          </p>
        )}
      </div>
    </div>
  );
};

export default function StatsCards({ 
  total, 
  active, 
  monitoring, 
  resolved, 
  totalAffected, 
  avgPriority, 
  totalResourcesAllocated 
}: StatsCardsProps) {
const stats: StatItem[] = [
    {
      label: "Active Incidents",
      value: active,
      trend: "up" as const,
      change: "+2 (24h)",
      icon: AlertTriangle,
      color: "destructive" as const,
    },
    {
      label: "Total Affected",
      value: totalAffected,
      trend: "stable" as const,
      change: "1.2M",
      icon: Users,
      color: "primary" as const,
    },
    {
      label: "Avg Priority",
      value: avgPriority.toFixed(1),
      trend: "up" as const,
      change: "+3.2%",
      icon: BarChart3,
      color: "accent" as const,
    },
    {
      label: "Resources Allocated",
      value: totalResourcesAllocated,
      trend: "up" as const,
      change: "+15 (24h)",
      icon: Truck,
      color: "secondary" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatItemCard key={stat.label} item={stat} />
      ))}
    </div>
  );
}

