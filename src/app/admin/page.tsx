import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

// CSR page — no SEO needed, interactive admin dashboard
export default function AdminPage() {
  return <AdminDashboard />;
}
