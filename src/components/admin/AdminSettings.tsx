
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Settings, Users, User, Plus, Filter } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  lastLogin: string;
  active: boolean;
};

type MigrationWave = {
  id: string;
  name: string;
  environment: string;
  startDate: string;
  endDate: string;
  serverCount: number;
  status: string;
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Admin",
    team: "DevOps",
    lastLogin: "2024-01-07 14:30",
    active: true,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Operator",
    team: "DBA Team",
    lastLogin: "2024-01-07 13:45",
    active: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Viewer",
    team: "WebTeam",
    lastLogin: "2024-01-06 16:20",
    active: false,
  },
];

const mockWaves: MigrationWave[] = [
  {
    id: "1",
    name: "Production Wave 1",
    environment: "Production",
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    serverCount: 25,
    status: "Planned",
  },
  {
    id: "2",
    name: "UAT Migration",
    environment: "UAT",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    serverCount: 18,
    status: "In Progress",
  },
  {
    id: "3",
    name: "Dev Environment",
    environment: "Development",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    serverCount: 12,
    status: "Completed",
  },
];

export function AdminSettings() {
  const [users] = useState<User[]>(mockUsers);
  const [waves] = useState<MigrationWave[]>(mockWaves);
  const [apiKeys, setApiKeys] = useState({
    moveme: "••••••••••••••••",
    firewall: "••••••••••••••••",
    loadBalancer: "••••••••••••••••",
  });

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin": return "bg-red-100 text-red-800 border-red-200";
      case "operator": return "bg-blue-100 text-blue-800 border-blue-200";
      case "viewer": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600 mt-1">Manage users, settings, and system configuration</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="waves">Migration Waves</TabsTrigger>
          <TabsTrigger value="integrations">API Integrations</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Accounts ({users.length})
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.team}</TableCell>
                        <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {user.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Reset</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waves" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Migration Waves ({waves.length})
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Wave
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Wave Name</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Server Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waves.map((wave) => (
                      <TableRow key={wave.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{wave.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{wave.environment}</Badge>
                        </TableCell>
                        <TableCell>{wave.startDate}</TableCell>
                        <TableCell>{wave.endDate}</TableCell>
                        <TableCell>{wave.serverCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(wave.status)}>
                            {wave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="moveme-key">Moveme API Key</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="moveme-key"
                    type="password"
                    value={apiKeys.moveme}
                    className="flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                  <Button variant="outline">Test</Button>
                </div>
              </div>
              <Separator />
              <div>
                <Label htmlFor="firewall-key">Firewall API Key</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="firewall-key"
                    type="password"
                    value={apiKeys.firewall}
                    className="flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                  <Button variant="outline">Test</Button>
                </div>
              </div>
              <Separator />
              <div>
                <Label htmlFor="lb-key">Load Balancer API Key</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="lb-key"
                    type="password"
                    value={apiKeys.loadBalancer}
                    className="flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                  <Button variant="outline">Test</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <Switch id="email-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slack-notifications">Slack Notifications</Label>
                    <Switch id="slack-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-alerts">SMS Alerts (Critical)</Label>
                    <Switch id="sms-alerts" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Migration Settings</h3>
                  <div>
                    <Label htmlFor="timeout">PreCheck Timeout (minutes)</Label>
                    <Input id="timeout" type="number" defaultValue={30} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="retry-count">Retry Count</Label>
                    <Input id="retry-count" type="number" defaultValue={3} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="parallel-limit">Parallel Migration Limit</Label>
                    <Input id="parallel-limit" type="number" defaultValue={5} className="mt-1" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
