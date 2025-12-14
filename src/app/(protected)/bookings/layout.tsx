"use client";

import ProtectedLayout from "@/app/components/protectedlayout";

export default function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
