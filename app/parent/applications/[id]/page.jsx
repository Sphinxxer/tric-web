import ParentApplicationDetailPage from "@/components/parent/ParentApplicationDetailPage";

export const metadata = {
  title: "Application Details | TRIC Sports Academy",
};

export default async function ParentApplicationDetailRoute({ params }) {
  const { id } = await params;
  return <ParentApplicationDetailPage id={id} />;
}
