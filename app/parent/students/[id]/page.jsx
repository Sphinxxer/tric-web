import StudentProfileForm from "@/components/parent/StudentProfileForm";

export const metadata = {
  title: "Edit Student | TRIC Sports Academy",
};

export default function EditStudentPage({ params }) {
  return <StudentProfileForm id={params.id} />;
}
