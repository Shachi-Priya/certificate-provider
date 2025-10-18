// // components/Navbar.jsx
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useAuth } from "../lib/useAuth";
// import { useState } from "react";
// import { Menu, X, LogOut, Shield } from "lucide-react";

// export default function Navbar() {
//   const router = useRouter();
//   const { authed } = useAuth();
//   const [open, setOpen] = useState(false);

//   async function logout() {
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.push("/admin/login");
//   }

//   const isActive = (href) =>
//     router.pathname === href ||
//     (href !== "/" && router.pathname.startsWith(href));

//   const linkBase =
//     "relative inline-flex items-center gap-1 text-sm font-medium transition-colors";
//   const linkIdle = "text-gray-700 hover:text-blue-700";
//   const linkActive =
//     "text-blue-800 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600";

//   return (
//     <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
//       {/* Gradient accent bar (1px) */}
//       <div className="h-[2px] w-full bg-gradient-to-r " />

//       <div className="mx-auto max-w-6xl px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Brand */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-sm ring-1 ring-black/5">
//               RK
//             </span>
//             <span className="text-base sm:text-lg font-semibold text-slate-900">
//               Royal Krishna Coaching
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-6">
//             <Link
//               href="/"
//               className={`${linkBase} ${isActive("/") ? linkActive : linkIdle}`}
//             >
//               Home
//             </Link>

//             {authed ? (
//               <>
//                 <Link
//                   href="/admin/dashboard"
//                   className={`${linkBase} ${isActive("/admin/dashboard") ? linkActive : linkIdle}`}
//                 >
//                   <Shield className="h-4 w-4" />
//                   Admin
//                 </Link>

//                 <button
//                   onClick={logout}
//                   aria-label="Logout"
//                   title="Logout"
//                   className="inline-flex items-center justify-center rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition"
//                 >
//                   <LogOut className="h-4 w-4" />
//                 </button>
//               </>
//             ) : (
//               <Link
//                 href="/admin/login"
//                 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition hover:translate-y-[-1px]"
//               >
//                 <Shield className="h-4 w-4" />
//                 Admin Login
//               </Link>
//             )}
//           </nav>

//           {/* Mobile: Hamburger */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition"
//             aria-label="Toggle menu"
//             onClick={() => setOpen((v) => !v)}
//           >
//             {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Panel */}
//       <div
//         className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
//           open ? "max-h-64" : "max-h-0"
//         }`}
//       >
//         <div className="mx-auto max-w-6xl px-4 pb-4">
//           <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur p-3 shadow-sm">
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="/"
//                 onClick={() => setOpen(false)}
//                 className={`rounded-lg px-3 py-2 ${isActive("/") ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"}`}
//               >
//                 Home
//               </Link>

//               {authed ? (
//                 <>
//                   <Link
//                     href="/admin/dashboard"
//                     onClick={() => setOpen(false)}
//                     className={`rounded-lg px-3 py-2 ${isActive("/admin/dashboard") ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"}`}
//                   >
//                     Admin Dashboard
//                   </Link>

//                   <button
//                     onClick={() => {
//                       setOpen(false);
//                       logout();
//                     }}
//                     className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link
//                   href="/admin/login"
//                   onClick={() => setOpen(false)}
//                   className="mt-1 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 font-semibold text-white shadow-sm"
//                 >
//                   <Shield className="h-4 w-4" />
//                   Admin Login
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


/////////////



// components/Navbar.jsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Menu, X, LogOut, Shield } from "lucide-react";

export default function Navbar({ authed = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const isActive = (href) =>
    router.pathname === href || (href !== "/" && router.pathname.startsWith(href));

  const linkBase = "relative inline-flex items-center gap-1 text-sm font-medium transition-colors";
  const linkIdle = "text-gray-700 hover:text-blue-700";
  const linkActive =
    "text-blue-800 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200">
      <div className="h-[2px] w-full bg-gradient-to-r " />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-sm ring-1 ring-black/5">
              RK
            </span>
            <span className="text-base sm:text-lg font-semibold text-slate-900">
              Royal Krishna Coaching
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`${linkBase} ${isActive("/") ? linkActive : linkIdle}`}>Home</Link>

            {authed ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`${linkBase} ${isActive("/admin/dashboard") ? linkActive : linkIdle}`}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
                <button
                  onClick={logout}
                  aria-label="Logout"
                  title="Logout"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition hover:translate-y-[-1px]"
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${open ? "max-h-64" : "max-h-0"}`}>
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="rounded-xl border border-slate-200 bg-white/90 backdrop-blur p-3 shadow-sm">
            <div className="flex flex-col gap-2">
              <Link href="/" onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 ${isActive("/") ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"}`}>
                Home
              </Link>

              {authed ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 ${isActive("/admin/dashboard") ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { setOpen(false); logout(); }}
                    className="mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 font-semibold text-white shadow-sm"
                >
                  <Shield className="h-4 w-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
