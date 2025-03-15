import React, { useState } from "react";
import { X, Upload, FileText, FileAudio, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNoteContext } from "@/context/NoteContext";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "audio" | "pdf" | "youtube";
  onUpload: () => void;
}

export function UploadModal({ isOpen, onClose, type, onUpload }: UploadModalProps) {
  const { simulateProcessing } = useNoteContext();
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    const validAudioTypes = ["audio/mp3", "audio/wav", "audio/mpeg", "audio/m4a"];
    const validPdfTypes = ["application/pdf"];
    
    if (type === "audio" && !validAudioTypes.includes(file.type)) {
      toast.error("Please upload a valid audio file (MP3, WAV, M4A)");
      return;
    }
    
    if (type === "pdf" && !validPdfTypes.includes(file.type)) {
      toast.error("Please upload a valid PDF file");
      return;
    }
    
    setFile(file);
  };
  
  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }
    
    simulateProcessing("youtube");
    onUpload();
  };
  
  const handleFileSubmit = () => {
    if (!file) {
      toast.error(`Please upload a ${type === "audio" ? "audio file" : "PDF file"}`);
      return;
    }
    
    simulateProcessing(type);
    onUpload();
  };
  
  const getIcon = () => {
    switch (type) {
      case "audio":
        return <FileAudio size={24} className="text-feynman-red" />;
      case "pdf":
        return <FileText size={24} className="text-feynman-red" />;
      case "youtube":
        return <Youtube size={24} className="text-feynman-red" />;
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case "audio":
        return "Upload audio";
      case "pdf":
        return "Upload PDF";
      case "youtube":
        return "YouTube video";
    }
  };
  
  const renderYoutubeForm = () => (
    <form onSubmit={handleYoutubeSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Paste a YouTube URL to extract the video transcript
      </p>
      
      <Input
        type="text"
        placeholder="https://www.youtube.com/watch?v=..."
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      
      <Button type="submit" className="w-full">
        Process video
      </Button>
    </form>
  );
  
  const renderFileUpload = () => (
    <div className="space-y-4">
      <p className="text-black">
        {type === "audio"
          ? "Upload an audio file (MP3, WAV, M4A)"
          : "Upload a PDF file to extract text"}
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-feynman-red bg-feynman-red/5"
            : "border-gray-300 hover:border-feynman-red/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept={type === "audio" ? "audio/*" : "application/pdf"}
          className="hidden"
          onChange={handleFileChange}
        />
        
        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
        
        <p className="text-sm font-medium">
          {file ? file.name : "Drag and drop or click to upload"}
        </p>
        
        {file && (
          <p className="text-xs text-muted-foreground mt-1">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>
      
      <Button
        onClick={handleFileSubmit}
        className="w-full bg-purple-950 text-white"
        disabled={!file}
      >
        {file ? "Process file" : "Select file"}
      </Button>
    </div>
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6 modal-animation-content bg-white text-black">
        
        <DialogHeader className="mb-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-feynman-gray flex items-center justify-center mb-2">
            {getIcon()}
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        {type === "youtube" ? renderYoutubeForm() : renderFileUpload()}
      </DialogContent>
    </Dialog>
  );
}
