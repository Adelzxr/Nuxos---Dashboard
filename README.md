# SaaS Dashboard

Production-grade SaaS dashboard built with Next.js 14, Supabase, Prisma, and TypeScript.

##  Features

- ✅ **Authentication** - Email/password auth with Supabase
- ✅ **Protected Routes** - Middleware-based route protection
- ✅ **Dashboard** - KPI cards, charts, and analytics
- ✅ **Dark Mode** - System preference with manual toggle
- ✅ **Responsive Design** - Mobile-first, fully responsive
- ✅ **Type Safety** - End-to-end TypeScript with Zod validation
- ✅ **Database** - Prisma ORM with PostgreSQL (Supabase)
- ✅ **Error Handling** - Comprehensive error boundaries and pages
- ✅ **Loading States** - Skeleton loaders and loading indicators

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **Charts:** Recharts
- **Themes:** next-themes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- PostgreSQL database (included with Supabase)

##  Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd Saas
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (Prisma)
DATABASE_URL=your_supabase_database_connection_string
```

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed setup instructions.

### 3. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Project Structure

```
/app
  /(auth)              # Auth route group (login, register)
  /(dashboard)         # Protected dashboard routes
  /actions             # Server actions
  middleware.ts        # Route protection middleware
  error.tsx            # Global error boundary
  not-found.tsx        # 404 page

/components
  /auth                # Auth forms
  /dashboard           # Dashboard components (charts, KPIs)
  /layout              # Layout components (sidebar, navbar)
  /ui                  # shadcn/ui components

/lib
  /supabase            # Supabase client utilities
  /prisma              # Prisma client
  /validations         # Zod schemas
  env.ts               # Environment variable validation
  auth.ts              # Auth utilities

/prisma
  schema.prisma        # Database schema
```

## 🔐 Authentication

The app uses Supabase Auth for authentication:

- Email/password authentication
- Secure HTTP-only cookies
- Server-side session validation
- Protected routes via middleware
- Automatic session refresh


##  Database Schema

The Prisma schema includes:

- **User** - User accounts (linked to Supabase Auth)
- **Subscription** - User subscription plans (FREE/PRO)
- **Project** - User-created projects

See [PRISMA_SCHEMA.md](./PRISMA_SCHEMA.md) for detailed schema documentation.

##  Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run prisma:generate   # Generate Prisma Client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio     # Open Prisma Studio
npm run prisma:push       # Push schema to database (dev only)
```

## 🔒 Security Features

- ✅ Environment variable validation
- ✅ Server-side input validation (Zod)
- ✅ Strong password requirements
- ✅ HTTP-only cookies
- ✅ CSRF protection (Next.js built-in)
- ✅ Error message sanitization
- ✅ Route protection via middleware

## 🎨 Theming

The app supports light and dark themes:

- System preference detection
- Manual theme toggle in navbar
- Persistent theme selection
- CSS variables for theming
- Smooth theme transitions



### Database Connection Issues

1. Verify your `DATABASE_URL` is correct
2. Ensure your Supabase project is active
3. Check that Prisma migrations have been run

### Build Errors

1. Run `npm run prisma:generate` to ensure Prisma Client is generated
2. Clear `.next` folder and rebuild
3. Check Node.js version (requires 18+)



##  Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
