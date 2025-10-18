// import { useState } from "react";
// import Layout from "../../components/Layout";
// import { apiPost } from "../../lib/apiClient";
// import { useRouter } from "next/router";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [busy, setBusy] = useState(false);
//   const router = useRouter();

//   async function submit(e) {
//     e.preventDefault();
//     setBusy(true);
//     try {
//       await apiPost("/api/auth/login", form);
//       router.push("/admin/dashboard");
//     } catch (e) {
//       alert(e.message);
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <Layout title="Admin Login">
//       <div className="mx-auto max-w-md">
//         <form onSubmit={submit} className="card grid gap-3">
//           <h2 className="mb-2 text-2xl font-semibold">Admin Login</h2>
//           <input className="input" placeholder="Username"
//                  value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
//           <input type="password" className="input" placeholder="Password"
//                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//           <button className="btn btn-primary" disabled={busy}>{busy ? "Signing in…" : "Login"}</button>
//         </form>
//       </div>
//     </Layout>
//   );
// }



////////////////



import { useState } from "react";
import Layout from "../../components/Layout";
import { apiPost } from "../../lib/apiClient";
import { useRouter } from "next/router";
import { User, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiPost("/api/auth/login", form);
      router.push("/admin/dashboard");
    } catch (e) {
      setError(e?.message || "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout title="Admin Login">
      {/* Page shell */}
      <div className="relative">
        {/* thin gradient accent line to match header */}
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
      </div>

      <section className="min-h-[70vh] sm:min-h-[76vh] grid place-items-center bg-transparent">
        <div className="w-full max-w-md">
          {/* Card */}
          <form
            onSubmit={submit}
            className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur p-6 shadow-lg"
          >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow ring-1 ring-black/5">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Admin Login</h2>
                <p className="text-sm text-slate-500">Enter your credentials to continue</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Username */}
            <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
              <User className="h-4 w-4 text-slate-400" />
              <input
                className="h-11 w-full outline-none placeholder:text-slate-400"
                placeholder="Username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            {/* Password */}
            <label className="mb-1 mt-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
              <Lock className="h-4 w-4 text-slate-400" />
              <input
                className="h-11 w-full outline-none placeholder:text-slate-400"
                type={showPw ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                aria-label={showPw ? "Hide password" : "Show password"}
                title={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Submit */}
            <button
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-60"
              disabled={busy}
              type="submit"
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>Login</>
              )}
            </button>

            {/* Help / Footer */}
            <div className="mt-3 text-center text-xs text-slate-500">
              Having trouble? Contact your administrator.
            </div>
          </form>

        </div>
      </section>
    </Layout>
  );
}
