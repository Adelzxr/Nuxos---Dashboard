import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NexusAI Dashboard',
  description: 'Production-grade SaaS dashboard',
}

export default async function HomePage() {
  redirect('/dashboard')
}

