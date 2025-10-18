// pages/api/auth/logout.js
import { serialize } from "cookie";

export default async function handler(req, res) {
  // Clear cookie immediately
  res.setHeader(
    "Set-Cookie",
    serialize("rk_admin_token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 0,
    })
  );
  res.status(200).json({ ok: true });
}
