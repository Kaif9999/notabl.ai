import { useState, useRef, useEffect } from "react";
import { ProcessingStatus } from "@/types";

interface UseAudioReturn {
  isRecording: boolean;
  audioTime: number;
  audioBlob: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  resetRecording: () => void;
  recordingStatus: ProcessingStatus;
}

export function useAudio(): UseAudioReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<ProcessingStatus>("idle");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  const startTimer = () => {
    if (timerRef.current) return;
    setAudioTime(0);
    timerRef.current = window.setInterval(() => {
      setAudioTime((prev) => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stopTimer();
        setIsRecording(false);
        // Start processing flow
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
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingStatus("recording");
      startTimer();
    } catch (error) {
      console.error("Error starting recording:", error);
      setRecordingStatus("error");
      throw error;
    }
  };
  
  const stopRecording = async () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };
  
  const resetRecording = () => {
    setAudioBlob(null);
    setAudioTime(0);
    setIsRecording(false);
    setRecordingStatus("idle");
    audioChunksRef.current = [];
    stopTimer();
  };
  
  return {
    isRecording,
    audioTime,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
    recordingStatus
  };
}
