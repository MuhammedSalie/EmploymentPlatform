import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect("/dashboard");
  res.cookies.set("amplify.authenticatorAuthState", "signedIn", {
    httpOnly: true, // optional, adds security
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return res;
}