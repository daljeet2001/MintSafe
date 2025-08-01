import { Button } from "./loginbutton";
import { Store } from "lucide-react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const getInitial = (name: string | null | undefined) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-100 px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
        {/* Logo */}
        <div className="flex items-center h-full">
          {/* <Store className="w-8 h-8 text-[#14BA6C]" /> */}
          <span className="ml-2 font-bold text-xl text-[#1E1E1F]">
            MintSafe
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Log Out" : "Sign Up/Log In"}
          </Button>
        </div>
      </div>
    </header>
  );
};

