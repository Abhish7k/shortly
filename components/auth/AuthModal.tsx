import { Button } from "../ui/button";
import { signIn } from "@/server/auth";
import { GithubAuthButton, GoogleAuthButton } from "./AuthButtons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px] py-10">
        <DialogHeader className="flex flex-row items-center justify-center gap-2">
          <h4 className="text-3xl font-semibold">Shrinq</h4>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 mt-10">
          <form
            action={async () => {
              "use server";

              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>

          <form
            action={async () => {
              "use server";

              await signIn("github");
            }}
          >
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
