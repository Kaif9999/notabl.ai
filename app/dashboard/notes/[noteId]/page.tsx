'use client';

import NoteDetail from "@/components/NoteDetail";
import { use } from "react";

export default function NotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const resolvedParams = use(params);
  return <NoteDetail noteId={resolvedParams.noteId} />;
} 