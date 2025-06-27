import { Button } from "./button";
import Image from "next/image";
import Logo from "../assets/logo4.png";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between items-center px-6 py-3 h-16 border-b border-gray-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-center h-full">
        <Image src={Logo} alt="MintSafe Logo" width={160} height={40} />
      </div>

      {/* Button */}
      <div className="flex justify-center items-center h-full">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

