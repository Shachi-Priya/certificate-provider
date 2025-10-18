import { useEffect, useState } from "react";

export default function Captcha({ onChange }) {
  const [code, setCode] = useState("");

  // Generate a random captcha code
  function generate() {
    const s = Math.random().toString(36).slice(2, 6).toUpperCase();
    setCode(s);
    onChange?.(s);
  }

  useEffect(() => {
    generate(); // generate once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center">
      <div className="select-none rounded-lg bg-gray-800 px-3 py-2 font-mono text-white tracking-widest">
        {code}
      </div>
    </div>
  );
}
