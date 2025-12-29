'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Sparkles, Mail, Lock, Shield, ArrowRight, Check } from 'lucide-react'

interface RegisterFormProps {
  registerAction: (formData: FormData) => Promise<{ error?: string }>
}

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const [error, setError] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterInput) => {
    setError('')
    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('confirmPassword', data.confirmPassword)
      const result = await registerAction(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  const features = [
    'Unlimited AI-powered analytics',
    'Real-time collaboration',
    'Advanced security features',
  ]

  return (
    <div className="w-full max-w-md">
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/30 mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          NexusAI
        </h1>
        <p className="text-muted-foreground mt-2">Start your journey today</p>
      </div>

      {/* Card */}
      <div className="relative">
        {/* Decorative glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-3xl blur-lg opacity-20" />
        
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl p-8">
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold">Create account</h2>
            <p className="text-muted-foreground text-sm">
              Join thousands of innovators using NexusAI
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {features.map((feature, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
              >
                <Check className="h-3 w-3" />
                {feature}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 dark:text-red-400">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11"
                  {...register('email')}
                  disabled={isPending}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11"
                  {...register('password')}
                  disabled={isPending}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11"
                  {...register('confirmPassword')}
                  disabled={isPending}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base" 
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link href="/login" className="block">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12"
              >
                Sign in instead
              </Button>
            </Link>
          </form>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-violet-600 dark:text-violet-400 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}

