"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ParentGuard({ children }) {
  const router = useRouter();
  const { loading, isParent } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isParent) {
      setReady(false);
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [isParent, loading, router]);

  if (!ready) {
    return (
      <section className="bg-[#F5F7FA] py-12">
        <div className="container-shell text-sm font-bold text-[#5F6B7A]">
          Checking parent login...
        </div>
      </section>
    );
  }

  return children;
}
