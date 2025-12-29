'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, registerSchema } from '@/lib/validations/auth'
import { prisma } from '@/lib/prisma/client'

export type ActionResult = {
  error?: string
  success?: boolean
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const result = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!result.success) {
      return {
        error: result.error.errors[0]?.message || 'Invalid input',
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    })

    if (error) {
      // Don't expose internal error details to users
      return {
        error: 'Invalid email or password',
      }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient()

    const result = registerSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    })

    if (!result.success) {
      return {
        error: result.error.errors[0]?.message || 'Invalid input',
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
    })

    if (error) {
      // Sanitize error messages for users
      const userMessage = error.message.includes('already registered')
        ? 'An account with this email already exists'
        : 'Failed to create account. Please try again.'
      
      return {
        error: userMessage,
      }
    }

    // Create user record in Prisma if signup was successful
    if (data.user) {
      try {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email: result.data.email,
            role: 'USER',
          },
        })
      } catch (prismaError) {
        // Log but don't fail - user is still created in Supabase
        // Could be a duplicate key error if user already exists
        console.error('Failed to create user in Prisma:', prismaError)
      }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (error) {
    console.error('Registration error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
