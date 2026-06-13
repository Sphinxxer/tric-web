"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const { loading, isAdmin } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAdmin) {
      setReady(false);
      router.replace("/admin");
      return;
    }
    setReady(true);
  }, [isAdmin, loading, router]);

  if (!ready) {
    return (
      <section className="bg-[#F5F7FA] py-12">
        <div className="container-shell text-sm font-bold text-[#5F6B7A]">
          Checking admin login...
        </div>
      </section>
    );
  }

  return children;
}
