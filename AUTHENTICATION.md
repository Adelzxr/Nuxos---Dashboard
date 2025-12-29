# Authentication Implementation

This document outlines the authentication implementation using Supabase.

## File Structure

```
/app
  /(auth)                    # Auth route group (public routes)
    /login
      page.tsx              # Login page
    /register
      page.tsx              # Register page
    layout.tsx              # Auth layout
  /(dashboard)              # Protected dashboard routes
    /dashboard
      page.tsx              # Dashboard page (protected)
    layout.tsx              # Dashboard layout with sign out
  /actions
    auth.ts                 # Server actions for login/register
  middleware.ts             # Route protection middleware
  page.tsx                  # Root page (redirects based on auth)

/lib
  /supabase
    client.ts               # Browser-side Supabase client
    server.ts               # Server-side Supabase client
    middleware.ts           # Middleware Supabase client & session update
  auth.ts                   # Auth helper utilities
  /validations
    auth.ts                 # Zod schemas for auth forms

/components
  /auth
    login-form.tsx          # Login form component
    register-form.tsx       # Register form component
  /ui                       # shadcn/ui components
    button.tsx
    card.tsx
    input.tsx
    label.tsx
```

## Architecture

### 1. Supabase Client Setup

**Three client instances for different contexts:**

- **Client-side** (`lib/supabase/client.ts`): Used in browser components
- **Server-side** (`lib/supabase/server.ts`): Used in Server Components and Server Actions
- **Middleware** (`lib/supabase/middleware.ts`): Used in middleware for route protection

### 2. Authentication Flow

#### Login/Register
1. User submits form → Server Action (`app/actions/auth.ts`)
2. Server Action validates input with Zod
3. Server Action calls Supabase auth method
4. Supabase sets auth cookies automatically
5. Server Action redirects to `/dashboard`

#### Route Protection
1. Middleware (`app/middleware.ts`) runs on every request
2. Gets user session via `supabase.auth.getUser()`
3. Redirects logic:
   - Authenticated users accessing `/login` or `/register` → `/dashboard`
   - Unauthenticated users accessing protected routes → `/login`

#### Server-Side Auth Checks
- `lib/auth.ts` provides utilities:
  - `getUser()`: Get current user (returns null if not authenticated)
  - `requireAuth()`: Get user or redirect to login
  - `signOut()`: Sign out and redirect to login

### 3. Security Features

- ✅ **HTTP-only cookies**: Supabase manages secure session cookies
- ✅ **Server-side validation**: All auth checks happen on the server
- ✅ **Middleware protection**: Routes protected at the edge
- ✅ **Type-safe forms**: Zod validation for all inputs
- ✅ **CSRF protection**: Next.js built-in protection
- ✅ **Automatic redirects**: Prevents auth state confusion

## Usage Examples

### Protecting a Server Component

```tsx
import { requireAuth } from '@/lib/auth'

export default async function ProtectedPage() {
  const user = await requireAuth() // Redirects to /login if not authenticated
  
  return <div>Welcome {user.email}</div>
}
```

### Checking Auth State

```tsx
import { getUser } from '@/lib/auth'

export default async function Page() {
  const user = await getUser()
  
  if (!user) {
    return <div>Please log in</div>
  }
  
  return <div>Hello {user.email}</div>
}
```

### Sign Out

```tsx
import { signOut } from '@/lib/auth'

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button type="submit">Sign Out</button>
    </form>
  )
}
```

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

See `ENV_SETUP.md` for detailed setup instructions.

