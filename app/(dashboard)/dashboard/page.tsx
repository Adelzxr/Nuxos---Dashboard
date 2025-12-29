import { requireAuth } from '@/lib/auth'
import { KPICard } from '@/components/dashboard/kpi-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { UsersChart } from '@/components/dashboard/users-chart'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | NexusAI',
  description: 'Overview of your business metrics',
}

export default async function DashboardPage() {
  // Removed authentication for demo purposes
  // await requireAuth()

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        <KPICard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          trend={{ value: 20.1, isPositive: true }}
          accentColor="purple"
        />
        <KPICard
          title="Active Users"
          value="2,350"
          icon={Users}
          trend={{ value: 180.1, isPositive: true }}
          accentColor="blue"
        />
        <KPICard
          title="Sales"
          value="12,234"
          icon={CreditCard}
          trend={{ value: 19, isPositive: true }}
          accentColor="cyan"
        />
        <KPICard
          title="Active Now"
          value="573"
          icon={Activity}
          trend={{ value: 12.5, isPositive: true }}
          accentColor="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-500" />
                  Revenue Overview
                </CardTitle>
                <CardDescription>
                  Monthly revenue trends over the last 7 months
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  +12.5%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        {/* Users Chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Users
                </CardTitle>
                <CardDescription>
                  New user registrations this month
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UsersChart />
          </CardContent>
        </Card>
      </div>

      {/* Overview Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-500" />
                Financial Overview
              </CardTitle>
              <CardDescription>
                Revenue, expenses, and profit trends
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-violet-500" />
                <span className="text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="text-muted-foreground">Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Profit</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <OverviewChart />
        </CardContent>
      </Card>
    </div>
  )
}
