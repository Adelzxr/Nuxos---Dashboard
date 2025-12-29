# Prisma Schema Documentation

## Overview

This document describes the Prisma schema design for the SaaS Dashboard application, including all models, relations, enums, and indexes.

---

## Schema Architecture

### Database Connection

The schema uses PostgreSQL (via Supabase) and connects using the `DATABASE_URL` environment variable.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Enums

### Role
User roles for access control:
- `ADMIN` - Full system access
- `USER` - Standard user access

### SubscriptionTier
Subscription plan levels:
- `FREE` - Free tier with basic features
- `PRO` - Pro tier with advanced features

### SubscriptionStatus
Subscription billing status:
- `ACTIVE` - Currently active subscription
- `CANCELED` - Subscription has been canceled
- `PAST_DUE` - Payment failed, subscription past due
- `TRIALING` - Currently in trial period

---

## Models

### User

**Purpose**: Represents application users, linked to Supabase Auth.

**Key Features**:
- `id` is a UUID that matches Supabase `auth.users.id` for seamless integration
- One-to-one relationship with Subscription
- One-to-many relationship with Projects
- Email is unique and indexed for fast lookups
- Role field for RBAC (defaults to USER)

**Fields**:
```prisma
id        String   @id              // UUID from Supabase Auth
email     String   @unique          // User email
name      String?                   // Optional display name
role      Role     @default(USER)   // ADMIN or USER
image     String?                   // Optional profile image URL
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

**Relations**:
- `subscription Subscription?` - One subscription per user
- `projects Project[]` - User's projects

**Indexes**:
- `email` - For email-based lookups
- `role` - For role-based queries (admin panel, etc.)

---

### Subscription

**Purpose**: Manages user subscription plans and billing information.

**Key Features**:
- One-to-one relationship with User (enforced via unique constraint)
- Tracks Stripe customer and subscription IDs for billing
- Stores current billing period dates
- Supports cancellation at period end

**Fields**:
```prisma
id                    String             @id @default(uuid())
userId                String             @unique
tier                  SubscriptionTier   @default(FREE)
status                SubscriptionStatus @default(ACTIVE)
stripeCustomerId      String?            @unique
stripeSubscriptionId  String?            @unique
currentPeriodStart    DateTime?
currentPeriodEnd      DateTime?
cancelAtPeriodEnd     Boolean           @default(false)
createdAt             DateTime          @default(now())
updatedAt             DateTime          @updatedAt
```

**Relations**:
- `user User @relation(...)` - Belongs to one user

**Indexes**:
- `userId` - Foreign key index
- `tier` - For filtering by subscription tier
- `status` - For filtering by subscription status
- `stripeCustomerId` - For Stripe webhook lookups

**Cascade Delete**: When a user is deleted, their subscription is automatically deleted.

---

### Project

**Purpose**: User-created projects for the CRUD system.

**Key Features**:
- Many-to-one relationship with User (user owns multiple projects)
- Supports soft deletion via status field
- Optional color field for UI customization
- Indexed for efficient queries by user and status

**Fields**:
```prisma
id          String   @id @default(uuid())
userId      String
name        String
description String?
status      String   @default("active")  // active, archived, deleted
color       String?                       // Hex color for UI
createdAt   DateTime @default(now())
updatedAt   DateTime @updatedAt
```

**Relations**:
- `user User @relation(...)` - Belongs to one user

**Indexes**:
- `userId` - Foreign key index
- `status` - For filtering projects by status
- `userId, status` - Composite index for user's projects filtered by status
- `createdAt` - For sorting by creation date

**Cascade Delete**: When a user is deleted, all their projects are automatically deleted.

---

## Relationships Diagram

```
User (1) ────── (1) Subscription
  │
  │ (1)
  │
  │ (many)
  │
Project
```

- **User ↔ Subscription**: One-to-one (each user has one subscription)
- **User ↔ Project**: One-to-many (each user can have many projects)

---

## Best Practices Implemented

### 1. **Supabase Integration**
- User `id` matches Supabase Auth UUID for seamless integration
- Allows direct linking between Prisma User model and Supabase auth.users

### 2. **Indexes for Performance**
- All foreign keys indexed
- Frequently queried fields indexed (email, role, status, tier)
- Composite indexes for common query patterns (userId + status)

### 3. **Data Integrity**
- Cascade deletes ensure data consistency
- Unique constraints prevent duplicate subscriptions per user
- Required fields prevent invalid data

### 4. **Scalability**
- UUIDs for primary keys (better for distributed systems)
- Proper indexing for query optimization
- Status fields allow soft deletes without data loss

### 5. **Billing Integration**
- Stripe fields (customer ID, subscription ID) for payment processing
- Billing period tracking for subscription management
- Cancel at period end flag for graceful cancellations

### 6. **Timestamps**
- `createdAt` for audit trails
- `updatedAt` for change tracking

---

## Usage Examples

### Create User (after Supabase Auth signup)

```typescript
import { prisma } from '@/lib/prisma/client'

// After user signs up in Supabase Auth, create Prisma user
const user = await prisma.user.create({
  data: {
    id: supabaseUser.id, // Use Supabase auth user ID
    email: supabaseUser.email,
    name: 'John Doe',
    role: 'USER',
  },
})
```

### Create Subscription

```typescript
const subscription = await prisma.subscription.create({
  data: {
    userId: user.id,
    tier: 'PRO',
    status: 'ACTIVE',
    stripeCustomerId: 'cus_xxx',
  },
})
```

### Create Project

```typescript
const project = await prisma.project.create({
  data: {
    userId: user.id,
    name: 'My Project',
    description: 'Project description',
    color: '#3b82f6',
  },
})
```

### Query User with Relations

```typescript
const userWithRelations = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    subscription: true,
    projects: {
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
    },
  },
})
```

---

## Migration Commands

After setting up your database URL:

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name init

# View database in Prisma Studio
npx prisma studio
```

---

## Environment Setup

Add to `.env.local`:

```env
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

See `ENV_SETUP.md` for detailed instructions.

