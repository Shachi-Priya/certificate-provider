// components/DownloadButtons.js
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DownloadButtons({ fileName = "certificate" }) {
  const [working, setWorking] = useState(false);

  async function capture() {
    const node = document.getElementById("certificate-root");
    if (!node) throw new Error("Certificate root not found");

    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      onclone: (doc) => {
        // Remove Tailwind/global styles that define oklch colors
        doc.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => el.remove());
        // Minimal reset for predictable rendering
        const style = doc.createElement("style");
        style.textContent = `
          * { box-sizing: border-box; }
          body { margin: 0; background: #ffffff; color: #111827; }
        `;
        doc.head.appendChild(style);
      },
    });
    return canvas;
  }

  async function downloadPNG() {
    if (working) return;
    setWorking(true);
    try {
      const canvas = await capture();
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setWorking(false);
    }
  }

  async function downloadPDF() {
    if (working) return;
    setWorking(true);
    try {
      const canvas = await capture();
      // Match PDF page exactly to the canvas size
      const pdf = new jsPDF({
        unit: "px",
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(canvas, "PNG", 0, 0, canvas.width, canvas.height, undefined, "FAST");
      pdf.save(`${fileName}.pdf`);
    } finally {
      setWorking(false);
    }
  }

  // Unified button style (same color + hover for both)
  const btn =
    "inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 " +
    "text-sm font-semibold text-white shadow hover:bg-blue-700 transition " +
    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-wrap gap-2">
      <button className={btn} type="button" onClick={downloadPNG} disabled={working}>
        Download PNG
      </button>
      <button className={btn} type="button" onClick={downloadPDF} disabled={working}>
        Download PDF
      </button>
    </div>
  );
}
