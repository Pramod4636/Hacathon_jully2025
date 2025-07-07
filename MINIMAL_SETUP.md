# 🚀 Minimal Hackathon Setup (Fast Installation)

## Quick Start - Minimal Dependencies

### Step 1: Create React App
```bash
npx create-react-app infra-dashboard --template typescript
cd infra-dashboard
```

### Step 2: Install Only Essential Dependencies
```bash
# Core dependencies only
npm install react-router-dom lucide-react
npm install tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge
npm install recharts date-fns
```

### Step 3: Install Minimal UI Components
```bash
# Only the most essential Radix UI components
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-slot
```

### Step 4: Alternative - Use CDN for Some Libraries
Add these to your `public/index.html`:
```html
<!-- Add in <head> section -->
<script src="https://unpkg.com/recharts@2.8.0/umd/Recharts.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/tailwindcss@3.3.6/lib/index.css">
```

### Step 5: Simplified Configuration
Update `tailwind.config.js`:
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

### Step 6: Simple CSS Setup
Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

## 🎯 Minimal Component Structure

### Create Simple Components (No Complex UI Library)

**src/components/ui/Button.tsx**
```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
```

**src/components/ui/Card.tsx**
```typescript
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};
```

**src/components/ui/Table.tsx**
```typescript
import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200">
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
  <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <td className={`px-6 py-4 ${className}`}>
    {children}
  </td>
);
```

## 🚀 Quick App Setup

**src/App.tsx**
```typescript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { Servers } from './components/Servers';
import { Alerts } from './components/Alerts';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## 📊 Simple Dashboard Component

**src/components/Dashboard.tsx**
```typescript
import React from 'react';
import { Card } from './ui/Card';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Infrastructure Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">24</h3>
          <p className="text-gray-600">Total Servers</p>
        </Card>
        
        <Card className="text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">18</h3>
          <p className="text-gray-600">Healthy</p>
        </Card>
        
        <Card className="text-center">
          <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">4</h3>
          <p className="text-gray-600">Warnings</p>
        </Card>
        
        <Card className="text-center">
          <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-gray-600">Pending</p>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Server PROD-01 migrated successfully</p>
              <p className="text-sm text-gray-600">2 minutes ago</p>
            </div>
            <span className="text-green-600">✓</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Disk space warning on UAT-03</p>
              <p className="text-sm text-gray-600">5 minutes ago</p>
            </div>
            <span className="text-yellow-600">⚠</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
```

## 🎯 Benefits of This Approach:

1. **Faster Installation** - Only essential packages
2. **Smaller Bundle Size** - No heavy UI libraries
3. **Easier Debugging** - Simple, custom components
4. **Better Performance** - Lighter dependencies
5. **More Control** - Custom styling and behavior

## 🚀 Quick Commands:

```bash
# Start development
npm start

# Build for production
npm run build

# Install additional packages as needed
npm install package-name
```

This minimal approach will get you a working dashboard much faster while still maintaining good functionality and appearance! 