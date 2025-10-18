// pages/api/auth/status.js
import { parse } from "cookie";

export default async function handler(req, res) {
  try {
    const { rk_admin_token } = parse(req.headers.cookie || "");
    if (!rk_admin_token) return res.status(200).json({ authenticated: false });

    // cheap verification by hitting any protected backend route
    const r = await fetch(`${process.env.BACKEND_URL}/api/admin/list`, {
      headers: { Authorization: `Bearer ${rk_admin_token}` },
    });

    return res
      .status(200)
      .json({ authenticated: r.ok });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
}
