'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Still redirect even if logout fails
    redirect('/login')
  }
}

