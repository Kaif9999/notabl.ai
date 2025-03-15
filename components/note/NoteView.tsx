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
  const [quizQuestions] = useState<QuizQuestion[]>([
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
            className="text-4xl font-bold px-3 py-2 h-auto text-white bg-black"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[200px] border rounded-md p-3 text-black bg-white resize-y"
          />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-black">{note.title}</h1>
          <p className="text-gray-600">{note.content}</p>
        </>
      )}
      
      {note.sourceType === "audio" && renderAudioPlayer()}
      
      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-black border-gray-200 hover:bg-purple-400 bg-white"
          >
            <FolderPlus size={14} />
            <span>Add folder</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-black border-gray-200 hover:bg-purple-400 bg-white"
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
                className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
                onClick={handleSaveNote}
              >
                <Save size={14} />
                <span>Save</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-black border-gray-200 hover:bg-gray-50 "
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
                className="flex items-center gap-1 text-black border-gray-200 hover:bg-purple-400 bg-white"
                onClick={onToggleEdit}
              >
                <FileEdit size={14} />
                <span>Edit</span>
              </Button>
              
              {onDelete && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-red-600 border-red-200"
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
    <div className="flex items-center gap-4 bg-gray-100 rounded-md p-3">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
      >
        <Play size={18} className={isPlaying ? "text-purple-600" : "text-black"} />
      </button>
      
      <div className="flex-1">
        <div className="h-2 w-full bg-white rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 w-1/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
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
            <h1 className="text-3xl font-bold mb-2 text-black">Quiz Completed</h1>
            <p className="text-gray-600">You scored {correctAnswers} out of {quizQuestions.length}</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-200 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-4 text-black">
              {correctAnswers === quizQuestions.length 
                ? "Perfect score! Great job!" 
                : correctAnswers > quizQuestions.length / 2 
                  ? "Well done! You&apos;ve learned most of the material." 
                  : "Keep studying to improve your understanding."
              }
            </h3>
            
            <Button 
              onClick={handleRestartQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white"
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
          <h1 className="text-3xl font-bold mb-2 text-black">Quiz Mode</h1>
          <p className="text-gray-600">Test your knowledge with questions generated from the note</p>
          <div className="mt-2 text-sm text-gray-600">
            Question {currentQuizIndex + 1} of {quizQuestions.length}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-black">{currentQuestion.question}</h3>
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
                        : 'bg-purple-50 border-purple-200'
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
                    className="w-4 h-4 text-purple-600" 
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelected(index)}
                  />
                  <label htmlFor={`answer-${index}`} className="text-sm cursor-pointer flex-1 text-black">
                    {option}
                  </label>
                  {showAnswer && index === currentQuestion.correctAnswer && (
                    <span className="text-green-600 text-sm font-medium">Correct</span>
                  )}
                  {showAnswer && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <span className="text-red-600 text-sm font-medium">Incorrect</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              {!showAnswer ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-200"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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
        <h1 className="text-3xl font-bold mb-2 text-black">Flashcards</h1>
        <p className="text-gray-600">Review key concepts with these flashcards</p>
      </div>
      
      <div className="relative h-60 w-full perspective">
        <div className="absolute inset-0 rounded-lg bg-white border border-gray-200 p-6 flex items-center justify-center text-center shadow-sm hover:shadow-md transition-all cursor-pointer">
          <span className="text-xl font-medium text-black">What is the main purpose of Feynman AI?</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" className="text-black border-gray-200 hover:bg-purple-400 bg-white">Previous</Button>
        <Button variant="outline" size="sm" className="text-black border-gray-200 hover:bg-purple-400 bg-white">Next</Button>
      </div>
    </div>
  );
  
  const renderTranscriptContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-black">{note.title}</h1>
        <span className="text-sm text-gray-600">{formatDate(note.createdAt)}</span>
      </div>
      
      {note.sourceType === "audio" && renderAudioPlayer()}
      
      <div className="space-y-4 mt-8 text-gray-600">
        <p>By forcing yourself to explain a concept in simple language, you can quickly identify where you have a solid understanding and where you need to improve. It&apos;s an active learning strategy that&apos;s far more effective than passive reading or memorization.</p>
        
        <p>The technique consists of four key steps:</p>
        
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong className="text-black">Choose a concept</strong> - Select a topic or concept you want to learn about.</li>
          <li><strong className="text-black">Teach it to a beginner</strong> - Explain the concept in simple terms as if you're teaching it to someone new to the subject.</li>
          <li><strong className="text-black">Identify gaps in your explanation</strong> - Notice where you struggle to explain or where your understanding is incomplete.</li>
          <li><strong className="text-black">Review and simplify</strong> - Go back to the source material to fill in those gaps, then simplify the explanation further.</li>
        </ol>
      </div>
      
      <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="flex items-center gap-1 text-black border-gray-200 hover:bg-purple-400 bg-white"
        >
          <FolderPlus size={14} />
          <span>Create mind map</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-1 text-black border-gray-200 hover:bg-purple-400 bg-white"
        >
          <Copy size={14} />
          <span>Translate</span>
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white text-black">
      <Tabs defaultValue="note" value={currentView} onValueChange={handleViewChange}>
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="note" className="rounded-md text-gray-600 data-[state=active]:bg-black data-[state=active]:text-white">Note</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-md text-gray-600 data-[state=active]:bg-black data-[state=active]:text-white">Quiz</TabsTrigger>
          <TabsTrigger value="flashcards" className="rounded-md text-gray-600 data-[state=active]:bg-black data-[state=active]:text-white">Flashcards</TabsTrigger>
          <TabsTrigger value="transcript" className="rounded-md text-gray-600 data-[state=active]:bg-black data-[state=active]:text-white">Transcript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="note" className="mt-0 bg-white text-black">
          {renderNoteContent()}
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0 bg-white text-black">
          {renderQuizContent()}
        </TabsContent>
        
        <TabsContent value="flashcards" className="mt-0 bg-white text-black">
          {renderFlashcardsContent()}
        </TabsContent>
        
        <TabsContent value="transcript" className="mt-0 bg-white text-black">
          {renderTranscriptContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
