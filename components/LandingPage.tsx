"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mic, FileText, Youtube, Upload, ArrowRight, Check, Clock, Brain, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  const router = useRouter();

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      router.push('/login');
    }
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup();
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-lg bg-ruby-primary flex items-center justify-center text-white font-bold text-xl">R</div>
          <span className="ml-2 text-xl font-bold">Ruby Notes</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogin}
            className="text-sm font-medium hover:text-ruby-primary transition-colors"
          >
            Login
          </button>
          <Button 
            onClick={handleSignup}
            className="bg-ruby-primary hover:bg-ruby-primary/90"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 hero-gradient">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Transform your notes with <span className="gradient-text">Ruby Notes</span>
              </h1>
              <p className="text-lg text-gray-600">
                The intelligent note-taking app that helps you capture, organize, and retrieve your thoughts effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleSignup}
                  size="lg" 
                  className="bg-ruby-primary hover:bg-ruby-primary/90"
                >
                  Get Started For Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                >
                  See how it works <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="h-12 bg-gray-50 border-b flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-ruby-primary"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="mx-auto text-sm text-gray-500">Ruby Notes</div>
                  </div>
                  <div className="p-4">
                    <div className="animate-float">
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="h-6 w-2/3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                      </div>
                      <div className="p-3 bg-ruby-primary/10 rounded-lg border border-ruby-primary/30">
                        <div className="h-6 w-3/4 bg-ruby-primary/20 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-ruby-primary/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-full h-[400px] bg-ruby-primary/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Versatile Note Capturing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ruby Notes gives you multiple ways to capture your thoughts and ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Mic className="text-ruby-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Record Audio</h3>
              <p className="text-gray-600">Capture your thoughts by recording audio directly in the app.</p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Upload className="text-ruby-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Audio</h3>
              <p className="text-gray-600">Import audio recordings from your device for transcription.</p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <FileText className="text-ruby-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Import</h3>
              <p className="text-gray-600">Extract text and information from PDF documents.</p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Youtube className="text-ruby-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">YouTube Videos</h3>
              <p className="text-gray-600">Transcribe and summarize YouTube videos for easy reference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Ruby Notes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the benefits of a modern note-taking app designed for productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-ruby-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Quickly capture and organize your thoughts without losing focus on what matters.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Brain className="text-ruby-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Intelligent summaries and organization that help you extract key insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Star className="text-ruby-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Experience</h3>
              <p className="text-gray-600">
                A clean, intuitive interface that makes note-taking a pleasure, not a chore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your note-taking?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already experiencing the future of note-taking.
          </p>
          <Button 
            onClick={handleSignup}
            size="lg" 
            className="bg-ruby-primary hover:bg-ruby-primary/90"
          >
            Get Started For Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-ruby-primary flex items-center justify-center text-white font-bold text-xl">R</div>
                <span className="ml-2 text-xl font-bold">Ruby Notes</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-xs">
                Transform your note-taking experience with our intelligent platform.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 Ruby Notes. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
