import { useEffect, useState } from "react";

export function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch("/api/auth/status", { credentials: "include" });
        const { authenticated } = await r.json();
        if (!stop) setAuthed(!!authenticated);
      } catch {
        if (!stop) setAuthed(false);
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => { stop = true; };
  }, []);

  return { authed, loading };
}
