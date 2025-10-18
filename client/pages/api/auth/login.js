// pages/api/auth/login.js
import { serialize } from "cookie";   // <-- named import

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const r = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json(data);
    }

    // Safety guard
    if (!data?.token || typeof data.token !== "string") {
      return res.status(500).json({ message: "Token missing from backend response" });
    }

    // Set HttpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("rk_admin_token", data.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // set true when you use HTTPS
        path: "/",
        maxAge: 60 * 60 * 2, // 2 hours
      })
    );

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Login API error:", e);
    return res.status(500).json({ message: "Login failed" });
  }
}
