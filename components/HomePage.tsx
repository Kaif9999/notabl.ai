"use client";
import { useState } from "react";
import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { UpgradeModal } from "@/components/modals/UpgradeModal";

export default function HomePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  return (
    <div className="flex min-h-screen w-full relative bg-white">
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="flex-shrink-0">
          <Sidebar
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenUpgrade={() => setUpgradeOpen(true)}
          />
        </div>
      )}
      
      {/* Mobile sidebar */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-3/4 max-w-xs shadow-xl">
            <Sidebar 
              onOpenSettings={() => setSettingsOpen(true)}
              onOpenUpgrade={() => setUpgradeOpen(true)}
              onClose={() => setShowMobileSidebar(false)}
            />
          </div>
        </div>
      )}
      
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 text-black bg-purple-500 border-purple-500"
          onClick={() => setShowMobileSidebar(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}
      
      <div className="flex-grow">
        <MainContent title="All notes" folderId="folder-1" />
      </div>
      
      {/* Modals */}
      <SettingsModal
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        onOpenUpgradeModal={() => {
          setSettingsOpen(false);
          setUpgradeOpen(true);
        }}
      />
      <UpgradeModal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}
