export type Folder = {
    id: string;
    name: string;
    parentId?: string | null;
  };
  
  export type Note = {
    id: string;
    title: string;
    content: string;
    summary?: string;
    folderId: string;
    createdAt: Date;
    updatedAt: Date;
    sourceType: "text" | "audio" | "pdf" | "youtube";
    sourceUrl?: string;
  };
  
  export type NoteView = "note" | "quiz" | "flashcards" | "transcript" | "mindmap";
  
  export type ProcessingStatus = "idle" | "recording" | "uploading" | "transcribing" | "generating" | "completed" | "error";
  
  export type ProcessingStep = {
    id: number;
    label: string;
    status: "pending" | "progress" | "completed";
    message?: string;
    progressTime?: string;
  };
  
  export type UserProfile = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: "free" | "premium";
    notesUsed: number;
    notesLimit: number;
  };
  