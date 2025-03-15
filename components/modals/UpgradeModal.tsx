import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [billingPeriod, setBillingPeriod] = useState<"yearly" | "monthly">("yearly");
  
  const features = [
    "Unlimited note generations",
    "Unlimited audio or phone calls",
    "Unlimited podcasts and youtube videos",
    "Unlimited quiz and flashcards",
    "Support for 100+ languages",
    "Best-in-class Transcription and Summarization",
    "Customer support 24/7",
    "Priority Access to new features",
    "And more..."
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="sr-only">Upgrade Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 p-1 rounded-full flex">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === "yearly" ? "bg-black text-white" : "text-gray-700"
                }`}
                onClick={() => setBillingPeriod("yearly")}
              >
                Yearly <span className="text-green-400 font-bold ml-1">Save 60%</span>
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === "monthly" ? "bg-black text-white" : "text-gray-700"
                }`}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                <img src="/lovable-uploads/4de1ab3e-f434-4ef3-817c-a4ca5294d22e.png" alt="Logo" className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Notewave AI</h2>
                <p className="uppercase tracking-wider text-lg font-semibold">UNLIMITED PLAN</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Get access to all features and benefits of the app. No limits, no restrictions.
            </p>
            
            <div className="flex justify-between mb-8">
              <div className="flex items-end">
                <span className="text-4xl font-bold">$7.99</span>
                <span className="text-muted-foreground ml-1">/ per month</span>
              </div>
              
              <Button 
                className="bg-black hover:bg-black/90 text-white px-6" 
                onClick={onClose}
              >
                Upgrade plan <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium mb-2">Everything in free plan plus</p>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
