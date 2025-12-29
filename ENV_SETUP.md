# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (Prisma)
DATABASE_URL=your_supabase_database_connection_string
```

## Getting Supabase Credentials

1. Go to [https://supabase.com](https://supabase.com) and sign in or create an account
2. Create a new project (or use an existing one)
3. Navigate to **Settings** > **API**
4. Copy the following values:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Navigate to **Settings** > **Database**
6. Copy the **Connection string** under "Connection string" → **URI** (use the one with your database password)
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - → Use for `DATABASE_URL`
7. Paste all values into your `.env.local` file

## Example

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
DATABASE_URL=postgresql://postgres:your_password@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## Important Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes these variables available to client-side code
- Keep your keys secure and rotate them if exposed

