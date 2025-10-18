// import Navbar from "./Navbar";
// import Head from "next/head";
// import { brand } from "../lib/auth";

// export default function Layout({ title, children }) {
//   return (
//     <>
//       <Head><title>{title ? `${title} • ${brand()}` : brand()}</title></Head>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="w-full">{children}</main>
//         <footer className="py-8 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} {brand()}
//         </footer>
//       </div>
//     </>
//   );
// }

///////////


// components/Layout.jsx
import Navbar from "./Navbar";
import Head from "next/head";
import { brand } from "../lib/auth";

export default function Layout({ title, children, authed = false }) {
  return (
    <>
      <Head><title>{title ? `${title} • ${brand()}` : brand()}</title></Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar authed={authed} />
        <main className="w-full">{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {brand()}
        </footer>
      </div>
    </>
  );
}
