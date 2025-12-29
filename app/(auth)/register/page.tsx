import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { registerAction } from '@/app/actions/auth'
import RegisterForm from '@/components/auth/register-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | NexusAI',
  description: 'Create a new account',
}

export default async function RegisterPage() {
  const user = await getUser()
  
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <RegisterForm registerAction={registerAction} />
    </div>
  )
}

