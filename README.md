# Infra Nova Dashboard Nexus

A React-based dashboard application for infrastructure management and monitoring.

## Features

- Modern React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- Responsive design
- Dashboard analytics and monitoring
- Server management interface
- Alerts and notifications system

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application for development
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
└── index.tsx      # Application entry point
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Create React App** - Build tool and development environment

## Development

This project uses Create React App for a pure React development experience. All imports use relative paths for better compatibility and simplicity.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build/` directory.

---

## 🚀 Hackathon Setup Guide

If you're setting up this project from scratch in a hackathon environment, follow these steps:

### Phase 1: Project Setup

**Step 1: Create React App**
```bash
npx create-react-app infra-nova-dashboard --template typescript
cd infra-nova-dashboard
```

**Step 2: Install Core Dependencies**
```bash
npm install react-router-dom @tanstack/react-query lucide-react
npm install tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge
```

**Step 3: Install UI Component Dependencies**
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-tooltip
npm install @radix-ui/react-avatar @radix-ui/react-badge
npm install @radix-ui/react-button @radix-ui/react-card
npm install @radix-ui/react-separator @radix-ui/react-slot
npm install @radix-ui/react-switch @radix-ui/react-checkbox
npm install @radix-ui/react-progress @radix-ui/react-slider
npm install @radix-ui/react-popover @radix-ui/react-hover-card
npm install @radix-ui/react-context-menu @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu @radix-ui/react-accordion
npm install @radix-ui/react-aspect-ratio @radix-ui/react-collapsible
npm install @radix-ui/react-radio-group @radix-ui/react-scroll-area
npm install @radix-ui/react-toggle @radix-ui/react-toggle-group
npm install @radix-ui/react-label @radix-ui/react-select
```

**Step 4: Install Additional Libraries**
```bash
npm install recharts date-fns react-hook-form @hookform/resolvers zod
npm install sonner cmdk embla-carousel-react react-day-picker
npm install react-resizable-panels vaul input-otp next-themes
npm install tailwindcss-animate
```

### Phase 2: Configuration Files

**Step 5: Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

**Step 6: Update tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Step 7: Update src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 222.2 84% 4.9%;
    --sidebar-primary: 221.2 83.2% 53.3%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 40% 96%;
    --sidebar-accent-foreground: 222.2 84% 4.9%;
    --sidebar-border: 214.3 31.8% 91.4%;
    --sidebar-ring: 221.2 83.2% 53.3%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Phase 3: Utility Functions

**Step 8: Create src/lib/utils.ts**
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 9: Create src/hooks/use-mobile.tsx**
```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}
```

### Phase 4: UI Components

**Step 10: Create Basic UI Components**
Create the following files in `src/components/ui/`:
- `button.tsx` - Button component
- `card.tsx` - Card component  
- `dialog.tsx` - Dialog/Modal component
- `input.tsx` - Input component
- `badge.tsx` - Badge component
- `toast.tsx` - Toast notification component
- `tooltip.tsx` - Tooltip component
- `sidebar.tsx` - Sidebar component

### Phase 5: Main App Structure

**Step 11: Update src/App.tsx**
```typescript
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { DashboardHome } from "./components/dashboard/DashboardHome";
import { ServerGrid } from "./components/servers/ServerGrid";
import { AlertsPage } from "./components/alerts/AlertsPage";
import { ReportsPage } from "./components/reports/ReportsPage";
import { AdminSettings } from "./components/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><DashboardHome /></Layout>} />
          <Route path="/servers" element={<Layout><ServerGrid /></Layout>} />
          <Route path="/alerts" element={<Layout><AlertsPage /></Layout>} />
          <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminSettings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

### Phase 6: Component Development

Continue building components in this order:
1. **AppSidebar** - Navigation sidebar
2. **DashboardHome** - Main dashboard with charts
3. **ServerGrid** - Server management table
4. **AlertsPage** - Alerts and notifications
5. **ReportsPage** - Reports and analytics
6. **AdminSettings** - Admin configuration

### Phase 7: Backend Integration

**Step 12: Create Backend (Optional)**
```bash
# Create backend directory
mkdir backend
cd backend

# Install Python dependencies
pip install fastapi uvicorn sqlalchemy pyodbc python-dotenv pydantic

# Create FastAPI app with CORS support
```

### Phase 8: Testing & Deployment

**Step 13: Test the Application**
```bash
npm start
```

**Step 14: Build for Production**
```bash
npm run build
```

---

## 📋 Quick Reference

### Key Dependencies:
- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **React Query** for data fetching
- **Recharts** for data visualization

### File Structure:
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── dashboard/    # Dashboard components
│   ├── servers/      # Server management
│   ├── alerts/       # Alerts system
│   └── admin/        # Admin components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── pages/            # Page components
```

### Development Tips:
1. Start with UI components first
2. Build the sidebar navigation
3. Create the main dashboard
4. Add server management features
5. Implement alerts and reports
6. Add admin functionality
7. Connect to backend API
8. Test and optimize

This guide will help you build the infrastructure dashboard step by step during your hackathon!

---

## 📊 Sample Data for Frontend Development

### Mock API Endpoints Data

Use these sample data objects directly in your frontend components for development:

#### **Servers Data**
```typescript
const mockServers = [
  {
    id: 1,
    name: "PROD-WEB-01",
    ip_address: "192.168.1.10",
    environment: "Production",
    os: "Ubuntu 20.04 LTS",
    owner: "Web Team",
    created_at: "2024-01-01T10:00:00Z",
    statuses: [
      {
        id: 1,
        migration_status: "Completed",
        precheck_status: "Passed",
        postcheck_status: "Passed",
        issue_summary: "All checks passed successfully",
        last_checked: "2024-01-07T14:30:00Z",
        is_current: true
      }
    ],
    tags: [{ tag: "web-server" }, { tag: "load-balancer" }]
  },
  {
    id: 2,
    name: "PROD-DB-01",
    ip_address: "192.168.1.11",
    environment: "Production",
    os: "CentOS 7",
    owner: "DBA Team",
    created_at: "2024-01-02T09:00:00Z",
    statuses: [
      {
        id: 2,
        migration_status: "Ready",
        precheck_status: "Not Started",
        postcheck_status: "N/A",
        issue_summary: "Ready for migration",
        last_checked: "2024-01-07T13:45:00Z",
        is_current: true
      }
    ],
    tags: [{ tag: "database" }, { tag: "primary" }]
  },
  {
    id: 3,
    name: "UAT-APP-01",
    ip_address: "192.168.1.20",
    environment: "UAT",
    os: "Ubuntu 18.04 LTS",
    owner: "DevOps Team",
    created_at: "2024-01-03T11:00:00Z",
    statuses: [
      {
        id: 3,
        migration_status: "Blocked",
        precheck_status: "Failed",
        postcheck_status: "N/A",
        issue_summary: "Disk space below threshold",
        last_checked: "2024-01-07T12:15:00Z",
        is_current: true
      }
    ],
    tags: [{ tag: "application" }, { tag: "testing" }]
  },
  {
    id: 4,
    name: "DEV-API-01",
    ip_address: "192.168.1.30",
    environment: "Development",
    os: "Ubuntu 20.04 LTS",
    owner: "API Team",
    created_at: "2024-01-04T14:00:00Z",
    statuses: [
      {
        id: 4,
        migration_status: "Failed",
        precheck_status: "Passed",
        postcheck_status: "Failed",
        issue_summary: "Network connectivity issues",
        last_checked: "2024-01-07T11:30:00Z",
        is_current: true
      }
    ],
    tags: [{ tag: "api" }, { tag: "development" }]
  },
  {
    id: 5,
    name: "PROD-CACHE-01",
    ip_address: "192.168.1.12",
    environment: "Production",
    os: "Ubuntu 20.04 LTS",
    owner: "Infrastructure Team",
    created_at: "2024-01-05T08:00:00Z",
    statuses: [
      {
        id: 5,
        migration_status: "Completed",
        precheck_status: "Passed",
        postcheck_status: "Passed",
        issue_summary: "Migration successful",
        last_checked: "2024-01-07T10:45:00Z",
        is_current: true
      }
    ],
    tags: [{ tag: "cache" }, { tag: "redis" }]
  }
];
```

#### **Alerts Data**
```typescript
const mockAlerts = [
  {
    id: "1",
    severity: "high",
    title: "PostCheck Failure",
    message: "Database connection timeout during PostCheck validation",
    server: "PROD-DB-01",
    team: "DBA Team",
    timestamp: "2024-01-07 14:30",
    resolved: false
  },
  {
    id: "2",
    severity: "medium",
    title: "Disk Space Warning",
    message: "Disk usage above 90% threshold",
    server: "UAT-APP-01",
    team: "DevOps Team",
    timestamp: "2024-01-07 14:15",
    resolved: false
  },
  {
    id: "3",
    severity: "low",
    title: "Migration Completed",
    message: "Server migration completed successfully",
    server: "PROD-WEB-01",
    team: "Web Team",
    timestamp: "2024-01-07 13:45",
    resolved: true,
    notes: "All services verified and running"
  },
  {
    id: "4",
    severity: "medium",
    title: "Network Latency",
    message: "High network latency detected between servers",
    server: "PROD-CACHE-01",
    team: "Network Team",
    timestamp: "2024-01-07 12:30",
    resolved: false
  },
  {
    id: "5",
    severity: "high",
    title: "Service Down",
    message: "API service not responding",
    server: "DEV-API-01",
    team: "API Team",
    timestamp: "2024-01-07 11:30",
    resolved: false
  }
];
```

#### **Recent Activity Data**
```typescript
const mockRecentActivity = [
  {
    id: 1,
    server: "PROD-WEB-01",
    action: "Migration completed successfully",
    status: "success",
    time: "2 minutes ago"
  },
  {
    id: 2,
    server: "UAT-APP-01",
    action: "PreCheck failed - Disk space issue",
    status: "warning",
    time: "5 minutes ago"
  },
  {
    id: 3,
    server: "PROD-DB-01",
    action: "PostCheck validation started",
    status: "warning",
    time: "10 minutes ago"
  },
  {
    id: 4,
    server: "DEV-API-01",
    action: "Migration failed - Network timeout",
    status: "error",
    time: "15 minutes ago"
  },
  {
    id: 5,
    server: "PROD-CACHE-01",
    action: "Backup completed",
    status: "success",
    time: "1 hour ago"
  }
];
```

#### **Dashboard Summary Data**
```typescript
const mockDashboardSummary = {
  totalServers: 24,
  healthyServers: 18,
  warningServers: 4,
  failedServers: 2,
  migrationProgress: 75,
  uptime: 99.8,
  lastBackup: "2024-01-07 02:00:00",
  activeAlerts: 3
};
```

#### **Chart Data for Analytics**
```typescript
const mockChartData = {
  // Server health trend over time
  serverHealthTrend: [
    { month: "Jan", total: 20, healthy: 18, warning: 2, failed: 0 },
    { month: "Feb", total: 22, healthy: 20, warning: 1, failed: 1 },
    { month: "Mar", total: 24, healthy: 22, warning: 2, failed: 0 },
    { month: "Apr", total: 26, healthy: 24, warning: 1, failed: 1 },
    { month: "May", total: 28, healthy: 26, warning: 2, failed: 0 },
    { month: "Jun", total: 30, healthy: 28, warning: 1, failed: 1 }
  ],
  
  // Performance metrics
  performanceMetrics: [
    { month: "Jan", cpu: 65, memory: 70, disk: 45, network: 80 },
    { month: "Feb", cpu: 70, memory: 75, disk: 50, network: 85 },
    { month: "Mar", cpu: 75, memory: 80, disk: 55, network: 90 },
    { month: "Apr", cpu: 80, memory: 85, disk: 60, network: 92 },
    { month: "May", cpu: 85, memory: 90, disk: 65, network: 95 },
    { month: "Jun", cpu: 90, memory: 95, disk: 70, network: 98 }
  ],
  
  // Server distribution by environment
  serverDistribution: [
    { name: "Production", value: 12, color: "#3b82f6" },
    { name: "UAT", value: 6, color: "#f59e0b" },
    { name: "Development", value: 8, color: "#10b981" },
    { name: "Staging", value: 4, color: "#8b5cf6" }
  ],
  
  // Migration status breakdown
  migrationStatus: [
    { status: "Completed", count: 15, color: "#10b981" },
    { status: "Ready", count: 5, color: "#3b82f6" },
    { status: "Blocked", count: 3, color: "#f59e0b" },
    { status: "Failed", count: 1, color: "#ef4444" }
  ]
};
```

#### **Reports Data**
```typescript
const mockReportsData = {
  // Monthly migration report
  monthlyMigration: [
    { month: "January", planned: 8, completed: 7, failed: 1 },
    { month: "February", planned: 10, completed: 9, failed: 1 },
    { month: "March", planned: 12, completed: 11, failed: 1 },
    { month: "April", planned: 15, completed: 14, failed: 1 },
    { month: "May", planned: 18, completed: 17, failed: 1 },
    { month: "June", planned: 20, completed: 19, failed: 1 }
  ],
  
  // Team performance
  teamPerformance: [
    { team: "Web Team", servers: 8, migrations: 7, success: 85 },
    { team: "DBA Team", servers: 6, migrations: 5, success: 83 },
    { team: "DevOps Team", servers: 10, migrations: 9, success: 90 },
    { team: "API Team", servers: 4, migrations: 3, success: 75 }
  ],
  
  // Infrastructure costs
  infrastructureCosts: [
    { month: "Jan", compute: 15000, storage: 5000, network: 3000 },
    { month: "Feb", compute: 16000, storage: 5200, network: 3100 },
    { month: "Mar", compute: 17000, storage: 5400, network: 3200 },
    { month: "Apr", compute: 18000, storage: 5600, network: 3300 },
    { month: "May", compute: 19000, storage: 5800, network: 3400 },
    { month: "Jun", compute: 20000, storage: 6000, network: 3500 }
  ]
};
```

### **How to Use Sample Data**

#### **1. Replace API Calls with Mock Data**
```typescript
// Instead of:
// fetch('/api/servers').then(res => res.json())

// Use:
const servers = mockServers;
```

#### **2. Create Data Hooks**
```typescript
// src/hooks/useMockData.ts
export const useServers = () => {
  return { data: mockServers, isLoading: false, error: null };
};

export const useAlerts = () => {
  return { data: mockAlerts, isLoading: false, error: null };
};

export const useDashboardSummary = () => {
  return { data: mockDashboardSummary, isLoading: false, error: null };
};
```

#### **3. Use in Components**
```typescript
// In your components
import { useServers } from '../hooks/useMockData';

export const ServerGrid = () => {
  const { data: servers } = useServers();
  
  return (
    <div>
      {servers.map(server => (
        <div key={server.id}>{server.name}</div>
      ))}
    </div>
  );
};
```

### **Mock API Endpoints Structure**

```typescript
// Mock API responses structure
const mockAPIEndpoints = {
  // GET /api/servers
  servers: mockServers,
  
  // GET /api/servers/{id}
  serverDetails: (id: number) => mockServers.find(s => s.id === id),
  
  // GET /api/alerts
  alerts: mockAlerts,
  
  // GET /api/recent-activity
  recentActivity: mockRecentActivity,
  
  // GET /api/dashboard/summary
  dashboardSummary: mockDashboardSummary,
  
  // GET /api/charts/server-health
  serverHealthChart: mockChartData.serverHealthTrend,
  
  // GET /api/charts/performance
  performanceChart: mockChartData.performanceMetrics,
  
  // POST /api/servers/{id}/run-precheck
  runPreCheck: (id: number) => ({ success: true, message: "PreCheck completed" }),
  
  // POST /api/servers/{id}/run-postcheck
  runPostCheck: (id: number) => ({ success: true, message: "PostCheck completed" })
};
```

This sample data provides realistic infrastructure dashboard data that you can use directly in your frontend components without needing a backend during development!
