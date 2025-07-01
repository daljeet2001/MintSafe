import { Button } from "./button";
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
          <Store className="w-8 h-8 text-[#14BA6C]" />
          <span className="ml-2 font-bold text-xl text-[#14BA6C]">
            MintSafe
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {user?.name && (
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="w-8 h-8 bg-[#14BA6C] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {getInitial(user.name)}
              </div>

              {/* User name shown only on md+ */}
              <span className="hidden md:inline text-sm font-medium text-gray-800">
                {user.name}
              </span>
            </div>
          )}
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};

