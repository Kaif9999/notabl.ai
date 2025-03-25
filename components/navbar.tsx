import { Mic } from "lucide-react";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./ui/button"; // Assuming you're using a UI library with a Button component

interface NavbarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, onSignup }) => {

  return (
    <nav className="fixed top-0 left-0 right-0 py-3 md:py-4 px-4 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/20 shadow-sm z-50">
      <div className="flex items-center">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg border-2 bg-black border-black flex items-center justify-center">
              <Mic className="h-4 w-4 md:h-6 md:w-6 text-purple-700" />
            </div>
            <span className="ml-2 text-xl md:text-2xl font-bold text-purple-600">
              Notabl.ai
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/dashboard" passHref>
          <span className="text-sm font-medium text-black hover:text-purple-700 transition-colors cursor-pointer">
            Login
          </span>
        </Link>
        <Link href="/signup" passHref>
          <Button
            className="bg-black hover:bg-black/90 text-white text-sm md:text-base px-3 md:px-4"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
