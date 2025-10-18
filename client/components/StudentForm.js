import { useState, useEffect } from "react";

const todayISO = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`; // yyyy-mm-dd for <input type="date">
};

const EMPTY = { regNo: "", studentName: "", course: "", issuedOn: todayISO() };

export default function StudentForm({ initial, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (initial && typeof initial === "object") {
      setForm((prev) => ({
        ...prev,
        regNo: initial.regNo ?? prev.regNo,
        studentName: initial.studentName ?? prev.studentName,
        course: initial.course ?? prev.course,
        issuedOn: initial.issuedOn ? new Date(initial.issuedOn).toISOString().slice(0,10) : prev.issuedOn,
      }));
    }
  }, [initial]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form className="card grid gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit({
      ...form,
      // normalize issuedOn to ISO date string
      issuedOn: form.issuedOn,
    }); }}>
      <div>
        <label className="mb-1 block text-sm text-gray-600">Registration No.</label>
        <input className="input" value={form.regNo} onChange={update("regNo")} required />
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-600">Student Name</label>
        <input className="input" value={form.studentName} onChange={update("studentName")} required />
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-600">Course</label>
        <input className="input" value={form.course} onChange={update("course")} required />
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-600">Issued On</label>
        <input type="date" className="input" value={form.issuedOn} onChange={update("issuedOn")} required />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
