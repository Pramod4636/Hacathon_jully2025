
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ServerDetailsModal } from "./ServerDetailsModal";
import { Filter, Users, Settings } from "lucide-react";

type Server = {
  id: string;
  name: string;
  ip: string;
  environment: string;
  migrationStatus: string;
  preCheck: string;
  postCheck: string;
  issueSummary: string;
  lastChecked: string;
  os: string;
  owner: string;
  tags: string[];
};

const mockServers: Server[] = [
  {
    id: "1",
    name: "PROD-WEB-01",
    ip: "10.0.1.15",
    environment: "Production",
    migrationStatus: "Completed",
    preCheck: "Passed",
    postCheck: "Passed",
    issueSummary: "None",
    lastChecked: "2024-01-07 14:30",
    os: "Windows Server 2019",
    owner: "WebTeam",
    tags: ["critical", "web-server"],
  },
  {
    id: "2",
    name: "UAT-DB-03",
    ip: "10.0.2.22",
    environment: "UAT",
    migrationStatus: "Blocked",
    preCheck: "Warning",
    postCheck: "N/A",
    issueSummary: "Disk space low",
    lastChecked: "2024-01-07 14:25",
    os: "Linux RHEL 8",
    owner: "DBA Team",
    tags: ["database", "monitoring"],
  },
  {
    id: "3",
    name: "DEV-APP-02",
    ip: "10.0.3.45",
    environment: "Development",
    migrationStatus: "Ready",
    preCheck: "Passed",
    postCheck: "N/A",
    issueSummary: "None",
    lastChecked: "2024-01-07 14:20",
    os: "Ubuntu 20.04",
    owner: "DevOps",
    tags: ["development", "app-server"],
  },
  {
    id: "4",
    name: "PROD-API-01",
    ip: "10.0.1.33",
    environment: "Production",
    migrationStatus: "Failed",
    preCheck: "Passed",
    postCheck: "Failed",
    issueSummary: "Service unavailable",
    lastChecked: "2024-01-07 13:45",
    os: "Windows Server 2022",
    owner: "API Team",
    tags: ["critical", "api"],
  },
];

export function ServerGrid() {
  const [servers] = useState<Server[]>(mockServers);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredServers = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip.includes(searchTerm);
    const matchesEnv = environmentFilter === "all" || server.environment === environmentFilter;
    const matchesStatus = statusFilter === "all" || server.migrationStatus === statusFilter;
    return matchesSearch && matchesEnv && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "ready": return "bg-blue-100 text-blue-800 border-blue-200";
      case "blocked": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed": return "bg-red-100 text-red-800 border-red-200";
      case "passed": return "bg-green-100 text-green-800 border-green-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Server Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage infrastructure migration</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Servers ({filteredServers.length})
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search servers by name or IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex gap-2">
              <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="UAT">UAT</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
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
                  <TableHead>Server Name</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Migration Status</TableHead>
                  <TableHead>PreCheck</TableHead>
                  <TableHead>PostCheck</TableHead>
                  <TableHead>Issue Summary</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServers.map((server) => (
                  <TableRow key={server.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell className="font-mono text-sm">{server.ip}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {server.environment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(server.migrationStatus)}>
                        {server.migrationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(server.preCheck)}>
                        {server.preCheck}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(server.postCheck)}>
                        {server.postCheck}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{server.issueSummary}</TableCell>
                    <TableCell className="text-sm text-gray-500">{server.lastChecked}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedServer(server)}
                        >
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Re-run
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

      {selectedServer && (
        <ServerDetailsModal
          server={selectedServer}
          open={!!selectedServer}
          onClose={() => setSelectedServer(null)}
        />
      )}
    </div>
  );
}
