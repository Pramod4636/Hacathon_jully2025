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
