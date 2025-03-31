"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, Folder, ProcessingStatus, NoteView } from "@/types";
import { useSession } from "next-auth/react";

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  plan: "free" | "premium";
  notesUsed: number;
  notesLimit: number;
};

interface NoteContextType {
  userProfile: {
    name: string;
    email: string;
    avatar: string;
    plan: "free" | "premium";
    notesUsed: number;
    notesLimit: number;
  };
  notes: Note[];
  folders: Folder[];
  currentNote: Note | null;
  currentView: NoteView;
  processingStatus: ProcessingStatus;
  processingProgress: number;
  setCurrentNote: (note: Note | null) => void;
  setCurrentView: (view: NoteView) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  addFolder: (folder: Folder) => void;
  updateFolder: (folder: Folder) => void;
  deleteFolder: (folderId: string) => void;
  setProcessingStatus: (status: ProcessingStatus) => void;
  setProcessingProgress: (progress: number) => void;
  getNotesByFolder: (folderId: string) => Note[];
  simulateProcessing: (type: "audio" | "pdf" | "youtube") => void;
  setUserProfile: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    avatar: string;
    plan: "free" | "premium";
    notesUsed: number;
    notesLimit: number;
  }>>;
}

// const defaultUserProfile: UserProfile = {
//   id: "user-1",
//   name: "Mohd Kaif",
//   email: "kaifmohd5000@gmail.com",
//   avatar: "/globe.svg",
//   plan: "free",
//   notesUsed: 1,
//   notesLimit: 3,
// };

// Start with only "All notes" folder
const defaultFolders: Folder[] = [
  {
    id: "folder-1",
    name: "All notes",
    parentId: null,
  },
];


const NoteContext = createContext<NoteContextType | undefined>(undefined);

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  const [folders, setFolders] = useState<Folder[]>(() => {
    if (typeof window !== "undefined") {
      const savedFolders = localStorage.getItem("folders");
      return savedFolders ? JSON.parse(savedFolders) : defaultFolders;
    }
    return defaultFolders;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: session?.user?.name || "User",
    email: session?.user?.email || "user@example.com",
    avatar: session?.user?.image || "/globe.svg",
    plan: "free",
    notesUsed: 0,
    notesLimit: 3,
  });

  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [currentView, setCurrentView] = useState<NoteView>("note");
  const [processingStatus, setProcessingStatus] =
    useState<ProcessingStatus>("idle");
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("folders", JSON.stringify(folders));
    }
  }, [notes, folders]);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    
    if (status === "authenticated" && session?.user) {
      console.log("Setting user profile with:", {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      });
      
      setUserProfile(prev => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
        avatar: session.user.image || prev.avatar,
      }));
    }
  }, [session, status]);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
    setUserProfile({
      ...userProfile,
      notesUsed: userProfile.notesUsed + 1,
    });
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    setUserProfile({
      ...userProfile,
      notesUsed: Math.max(0, userProfile.notesUsed - 1),
    });
  };

  const addFolder = (folder: Folder) => {
    setFolders([...folders, folder]);
  };

  const updateFolder = (updatedFolder: Folder) => {
    setFolders(
      folders.map((folder) =>
        folder.id === updatedFolder.id ? updatedFolder : folder
      )
    );
  };

  const deleteFolder = (folderId: string) => {
    // Don't allow deleting the "All notes" folder
    if (folderId === "folder-1") return;

    setFolders(folders.filter((folder) => folder.id !== folderId));
    // Move notes from deleted folder to "All notes"
    setNotes(
      notes.map((note) =>
        note.folderId === folderId ? { ...note, folderId: "folder-1" } : note
      )
    );
  };

  const getNotesByFolder = (folderId: string) => {
    return folderId === "folder-1"
      ? notes
      : notes.filter((note) => note.folderId === folderId);
  };

  // Function to simulate the processing flow
  const simulateProcessing = (type: "audio" | "pdf" | "youtube") => {
    // Start with "recording" status
    setProcessingStatus("recording");

    // After 2 seconds, move to "uploading"
    setTimeout(() => {
      setProcessingStatus("uploading");

      // After 3 more seconds, move to "transcribing"
      setTimeout(() => {
        setProcessingStatus("transcribing");

        // After 3 more seconds, move to "generating"
        setTimeout(() => {
          setProcessingStatus("generating");

          // After 3 more seconds, move to "completed"
          setTimeout(() => {
            setProcessingStatus("completed");

            // Reset after 3 seconds
            setTimeout(() => {
              setProcessingStatus("idle");
            }, 3000);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 2000);
  };

  return (
    <NoteContext.Provider
      value={{
        userProfile,
        setUserProfile,
        notes,
        folders,
        currentNote,
        currentView,
        processingStatus,
        processingProgress,
        setCurrentNote,
        setCurrentView,
        addNote,
        updateNote,
        deleteNote,
        addFolder,
        updateFolder,
        deleteFolder,
        setProcessingStatus,
        setProcessingProgress,
        getNotesByFolder,
        simulateProcessing,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
