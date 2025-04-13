"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

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
        <Button variant="outline" className="w-full text-base cursor-pointer">
          <FcGoogle className="size-4 mr-2 dark:invert" />
          Sign in with Google
        </Button>
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
        <Button variant="outline" className="w-full text-base  cursor-pointer">
          <FaGithub className="size-4 mr-2 dark:invert" />
          Sign in with Github
        </Button>
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
