"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  FileText,
  Youtube,
  Upload,
  ArrowRight,
  Brain,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import Footer from "./footer";


export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Add padding to account for fixed navbar */}
      <div className="pt-14 md:pt-16">
        {/* Hero Section */}
        <section className="py-8 md:py-24 px-4 md:px-12 bg-gradient-to-br from-purple-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black leading-tight">
                  Transform your notes with{" "}
                  <span className="text-purple-700 relative">
                    Notabl
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  The intelligent note-taking app that helps you capture,
                  organize, and retrieve your thoughts effortlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                  <Link href= "/pricing">
                  <Button
                    size="lg"
                    className="bg-purple-700 hover:bg-black/90 text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                    >
                    Get Started For Free
                  </Button>
                    </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center justify-center gap-2 border-2 text-white hover:bg-purple-400 rounded-xl px-6 md:px-8 py-5 md:py-6 text-base md:text-lg transition-all bg-black w-full sm:w-auto"
                  >
                    See how it works <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 w-full px-4 md:px-0">
                <div className="relative">
                  <div className="w-full h-[300px] md:h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-black/10 backdrop-blur-xl">
                    <div className="h-12 bg-gray-50/80 border-b border-black/10 flex items-center px-4 backdrop-blur-xl">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      </div>
                      <div className="mx-auto text-sm font-medium text-black">
                        Notabl
                      </div>
                    </div>
                    <div className="p-4">
                      <div>
                        <div className="mb-4 p-3 bg-gray-50/80 rounded-xl border border-black/10 backdrop-blur-xl hover:shadow-md transition-all">
                          <div className="h-6 w-3/4 bg-purple-100 rounded-lg mb-2"></div>
                          <div className="h-4 w-1/2 bg-purple-100 rounded-lg"></div>
                        </div>
                        <div className="mb-4 p-3 bg-gray-50/80 rounded-xl border border-black/10 backdrop-blur-xl hover:shadow-md transition-all">
                          <div className="h-6 w-2/3 bg-purple-100 rounded-lg mb-2"></div>
                          <div className="h-4 w-5/6 bg-purple-100 rounded-lg"></div>
                        </div>
                        <div className="p-3 bg-black rounded-xl animate-float shadow-xl">
                          <div className="h-6 w-3/4 bg-purple-200 rounded-lg mb-2"></div>
                          <div className="h-4 w-1/2 bg-purple-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -z-10 -bottom-6 -right-6 w-full h-[300px] md:h-[400px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Notable Section */}
        <section className="py-16 md:py-24 px-4 md:px-12 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(128,90,213,0.25),transparent_50%)]"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                Why Choose Notable?
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 md:px-0">
                Experience a revolutionary approach to note-taking that adapts
                to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                  <Brain className="text-purple-400" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  AI-Powered Intelligence
                </h3>
                <p className="text-gray-400">
                  Smart summaries, automatic organization, and intelligent
                  insights that help you focus on what matters.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                  <Mic className="text-purple-400" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Multi-Format Support
                </h3>
                <p className="text-gray-400">
                  From voice recordings to PDFs, capture your thoughts in any
                  format that works for you.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                  <Star className="text-purple-400" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Beautiful Experience
                </h3>
                <p className="text-gray-400">
                  A thoughtfully designed interface that makes note-taking a
                  joy, not a chore.
                </p>
              </div>
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <Button
                
                size="lg"
                className="bg-white hover:bg-gray-100 text-black text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-black">
                Versatile Note Capturing
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
                Notable gives you multiple ways to capture your thoughts and
                ideas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
              <div className="p-6 bg-white border-2 border-black rounded-xl hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Mic className="text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  Record Audio
                </h3>
                <p className="text-gray-600">
                  Capture your thoughts by recording audio directly in the app.
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-black rounded-xl hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Upload className="text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  Upload Audio
                </h3>
                <p className="text-gray-600">
                  Import audio recordings from your device for transcription.
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-black rounded-xl hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <FileText className="text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  PDF Import
                </h3>
                <p className="text-gray-600">
                  Extract text and information from PDF documents.
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-black rounded-xl hover:bg-purple-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Youtube className="text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">
                  YouTube Videos
                </h3>
                <p className="text-gray-600">
                  Transcribe and summarize YouTube videos for easy reference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-12 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your note-taking?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join thousands of users who are already experiencing the future of
              note-taking.
            </p>
            
            <Button
              
              size="lg"
              className="bg-purple-800 hover:bg-gray-100 text-black"
            >
              Get Started For Free
            </Button>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}
