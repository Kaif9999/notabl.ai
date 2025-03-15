'use client';
import React from "react";
import { ChevronRight, FileAudio, FileText, Youtube, MessageSquare, Copy, Folder, Trash } from "lucide-react";
import Link from "next/link";
import { Note } from "@/types";
import { formatDate } from "@/utils/noteUtils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const router = useRouter();
  
  const getSourceIcon = () => {
    switch (note.sourceType) {
      case "audio":
        return <FileAudio className="h-4 w-4 text-blue-500" />;
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-4">
      <Link href={`/dashboard/notes/${note.id}`} className="block">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getSourceIcon()}
            <h3 className="font-medium text-gray-900 line-clamp-1">{note.title}</h3>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-transparent hover:text-gray-500">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  // Copy functionality
                }}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  // Move to folder functionality
                }}>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Move to folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) {
                      onDelete(note.id);
                      router.push('/dashboard');
                    }
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{note.content}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">{formatDate(new Date(note.updatedAt))}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </Link>
    </div>
  );
}
