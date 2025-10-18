export default async function handler(req, res) {
  const { regNo } = req.query;
  if (req.method !== "GET") return res.status(405).end();
  try {
    const r = await fetch(`${process.env.BACKEND_URL}/api/user/verify/${regNo}`);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
}
