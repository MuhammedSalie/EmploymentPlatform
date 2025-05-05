import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize("amplify.authenticatorAuthState", "", {
    path: "/",
    expires: new Date(0),
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Cookie cleared" });
}

