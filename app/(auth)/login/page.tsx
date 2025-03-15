"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  
  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate login
    setTimeout(() => {
      // Set auth state in localStorage or cookies
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
    }, 1000);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button 
        onClick={handleLogin} 
        className="bg-ruby-primary text-white px-6 py-2 rounded-md"
      >
        Login (Demo)
      </button>
    </div>
  );
}
