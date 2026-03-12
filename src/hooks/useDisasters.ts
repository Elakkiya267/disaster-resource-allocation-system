import { useState, useCallback } from "react";
import { Disaster, SAMPLE_DISASTERS, calculatePriority, Resource } from "@/lib/disasters";

export function useDisasters() {
  const [disasters, setDisasters] = useState<Disaster[]>(
    [...SAMPLE_DISASTERS].sort((a, b) => b.priority - a.priority)
  );

  const [availableResources] = useState<Resource[]>([
    { id: 1, name: "Medical Teams", type: "medical", quantity: 50, status: "available" },
    { id: 2, name: "Food Packets", type: "food", quantity: 10000, status: "available" },
    { id: 3, name: "Emergency Shelters", type: "shelter", quantity: 500, status: "available" },
    { id: 4, name: "Rescue Teams", type: "rescue", quantity: 30, status: "available" },
    { id: 5, name: "Transport Vehicles", type: "transport", quantity: 25, status: "available" },
  ]);

  const addDisaster = useCallback((data: {
    location: string;
    lat: number;
    lng: number;
    population: number;
    damage: number;
    shortage: number;
    type: string;
  }) => {
    const priority = calculatePriority(data.population, data.damage, data.shortage);
    const newDisaster: Disaster = {
      id: Date.now(),
      ...data,
      priority,
      status: "active",
      createdAt: new Date().toISOString(),
      assignedResources: 0,
    };
    setDisasters(prev =>
      [newDisaster, ...prev].sort((a, b) => b.priority - a.priority)
    );
  }, []);

  const updateDisasterStatus = useCallback((id: number, status: "active" | "monitoring" | "resolved") => {
    setDisasters(prev =>
      prev.map(d => d.id === id ? { ...d, status } : d)
        .sort((a, b) => b.priority - a.priority)
    );
  }, []);

  const assignResource = useCallback((disasterId: number, resourceId: number, quantity: number) => {
    setDisasters(prev =>
      prev.map(d => {
        if (d.id === disasterId) {
          const resource = availableResources.find(r => r.id === resourceId);
          return {
            ...d,
            assignedResources: (d.assignedResources || 0) + quantity,
            resources: [
              ...(d.resources || []),
              {
                id: resourceId,
                name: resource?.name || "Unknown",
                type: resource?.type || "medical",
                quantity,
                status: "allocated" as const,
              }
            ]
          };
        }
        return d;
      })
    );
  }, [availableResources]);

  const deleteDisaster = useCallback((id: number) => {
    setDisasters(prev => prev.filter(d => d.id !== id));
  }, []);

  const stats = {
    total: disasters.length,
    active: disasters.filter(d => d.status === "active").length,
    monitoring: disasters.filter(d => d.status === "monitoring").length,
    resolved: disasters.filter(d => d.status === "resolved").length,
    totalAffected: disasters.reduce((sum, d) => sum + d.population, 0),
    avgPriority: +(disasters.reduce((sum, d) => sum + d.priority, 0) / disasters.length).toFixed(1),
    totalResourcesAllocated: disasters.reduce((sum, d) => sum + (d.assignedResources || 0), 0),
  };

  return { 
    disasters, 
    addDisaster, 
    stats, 
    availableResources,
    assignResource,
    updateDisasterStatus,
    deleteDisaster
  };
}
