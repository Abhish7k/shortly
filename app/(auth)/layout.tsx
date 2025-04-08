import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
