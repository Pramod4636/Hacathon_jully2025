# 🚀 Simple Frontend - No External UI Libraries

## Minimal Dependencies Setup

### Step 1: Create React App
```bash
npx create-react-app infra-dashboard --template typescript
cd infra-dashboard
```

### Step 2: Install Only Essential Dependencies
```bash
npm install react-router-dom
npm install tailwindcss postcss autoprefixer
npm install recharts
```

### Step 3: Initialize Tailwind
```bash
npx tailwindcss init -p
```

## Configuration Files

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      }
    }
  },
  plugins: [],
};
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
```

## Simple UI Components

### src/components/ui/Button.tsx
```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};
```

### src/components/ui/Card.tsx
```typescript
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
```

### src/components/ui/Table.tsx
```typescript
import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <thead className="bg-gray-50">
    <tr>{children}</tr>
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <tr className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${className}`}>
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <td className={`px-6 py-4 text-sm ${className}`}>
    {children}
  </td>
);

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);
```

### src/components/ui/Badge.tsx
```typescript
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  className = '' 
}) => {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
```

### src/components/ui/Input.tsx
```typescript
import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    />
  );
};
```

## Simple Icons (No External Library)

### src/components/ui/Icons.tsx
```typescript
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ServerIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const AlertIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
```

## Main App Structure

### src/App.tsx
```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Servers } from './components/Servers';
import { Alerts } from './components/Alerts';
import { Reports } from './components/Reports';
import { Admin } from './components/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### src/components/Sidebar.tsx
```typescript
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ServerIcon, 
  AlertIcon, 
  ChartIcon, 
  SettingsIcon,
  UsersIcon 
} from './ui/Icons';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: UsersIcon },
  { path: '/servers', label: 'Servers', icon: ServerIcon },
  { path: '/alerts', label: 'Alerts', icon: AlertIcon },
  { path: '/reports', label: 'Reports', icon: ChartIcon },
  { path: '/admin', label: 'Admin', icon: SettingsIcon },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        {!collapsed ? (
          <div>
            <h1 className="text-xl font-bold text-gray-900">InfraNova</h1>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-xl font-bold text-blue-600">I</span>
          </div>
        )}
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
```

### src/components/Dashboard.tsx
```typescript
import React from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { 
  UsersIcon, 
  AlertIcon, 
  CheckIcon, 
  ClockIcon 
} from './ui/Icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', servers: 20, healthy: 18 },
  { name: 'Feb', servers: 22, healthy: 20 },
  { name: 'Mar', servers: 24, healthy: 22 },
  { name: 'Apr', servers: 26, healthy: 24 },
  { name: 'May', servers: 28, healthy: 26 },
  { name: 'Jun', servers: 30, healthy: 28 },
];

const recentActivity = [
  { id: 1, message: 'Server PROD-01 migrated successfully', time: '2 minutes ago', status: 'success' },
  { id: 2, message: 'Disk space warning on UAT-03', time: '5 minutes ago', status: 'warning' },
  { id: 3, message: 'Database backup completed', time: '10 minutes ago', status: 'success' },
  { id: 4, message: 'Network latency detected', time: '15 minutes ago', status: 'danger' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Infrastructure Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your infrastructure</p>
        </div>
        <Badge variant="success">System Healthy</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <UsersIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">24</h3>
          <p className="text-gray-600">Total Servers</p>
        </Card>
        
        <Card className="text-center">
          <CheckIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">20</h3>
          <p className="text-gray-600">Healthy</p>
        </Card>
        
        <Card className="text-center">
          <AlertIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-gray-600">Warnings</p>
        </Card>
        
        <Card className="text-center">
          <ClockIcon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">1</h3>
          <p className="text-gray-600">Pending</p>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Server Health Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="servers" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="healthy" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <Badge 
                  variant={activity.status as 'success' | 'warning' | 'danger'}
                  className="ml-2"
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
```

### src/components/Servers.tsx
```typescript
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { ServerIcon } from './ui/Icons';

const mockServers = [
  { id: 1, name: 'PROD-01', ip: '192.168.1.10', environment: 'Production', status: 'healthy', os: 'Ubuntu 20.04' },
  { id: 2, name: 'PROD-02', ip: '192.168.1.11', environment: 'Production', status: 'warning', os: 'Ubuntu 20.04' },
  { id: 3, name: 'UAT-01', ip: '192.168.1.20', environment: 'UAT', status: 'healthy', os: 'CentOS 7' },
  { id: 4, name: 'DEV-01', ip: '192.168.1.30', environment: 'Development', status: 'healthy', os: 'Ubuntu 18.04' },
  { id: 5, name: 'DEV-02', ip: '192.168.1.31', environment: 'Development', status: 'danger', os: 'Ubuntu 18.04' },
];

export const Servers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredServers = mockServers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip.includes(searchTerm);
    const matchesFilter = filter === 'all' || server.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: 'success' as const,
      warning: 'warning' as const,
      danger: 'danger' as const,
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Server Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your servers</p>
        </div>
        <Button>Add Server</Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
          </select>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Server Name</TableHeader>
              <TableHeader>IP Address</TableHeader>
              <TableHeader>Environment</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Operating System</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServers.map((server) => (
              <TableRow key={server.id}>
                <TableCell className="font-medium">{server.name}</TableCell>
                <TableCell className="font-mono text-sm">{server.ip}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{server.environment}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(server.status)}</TableCell>
                <TableCell>{server.os}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="primary">View</Button>
                    <Button size="sm" variant="secondary">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
```

### src/components/Alerts.tsx
```typescript
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { AlertIcon } from './ui/Icons';

const mockAlerts = [
  { id: 1, title: 'Disk Space Warning', message: 'Server PROD-02 disk usage is at 85%', severity: 'warning', time: '5 minutes ago' },
  { id: 2, title: 'Network Latency', message: 'High latency detected on UAT-01', severity: 'danger', time: '10 minutes ago' },
  { id: 3, title: 'Backup Completed', message: 'Database backup completed successfully', severity: 'success', time: '1 hour ago' },
  { id: 4, title: 'Service Restart', message: 'Web service restarted on DEV-01', severity: 'warning', time: '2 hours ago' },
];

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  );

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      success: 'success' as const,
      warning: 'warning' as const,
      danger: 'danger' as const,
    };
    return <Badge variant={variants[severity]}>{severity}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-1">Monitor system alerts and resolve issues</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="danger">{alerts.filter(a => a.severity === 'danger').length} Critical</Badge>
          <Badge variant="warning">{alerts.filter(a => a.severity === 'warning').length} Warnings</Badge>
        </div>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">System Alerts</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Alerts</option>
            <option value="danger">Critical</option>
            <option value="warning">Warnings</option>
            <option value="success">Success</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <AlertIcon className="h-6 w-6 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getSeverityBadge(alert.severity)}
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => dismissAlert(alert.id)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
```

### src/components/Reports.tsx
```typescript
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ChartIcon } from './ui/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const serverData = [
  { name: 'Production', value: 12, color: '#3b82f6' },
  { name: 'UAT', value: 6, color: '#f59e0b' },
  { name: 'Development', value: 8, color: '#10b981' },
];

const performanceData = [
  { month: 'Jan', cpu: 65, memory: 70, disk: 45 },
  { month: 'Feb', cpu: 70, memory: 75, disk: 50 },
  { month: 'Mar', cpu: 75, memory: 80, disk: 55 },
  { month: 'Apr', cpu: 80, memory: 85, disk: 60 },
  { month: 'May', cpu: 85, memory: 90, disk: 65 },
  { month: 'Jun', cpu: 90, memory: 95, disk: 70 },
];

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Infrastructure performance and insights</p>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Server Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serverData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {serverData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Performance Metrics">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cpu" fill="#3b82f6" name="CPU %" />
              <Bar dataKey="memory" fill="#f59e0b" name="Memory %" />
              <Bar dataKey="disk" fill="#10b981" name="Disk %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Summary Statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">24</h3>
            <p className="text-gray-600">Total Servers</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">95.8%</h3>
            <p className="text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">3</h3>
            <p className="text-gray-600">Active Alerts</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
```

### src/components/Admin.tsx
```typescript
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { SettingsIcon } from './ui/Icons';

export const Admin: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-1">Manage system configuration</p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="System Configuration">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Name
              </label>
              <Input defaultValue="InfraNova Dashboard" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <Input type="email" defaultValue="admin@infranova.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Threshold
              </label>
              <Input type="number" defaultValue="85" />
            </div>
          </div>
        </Card>

        <Card title="User Management">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-600">john@example.com</p>
              </div>
              <Badge variant="success">Admin</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-600">jane@example.com</p>
              </div>
              <Badge variant="secondary">User</Badge>
            </div>
            <Button variant="primary" size="sm">Add User</Button>
          </div>
        </Card>
      </div>

      <Card title="System Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Version</p>
            <p className="font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-medium">2024-01-07</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Database</p>
            <p className="font-medium">PostgreSQL 14</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge variant="success">Online</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
```

## Quick Start Commands

```bash
# 1. Create app
npx create-react-app infra-dashboard --template typescript
cd infra-dashboard

# 2. Install minimal dependencies
npm install react-router-dom recharts
npm install tailwindcss postcss autoprefixer

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Copy the configuration files and components

# 5. Start development
npm start
```

## Benefits of This Approach

✅ **Minimal Dependencies** - Only 4 external packages
✅ **No Complex UI Libraries** - Custom simple components
✅ **Fast Installation** - Quick setup
✅ **Easy to Customize** - Full control over styling
✅ **Small Bundle Size** - Better performance
✅ **No External Icons** - Custom SVG icons included

This simplified version gives you a fully functional infrastructure dashboard with minimal external dependencies! 