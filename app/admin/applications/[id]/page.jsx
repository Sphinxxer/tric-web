import AdminApplicationDetailPage from "@/components/admin/AdminApplicationDetailPage";

export const metadata = {
  title: "Application Details | TRIC Admin",
};

export default async function ApplicationDetailAdminPage({ params }) {
  const { id } = await params;
  return <AdminApplicationDetailPage id={id} />;
}
