"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [verificationSuccess, setVerificationSuccess] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      router.push("/dashboard")
    }

    // Check if user just verified their account
    const verified = searchParams?.get("verified")
    if (verified === "true") {
      setVerificationSuccess(true)
    }
  }, [isAuthenticated, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn(email, password)

      if (result.success) {
        // Redirect to dashboard after successful login
        document.cookie = "amplify.authenticatorAuthState=signedIn; path=/; secure; samesite=strict; max-age=86400";
        router.push("/dashboard")
      } else {
        setError(result.error.message || "Invalid email or password. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex h-screen max-w-md items-center px-4 py-8">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in to JobMatch</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          {verificationSuccess && (
            <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
              <AlertDescription>Your account has been successfully verified. You can now sign in.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-300">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
