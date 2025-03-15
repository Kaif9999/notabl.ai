"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  
  const handleSignup = () => {
    // Simulate signup
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Get started with Notabl.ai for free
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleSignup}
            className="w-full bg-black hover:bg-black/90 text-white"
          >
            Sign up (Demo)
          </Button>
          
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
