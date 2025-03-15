"use client";

import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { UpgradeModal } from "@/components/modals/UpgradeModal";
import { useState } from "react";
import { use } from "react";

function FolderPageClient({ folderId }: { folderId: string }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Desktop sidebar */}
      {!isMobile && (
        <Sidebar 
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenUpgrade={() => setUpgradeOpen(true)}
        />
      )}
      
      {/* Mobile sidebar */}
      {isMobile && showMobileSidebar && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-3/4 max-w-xs shadow-lg">
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
          className="fixed left-4 top-4 z-40"
          onClick={() => setShowMobileSidebar(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <MainContent folderId={folderId} />
      
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

export default function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const resolvedParams = use(params);
  return <FolderPageClient folderId={resolvedParams.folderId} />;
}
