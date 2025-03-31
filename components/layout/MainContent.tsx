"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Mic,
  Upload,
  FileText,
  Youtube,
  Search,
  Plus,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/note/NoteCard";
import { RecordAudioModal } from "@/components/modals/RecordAudioModal";
import { UploadModal } from "@/components/modals/UploadModal";
import { useNoteContext } from "@/context/NoteContext";
import { toast } from "sonner";
import { createNewNote } from "@/utils/noteUtils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProcessingModal } from "@/components/modals/ProcessingModal";

interface MainContentProps {
  title?: string;
  folderId?: string;
}

type ProcessingStatus = "idle" | "uploading" | "transcribing" | "generating" | "completed" | "error";

export function MainContent({
  title,
  folderId = "folder-1",
}: MainContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { folders, getNotesByFolder, addNote, deleteNote, deleteFolder } =
    useNoteContext();
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<
    "audio" | "pdf" | "youtube" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessingNote, setIsProcessingNote] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>("idle");
  const [processingNoteId, setProcessingNoteId] = useState<string | null>(null);

  const currentFolderId =
    folderId ||
    (pathname?.startsWith("/dashboard/folder/")
      ? pathname?.split("/dashboard/folder/")[1]
      : "folder-1");

  const currentFolder = folders.find((folder) => folder.id === currentFolderId);
  const notesInFolder = getNotesByFolder(currentFolderId);

  // Filter notes based on search query
  const filteredNotes = notesInFolder.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBreadcrumbPath = () => {
    if (currentFolderId === "folder-1") {
      return [{ name: "All notes", id: "folder-1" }];
    } else {
      return [
        { name: "All notes", id: "folder-1" },
        { name: currentFolder?.name || "", id: currentFolderId },
      ];
    }
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    toast.success("Note deleted successfully");
  };

  const handleDeleteFolder = () => {
    if (currentFolderId === "folder-1") {
      toast.error("Cannot delete the All notes folder");
      return;
    }
    deleteFolder(currentFolderId);
    router.push("/dashboard/folder/folder-1");
    toast.success("Folder deleted successfully");
  };

  const handleCreateNote = (
    sourceType: "text" | "audio" | "pdf" | "youtube"
  ) => {
    if (isProcessingNote) return; // Prevent multiple note creations
    setIsProcessingNote(true);

    // Create notes in the current folder instead of always in "All notes"
    const newNote = createNewNote(
      sourceType === "audio" ? "Transcript Summary" : "New Note",
      sourceType === "audio"
        ? "Detailed summary of the transcript with structured information."
        : "Add your content here...",
      currentFolderId,
      sourceType
    );

    addNote(newNote);
    toast.success("Note created successfully");

    // Navigate to the newly created note using the correct route
    router.push(`/dashboard/notes/${newNote.id}`);
    setIsProcessingNote(false);
  };

  const handleRecordAudio = () => {
    if (isProcessingNote) return;
    setRecordModalOpen(true);
  };

  const handleRecordSave = () => {
    setRecordModalOpen(false);
    handleCreateNote("audio");
  };

  const handleUpload = (type: "youtube") => {
    if (isProcessingNote) return;
    setUploadType(type);
  };

  const handleUploadSave = () => {
    setUploadType(null);
    handleCreateNote(uploadType as "audio" | "pdf" | "youtube");
  };

  const handleYoutubeImport = async () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    // Show processing modal
    setShowProcessingModal(true);
    setProcessingStatus("uploading");

    try {
      // Call our API route to get the transcript
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transcript');
      }

      // Create a new note with the video details
      const newNote = createNewNote(
        data.videoDetails.title || "YouTube Summary",
        "Processing YouTube content...",
        currentFolderId,
        "youtube"
      );
      
      setProcessingNoteId(newNote.id);
      addNote(newNote);

      // Update processing status
      setProcessingStatus("transcribing");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingStatus("generating");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the note with the transcript
      const updatedNote = {
        ...newNote,
        content: `
## Video Details
- Channel: ${data.videoDetails.channel}
- Views: ${data.videoDetails.viewCount.toLocaleString()}
- Published: ${new Date(data.videoDetails.publishDate).toLocaleDateString()}

## Transcript
${data.transcript}
        `.trim(),
      };
      
      // Update the note in your context/state management
      addNote(updatedNote);
      
      setProcessingStatus("completed");
      toast.success("Successfully imported YouTube video");

      // Clear the input
      setYoutubeUrl("");
      
    } catch (error) {
      console.error('Error processing YouTube video:', error);
      setProcessingStatus("error");
      toast.error(error instanceof Error ? error.message : "Failed to process YouTube video");
      setShowProcessingModal(false);
    }
  };

  const handleViewProcessedNote = () => {
    if (processingNoteId) {
      router.push(`/dashboard/notes/${processingNoteId}`);
      setShowProcessingModal(false);
      setProcessingStatus("idle");
      setProcessingNoteId(null);
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center mb-8 text-sm">
          {getBreadcrumbPath().map((item, index, array) => (
            <React.Fragment key={item.id}>
              <Link
                href={`/dashboard/folder/${item.id}`}
                className={`hover:text-ruby-primary transition-colors text-black ${
                  index === array.length - 1 ? "font-medium" : ""
                }`}
              >
                {item.name}
              </Link>
              {index < array.length - 1 && (
                <ChevronRight
                  size={16}
                  className="mx-2 text-muted-foreground"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Header and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-black">
              {title || currentFolder?.name || "Notes"}
            </h1>
            {currentFolderId !== "folder-1" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleDeleteFolder}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete folder</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="relative w-full md:w-64 text-black">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
            <Input
              placeholder="Search notes..."
              className="pl-10 bg-white border-2 border-black text-black placeholder:text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Create note section */}
        <div className="mb-10 bg-white rounded-xl p-6 border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Create new note
          </h2>
          <p className="text-muted-foreground mb-6">
            Capture your thoughts, ideas, and information in various formats
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex gap-2 lg:col-span-2">
              <div className="relative flex-1">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
                <Input
                  type="text"
                  placeholder="Enter YouTube video URL"
                  className="pl-10 bg-white border-2 border-black text-black placeholder:text-gray-500 h-12"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleYoutubeImport();
                    }
                  }}
                />
              </div>
              <Button
                variant="outline"
                className="bg-black text-white border-none h-12 px-4 rounded-lg flex items-center gap-2"
                onClick={handleYoutubeImport}
              >
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-ruby-primary hover:text-ruby-primary/90 hover:bg-purple-300 text-purple-950"
            onClick={() => handleCreateNote("text")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create empty note
          </Button>
        </div>

        {/* Notes grid */}
        <div className="mb-4">
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl bg-white border border-border">
              {searchQuery ? (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    No notes found matching &quot;{searchQuery}&quot;
                  </p>
                  <Button
                    variant="ghost"
                    className="text-ruby-primary"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    No notes found in this folder
                  </p>
                  <Button
                    variant="outline"
                    className="bg-ruby-primary hover:bg-ruby-primary/90 text-white"
                    onClick={() => handleCreateNote("text")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first note
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <RecordAudioModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onSave={handleRecordSave}
      />

      {uploadType && (
        <UploadModal
          isOpen={!!uploadType}
          type={uploadType}
          onClose={() => setUploadType(null)}
          onUpload={handleUploadSave}
        />
      )}

      <ProcessingModal
        isOpen={showProcessingModal}
        onClose={() => {
          setShowProcessingModal(false);
          setProcessingStatus("idle");
        }}
        onViewNote={handleViewProcessedNote}
        sourceType="youtube"
        processingStatus={processingStatus}
      />
    </div>
  );
}
