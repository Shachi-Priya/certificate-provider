// import { useState } from "react";
// import Layout from "../components/Layout";
// import Captcha from "../components/Captcha";
// import { useRouter } from "next/router";

// export default function Home() {
//   const [regNo, setRegNo] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [input, setInput] = useState("");
//   const router = useRouter();

//   function submit(e) {
//     e.preventDefault();
//     if (captcha !== input.trim().toUpperCase()) return alert("Captcha incorrect");
//     router.push(`/verify/${encodeURIComponent(regNo.trim())}`);
//   }

//   return (
//     <Layout title="Certificate Verification">
//       <div className="mx-auto max-w-2xl">
//         <div className="mb-6 text-center">
//           <h1 className="mb-2 text-3xl font-bold">Verify Your Certificate</h1>
//           <p className="text-gray-600">Enter your Registration / Certificate number and complete the captcha.</p>
//         </div>

//         <form onSubmit={submit} className="card grid gap-4">
//           <input className="input" placeholder="Registration / Certificate No."
//                  value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
//           <div className="grid gap-3 sm:grid-cols-2">
//             <Captcha onChange={setCaptcha} />
//             <input className="input" placeholder="Enter Captcha"
//                    onChange={(e) => setInput(e.target.value)} />
//           </div>
//           <button className="btn btn-primary w-full" type="submit">Search</button>
//         </form>
//       </div>
//     </Layout>
//   );
// }



/////////////



import { useRef, useState } from "react";
import Layout from "../components/Layout";
import Captcha from "../components/Captcha";
import { useRouter } from "next/router";
import FullBleed from "../components/FullBleed";
import { RotateCcw } from "lucide-react";
import { getAuthedFromReq } from "../lib/authServer";


export async function getServerSideProps({ req }) {
  const authed = await getAuthedFromReq(req);
  return { props: { authed } };
}

export default function Home({authed}) {
  const [regNo, setRegNo] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0); // force re-mount to refresh
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();
  const formRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    if (captcha !== input.trim().toUpperCase()) return alert("Captcha incorrect");
    router.push(`/verify/${encodeURIComponent(regNo.trim())}`);
  }

  function refreshCaptcha() {
    setSpinning(true);
    setCaptchaKey((k) => k + 1); // re-mount Captcha
    setCaptcha("");
    setInput("");
    setTimeout(() => setSpinning(false), 450);
  }


  return (
    <Layout title="Royal Krishna Coaching" authed={authed}>
      {/* HERO (full-bleed) */}
      <FullBleed>
        <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-700 text-white">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                  Royal Krishna Coaching
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
                Empowering students for a better future with job-ready skills and authentic certifications.
              </p>
            </div>

            {/* Verify Form */}
            <div
              className="mt-8 w-full max-w-md bg-white text-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 mx-auto"
              ref={formRef}
            >
              <h2 className="text-lg sm:text-xl font-bold text-center text-blue-900">
                Verify a Certificate
              </h2>
              <p className="text-sm text-gray-600 text-center mt-1 mb-4">
                Enter your Certificate / Registration number and complete the captcha.
              </p>

              <form onSubmit={submit} className="grid gap-3">
                <input
                  className="w-full border border-gray-300 rounded-lg h-11 px-3 focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Certificate / Registration Number"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  required
                />

                {/* Captcha row with icon refresh */}
                <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr] gap-3 items-center">
                  {/* Captcha Box */}
                  <Captcha key={captchaKey} onChange={setCaptcha} />

                  {/* Only Refresh Icon (no text) */}
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    aria-label="Refresh captcha"
                    className="flex items-center justify-center h-11 w-11 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    title="Refresh Captcha"
                  >
                    <RotateCcw className={`w-5 h-5 text-gray-700 ${spinning ? "animate-spin" : ""}`} />
                  </button>

                  {/* Captcha Input */}
                  <input
                    className="w-full border border-gray-300 rounded-lg h-11 px-3 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Enter Captcha"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>


                <button
                  type="submit"
                  className="h-11 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-300"
                >
                  Verify Now
                </button>
              </form>
            </div>
          </div>
        </section>
      </FullBleed>

      {/* ABOUT (centered, not full-bleed) */}
      <section className="bg-gray-50 py-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">About Us</h2>
          <p className="text-gray-700 mb-10 leading-relaxed text-base sm:text-lg">
            Royal Krishna Coaching is a premier institute delivering top-tier training — from
            competitive exams to professional skill development. Our expert mentors, structured
            curriculum, and hands-on projects help students build confidence and achieve more.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature title="🎓 Skilled Mentors" desc="Experienced faculty with practical expertise." />
            <Feature title="💼 Job-Ready Courses" desc="Focus on outcomes, projects and real practice." />
            <Feature title="📜 Genuine Certificates" desc="Instant online verification for trust." />
          </div>
        </div>
      </section>

      {/* CTA (full-bleed) */}
      <FullBleed>
        <section className="bg-blue-800 text-white py-10">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-medium">
                Already a student? Verify your certificate anytime.
              </h3>
              <a
                href="#verify"
                onClick={(e) => {
                  e.preventDefault();
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
              >
                Go to Verify
              </a>
            </div>
          </div>
        </section>
      </FullBleed>
    </Layout>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition duration-300">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600 mt-1 text-sm">{desc}</p>
    </div>
  );
}
