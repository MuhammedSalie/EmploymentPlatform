import { Amplify } from "aws-amplify"
import {
  fetchAuthSession,
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  confirmResetPassword,
  resetPassword,
  } from "aws-amplify/auth"
import { awsConfig } from "./aws-config"

// Initialize Amplify
export const configureAmplify = () => {
  if (typeof window !== "undefined") {
    Amplify.configure({
      Auth: {
        Cognito: {
          identityPoolId: awsConfig.cognito.identityPoolId,
          allowGuestAccess: true,  // Enable unauthenticated access
          userPoolId: awsConfig.cognito.userPoolId,
          userPoolClientId: awsConfig.cognito.userPoolWebClientId,
      }},
    })
  }
}

// Authentication service
export const authService = {
  // Sign up a new user
  signUp: async (email: string, password: string, attributes: Record<string, string>) => {
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            ...attributes,
          },
        },
      })
      return { success: true, data: result }
    } catch (error) {
      console.error("Error signing up:", error)
      return { success: false, error }
    }
  },

  // Confirm sign up with verification code
  confirmSignUp: async (email: string, code: string) => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      })
      return { success: true }
    } catch (error) {
      console.error("Error confirming sign up:", error)
      return { success: false, error }
    }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    try {
      const user = await signIn({
        username: email,
        password,
      })
      return { success: true, user }
    } catch (error) {
      console.error("Error signing in:", error)
      return { success: false, error }
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await signOut()
      return { success: true }
    } catch (error) {
      console.error("Error signing out:", error)
      return { success: false, error }
    }
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    try {
      const user = await getCurrentUser()
      return { success: true, user }
    } catch (error) {
      console.error("Error getting current user:", error)
      return { success: false, error }
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const session = await fetchAuthSession()
      return { success: true, session }
    } catch (error) {
      console.error("Error getting current session:", error)
      return { success: false, error }
    }
  },

  // Reset password with confirmation code
  resetPassword: async (email: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      })
      return { success: true }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { success: false, error }
    }
  },

  //request to send user reset password code
   sendPasswordResetEmail: async (email: string) => {
    try {
      const response = await resetPassword({ username: email })
      console.log("Reset password email sent:", response)
      return { success: true }
    } catch (error) {
      console.error("Error sending password reset email:", error)
      return { success: false, error }
    }
  }
}
