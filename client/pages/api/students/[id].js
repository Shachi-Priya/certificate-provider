// pages/api/students/[id].js
import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  const { id } = req.query;
  const { rk_admin_token } = parse(req.headers.cookie || "");

  try {
    const r = await fetch(`${process.env.BACKEND_URL}/api/admin/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(rk_admin_token ? { Authorization: `Bearer ${rk_admin_token}` } : {}),
      },
      body: JSON.stringify(req.body),
    });
    const data = await r.json().catch(() => ({}));
    console.log("[/api/students/:id PUT] backend", r.status, data);
    return res.status(r.status).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Update failed" });
  }
}
