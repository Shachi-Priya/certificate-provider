import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Edit3, Eye, Loader2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { apiGet } from "../../lib/apiClient";
import { getAuthedFromReq } from "../../lib/authServer";

export async function getServerSideProps({ req }) {
  const authed = await getAuthedFromReq(req);
  if (!authed) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  return { props: { authed } };
}

export default function Dashboard({ authed }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qName, setQName] = useState("");
  const [qReg, setQReg] = useState("");

  useEffect(() => {
    apiGet("/api/students")
      .then((d) => setRows(d || []))
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const name = qName.trim().toLowerCase();
    const reg = qReg.trim().toLowerCase();
    return rows.filter((r) => {
      const n = (r.name || r.studentName || "").toLowerCase();
      const rn = (r.reg || r.regNo || "").toLowerCase();
      return (!name || n.includes(name)) && (!reg || rn.includes(reg));
    });
  }, [rows, qName, qReg]);

  return (
    <AdminLayout title="Student List" activeKey="students" authed={authed}>
      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm">
        {/* 🔍 Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="h-11 w-full outline-none placeholder:text-slate-400"
              placeholder="Filter by Name"
              value={qName}
              onChange={(e) => setQName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="h-11 w-full outline-none placeholder:text-slate-400"
              placeholder="Filter by Reg/Cert No."
              value={qReg}
              onChange={(e) => setQReg(e.target.value)}
            />
          </div>
        </div>

        {/* 🧾 Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading students...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No students found.
            </div>
          ) : (
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-sm text-slate-600">
                  <Th>Reg./Cert. No</Th>
                  <Th>Student</Th>
                  <Th>Course</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id || s.reg || s.regNo} className="text-sm text-slate-800">
                    <Td>
                      <Link
                        href={`/verify/${encodeURIComponent(s.reg || s.regNo)}`}
                        className="text-blue-700 hover:underline"
                      >
                        {s.reg || s.regNo}
                      </Link>
                    </Td>
                    <Td className="capitalize">{s.name || s.studentName}</Td>
                    <Td className="capitalize">{s.course}</Td>
                    <Td className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/edit/${encodeURIComponent(s._id || s.reg || s.regNo)}`}
                          className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 transition"
                        >
                          <Edit3 className="h-4 w-4" /> Edit
                        </Link>
                        <Link
                          href={`/verify/${encodeURIComponent(s.reg || s.regNo)}`}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition"
                        >
                          <Eye className="h-4 w-4" /> View
                        </Link>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function Th({ children, className = "" }) {
  return <th className={`py-3 border-b border-slate-200 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`py-3 border-b border-slate-200 ${className}`}>{children}</td>;
}
