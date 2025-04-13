import { Button } from "../ui/button";
import { GithubAuthButton, GoogleAuthButton } from "./AuthButtons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Sign In
        </Button>
      </DialogTrigger>

      <DialogTitle></DialogTitle>

      <DialogDescription></DialogDescription>

      <DialogContent className="py-10">
        <DialogHeader className="flex flex-col items-center justify-center gap-2">
          <h4 className="text-3xl font-semibold">Shrinq</h4>

          <p className="text-sm md:text-md text-muted-foreground text-center max-w-sm mt-4">
            Discover the simplest way to shorten, share, and manage your links
            fast and effortlessly
          </p>
        </DialogHeader>

        <div className="flex flex-col items-center mt-10">
          <GoogleAuthButton />

          <GithubAuthButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
