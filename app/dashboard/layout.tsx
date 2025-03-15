'use client';

import { NoteProvider } from "@/context/NoteContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoteProvider>
      {children}
    </NoteProvider>
  );
} 