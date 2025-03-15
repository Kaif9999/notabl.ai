
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Note, NoteView as NoteViewType } from "@/types";
import { formatDate } from "@/utils/noteUtils";
import { Trash, FileEdit, FolderPlus, Play, Copy, Save, X } from "lucide-react";

interface NoteViewProps {
  note: Note;
  onDelete?: (noteId: string) => void;
  onSave?: (updatedNote: Note) => void;
  isEditing?: boolean;
  onToggleEdit?: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function NoteView({ note, onDelete, onSave, isEditing = false, onToggleEdit }: NoteViewProps) {
  const [currentView, setCurrentView] = useState<NoteViewType>("note");
  const [isPlaying, setIsPlaying] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  
  // For Quiz functionality
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      question: "What is the Feynman technique?",
      options: [
        "A memorization technique",
        "A learning technique based on teaching concepts simply",
        "A problem-solving framework",
        "A time management system"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the main purpose of Ruby Notes?",
      options: [
        "To help manage finances",
        "To track daily tasks",
        "To transform recordings and PDFs into organized notes",
        "To collaborate with teams"
      ],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT a step in the Feynman technique?",
      options: [
        "Choose a concept",
        "Teach it to a beginner",
        "Memorize keywords",
        "Review and simplify"
      ],
      correctAnswer: 2
    }
  ]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  useEffect(() => {
    // Reset editing state if note changes
    setEditedTitle(note.title);
    setEditedContent(note.content);
  }, [note]);
  
  const handleViewChange = (value: string) => {
    setCurrentView(value as NoteViewType);
    
    // Reset quiz state when switching to quiz tab
    if (value === "quiz") {
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setQuizCompleted(false);
      setCorrectAnswers(0);
    }
  };
  
  const handleSaveNote = () => {
    if (onSave) {
      const updatedNote = {
        ...note,
        title: editedTitle,
        content: editedContent,
        updatedAt: new Date()
      };
      onSave(updatedNote);
    }
  };
  
  const handleAnswerSelected = (optionIndex: number) => {
    if (showAnswer) return; // Don't allow changing answer after submission
    
    setSelectedAnswer(optionIndex);
  };
  
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowAnswer(true);
    
    // Update correct answers count
    if (selectedAnswer === quizQuestions[currentQuizIndex].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };
  
  const renderNoteContent = () => (
    <div className="space-y-4">
      {isEditing ? (
        <>
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-4xl font-bold px-3 py-2 h-auto"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[200px] border rounded-md p-3 text-muted-foreground resize-y"
          />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">{note.title}</h1>
          <p className="text-muted-foreground">{note.content}</p>
        </>
      )}
      
      {note.sourceType === "audio" && renderAudioPlayer()}
      
      <div className="border-t border-feynman-border pt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <FolderPlus size={14} />
            <span>Add folder</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Copy size={14} />
            <span>Copy text</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-green-500 hover:text-green-600 hover:border-green-200"
                onClick={handleSaveNote}
              >
                <Save size={14} />
                <span>Save</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-feynman-darkGray"
                onClick={onToggleEdit}
              >
                <X size={14} />
                <span>Cancel</span>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-feynman-darkGray"
                onClick={onToggleEdit}
              >
                <FileEdit size={14} />
                <span>Edit</span>
              </Button>
              
              {onDelete && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:border-red-200"
                  onClick={() => onDelete(note.id)}
                >
                  <Trash size={14} />
                  <span>Delete</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderAudioPlayer = () => (
    <div className="flex items-center gap-4 bg-feynman-gray rounded-md p-3">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
      >
        <Play size={18} className={isPlaying ? "text-ruby-primary" : "text-feynman-black"} />
      </button>
      
      <div className="flex-1">
        <div className="h-2 w-full bg-white rounded-full overflow-hidden">
          <div className="h-full bg-ruby-primary w-1/4" />
        </div>
        <div className="flex justify-between text-xs text-feynman-darkGray mt-1">
          <span>00:00</span>
          <span>00:14</span>
        </div>
      </div>
    </div>
  );
  
  const renderQuizContent = () => {
    if (quizCompleted) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Quiz Completed</h1>
            <p className="text-muted-foreground">You scored {correctAnswers} out of {quizQuestions.length}</p>
          </div>
          
          <div className="p-6 bg-white border border-feynman-border rounded-lg text-center">
            <h3 className="text-lg font-medium mb-4">
              {correctAnswers === quizQuestions.length 
                ? "Perfect score! Great job!" 
                : correctAnswers > quizQuestions.length / 2 
                  ? "Well done! You've learned most of the material." 
                  : "Keep studying to improve your understanding."
              }
            </h3>
            
            <Button 
              onClick={handleRestartQuiz}
              className="bg-ruby-primary hover:bg-ruby-primary/90 text-white"
            >
              Restart Quiz
            </Button>
          </div>
        </div>
      );
    }
    
    const currentQuestion = quizQuestions[currentQuizIndex];
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Quiz Mode</h1>
          <p className="text-muted-foreground">Test your knowledge with questions generated from the note</p>
          <div className="mt-2 text-sm text-feynman-darkGray">
            Question {currentQuizIndex + 1} of {quizQuestions.length}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 bg-white border border-feynman-border rounded-lg">
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 p-3 rounded-md cursor-pointer border ${
                    selectedAnswer === index 
                      ? showAnswer 
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200' 
                        : 'bg-ruby-primary/10 border-ruby-primary/20'
                      : showAnswer && index === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-200'
                        : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelected(index)}
                >
                  <input 
                    type="radio" 
                    id={`answer-${index}`} 
                    name={`q${currentQuizIndex}`} 
                    className="w-4 h-4 text-ruby-primary" 
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelected(index)}
                  />
                  <label htmlFor={`answer-${index}`} className="text-sm cursor-pointer flex-1">
                    {option}
                  </label>
                  {showAnswer && index === currentQuestion.correctAnswer && (
                    <span className="text-green-500 text-sm font-medium">Correct</span>
                  )}
                  {showAnswer && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <span className="text-red-500 text-sm font-medium">Incorrect</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              {!showAnswer ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-ruby-primary hover:bg-ruby-primary/90 text-white disabled:bg-gray-200"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-ruby-primary hover:bg-ruby-primary/90 text-white"
                >
                  {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderFlashcardsContent = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-muted-foreground">Review key concepts with these flashcards</p>
      </div>
      
      <div className="relative h-60 w-full perspective">
        <div className="absolute inset-0 rounded-lg bg-white border border-feynman-border p-6 flex items-center justify-center text-center shadow-sm hover:shadow-md transition-all cursor-pointer">
          <span className="text-xl font-medium">What is the main purpose of Feynman AI?</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
  
  const renderTranscriptContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{note.title}</h1>
        <span className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</span>
      </div>
      
      {note.sourceType === "audio" && renderAudioPlayer()}
      
      <div className="space-y-4 mt-8 text-muted-foreground">
        <p>The Feynman Technique is a learning method developed by Richard Feynman, a Nobel Prize-winning physicist. It's designed to help you understand concepts deeply and retain information more effectively.</p>
        
        <p>The technique consists of four key steps:</p>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Choose a concept</strong> - Select a topic or concept you want to learn about.</li>
          <li><strong>Teach it to a beginner</strong> - Explain the concept in simple terms as if you're teaching it to someone new to the subject.</li>
          <li><strong>Identify gaps in your explanation</strong> - Notice where you struggle to explain or where your understanding is incomplete.</li>
          <li><strong>Review and simplify</strong> - Go back to the source material to fill in those gaps, then simplify the explanation further.</li>
        </ol>
        
        <p>By forcing yourself to explain a concept in simple language, you can quickly identify where you have a solid understanding and where you need to improve. It's an active learning strategy that's far more effective than passive reading or memorization.</p>
      </div>
      
      <div className="flex justify-center gap-4 pt-4 border-t border-feynman-border">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <FolderPlus size={14} />
          <span>Create mind map</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-1"
        >
          <Copy size={14} />
          <span>Translate</span>
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Tabs defaultValue="note" value={currentView} onValueChange={handleViewChange}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="note" className="mt-0">
          {renderNoteContent()}
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          {renderQuizContent()}
        </TabsContent>
        
        <TabsContent value="flashcards" className="mt-0">
          {renderFlashcardsContent()}
        </TabsContent>
        
        <TabsContent value="transcript" className="mt-0">
          {renderTranscriptContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
