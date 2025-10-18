import { parse } from "cookie";

function authHeaders(req) {
  const { rk_admin_token } = parse(req.headers.cookie || "");
  return {
    "Content-Type": "application/json",
    ...(rk_admin_token ? { Authorization: `Bearer ${rk_admin_token}` } : {}),
  };
}

export default async function handler(req, res) {
  // GET -> list students
  if (req.method === "GET") {
    try {
      const r = await fetch(`${process.env.BACKEND_URL}/api/admin/list`, {
        headers: authHeaders(req),
      });
      const body = await r.text(); // robust parsing (see below)
      const data = safeJson(body);
      console.log("[/api/students GET] backend", r.status, data);
      return res.status(r.status).send(body);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Fetch failed" });
    }
  }

  // POST -> add student
  if (req.method === "POST") {
    try {
      const r = await fetch(`${process.env.BACKEND_URL}/api/admin/add`, {
        method: "POST",
        headers: authHeaders(req),
        body: JSON.stringify(req.body),
      });
      const body = await r.text();
      const data = safeJson(body);
      console.log("[/api/students POST] backend", r.status, data);
      return res.status(r.status).send(body);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Create failed" });
    }
  }

  return res.status(405).end();
}

/** parse JSON if possible; otherwise return a string */
function safeJson(txt) {
  try { return JSON.parse(txt); } catch { return txt; }
}
