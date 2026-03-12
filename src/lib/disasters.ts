export interface Disaster {
  id: number;
  location: string;
  lat: number;
  lng: number;
  population: number;
  damage: number;       // 1-10
  shortage: number;     // 1-10
  priority: number;
  type: string;
  status: "active" | "monitoring" | "resolved";
  createdAt: string;
}

export function calculatePriority(population: number, damage: number, shortage: number): number {
  // Normalize population to 0-100 scale (assume max 10M)
  const popNorm = Math.min(population / 100000, 100);
  return +(popNorm * 0.5 + damage * 3 + shortage * 2).toFixed(1);
}

export function getPriorityLevel(score: number): "critical" | "high" | "medium" | "low" {
  if (score >= 40) return "critical";
  if (score >= 25) return "high";
  if (score >= 12) return "medium";
  return "low";
}

export const SAMPLE_DISASTERS: Disaster[] = ([
  {
    id: 1, location: "Mumbai, India", lat: 19.076, lng: 72.8777,
    population: 1240500, damage: 8, shortage: 9, priority: 0,
    type: "Flood", status: "active" as const, createdAt: "2026-03-12T08:30:00Z"
  },
  {
    id: 2, location: "Kathmandu, Nepal", lat: 27.7172, lng: 85.324,
    population: 820000, damage: 9, shortage: 7, priority: 0,
    type: "Earthquake", status: "active", createdAt: "2026-03-11T14:00:00Z"
  },
  {
    id: 3, location: "Dhaka, Bangladesh", lat: 23.8103, lng: 90.4125,
    population: 540000, damage: 6, shortage: 8, priority: 0,
    type: "Cyclone", status: "active", createdAt: "2026-03-12T02:15:00Z"
  },
  {
    id: 4, location: "Chennai, India", lat: 13.0827, lng: 80.2707,
    population: 310000, damage: 4, shortage: 5, priority: 0,
    type: "Flood", status: "monitoring", createdAt: "2026-03-10T18:45:00Z"
  },
  {
    id: 5, location: "Manila, Philippines", lat: 14.5995, lng: 120.9842,
    population: 670000, damage: 7, shortage: 6, priority: 0,
    type: "Typhoon", status: "active", createdAt: "2026-03-12T06:00:00Z"
  },
] as const).map(d => ({ ...d, priority: calculatePriority(d.population, d.damage, d.shortage) }));
