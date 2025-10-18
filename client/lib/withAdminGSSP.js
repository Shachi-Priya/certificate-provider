// ESM-safe cookie lib import in Next 15
import { parse } from "cookie";

/**
 * Use in getServerSideProps to require the rk_admin_token cookie.
 * Optionally verifies the token against your backend for extra safety.
 */
export function requireAdminGSSP(verifyWithBackend = true) {
  return async function getServerSideProps(ctx) {
    const { req } = ctx;
    const { rk_admin_token } = parse(req.headers.cookie || "");

    if (!rk_admin_token) {
      return {
        redirect: { destination: "/admin/login", permanent: false },
      };
    }

    if (!verifyWithBackend) {
      return { props: {} };
    }

    // Optional: verify token by pinging backend
    try {
      const r = await fetch(`${process.env.BACKEND_URL}/api/admin/list`, {
        headers: { Authorization: `Bearer ${rk_admin_token}` },
      });
      if (r.status === 401 || r.status === 403) {
        return {
          redirect: { destination: "/admin/login", permanent: false },
        };
      }
      // We could also prefetch data here if needed
      return { props: {} };
    } catch {
      // On backend error, play safe: force login
      return {
        redirect: { destination: "/admin/login", permanent: false },
      };
    }
  };
}
