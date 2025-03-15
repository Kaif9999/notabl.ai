
import { useParams } from "react-router-dom";
import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { useNoteContext } from "@/context/NoteContext";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexProps {
  onOpenSettings?: () => void;
  onOpenUpgrade?: () => void;
}

const Index = ({ onOpenSettings, onOpenUpgrade }: IndexProps) => {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders } = useNoteContext();
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Get current folder
  const currentFolder = folderId 
    ? folders.find((folder) => folder.id === folderId)
    : { id: "all", name: "All notes" };
    
  const title = currentFolder?.name || "All notes";
  
  useEffect(() => {
    // Close sidebar when transitioning from mobile to desktop
    if (!isMobile) {
      setShowMobileSidebar(false);
    }
  }, [isMobile]);
  
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
            <h1 className="font-semibold">{title}</h1>
          </div>
        )}
        <MainContent 
          title={title} 
          folderId={folderId || "all"} 
        />
      </div>
    </div>
  );
};

export default Index;
