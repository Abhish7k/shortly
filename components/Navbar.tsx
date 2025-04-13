import React from "react";
import { ModeSwitcher } from "./toggle";
import Link from "next/link";
import AuthModal from "./auth/AuthModal";

export const Navbar = () => {
  return (
    <nav className="px-6 py-4 border-b">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/">
          <h1 className="text-3xl font-bold">Shrinq</h1>
        </Link>

        <div className="flex items-center gap-4">
          <AuthModal />

          <ModeSwitcher />
        </div>
      </div>
    </nav>
  );
};
