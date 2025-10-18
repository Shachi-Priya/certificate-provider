// components/CertificateTemplate.js
export default function CertificateTemplate({ student }) {
  const issued = student?.issuedOn ? new Date(student.issuedOn) : new Date();

  const outer = {
    width: "900px",
    background: "#ffffff",
    aspectRatio: "1.4142 / 1",      // A4-ish
    border: "8px solid #1e3a8a",    // hex color
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: "40px",
    margin: "0 auto",
  };

  const inner = {
    height: "100%",
    width: "100%",
    border: "6px solid #bfdbfe",    // light blue
    borderRadius: "16px",
    padding: "40px",
  };

  const hBrand = {
    textAlign: "center",
    fontWeight: 800,
    fontSize: "32px",
    letterSpacing: "0.02em",
    color: "#111827",
  };

  const sub = {
    textAlign: "center",
    marginTop: "4px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#6b7280",
  };

  const center = { textAlign: "center", marginTop: "48px", color: "#374151" };

  const name = { marginTop: "8px", fontSize: "40px", fontWeight: 800, color: "#111827" };

  const small = { marginTop: "12px", fontSize: "14px", color: "#4b5563" };

  const courseWrap = { marginTop: "40px", fontSize: "18px" };
  const course = { marginTop: "8px", fontSize: "26px", fontWeight: 700, color: "#1f2937" };

  const footer = {
    marginTop: "64px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "end",
    fontSize: "14px",
    color: "#4b5563",
  };

  const signLine = { marginTop: "24px", display: "inline-block", height: "2px", width: "160px", background: "#9ca3af" };

  return (
    <div id="certificate-root" style={outer}>
      <div style={inner}>
        <div style={hBrand}>Royal Krishna Coaching</div>
        <div style={sub}>Certificate of Completion</div>

        <div style={center}>
          <div style={{ fontSize: "12px" }}>This is to certify that</div>
          <div style={name}>{student.studentName}</div>
          <div style={small}>
            Registration No: <span style={{ fontWeight: 600 }}>{student.regNo}</span>
          </div>

          <div style={courseWrap}>
            has successfully completed the course
            <div style={course}>{student.course}</div>
          </div>
        </div>

        <div style={footer}>
          <div>
            <div>Issued on</div>
            <div style={{ fontWeight: 500 }}>{issued.toDateString()}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div>Authorized Signatory</div>
            <span style={signLine} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div>Certificate No.</div>
            <div style={{ fontWeight: 500 }}>{student.regNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
