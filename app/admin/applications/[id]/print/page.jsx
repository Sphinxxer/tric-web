import AdminApplicationPrintPage from "@/components/admin/AdminApplicationPrintPage";

export const metadata = {
  title: "Print Application | TRIC Admin",
};

export default async function ApplicationPrintAdminPage({ params }) {
  const { id } = await params;
  return <AdminApplicationPrintPage id={id} />;
}
