'use client';

import { NoteProvider } from "@/context/NoteContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NoteProvider>
          <Toaster />
          <Sonner />
          {children}
        </NoteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
} 