import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface IncidentFormProps {
  onAdd: (data: {
    location: string;
    lat: number;
    lng: number;
    population: number;
    damage: number;
    shortage: number;
    type: string;
  }) => void;
}

export default function IncidentForm({ onAdd }: IncidentFormProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    location: "",
    lat: "",
    lng: "",
    population: "",
    damage: "",
    shortage: "",
    type: "Flood",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      location: form.location,
      lat: parseFloat(form.lat) || 20,
      lng: parseFloat(form.lng) || 80,
      population: parseInt(form.population) || 0,
      damage: Math.min(10, Math.max(1, parseInt(form.damage) || 1)),
      shortage: Math.min(10, Math.max(1, parseInt(form.shortage) || 1)),
      type: form.type,
    });
    setForm({ location: "", lat: "", lng: "", population: "", damage: "", shortage: "", type: "Flood" });
    setOpen(false);
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Add Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="tracking-tight">Report New Incident</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="location">Location Name</Label>
            <Input id="location" placeholder="e.g. Jakarta, Indonesia" value={form.location} onChange={e => update("location", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input id="lat" type="number" step="any" placeholder="e.g. 19.076" value={form.lat} onChange={e => update("lat", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input id="lng" type="number" step="any" placeholder="e.g. 72.877" value={form.lng} onChange={e => update("lng", e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Disaster Type</Label>
            <select
              id="type"
              value={form.type}
              onChange={e => update("type", e.target.value)}
              className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm shadow-[0_0_0_1px_hsl(var(--input))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] transition-shadow duration-150 outline-none"
            >
              {["Flood", "Earthquake", "Cyclone", "Typhoon", "Wildfire", "Drought", "Tsunami"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="population">Population Affected</Label>
            <Input id="population" type="number" placeholder="e.g. 500000" value={form.population} onChange={e => update("population", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="damage">Damage Level (1-10)</Label>
              <Input id="damage" type="number" min="1" max="10" placeholder="1-10" value={form.damage} onChange={e => update("damage", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortage">Resource Shortage (1-10)</Label>
              <Input id="shortage" type="number" min="1" max="10" placeholder="1-10" value={form.shortage} onChange={e => update("shortage", e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add Incident</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
