import AdminLayout from "../../components/AdminLayout";
import StudentForm from "../../components/StudentForm";
import { apiPost } from "../../lib/apiClient";
import { useState } from "react";
import { requireAdminGSSP } from "../../lib/withAdminGSSP";

export const getServerSideProps = requireAdminGSSP();

export default function AddStudent() {
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(0); // to reset form

  async function handle(form) {
    try {
      setSaving(true);
      await apiPost("/api/students", form);
      setSuccess(true);
      setFormKey((k) => k + 1); // reset form by changing key
      setTimeout(() => setSuccess(false), 3000); // hide success after 3s
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title="Add Student" activeKey="add">
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm font-medium text-center shadow-sm">
          Student added successfully
        </div>
      )}

        <StudentForm
          key={formKey} // this clears inputs when key changes
          onSubmit={handle}
          submitLabel={saving ? "Saving…" : "Add Student"}
        />
    </AdminLayout>
  );
}
