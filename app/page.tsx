import DebugSession from "@/components/DebugSession";
import NotablLandingPage from "@/components/NotablLandingPage";
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <SessionProvider>
      {/* <DebugSession /> */}
      <NotablLandingPage />
    </SessionProvider>
  );
}
