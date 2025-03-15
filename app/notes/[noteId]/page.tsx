import NoteDetail from "@/components/NoteDetail";

export default function NotePage({ params }: { params: { noteId: string } }) {
  return <NoteDetail noteId={params.noteId} />;
} 