import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Shrinq",
  description: "Dashboard page",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="container max-w-5xl mx-auto py-10 px-4">{children}</div>
    </div>
  );
}
