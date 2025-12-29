import { DashboardLayoutClient } from '@/components/layout/dashboard-layout-client'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Removed authentication for demo purposes
  // const user = await requireAuth()

  return <DashboardLayoutClient userEmail="demo@nexusai.com">{children}</DashboardLayoutClient>
}

