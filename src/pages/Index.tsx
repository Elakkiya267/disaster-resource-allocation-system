import AppSidebar from "@/components/AppSidebar";
import MapView from "@/components/MapView";
import DashboardTable from "@/components/DashboardTable";
import IncidentForm from "@/components/IncidentForm";
import { useDisasters } from "@/hooks/useDisasters";
import { Radio } from "lucide-react";

const Index = () => {
  const { disasters, addDisaster, stats } = useDisasters();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar stats={stats} />

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="px-8 py-4 border-b border-border flex items-center justify-between bg-card">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Active Incidents</h1>
            <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-destructive" />
              Real-time disaster monitoring and resource allocation
            </p>
          </div>
          <IncidentForm onAdd={addDisaster} />
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-auto">
          {/* Map */}
          <div className="h-[280px] shrink-0">
            <MapView disasters={disasters} />
          </div>

          {/* Table */}
          <div className="flex-1 min-h-0">
            <DashboardTable disasters={disasters} />
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Disaster Resource Allocation System — Innovates 2026</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
