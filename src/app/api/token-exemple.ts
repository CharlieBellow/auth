import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import jwt from "jsonwebtoken";

export default async function Token(req: NextApiRequest, res: NextApiResponse) {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  const cookies = new Cookies(req, res);
  const sessToken = cookies.get("__session");
  const token = req.headers.authorization;

  if (sessToken === undefined && token === undefined) {
    res.status(401).json({ error: "not signed in" });
    return;
  }

  try {
    let decoded = "";
    if (token) {
      decoded = jwt.verify(token, publicKey).toString();
      res.status(200).json({ sessToken: decoded });
      return;
    } else {
      decoded = jwt.verify(sessToken as string, publicKey).toString()
      res.status(200).json({ sessToken: decoded });
      return;
    }
  } catch (error) {
    res.status(400).json({
      error: "Invalid Token",
    });
    return;
  }
}