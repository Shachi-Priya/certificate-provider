import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { apiGet } from "../../lib/apiClient";
import DownloadButtons from "../../components/DownloadButtons";
import CertificateTemplate from "../../components/CertificateTemplate";
import { Loader2, AlertCircle } from "lucide-react";
import { getAuthedFromReq } from "../../lib/authServer";


export async function getServerSideProps({ req, params }) {
  const authed = await getAuthedFromReq(req);
  // You can also fetch the certificate here if you want pure SSR
  return { props: { authed } };
}

export default function Verify({authed}) {
  const { regNo } = useRouter().query;
  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    if (!regNo) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await apiGet(`/api/verify/${regNo}`);
        if (!cancelled) setState({ loading: false, data, error: null });
      } catch (e) {
        if (!cancelled) setState({ loading: false, data: null, error: e.message || "Something went wrong." });
      }
    })();
    return () => { cancelled = true; };
  }, [regNo]);

  const { loading, data, error } = state;

  return (
    <Layout title="Certificate" authed={authed}>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-slate-700">Checking certificate…</span>
            </div>
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-64 w-full rounded bg-slate-100" />
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Verification failed</span>
            </div>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        {/* No certificate */}
        {!loading && !error && data?.message && (
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 text-slate-700 shadow-sm">
            No certificate found for: <span className="font-semibold">{regNo}</span>
          </div>
        )}

        {/* Certificate */}
        {!loading && !error && data && !data.message && (
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              {/* Back Button */}
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-blue-600 hover:text-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
              </button>

              {/* Download Buttons */}
              <div className="w-full sm:w-auto">
                <div className="flex w-full flex-wrap items-center gap-2 sm:justify-end">
                  <DownloadButtons fileName={`RKC-${data.regNo}`} />
                </div>
              </div>
            </div>

            {/* Preview (scaled on small screens; centered; no overflow) */}
            <div className="mt-4 w-full overflow-auto rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <div className="mx-auto w-fit origin-top scale-95 sm:scale-100">
                <CertificateTemplate student={data} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
