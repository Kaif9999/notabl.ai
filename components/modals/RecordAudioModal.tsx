import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FlowingWaveform } from "@/components/FlowingWaveform";
import { X, Square, Mic, Loader2, Check, Circle, Pause, Play } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatTime } from "@/utils/noteUtils";
import { ProcessingStatus } from "@/types";
import { useNoteContext } from "@/context/NoteContext";
import { toast } from "sonner";

interface RecordAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

type ExtendedProcessingStatus = ProcessingStatus | "recording";

export function RecordAudioModal({ isOpen, onClose, onSave }: RecordAudioModalProps) {
  const { simulateProcessing } = useNoteContext();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [language, setLanguage] = useState("auto");
  const [showProgress, setShowProgress] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<ExtendedProcessingStatus>("idle");
  const [hasCalledOnSave, setHasCalledOnSave] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setIsRecording(false);
      setIsPaused(false);
      setAudioTime(0);
      setShowProgress(false);
      setRecordingStatus("idle");
      setHasCalledOnSave(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Show progress view when recording is stopped and processing starts
    if (recordingStatus && !["idle", "recording"].includes(recordingStatus)) {
      setShowProgress(true);
    }
    
    // When processing is complete, close modal after a delay
    if (recordingStatus === "completed" && !hasCalledOnSave) {
      setHasCalledOnSave(true);
      const timer = setTimeout(() => {
        onSave();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [recordingStatus, onSave, hasCalledOnSave]);

  useEffect(() => {
    // Handle timer for recording duration
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setAudioTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording, isPaused]);

  const handleStartStopRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Simulate processing
      setRecordingStatus("uploading");
      setTimeout(() => {
        setRecordingStatus("transcribing");
        setTimeout(() => {
          setRecordingStatus("generating");
          setTimeout(() => {
            setRecordingStatus("completed");
          }, 2000);
        }, 2000);
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
      setIsPaused(false);
      setRecordingStatus("recording");
    }
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  const renderRecordingView = () => (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-bold text-center text-black">Record audio</DialogTitle>
      </DialogHeader>
      
      {isRecording ? (
        <>
          <FlowingWaveform 
            isRecording={isRecording && !isPaused} 
            onToggleRecording={handleStartStopRecording} 
          />
          <div className="flex items-center justify-between px-4 py-3 mt-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-black">{formatTime(audioTime)}</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePauseResume}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
              </button>
              <button 
                onClick={handleStartStopRecording}
                className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Square size={20} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <button 
            onClick={handleStartStopRecording}
            className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            <Mic size={24} />
          </button>
          <p className="text-sm text-gray-600">Press to record</p>
        </div>
      )}
      
      <div className="space-y-4 mt-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-black">Note language</span>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-between">
              <SelectValue placeholder="Auto detect" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-lg p-2 text-black">
              <SelectItem value="auto">🌐 Auto detect</SelectItem>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="es">🇪🇸 Spanish</SelectItem>
              <SelectItem value="fr">🇫🇷 French</SelectItem>
              <SelectItem value="de">🇩🇪 German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <p className="text-sm text-gray-800">
          You can use AI auto-detect to detect the audio language and note generation language.
        </p>
      </div>
      
      <Button 
        className="w-full bg-black text-white"
        disabled={isRecording || audioTime === 0}
        onClick={handleStartStopRecording}
      >
        Generate note
      </Button>
    </>
  );

  const renderProgressView = () => (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl font-bold text-center text-black">Processing Audio</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        {[
          { title: "Uploading audio", status: "uploading" as ProcessingStatus },
          { title: "Transcribing audio", status: "transcribing" as ProcessingStatus },
          { title: "Generating note", status: "generating" as ProcessingStatus }
        ].map((step, index) => (
          <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === recordingStatus ? 'bg-black text-white' :
              recordingStatus === 'completed' || ["uploading", "transcribing", "generating"].indexOf(recordingStatus) > index
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}>
              {step.status === recordingStatus ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : recordingStatus === 'completed' || ["uploading", "transcribing", "generating"].indexOf(recordingStatus) > index ? (
                <Check className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="font-medium text-black">{step.title}</p>
            </div>
          </div>
        ))}
      </div>

      {recordingStatus === "completed" && (
        <Button 
          className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
          onClick={onSave}
        >
          View note
        </Button>
      )}
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6 bg-white text-black">
        {/* <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-black"
        >
          <X size={18} />
        </button> */}
        
        {showProgress ? renderProgressView() : renderRecordingView()}
      </DialogContent>
    </Dialog>
  );
}
