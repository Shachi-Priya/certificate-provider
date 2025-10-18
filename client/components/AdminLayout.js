import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "./Layout";
import { Menu, X, ListOrdered, UserPlus, ShieldCheck } from "lucide-react";

const defaultMenu = [
  { href: "/admin/dashboard", label: "Student List", key: "students", icon: <ListOrdered className="h-4 w-4" /> },
  { href: "/admin/add-student", label: "Add Student", key: "add", icon: <UserPlus className="h-4 w-4" /> },
  { href: "/", label: "Verify (Public)", key: "verify", icon: <ShieldCheck className="h-4 w-4" /> },
];

export default function AdminLayout({
  title = "Admin",
  activeKey,
  children,
  actions = null,     // optional right-side actions in the content header
  menu = defaultMenu,
  authed = false 
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isActive = (m) => (activeKey ? activeKey === m.key : router.asPath === m.href);

  return (
    <Layout title={title} authed={authed}>
      {/* Main grid: sidebar + content (no extra header, no extra footer) */}
      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 md:self-start">
          {/* Mobile drawer */}
          <div
            className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
            onClick={() => setOpen(false)}
          >
            <div className={`absolute inset-0 bg-black/20 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
            <div
              className={`absolute left-0 top-0 h-full w-[80%] max-w-xs transform bg-white shadow-xl transition-transform ${
                open ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <p className="mb-3 px-2 text-sm font-semibold text-slate-800">Admin Menu</p>
                <nav className="flex flex-col gap-1">
                  {menu.map((m) => (
                    <Link
                      key={m.key}
                      href={m.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                        isActive(m) ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {m.icon} <span>{m.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm">
            <p className="mb-3 px-2 text-sm font-semibold text-slate-800">Admin Menu</p>
            <nav className="flex flex-col gap-1">
              {menu.map((m) => (
                <Link
                  key={m.key}
                  href={m.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    isActive(m) ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {m.icon} <span>{m.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {/* Content header (title + actions + mobile menu button) */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition"
                aria-label="Open admin menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
            </div>
            <div className="hidden md:block">{actions}</div>
          </div>

          {/* Mobile actions under title */}
          <div className="md:hidden mb-3">{actions}</div>

          {children}
        </main>
      </div>
    </Layout>
  );
}
