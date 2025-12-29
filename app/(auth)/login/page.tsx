import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { loginAction } from '@/app/actions/auth'
import LoginForm from '@/components/auth/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | NexusAI',
  description: 'Sign in to your account',
}

export default async function LoginPage() {
  const user = await getUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <LoginForm loginAction={loginAction} />
    </div>
  )
}

