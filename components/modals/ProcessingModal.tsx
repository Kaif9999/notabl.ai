import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Clock, AlertCircle, Eye, Loader2, Circle } from "lucide-react";
import { useNoteContext } from "@/context/NoteContext";
import { ProcessingStatus } from "@/types";

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewNote: () => void;
  sourceType: "audio" | "pdf" | "youtube";
  processingStatus: ProcessingStatus;
}

export function ProcessingModal({ isOpen, onClose, onViewNote, sourceType, processingStatus }: ProcessingModalProps) {
  const { processingStatus: contextProcessingStatus } = useNoteContext();
  
  const getStepStatus = (step: number) => {
    if (processingStatus === "idle") return "pending";
    
    // Map steps to their corresponding statuses
    const stepMap = {
      1: "uploading",
      2: "transcribing",
      3: "generating"
    } as const;
    
    const currentStepIndex = Object.values(stepMap).indexOf(processingStatus as any);
    
    if (currentStepIndex === -1) {
      // Handle completed or error states
      if (processingStatus === "completed") return "completed";
      if (processingStatus === "error") return "error";
      return "pending";
    }
    
    // If we're at a later step than the current one, it's completed
    if (step - 1 < currentStepIndex) return "completed";
    // If we're at the current step, it's in progress
    if (step - 1 === currentStepIndex) return "in-progress";
    // If we're at an earlier step, it's pending
    return "pending";
  };
  
  const getSourceLabel = () => {
    switch (sourceType) {
      case "audio": return "Audio";
      case "pdf": return "PDF";
      case "youtube": return "YouTube video";
    }
  };
  
  const getSteps = () => {
    if (sourceType === "audio") {
      return [
        { id: 1, label: "Note is creating" },
        { id: 2, label: "Audio is uploading", time: "00:03:53" },
        { id: 3, label: "Audio is transcribing", message: "This process may take few seconds to few minutes" },
        { id: 4, label: "AI is generating note", message: "This process may take few minutes" },
        { id: 5, label: "Note is ready" },
      ];
    } else if (sourceType === "pdf") {
      return [
        { id: 1, label: "Note is creating" },
        { id: 2, label: "PDF is uploading", time: "00:00:53" },
        { id: 3, label: "AI is extracting text", message: "This process may take few seconds to few minutes" },
        { id: 4, label: "AI is generating note", message: "This process may take few minutes" },
        { id: 5, label: "Note is ready" },
      ];
    } else {
      return [
        { id: 1, label: "Note is creating" },
        { id: 2, label: "YouTube video is processing" },
        { id: 3, label: "AI is extracting transcript", message: "This process may take few seconds to few minutes" },
        { id: 4, label: "AI is generating note", message: "This process may take few minutes" },
        { id: 5, label: "Note is ready" },
      ];
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Note is generating</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <AlertCircle size={16} />
              <p className="text-sm">Don't close this page until the note is ready</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {getSteps().map((step, index) => {
              const status = getStepStatus(step.id);
              
              return (
                <div key={step.id} className="relative flex items-start gap-3">
                  {index < getSteps().length - 1 && (
                    <div 
                      className={`absolute left-3 top-6 bottom-0 w-0.5 ${
                        status === "completed" ? "bg-green-500" : 
                        status === "in-progress" ? "bg-feynman-red" : "bg-gray-200"
                      }`} 
                    />
                  )}
                  
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${
                      status === "completed" ? "border-green-500 text-green-500" : 
                      status === "in-progress" ? "border-feynman-red text-feynman-red animate-pulse" : 
                      "border-gray-300 text-gray-300"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check size={14} />
                    ) : status === "in-progress" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span className="text-xs">{step.id}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{step.label}</p>
                      {status === "completed" && (
                        <span className="text-green-500 text-xs font-medium">Completed</span>
                      )}
                      {status === "in-progress" && (
                        <span className="text-feynman-red text-xs font-medium flex items-center gap-1">
                          <span>Progress</span>
                          {step.time && <span>{step.time}</span>}
                        </span>
                      )}
                      {status === "pending" && (
                        <span className="text-yellow-500 text-xs font-medium">Pending</span>
                      )}
                    </div>
                    
                    {step.message && (
                      <p className="text-xs text-muted-foreground mt-1">{step.message}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {processingStatus === "completed" ? (
            <Button 
              className="w-full flex items-center justify-center gap-2" 
              onClick={onViewNote}
            >
              <Eye size={16} />
              View note now
            </Button>
          ) : (
            <div className="w-full h-10 rounded-md bg-gray-300 animate-pulse" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
