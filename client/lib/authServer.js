// lib/authServer.js
export async function getAuthedFromReq(req) {
  try {
    // Example: if your cookie name is "rkc_session"
    const token = req.cookies?.rk_admin_token;
    if (!token) return false;

    // Option A: trust presence
    // return true;

    // Option B: verify on server (preferred)
    // e.g., decode JWT or hit your server-side session store
    // const session = await verifySession(token); return !!session?.userId;

    return true; // replace with real verification
  } catch {
    return false;
  }
}
