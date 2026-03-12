import { useState } from "react";
import { Disaster, SAMPLE_DISASTERS, calculatePriority } from "@/lib/disasters";

export function useDisasters() {
  const [disasters, setDisasters] = useState<Disaster[]>(
    [...SAMPLE_DISASTERS].sort((a, b) => b.priority - a.priority)
  );

  const addDisaster = (data: {
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
    };
    setDisasters(prev =>
      [newDisaster, ...prev].sort((a, b) => b.priority - a.priority)
    );
  };

  const stats = {
    total: disasters.length,
    active: disasters.filter(d => d.status === "active").length,
    totalAffected: disasters.reduce((sum, d) => sum + d.population, 0),
    avgPriority: +(disasters.reduce((sum, d) => sum + d.priority, 0) / disasters.length).toFixed(1),
  };

  return { disasters, addDisaster, stats };
}
