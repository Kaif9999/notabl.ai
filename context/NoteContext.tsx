"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, Folder, UserProfile, ProcessingStatus, NoteView } from "@/types";

type NoteContextType = {
    notes: Note[];
    folders: Folder[];
    userProfile: UserProfile;
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
  };
  
  const defaultUserProfile: UserProfile = {
    id: "user-1",
    name: "Mohd Kaif",
    email: "kaifmohd5000@gmail.com",
    avatar: "/lovable-uploads/a1b7e8a3-3fad-4d80-9004-f25ba5019561.png",
    plan: "free",
    notesUsed: 1,
    notesLimit: 3,
  };
  
  // Start with only "All notes" folder
  const defaultFolders: Folder[] = [
    {
      id: "folder-1",
      name: "All notes",
      parentId: null,
    }
  ];
  
  // Only one default note
  const defaultNotes: Note[] = [
    {
      id: "note-1",
      title: "Welcome to Feynman AI: Your Study and Work Companion",
      content: "A powerful tool for transforming recordings and PDFs into organized notes using the Feynman technique.",
      summary: "Introduction to Feynman AI and its features.",
      folderId: "folder-1",
      createdAt: new Date("2024-11-09T23:38:00"),
      updatedAt: new Date("2024-11-09T23:38:00"),
      sourceType: "text",
    }
  ];
  
const NoteContext = createContext<NoteContextType | undefined>(undefined);
  
export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>(() => {
      if (typeof window !== "undefined") {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : defaultNotes;
      }
      return defaultNotes;
    });
  
    const [folders, setFolders] = useState<Folder[]>(() => {
      if (typeof window !== "undefined") {
        const savedFolders = localStorage.getItem("folders");
        return savedFolders ? JSON.parse(savedFolders) : defaultFolders;
      }
      return defaultFolders;
    });
  
    const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [currentView, setCurrentView] = useState<NoteView>("note");
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>("idle");
    const [processingProgress, setProcessingProgress] = useState(0);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("folders", JSON.stringify(folders));
      }
    }, [notes, folders]);
  
    const addNote = (note: Note) => {
      setNotes([...notes, note]);
      setUserProfile({
        ...userProfile,
        notesUsed: userProfile.notesUsed + 1,
      });
    };
  
    const updateNote = (updatedNote: Note) => {
      setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
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
      setFolders(folders.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder)));
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
          notes,
          folders,
          userProfile,
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
  };
  
  export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (context === undefined) {
      throw new Error("useNoteContext must be used within a NoteProvider");
    }
    return context;
};
