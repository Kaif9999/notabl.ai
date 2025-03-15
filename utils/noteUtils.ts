export function createNewNote(
  title: string,
  content: string,
  folderId: string,
  sourceType: "text" | "audio" | "pdf" | "youtube" = "text"
) {
  return {
    id: `note-${Date.now()}`,
    title,
    content,
    folderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceType,
  };
}

export function formatDate(date: Date | string): string {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: dateObj.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export type ProcessingStep = {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
};

export type RecordingStatus = 'idle' | 'recording' | 'processing' | 'transcribing' | 'generating' | 'completed' | 'error';

export function generateProcessingSteps(status: RecordingStatus): ProcessingStep[] {
  const steps: ProcessingStep[] = [
    {
      id: 'processing',
      label: 'Processing audio file',
      status: 'pending'
    },
    {
      id: 'transcribing',
      label: 'Transcribing audio to text',
      status: 'pending'
    },
    {
      id: 'generating',
      label: 'Generating note from transcript',
      status: 'pending'
    }
  ];

  switch (status) {
    case 'processing':
      steps[0].status = 'processing';
      break;
    case 'transcribing':
      steps[0].status = 'completed';
      steps[1].status = 'processing';
      break;
    case 'generating':
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'processing';
      break;
    case 'completed':
      steps.forEach(step => step.status = 'completed');
      break;
    case 'error':
      // Find the first processing step and mark it as error
      const processingStep = steps.find(step => step.status === 'processing');
      if (processingStep) {
        processingStep.status = 'error';
      }
      break;
  }

  return steps;
}
