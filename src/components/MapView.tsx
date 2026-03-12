import { Disaster, getPriorityLevel } from "@/lib/disasters";
import { MapPin } from "lucide-react";

interface MapViewProps {
  disasters: Disaster[];
}

export default function MapView({ disasters }: MapViewProps) {
  // Simple visual map representation using positioned dots
  // In production, replace with Leaflet or Google Maps
  const bounds = {
    minLat: 10, maxLat: 32,
    minLng: 68, maxLng: 125,
  };

  const toPos = (lat: number, lng: number) => ({
    left: `${((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100}%`,
    top: `${(1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100}%`,
  });

  const priorityColor: Record<string, string> = {
    critical: "bg-destructive",
    high: "bg-destructive/70",
    medium: "bg-amber-500",
    low: "bg-muted-foreground/40",
  };

  return (
    <div className="bg-card rounded-lg shadow-card h-full flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-card-foreground tracking-tight">Geographic Overview</h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive inline-block" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" /> Low</span>
        </div>
      </div>
      <div className="flex-1 relative bg-muted/50 min-h-[200px]">
        {/* Grid lines for visual reference */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(hsl(240 6% 70%) 1px, transparent 1px), linear-gradient(90deg, hsl(240 6% 70%) 1px, transparent 1px)",
          backgroundSize: "10% 10%",
        }} />

        {disasters.map(d => {
          const pos = toPos(d.lat, d.lng);
          const level = getPriorityLevel(d.priority);
          return (
            <div
              key={d.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: pos.left, top: pos.top }}
            >
              {/* Pulse ring for active */}
              {d.status === "active" && (
                <span className={`absolute inset-0 rounded-full ${priorityColor[level]} opacity-30 animate-ping`} />
              )}
              <div className={`w-3 h-3 rounded-full ${priorityColor[level]} relative ring-2 ring-card shadow-md cursor-pointer`} />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                <div className="bg-foreground text-background text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                  <div className="font-semibold">{d.location}</div>
                  <div className="text-background/70">{d.type} · Priority: <span className="font-mono">{d.priority}</span></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map label */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>South & Southeast Asia Region</span>
        </div>
      </div>
    </div>
  );
}
