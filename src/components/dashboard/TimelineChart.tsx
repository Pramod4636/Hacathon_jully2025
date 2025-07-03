
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan 1", completed: 4, failed: 1 },
  { date: "Jan 2", completed: 8, failed: 2 },
  { date: "Jan 3", completed: 6, failed: 0 },
  { date: "Jan 4", completed: 12, failed: 3 },
  { date: "Jan 5", completed: 5, failed: 1 },
  { date: "Jan 6", completed: 9, failed: 2 },
  { date: "Jan 7", completed: 7, failed: 1 },
];

export function TimelineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Migration Progress Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
            <Bar dataKey="failed" fill="#ef4444" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
