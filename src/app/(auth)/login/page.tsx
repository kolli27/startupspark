"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signIn, loading: authLoading } = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Get the redirectTo from URL params or default to dashboard
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  // If user is already logged in, redirect to intended destination
  useEffect(() => {
    if (user && !authLoading) {
      console.log("Login: User already logged in, redirecting to:", redirectTo)
      window.location.href = redirectTo
    }
  }, [user, authLoading, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    console.log("Login: Attempting sign in for:", email)

    try {
      const { error, success } = await signIn(email, password)
      console.log("Login: Sign in result:", { error, success })

      if (error) {
        throw error
      }

      if (success) {
        console.log("Login: Sign in successful, redirecting to:", redirectTo)
        // Force a hard refresh to ensure the session is properly established
        window.location.href = redirectTo
      }
    } catch (err: any) {
      console.error("Login: Error in submit handler:", err)
      setError(
        err.message === "Invalid login credentials"
          ? "Invalid email or password"
          : err.message || "An error occurred while signing in"
      )
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't show login form if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                disabled={loading}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              variant="gradient"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link 
              href="/terms" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link 
              href="/privacy" 
              className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
