import AppSidebar from "@/components/AppSidebar";
import MapView from "@/components/MapView";
import DashboardTable from "@/components/DashboardTable";
import StatsCards from "@/components/StatsCards";
import PriorityChart from "@/components/PriorityChart";
import IncidentForm from "@/components/IncidentForm";
import { useDisasters } from "@/hooks/useDisasters";
import { Radio } from "lucide-react";
import { Disaster } from "@/lib/disasters";

const Index = () => {
  const { disasters, addDisaster, stats } = useDisasters();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/30">
      <AppSidebar stats={stats} />

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="px-8 py-6 border-b border-border/50 bg-card/80 backdrop-blur-sm shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent tracking-tight">
                Disaster Resource Allocation Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
                <Radio className="w-4 h-4 text-destructive animate-pulse" />
                Real-time priority-based resource allocation system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <IncidentForm onAdd={addDisaster} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-8 p-8 overflow-auto">
          {/* Stats Cards */}
          <StatsCards 
            total={stats.total}
            active={stats.active}
            monitoring={stats.monitoring}
            resolved={stats.resolved}
            totalAffected={stats.totalAffected}
            avgPriority={stats.avgPriority}
            totalResourcesAllocated={stats.totalResourcesAllocated}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="h-[400px] shrink-0">
              <MapView disasters={disasters} />
            </div>
            
            {/* Priority Chart */}
            <PriorityChart disasters={disasters} />
          </div>

          {/* Table */}
          <div className="flex-1 min-h-0">
            <DashboardTable disasters={disasters} />
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-border/50 bg-card/50 backdrop-blur-sm text-xs text-muted-foreground flex items-center justify-between">
          <span>🔄 Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Disaster Resource Allocation System — Innovates 2026 Hackathon Prototype</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
