"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { Hub } from "aws-amplify/utils"
import { signIn as amplifySignIn, signOut as amplifySignOut, getCurrentUser } from "aws-amplify/auth"
import { configureAmplify } from "@/lib/auth-service"

// Define the auth state type
interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
}

// Define the auth context type
interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  })

  // Initialize Amplify
  useEffect(() => {
    configureAmplify()
    checkUserAuthentication()

    // Listen for auth events
    const unsubscribe = Hub.listen("auth", ({ payload}) => {
      const { event } = payload;
      const data = (payload as any).data;
      switch (event) {
        case "signedIn":
          setAuthState({ isAuthenticated: true, isLoading: false, user: data })
          break
        case "signedOut":
          setAuthState({ isAuthenticated: false, isLoading: false, user: null })
          break
        case "tokenRefresh":
          refreshUser()
          break
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Check if user is authenticated
  const checkUserAuthentication = async () => {
    try {
      const user = await getCurrentUser()
      setAuthState({ isAuthenticated: true, isLoading: false, user })
    } catch (error) {
      setAuthState({ isAuthenticated: false, isLoading: false, user: null })
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    try {
      const user = await getCurrentUser()
      setAuthState({ isAuthenticated: true, isLoading: false, user })
    } catch (error) {
      setAuthState({ isAuthenticated: false, isLoading: false, user: null })
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const user = await amplifySignIn({
        username: email,
        password,
      })
      setAuthState({ isAuthenticated: true, isLoading: false, user })
      return { success: true }
    } catch (error) {
      console.error("Error signing in:", error)
      return { success: false, error }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      await amplifySignOut()
      setAuthState({ isAuthenticated: false, isLoading: false, user: null })
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Context value
  const value = {
    ...authState,
    signIn,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
