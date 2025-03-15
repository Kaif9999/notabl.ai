"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  
  const handleLogin = () => {
    // Simulate login
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Welcome back
          </h1>
          <p className="mt-2 text-gray-600">
            Sign in to continue to Notabl.ai
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleLogin}
            className="w-full bg-black hover:bg-black/90 text-white"
          >
            Login (Demo)
          </Button>
          
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
