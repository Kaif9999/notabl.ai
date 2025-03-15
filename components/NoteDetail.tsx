'use client';
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { NoteView } from "@/components/note/NoteView";
import { useNoteContext } from "@/context/NoteContext";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NoteDetailProps {
  noteId?: string;
  onOpenSettings?: () => void;
  onOpenUpgrade?: () => void;
}

const NoteDetail = ({ noteId: propNoteId, onOpenSettings, onOpenUpgrade }: NoteDetailProps) => {
  const params = useParams();
  const router = useRouter();
  const paramNoteId = typeof params.noteId === 'string' ? params.noteId : undefined;
  const noteId = propNoteId || paramNoteId;
  
  const { notes, deleteNote, updateNote } = useNoteContext();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const note = notes.find((n) => n.id === noteId);
  
  useEffect(() => {
    if (!noteId || !note) {
      router.push("/");
    }
  }, [noteId, note, router]);
  
  useEffect(() => {
    // Close sidebar when transitioning from mobile to desktop
    if (!isMobile) {
      setShowMobileSidebar(false);
    }
  }, [isMobile]);
  
  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Note not found</h1>
          <p className="text-muted-foreground mb-4">
            The note you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-ruby-primary hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }
  
  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast.success("Note deleted successfully");
    router.push("/");
  };
  
  const handleSaveNote = (updatedNote: typeof note) => {
    updateNote(updatedNote);
    setIsEditing(false);
    toast.success("Note updated successfully");
  };
  
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  return (
    <div className="flex min-h-screen w-full relative">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block`}>
        <Sidebar 
          onOpenSettings={onOpenSettings}
          onOpenUpgrade={onOpenUpgrade}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMobileSidebar}></div>
      )}
      
      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 md:hidden ${
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          onOpenSettings={onOpenSettings}
          onOpenUpgrade={onOpenUpgrade}
        />
      </div>
      
      <div className="flex-1">
        {isMobile && (
          <div className="sticky top-0 z-10 p-4 bg-white border-b flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileSidebar}
              className="mr-2"
            >
              <Menu size={20} />
            </Button>
            <h1 className="font-semibold truncate">{note.title}</h1>
          </div>
        )}
        <NoteView 
          note={note} 
          onDelete={handleDeleteNote} 
          onSave={handleSaveNote}
          isEditing={isEditing}
          onToggleEdit={handleToggleEdit}
        />
      </div>
    </div>
  );
};

export default NoteDetail;
