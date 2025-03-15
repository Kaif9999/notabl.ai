'use client';

import { NoteProvider } from "@/context/NoteContext";

export default function NotesLayout({
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