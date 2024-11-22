// lib/auth/AuthContext.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null; success: boolean }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null; success: boolean; confirmationRequired?: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setServerSession = async () => {
      try {
        const { data: { session: sessionData }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        console.log('AuthContext: Initial session check:', {
          hasSession: !!sessionData,
          user: sessionData?.user?.email
        })
        
        setSession(sessionData)
        setUser(sessionData?.user ?? null)
      } catch (error) {
        console.error('AuthContext: Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    setServerSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('AuthContext: Auth state change:', event, {
          hasSession: !!currentSession,
          user: currentSession?.user?.email
        })

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (event === 'SIGNED_IN') {
          // Force refresh to ensure middleware catches the new session
          router.refresh()
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null)
          setSession(null)
          router.refresh()
          router.push('/login')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('AuthContext: Sign in attempt:', {
        success: !!data.session,
        user: data.session?.user?.email,
        error: error?.message
      })

      if (error) throw error

      return { error: null, success: true }
    } catch (error) {
      console.error('AuthContext: Sign in error:', error)
      return {
        error: error as Error,
        success: false
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log('AuthContext: Sign up attempt:', {
        success: !!data.user,
        user: data.user?.email,
        error: error?.message
      })

      if (error) throw error

      return {
        error: null,
        success: true,
        confirmationRequired: data.session === null
      }
    } catch (error) {
      console.error('AuthContext: Sign up error:', error)
      return {
        error: error as Error,
        success: false
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      console.log('AuthContext: Sign out successful')
    } catch (error) {
      console.error('AuthContext: Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
