import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Moon, Sun, Globe, Shield, Crown } from "lucide-react";
import { useNoteContext } from "@/context/NoteContext";
import Image from 'next/image';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpgradeModal: () => void;
  onLogout?: () => void;
}

export function SettingsModal({ isOpen, onClose, onOpenUpgradeModal, onLogout }: SettingsModalProps) {
  const { userProfile } = useNoteContext();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6 bg-white text-black">
        <DialogHeader>
          <DialogTitle className="sr-only">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-feynman-gray flex items-center justify-center mr-3">
              <Image
                src={userProfile.avatar}
                alt={userProfile.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-black">My profile</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1 text-black">Display name</p>
                <p className="text-base text-black">{userProfile.name}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1 text-black">Email</p>
                <p className="text-base text-black">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1 text-black">Active plan</p>
                <p className="text-base capitalize text-black">{userProfile.plan}</p>
              </div>
              <Button 
                onClick={onOpenUpgradeModal}
                className="bg-black hover:bg-black/90 text-white"
              >
                <Crown size={16} className="mr-2" />
                Upgrade plan
              </Button>
            </div>
          </div>
          
          <div className="border-t border-feynman-border pt-4 text-black">
            <div className="flex items-center mb-4">
              <Shield size={18} className="mr-2 text-black" />
              <h3 className="font-medium">Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">Appearance</p>
                  <p className="text-sm text-black">Customize how Feynman looks on your device.</p>
                </div>
                <div className="flex items-center border rounded-full p-1 text-black">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <Sun size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full bg-black text-white">
                    <Moon size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">Language</p>
                  <p className="text-sm text-black">Change the language of Feynman in the user interface.</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2 text-white">
                  <Globe size={16} />
                  <span>English</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-feynman-border pt-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
