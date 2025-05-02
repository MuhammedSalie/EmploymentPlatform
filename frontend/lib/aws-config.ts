// AWS Configuration
export const awsConfig = {
  // Cognito
  cognito: {
    //region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || "",
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "",
    oauth: {
      domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "",
      scope: ["email", "profile", "openid"],
      redirectSignIn: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "",
      redirectSignOut: typeof window !== "undefined" ? `${window.location.origin}/signin` : "",
      responseType: "code",
    },
  },
  // Other AWS services can be added here
}
