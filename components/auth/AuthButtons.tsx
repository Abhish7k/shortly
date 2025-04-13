"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const GoogleAuthButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className="text-base w-52" disabled>
          <Loader2 className="size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <button
          onClick={() =>
            signIn("google", { redirect: false }, { prompt: "login" })
          }
          className="border rounded-md py-2 mt-4 flex items-center gap-4 px-5 md:px-10 hover:bg-foreground/5 transition-all duration-300 active:scale-90"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>
      )}
    </>
  );
};

export const GithubAuthButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className="text-base w-52" disabled>
          <Loader2 className="size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <button
          onClick={() =>
            signIn("github", { redirect: false }, { prompt: "login" })
          }
          className="border rounded-md py-2 mt-4 flex items-center gap-4 px-5 md:px-10 hover:bg-foreground/5 transition-all duration-300 active:scale-90"
        >
          <FaGithub className="text-xl" />
          Sign in with GitHub
        </button>
      )}
    </>
  );
};

export const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className="text-base" disabled>
          <Loader2 className="size-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant="outline" className="cursor-pointer">
          Logout
        </Button>
      )}
    </>
  );
};
