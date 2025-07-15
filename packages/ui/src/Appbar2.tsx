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
            MintSafe Merchant
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {user?.name && (
            <div className="flex items-center gap-2">
              {/* Avatar */}
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{getInitial(user.name)}</span>
            </div>
            </div>
          )}
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Log Out" : "Sign Up/Log In"}
          </Button>
        </div>
      </div>
    </header>
  );
};
