
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SummaryCards } from "./SummaryCards";
import { MigrationChart } from "./MigrationChart";
import { TimelineChart } from "./TimelineChart";
import { AlertsFeed } from "./AlertsFeed";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Migration Dashboard</h1>
          <p className="text-gray-600 mt-1">Infrastructure migration progress and insights</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          System Healthy
        </Badge>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MigrationChart />
        <TimelineChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Server Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { server: "PROD-WEB-01", status: "success", action: "PostCheck Completed", time: "2 min ago" },
                  { server: "UAT-DB-03", status: "warning", action: "PreCheck Warning", time: "5 min ago" },
                  { server: "DEV-APP-02", status: "success", action: "Migration Completed", time: "12 min ago" },
                  { server: "PROD-API-01", status: "error", action: "PostCheck Failed", time: "18 min ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.status === "warning" && <Clock className="h-4 w-4 text-yellow-600" />}
                      {activity.status === "error" && <XCircle className="h-4 w-4 text-red-600" />}
                      <div>
                        <p className="font-medium text-gray-900">{activity.server}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <AlertsFeed />
      </div>
    </div>
  );
}
