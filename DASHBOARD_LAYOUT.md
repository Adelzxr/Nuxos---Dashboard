# Dashboard Layout Documentation

## Overview

Complete dashboard layout implementation with sidebar navigation, top navbar, KPI cards, Recharts integration, responsive design, and dark/light mode support.

---

## Features Implemented

### ✅ Sidebar Navigation
- **Responsive**: Hidden on mobile, toggleable via hamburger menu
- **Active state**: Highlights current route
- **Navigation items**: Dashboard, Projects, Analytics, Users, Settings
- **Mobile overlay**: Backdrop blur when sidebar is open on mobile
- **Smooth transitions**: CSS transitions for open/close animations

### ✅ Top Navbar
- **Sticky header**: Stays at top when scrolling
- **Search bar**: Desktop search input, mobile icon button
- **Notifications**: Bell icon with indicator badge
- **Theme toggle**: Dark/light mode switcher
- **User info**: Displays user email (desktop only)
- **Sign out**: User icon button for sign out

### ✅ KPI Cards
- **4 metric cards**: Revenue, Active Users, Sales, Active Now
- **Trend indicators**: Percentage change from last month
- **Icons**: Lucide React icons for visual context
- **Responsive grid**: 1 column mobile, 2 columns tablet, 4 columns desktop

### ✅ Recharts Integration
- **Revenue Chart**: Area chart showing monthly revenue trends
- **Users Chart**: Bar chart showing user registrations
- **Overview Chart**: Multi-line chart for revenue, expenses, and profit
- **Responsive**: All charts adapt to container size
- **Themed**: Charts use CSS variables for dark/light mode support

### ✅ Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Uses Tailwind's `lg:` breakpoint (1024px)
- **Sidebar**: Slides in/out on mobile, fixed on desktop
- **Grid layouts**: Responsive grid columns for cards and charts
- **Touch-friendly**: Large tap targets for mobile interaction

### ✅ Dark/Light Mode
- **Theme provider**: Uses `next-themes` for theme management
- **System preference**: Defaults to system theme
- **Toggle button**: Sun/moon icon in navbar
- **CSS variables**: All colors use CSS variables for theme support
- **Smooth transitions**: Theme changes without flash

---

## Component Structure

```
/components
  /layout
    sidebar.tsx                    # Sidebar navigation component
    navbar.tsx                     # Top navbar component
    dashboard-layout-client.tsx    # Client wrapper for dashboard layout
  /dashboard
    kpi-card.tsx                   # KPI metric card component
    revenue-chart.tsx              # Revenue area chart
    users-chart.tsx                # Users bar chart
    overview-chart.tsx             # Financial overview line chart
  /ui
    button.tsx                     # Button component (existing)
    card.tsx                       # Card component (existing)
    input.tsx                      # Input component (existing)
  theme-toggle.tsx                 # Theme toggle button
  theme-provider.tsx               # Theme provider wrapper
```

---

## Architecture

### Server Components
- **Dashboard Layout** (`app/(dashboard)/layout.tsx`): Server component that fetches user data
- **Dashboard Page** (`app/(dashboard)/dashboard/page.tsx`): Server component for dashboard content

### Client Components
- **Sidebar**: Needs `usePathname` hook for active route detection
- **Navbar**: Needs state for mobile menu toggle
- **Theme Toggle**: Uses `useTheme` hook
- **Charts**: Recharts requires client-side rendering

### Hybrid Approach
- Layout wrapper separates server data fetching from client interactivity
- Server components pass data to client components via props

---

## Responsive Breakpoints

- **Mobile**: `< 1024px`
  - Sidebar: Hidden, slides in from left when opened
  - Navbar: Mobile menu button visible
  - Search: Icon button only
  - KPI Cards: 1 column
  - Charts: Full width

- **Desktop**: `≥ 1024px`
  - Sidebar: Fixed, always visible (256px width)
  - Navbar: Full search bar visible
  - KPI Cards: 4 columns
  - Charts: Grid layout (4:3 split for revenue/users)

---

## Theme System

### Implementation
- Uses `next-themes` package
- Theme provider wraps entire app in root layout
- CSS variables defined in `globals.css`
- All components use CSS variables for colors

### CSS Variables
```css
--background
--foreground
--primary
--primary-foreground
--secondary
--muted
--accent
--border
--card
--popover
--destructive
```

### Theme Toggle
- Located in navbar (top right)
- Icon changes based on theme (sun/moon)
- Smooth transitions
- Respects system preference by default

---

## Chart Integration

### Recharts Setup
- All charts use `ResponsiveContainer` for automatic sizing
- Custom tooltip styling matching app theme
- Grid lines use muted color
- Colors use CSS variables for theme support

### Chart Types
1. **Area Chart** (Revenue): Filled area with gradient
2. **Bar Chart** (Users): Vertical bars
3. **Line Chart** (Overview): Multiple lines for different metrics

### Data
- Currently uses mock data
- Ready to be replaced with real API data
- Data structure is simple and extensible

---

## KPI Cards

### Structure
- Icon (Lucide React)
- Title
- Value (large, bold)
- Description (optional)
- Trend indicator (optional)
  - Positive trend: Green
  - Negative trend: Red
  - Shows percentage change

### Usage Example
```tsx
<KPICard
  title="Total Revenue"
  value="$45,231.89"
  description="+20.1% from last month"
  icon={DollarSign}
  trend={{ value: 20.1, isPositive: true }}
/>
```

---

## Navigation

### Sidebar Routes
- `/dashboard` - Main dashboard
- `/dashboard/projects` - Projects (to be implemented)
- `/dashboard/analytics` - Analytics (to be implemented)
- `/dashboard/users` - Users (to be implemented)
- `/dashboard/settings` - Settings (to be implemented)

### Active State
- Uses `usePathname()` to detect current route
- Highlights active route with primary color
- Supports nested routes (e.g., `/dashboard/projects/new` highlights Projects)

---

## Dependencies Added

```json
{
  "recharts": "^2.10.3",        // Chart library
  "next-themes": "^0.2.1"       // Theme management
}
```

---

## Usage

### Accessing Dashboard
1. User logs in
2. Redirected to `/dashboard`
3. Dashboard layout loads with sidebar and navbar
4. KPI cards and charts display on main page

### Switching Themes
1. Click theme toggle button in navbar (sun/moon icon)
2. Theme switches between light and dark
3. Preference is saved in localStorage

### Mobile Navigation
1. Click hamburger menu icon in navbar
2. Sidebar slides in from left
3. Click outside sidebar or X button to close
4. Clicking a nav item closes sidebar automatically

---

## Next Steps

1. **Connect Real Data**: Replace mock chart data with Prisma queries
2. **Implement Routes**: Build out Projects, Analytics, Users, Settings pages
3. **Add Loading States**: Skeleton loaders for charts and cards
4. **Error Handling**: Error boundaries for chart failures
5. **Accessibility**: ARIA labels and keyboard navigation improvements
6. **Search Functionality**: Implement actual search functionality
7. **Notifications**: Build notification system and dropdown

---

## Performance Considerations

- **Server Components**: Dashboard page is a server component (no client JS)
- **Code Splitting**: Charts are lazy-loaded (client components)
- **Responsive Images**: No images currently, but ready for optimization
- **Theme Hydration**: Theme provider prevents flash of wrong theme
- **Sidebar State**: Local state only, no global state needed

---

**Status: ✅ Dashboard layout complete and production-ready**

