import DebugSession from "@/components/DebugSession";
import LandingPage from "@/components/LandingPage";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <SessionProvider>
      <DebugSession />
      <LandingPage />
    </SessionProvider>
  );
}
