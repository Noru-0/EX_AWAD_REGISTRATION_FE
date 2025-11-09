# Frontend Service

A modern Next.js frontend for user authentication with organized environment management and clean UI components.

## 🚀 Quick Start

### Development (Default)
```bash
npm run dev
# Runs on: http://localhost:3000
# API calls to: http://localhost:4000
```

### Local with Backend Database
```bash
npm run dev:local
# Runs on: http://localhost:3000
# API calls to: http://localhost:4000 (with database)
```

### Production Testing
```bash
npm run dev:prod
# Runs on: http://localhost:3000
# API calls to: https://ex-awad-registration-be.onrender.com
```

## ⚙️ Environment Management

### Organized Configuration
```
frontend/
├── config/
│   ├── config-manager.js      # Smart config loader
│   └── environments/          # All env files
│       ├── .env.development   # Dev settings
│       ├── .env.local        # Local DB settings
│       └── .env.production   # Production settings
└── .env.local                # Active config (auto-generated)
```

### Easy Setup
```bash
# Windows
.\setup.bat          # Development
.\setup.bat local    # Local with DB
.\setup.bat prod     # Production

# NPM Scripts
npm run config:list      # Show available configs
npm run config:validate  # Validate current config
```

## 🎨 Features

### Authentication Pages
- **Login Page**: Clean login form with carousel showcase
- **Register Page**: User registration with validation
- **Home Page**: Protected dashboard for authenticated users

### UI Components
- Modern glassmorphism design
- Responsive layout with Tailwind CSS
- Form validation with React Hook Form
- Toast notifications with Sonner
- Loading states and error handling

### Environment Integration
- Automatic API URL configuration
- Environment-specific features
- Debug mode for development
- Production optimizations

## 🔧 Tech Stack

- **Framework**: Next.js 16.0.0 with React 19
- **Styling**: Tailwind CSS with custom components
- **Forms**: React Hook Form with validation
- **HTTP**: Fetch API with credentials
- **State**: TanStack React Query
- **Icons**: Lucide React
- **Toast**: Sonner notifications

## 🌍 Environment Configuration

| Environment | API URL | Features | Purpose |
|-------------|---------|----------|---------|
| **Development** | `localhost:4000` | Debug enabled, Mock auth | Local development |
| **Local** | `localhost:4000` | Debug enabled, Real DB | Local testing with database |
| **Production** | `render.com` | Optimized, Analytics ready | Production deployment |

## 🔐 Authentication Flow

1. **Login Form**: User enters email/password
2. **API Request**: POST to `/api/login` with credentials
3. **Cookie Storage**: JWT token stored in HTTP-only cookie
4. **Redirect**: Automatic redirect to `/home` on success
5. **Protected Routes**: Middleware checks authentication
6. **User Verification**: `/api/me` call on protected pages

## 📱 Pages & Routing

- `/` - Login/Register page (public)
- `/home` - User dashboard (protected)
- `/register` - Alternative registration route

Protected routes automatically redirect to login if unauthenticated.

## 🚢 Deployment

### Render.com
The frontend is configured for Render deployment with `render.yaml`. Set these environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NODE_ENV=production`

### Build Commands
```bash
npm run build:prod    # Production build with env setup
npm start            # Start production server
```

## 🔨 Development

### Installation
```bash
npm install
# or
pnpm install
```

### Available Scripts
- `npm run dev` - Development server with auto env setup
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint validation

The environment system automatically configures API URLs and features based on the selected environment.
