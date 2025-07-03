import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

const cardMeta = [
  {
    title: "Total Servers",
    key: "total_servers",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Ready Servers",
    key: "ready_servers",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Blocked Servers",
    key: "blocked_servers",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Migrated Servers",
    key: "migrated_servers",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "PostCheck Passed",
    key: "postcheck_passed",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export function SummaryCards() {
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard-summary")
      .then(res => res.json())
      .then(data => setSummary(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cardMeta.map((meta, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {meta.title}
            </CardTitle>
            <div className={`${meta.bgColor} p-2 rounded-lg`}>
              <meta.icon className={`h-4 w-4 ${meta.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{summary[meta.key] ?? "-"}</div>
            {/* You can add a change/description field if your backend provides it */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
