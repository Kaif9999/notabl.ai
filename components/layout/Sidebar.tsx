"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder as FolderIcon,
  Plus,
  Settings,
  Info,
  Crown,
  X,
  Trash,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNoteContext } from "@/context/NoteContext";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Folder } from "@/types";
import { toast } from "sonner";
import Image from 'next/image';

const NotableLogo = () => (
  <div className="flex items-center">
    <div className="h-10 w-10 rounded-lg border-2 bg-black border-black flex items-center justify-center">
      <Mic className="h-6 w-6 text-purple-700" />
    </div>
    <span className="ml-2 text-2xl font-bold text-purple-600">Notabl.ai</span>
  </div>
);

interface SidebarProps {
  onOpenSettings?: () => void;
  onOpenUpgrade?: () => void;
  onClose?: () => void;
}

export function Sidebar({
  onOpenSettings,
  onOpenUpgrade,
  onClose,
}: SidebarProps) {
  const [folders, setLocalFolders] = useState<Folder[]>([]);
  const {
    folders: contextFolders,
    userProfile,
    addFolder,
    getNotesByFolder,
    deleteFolder,
  } = useNoteContext();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [noteCounts, setNoteCounts] = useState<Record<string, number>>({});
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // Set folders after initial render to avoid hydration mismatch
  useEffect(() => {
    setLocalFolders(contextFolders);
  }, [contextFolders]);

  // Calculate note counts after initial render
  useEffect(() => {
    const counts: Record<string, number> = {};
    folders.forEach((folder) => {
      counts[folder.id] = getNotesByFolder(folder.id).length;
    });
    setNoteCounts(counts);
  }, [folders, getNotesByFolder]);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        parentId: null,
      };
      addFolder(newFolder);
      setNewFolderName("");
      setIsCreatingFolder(false);
    }
  };

  return (
    <div className="w-64 h-screen border-r-2 border-gray-200 flex flex-col bg-white overflow-y-auto text-black">
      <div className="p-4 flex items-center justify-between">
        <Link href="/dashboard">
          <NotableLogo />
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-black"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="mt-6 px-4">
        <div className="mb-2 text-sm font-semibold text-feynman-darkGray">
          Folders
        </div>
        <nav className="space-y-1">
          {folders.map((folder) => {
            const isActive = pathname === `/dashboard/folder/${folder.id}`;

            return (
              <Link
                key={folder.id}
                href={`/dashboard/folder/${folder.id}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-feynman-darkGray hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderIcon size={18} />
                  <span className="text-sm">{folder.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {noteCounts[folder.id] > 0 && (
                    <span className="text-xs text-feynman-darkGray">
                      ({noteCounts[folder.id]})
                    </span>
                  )}
                  {folder.id !== "folder-1" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (
                          confirm(
                            "Are you sure you want to delete this folder?"
                          )
                        ) {
                          deleteFolder(folder.id);
                          toast.success("Folder deleted successfully");
                        }
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {isCreatingFolder ? (
          <form onSubmit={handleCreateFolder} className="mt-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full rounded-lg border-2 border-gray-200 py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-feynman-red"
              autoFocus
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setIsCreatingFolder(false)}
                className="text-xs text-feynman-darkGray hover:text-feynman-black mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-xs text-feynman-red hover:text-opacity-80"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsCreatingFolder(true)}
            className="flex items-center w-full mt-2 text-sm text-feynman-darkGray"
          >
            <div className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-colors">
              <Plus size={16} />
              <span>Create new folder</span>
            </div>
          </button>
        )}
      </div>

      <div className="mt-auto px-4 py-4">
        <Link
          href="/support"
          className="flex items-center border-gray-200 w-full border-b-2 justify-center gap-1 py-2 text-sm text-feynman-darkGray hover:text-black transition-colors mb-4"
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center border border-feynman-darkGray">
            <Info size={12} />
          </div>
          <span>Support</span>
        </Link>

        {/* Upgrade Plan Button */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4">
          <button
            onClick={onOpenUpgrade}
            className="bg-black text-white flex items-center justify-center gap-2 w-full rounded-md py-2 mb-2 hover:bg-black/90"
          >
            <Crown size={16} />
            <span className="font-medium">Upgrade plan</span>
          </button>
          <p className="text-xs text-center text-muted-foreground mb-3">
            Get more features and unlimited access
          </p>
          <div className="mb-1">
            <ProgressBar
              value={userProfile.notesUsed}
              max={userProfile.notesLimit}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>
              {userProfile.notesUsed} / {userProfile.notesLimit} Notes free
            </span>
            <button className="text-muted-foreground hover:text-black">
              <Info size={14} />
            </button>
          </div>
        </div>

        <div className="border-2 border-gray-200 rounded-lg p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={userProfile.avatar || '/default-avatar.png'}
                alt={userProfile.name || 'User'}
                width={32}
                height={32}
                className="rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
              <div>
                <div className="text-sm font-medium">{userProfile.name}</div>
                <div className="text-xs text-feynman-darkGray truncate max-w-[140px]">
                  {userProfile.email}
                </div>
              </div>
            </div>
            <button
              className="text-feynman-darkGray hover:text-feynman-black pr-2"
              aria-label="Settings"
              onClick={onOpenSettings}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
