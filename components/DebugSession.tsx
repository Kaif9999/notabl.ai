"use client";

import { useSession } from "next-auth/react";

export default function DebugSession() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 m-4 rounded-lg max-w-md z-50 text-xs">
      <h3 className="font-bold mb-2">Session Debug:</h3>
      <p>Status: {status}</p>
      <pre className="overflow-auto max-h-40">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
