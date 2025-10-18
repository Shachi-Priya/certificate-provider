// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Layout from "../../../components/Layout";
// import StudentForm from "../../../components/StudentForm";
// import { apiGet, apiPut } from "../../../lib/apiClient";
// import { requireAdminGSSP } from "../../lib/withAdminGSSP";
// export const getServerSideProps = requireAdminGSSP();
// export default function EditStudent() {
//   const { id } = useRouter().query;
//   const [initial, setInitial] = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     // quick way: fetch list and find by id (for demo). In real app add a /students/:id API.
//     apiGet("/api/students").then((list) => setInitial(list.find((x) => x._id === id)));
//   }, [id]);

//   async function handle(form) {
//     await apiPut(`/api/students/${id}`, form);
//     window.location.assign("/admin/students");
//   }

//   return (
//     <Layout title="Edit Student">
//       {!initial ? <div className="card">Loading…</div> :
//         <StudentForm initial={initial} onSubmit={handle} submitLabel="Update" />}
//     </Layout>
//   );
// }


////////////



import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import StudentForm from "../../../components/StudentForm";
import { apiGet, apiPut } from "../../../lib/apiClient";
import { requireAdminGSSP } from "../../../lib/withAdminGSSP";

export const getServerSideProps = requireAdminGSSP();

export default function EditStudent() {
  const { id } = useRouter().query;
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    if (!id) return;
    apiGet("/api/students").then((list) => setInitial(list.find((x) => x._id === id)));
  }, [id]);

  async function handle(form) {
    await apiPut(`/api/students/${id}`, form);
    window.location.assign("/admin/dashboard");
  }

  return (
    <AdminLayout title="Edit Student" activeKey="" >
      {!initial ? <div className="card">Loading…</div> : <StudentForm initial={initial} onSubmit={handle} submitLabel="Update" />}
    </AdminLayout>
  );
}
