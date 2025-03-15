export type NoteView = "note" | "summary" | "flashcards";
export type ProcessingStatus = "idle"|"recording" | "uploading" | "transcribing" | "generating" | "completed" | "error";

export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  folderId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sourceType: "text" | "audio" | "pdf" | "youtube";
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: "free" | "premium";
  notesUsed: number;
  notesLimit: number;
} 