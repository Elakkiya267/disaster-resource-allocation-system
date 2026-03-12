import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getPriorityLevel } from "@/lib/disasters";
import { Disaster } from "@/lib/disasters";

interface PriorityChartProps {
  disasters: Disaster[];
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#6b7280"]; // red, orange, yellow, gray

const PriorityChart = ({ disasters }: PriorityChartProps) => {
  const priorityData = ["critical", "high", "medium", "low"] as const;
  
  const chartData = priorityData.map(level => {
    const count = disasters.filter(d => getPriorityLevel(d.priority) === level).length;
    return {
      name: level.charAt(0).toUpperCase() + level.slice(1),
      value: count,
      fill: COLORS[priorityData.indexOf(level)],
    };
  }).filter(d => d.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-8 flex flex-col items-center justify-center border border-border/50 h-[300px]">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No Data</h3>
        <p className="text-sm text-muted-foreground">Add incidents to see priority distribution</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">Priority Distribution</h3>
        <p className="text-sm text-muted-foreground">Disasters by priority level</p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              nameKey="name"
              cornerRadius={8}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} incidents`, "Count"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.fill }}
            />
            <span className="font-medium">{entry.name}</span>
            <span className="text-muted-foreground">({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityChart;

