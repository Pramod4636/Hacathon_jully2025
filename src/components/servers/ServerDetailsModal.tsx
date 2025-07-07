import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { CheckCircle, XCircle, AlertTriangle, Clock, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

type Server = {
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

interface ServerDetailsModalProps {
  server: Server;
  open: boolean;
  onClose: () => void;
}

export function ServerDetailsModal({ server, open, onClose }: ServerDetailsModalProps) {
  const preCheckResults = [
    { name: "Disk Space", status: "passed", details: "85% available (150GB free)" },
    { name: "Patching Status", status: "passed", details: "All critical patches applied" },
    { name: "Firewall Rules", status: "warning", details: "2 rules need review" },
    { name: "Replication", status: "passed", details: "Sync lag < 1 second" },
  ];

  const postCheckResults = [
    { name: "Service Availability", status: "passed", details: "All services running" },
    { name: "Database Sync", status: "failed", details: "Connection timeout" },
    { name: "Cutover Result", status: "passed", details: "DNS updated successfully" },
    { name: "Performance", status: "passed", details: "Response time < 200ms" },
  ];

  const agentLogs = [
    { timestamp: "2024-01-07 14:30:15", level: "INFO", message: "Starting PostCheck validation" },
    { timestamp: "2024-01-07 14:30:20", level: "ERROR", message: "Database connection failed: timeout after 30s" },
    { timestamp: "2024-01-07 14:30:25", level: "INFO", message: "Retrying database connection..." },
    { timestamp: "2024-01-07 14:30:30", level: "ERROR", message: "PostCheck failed: Database sync validation unsuccessful" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed": return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed": return "bg-green-100 text-green-800 border-green-200";
      case "failed": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-red-600";
      case "WARNING": return "text-yellow-600";
      case "INFO": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const [running, setRunning] = useState<'precheck' | 'postcheck' | null>(null);

  const rerunCheck = (type: 'precheck' | 'postcheck') => {
    setRunning(type);
    fetch(`http://localhost:8000/api/servers/${server.id}/run-${type}`, { method: "POST" })
      .then(res => res.json())
      .then(() => {
        setTimeout(() => {
          setRunning(null);
          // Optionally, trigger a parent refresh or close/reopen modal to update data
        }, 1500);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Server Details: {server.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="precheck">PreCheck</TabsTrigger>
            <TabsTrigger value="postcheck">PostCheck</TabsTrigger>
            <TabsTrigger value="logs">Agent Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Server Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Server Name</label>
                    <p className="text-lg font-semibold">{server.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">IP Address</label>
                    <p className="text-lg font-mono">{server.ip}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Environment</label>
                    <Badge variant="outline" className="mt-1">{server.environment}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Operating System</label>
                    <p className="text-lg">{server.os}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Owner</label>
                    <p className="text-lg">{server.owner}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Migration Status</label>
                    <Badge variant="outline" className={`mt-1 ${getStatusColor(server.migrationStatus)}`}>
                      {server.migrationStatus}
                    </Badge>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Tags</label>
                  <div className="flex gap-2 mt-1">
                    {server.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="precheck" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  PreCheck Results
                  <Badge variant="outline" className={getStatusColor(server.preCheck)}>
                    {server.preCheck}
                  </Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-4"
                    disabled={running === 'precheck'}
                    onClick={() => rerunCheck('precheck')}
                  >
                    {running === 'precheck' ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                    Rerun PreCheck
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {preCheckResults.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <p className="text-sm text-gray-600">{check.details}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(check.status)}>
                        {check.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="postcheck" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  PostCheck Results
                  <Badge variant="outline" className={getStatusColor(server.postCheck)}>
                    {server.postCheck}
                  </Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="ml-4"
                    disabled={running === 'postcheck'}
                    onClick={() => rerunCheck('postcheck')}
                  >
                    {running === 'postcheck' ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                    Rerun PostCheck
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {postCheckResults.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <p className="text-sm text-gray-600">{check.details}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(check.status)}>
                        {check.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
                  {agentLogs.map((log, index) => (
                    <div key={index} className="text-sm font-mono mb-2">
                      <span className="text-gray-400">{log.timestamp}</span>
                      <span className={`ml-2 ${getLogLevelColor(log.level)}`}>[{log.level}]</span>
                      <span className="ml-2">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <div className="flex gap-2">
            <Button variant="outline">
              Export Report
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
