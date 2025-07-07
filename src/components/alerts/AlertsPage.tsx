
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react";

type Alert = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  message: string;
  server: string;
  team: string;
  timestamp: string;
  resolved: boolean;
  notes?: string;
};

const mockAlerts: Alert[] = [
  {
    id: "1",
    severity: "high",
    title: "PostCheck Failure",
    message: "Database connection timeout during PostCheck validation",
    server: "PROD-DB-01",
    team: "DBA Team",
    timestamp: "2024-01-07 14:30",
    resolved: false,
  },
  {
    id: "2",
    severity: "medium",
    title: "Disk Space Warning",
    message: "Disk usage above 90% threshold",
    server: "UAT-WEB-03",
    team: "WebTeam",
    timestamp: "2024-01-07 14:15",
    resolved: false,
  },
  {
    id: "3",
    severity: "low",
    title: "Migration Completed",
    message: "Server migration completed successfully",
    server: "DEV-APP-02",
    team: "DevOps",
    timestamp: "2024-01-07 13:45",
    resolved: true,
    notes: "All services verified and running",
  },
  {
    id: "4",
    severity: "medium",
    title: "Network Latency",
    message: "High network latency detected between servers",
    server: "PROD-API-01",
    team: "Network Team",
    timestamp: "2024-01-07 12:30",
    resolved: false,
  },
];

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.server.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "resolved" && alert.resolved) ||
                         (statusFilter === "unresolved" && !alert.resolved);
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "medium": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "low": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const markAsResolved = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-1">Monitor system alerts and resolve issues</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {filteredAlerts.filter(a => !a.resolved && a.severity === "high").length} High Priority
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {filteredAlerts.filter(a => !a.resolved).length} Unresolved
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Alerts ({filteredAlerts.length})
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search alerts by title or server..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Server</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(alert.severity)}
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{alert.server}</TableCell>
                    <TableCell>{alert.team}</TableCell>
                    <TableCell className="text-sm text-gray-500">{alert.timestamp}</TableCell>
                    <TableCell>
                      {alert.resolved ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Resolved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {!alert.resolved && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => markAsResolved(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Notes
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
