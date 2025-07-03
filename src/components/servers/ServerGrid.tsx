import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ServerDetailsModal } from "./ServerDetailsModal";
import { Filter, Users, Settings, Loader2 } from "lucide-react";

type Server = {
  id: number;
  name: string;
  ip_address: string;
  environment: string;
  os: string;
  owner: string;
  created_at: string;
  statuses: any[];
  tags: { tag: string }[];
};

type ModalServer = {
  id: number;
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

export function ServerGrid() {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<ModalServer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [runningCheck, setRunningCheck] = useState<{[key: number]: 'precheck' | 'postcheck' | null}>({});

  useEffect(() => {
    fetch("http://localhost:8000/api/servers")
      .then(res => res.json())
      .then(data => setServers(data));
  }, []);

  const runCheck = (serverId: number, type: 'precheck' | 'postcheck') => {
    setRunningCheck(prev => ({ ...prev, [serverId]: type }));
    fetch(`http://localhost:8000/api/servers/${serverId}/run-${type}`, { method: "POST" })
      .then(res => res.json())
      .then(() => {
        // Optionally show a toast
        // Refresh server data after a short delay to allow backend to update
        setTimeout(() => {
          fetch("http://localhost:8000/api/servers")
            .then(res => res.json())
            .then(data => setServers(data));
          setRunningCheck(prev => ({ ...prev, [serverId]: null }));
        }, 1500);
      });
  };

  const filteredServers = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip_address.includes(searchTerm);
    const matchesEnv = environmentFilter === "all" || server.environment === environmentFilter;
    const latestStatus = server.statuses && server.statuses.length > 0 ? server.statuses[server.statuses.length - 1] : null;
    const migrationStatus = latestStatus ? latestStatus.migration_status : "";
    const matchesStatus = statusFilter === "all" || migrationStatus === statusFilter;
    return matchesSearch && matchesEnv && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
                {filteredServers.map((server) => {
                  const latestStatus = server.statuses && server.statuses.length > 0 ? server.statuses[server.statuses.length - 1] : {};
                  const canRunPreCheck =
                    (latestStatus?.migration_status === "Ready") &&
                    (!latestStatus?.precheck_status || latestStatus?.precheck_status === "N/A" || latestStatus?.precheck_status === "Not Started");
                  const canRunPostCheck =
                    (latestStatus?.migration_status === "Migrated") &&
                    (!latestStatus?.postcheck_status || latestStatus?.postcheck_status === "N/A" || latestStatus?.postcheck_status === "Not Started");
                  const isRunningPre = runningCheck[server.id] === 'precheck';
                  const isRunningPost = runningCheck[server.id] === 'postcheck';
                  return (
                    <TableRow key={server.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell className="font-mono text-sm">{server.ip_address}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {server.environment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(latestStatus?.migration_status)}>
                          {latestStatus?.migration_status || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(latestStatus?.precheck_status)}>
                          {latestStatus?.precheck_status || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(latestStatus?.postcheck_status)}>
                          {latestStatus?.postcheck_status || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{latestStatus?.issue_summary || "-"}</TableCell>
                      <TableCell className="text-sm text-gray-500">{latestStatus?.last_checked ? new Date(latestStatus.last_checked).toLocaleString() : "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedServer({
                                id: server.id,
                                name: server.name,
                                ip: server.ip_address,
                                environment: server.environment,
                                migrationStatus: latestStatus?.migration_status || "-",
                                preCheck: latestStatus?.precheck_status || "-",
                                postCheck: latestStatus?.postcheck_status || "-",
                                issueSummary: latestStatus?.issue_summary || "-",
                                lastChecked: latestStatus?.last_checked ? new Date(latestStatus.last_checked).toLocaleString() : "-",
                                os: server.os,
                                owner: server.owner,
                                tags: server.tags ? server.tags.map(t => t.tag) : [],
                              });
                            }}
                          >
                            Details
                          </Button>
                          {canRunPreCheck && (
                            <Button
                              size="sm"
                              variant="secondary"
                              disabled={isRunningPre}
                              onClick={() => runCheck(server.id, 'precheck')}
                            >
                              {isRunningPre ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                              Run PreCheck
                            </Button>
                          )}
                          {canRunPostCheck && (
                            <Button
                              size="sm"
                              variant="secondary"
                              disabled={isRunningPost}
                              onClick={() => runCheck(server.id, 'postcheck')}
                            >
                              {isRunningPost ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                              Run PostCheck
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
