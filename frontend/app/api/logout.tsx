import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect("/signin");
  res.cookies.set("amplify.authenticatorAuthState", "", {
    path: "/",
    maxAge: 0,
  });
  return res;
}