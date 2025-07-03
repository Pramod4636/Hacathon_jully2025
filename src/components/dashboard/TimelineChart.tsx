import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function TimelineChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/timeline-chart")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

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
