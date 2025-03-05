import React from "react";
import { Button } from "./ui/button";
import { ModeSwitcher } from "./toggle";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="px-6 py-4 border-b">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/">
          <h1 className="text-3xl font-bold">Shortly</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hover:cursor-pointer">
            Sign In
          </Button>

          <ModeSwitcher />
        </div>
      </div>
    </nav>
  );
};
