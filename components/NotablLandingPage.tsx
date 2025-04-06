"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import MobileNotablLandingPage from "./MobileNotablLandingPage";

const IntersectionPoint = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute -translate-x-1/2 -translate-y-1/2"
  >
    <g filter="url(#filter0_di_524_1205)">
      <circle cx="14" cy="11" r="10" fill="white" />
    </g>
    <circle cx="14" cy="11" r="5" fill="url(#paint0_linear_524_1205)" />
    <defs>
      <filter
        id="filter0_di_524_1205"
        x="0"
        y="0"
        width="28"
        height="28"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_524_1205"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_524_1205"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-1" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_524_1205"
        />
      </filter>
      <linearGradient
        id="paint0_linear_524_1205"
        x1="14"
        y1="6"
        x2="14"
        y2="16"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#DCDCDC" />
        <stop offset="1" stop-color="#8F8F8F" />
      </linearGradient>
    </defs>
  </svg>
);

const NotablLandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return <MobileNotablLandingPage />;
  }

  return (
    // <div className="bg-gray-100 max-h-screen">
    <div className="bg-gray-100">
      <div className="relative mx-10 max-w-7xl border-l-3 border-r-3 border-dashed border-gray-300 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-2">
          <div className="logo">
            <img src="/logo.svg" alt="Notabl Logo" className="h-12 pl-10" />
          </div>
          <div className="pr-10 ">
            <Link href="/signin">
              <Button className="bg-neutral-900 text-white font-semibold px-4 py-2 rounded-xl text-sm">
                Sign In
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto my-16 pb-6 pl-6 pr-6">
          <div className="border-dashed border-gray-300">
            {/* Intersection points for hero section */}
            <div className="absolute left-0">{/* <IntersectionPoint /> */}</div>
            <div className="absolute right-0">
              {/* <IntersectionPoint /> */}
            </div>
          </div>
          <div className="bg-gradient-to-b  from-[#FDFAF7] to-[#FCF7F2] rounded-2xl shadow-sm p-20">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
              {/* Social Proof */}
              <div className="flex items-center bg-white px-2 py-2 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex -space-x-2 mr-2">
                  <div className="w-5 h-5 rounded-full bg-gray-300">
                    <img
                      src="/emoji-girl.svg"
                      alt="Notabl Logo"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-gray-300">
                    <img
                      src="/emoji-boy.svg"
                      alt="Notabl Logo"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-gray-300">
                    <img
                      src="/emoji-aunt.svg"
                      alt="Notabl Logo"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-gray-300">
                    <img
                      src="/emoji-man.svg"
                      alt="Notabl Logo"
                      className="h-5 w-5"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-neutral-900">
                  loved by 20,000+ customers
                </span>
              </div>

              {/* Hero Text */}
              <div className="text-center">
                <h1 className="text-4xl font-semibold text-neutral-900 mb-6">
                  Unlock the Power of
                  <br />
                  Youtube, Instantly
                </h1>
                <p className="text-xl text-neutral-500 max-w-xl">
                  Transform lengthy youtube videos into structured, actionable
                  notes. save time, learn faster, and engage deeper
                </p>
              </div>

              {/* URL Input */}
              <div className="w-full max-w-lg space-y-2">
                <div className="bg-neutral-50 border border-neutral-400/50 hover:border-orange-400 rounded-2xl p-4 flex items-center">
                  <input
                    type="text"
                    placeholder="Paste YouTube URL here"
                    className="w-full bg-transparent text-neutral-500 focus:outline-none"
                  />
                </div>

                {/* Document Type Selection */}
                <div className="space-y-2">
                  <p className="text-xl text-neutral-500 text-center">
                    Select Document Type
                  </p>

                  <div className="grid grid-cols-4 gap-3">
                    <button className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Notes
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Recipes
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Workouts
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Travel
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Quiz
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Flashcards
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Chat
                      </span>
                    </button>

                    <button className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 flex justify-center">
                      <span className="text-sm font-semibold text-neutral-900">
                        Transcript
                      </span>
                    </button>
                  </div>
                </div>

                {/* Generate Button */}
                <button className="w-full bg-orange-500 text-white font-semibold py-5 rounded-xl">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <div className="border-dashed px-8 border-t-3 border-b-3 border-gray-300 relative">
          {/* Intersection points for benefits section */}
          <div className="absolute left-0 top-0">
            <IntersectionPoint />
          </div>
          <div className="absolute right-0 top-0">
            <IntersectionPoint />
          </div>
          <div className="absolute left-0 bottom-0">
            <IntersectionPoint />
          </div>
          <div className="absolute right-0 bottom-0">
            <IntersectionPoint />
          </div>

          <section className="max-w-6xl mx-auto p-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-orange-50 text-orange-600 text-sm font-medium py-2 px-4 rounded-full border border-orange-200 mb-4">
                Benefits
              </div>
              <h2 className="text-4xl font-semibold text-neutral-900 mb-4">
                Learn Smarter, Your Way
              </h2>
              <p className="text-xl text-neutral-500 max-w-md mx-auto">
                Transform YouTube Videos into Notes, Quizzes, Flashcards, and
                More – Right at Your Fingertips
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Structured Summaries Card */}
              <div className="bg-white p-6 pb-0 mb-0 rounded-3xl shadow-md h-full w-full">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Structured Summaries
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  From bullet points to in-depth articles, instantly generate
                  notes tailored to your learning style
                </p>
                <div className=" h-50 rounded-xl">
                  <img
                    src="/summaries.svg"
                    alt="summary"
                    className="h-full w-full"
                  />
                </div>
              </div>

              {/* Interactive Learning Card */}
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Interactive Learning
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Test your understanding with auto-generated quizzes and
                  flashcards.
                </p>
                <div className=" h-50 rounded-xl grid grid-cols-2">
                  <img
                    src="/interactive-learning1.svg"
                    alt="interactive"
                    className="h-full w-full"
                  />
                  <img
                    src="/interactive-learning2.svg"
                    alt="flashcards"
                    className="h-full w-full"
                  />
                </div>
              </div>

              {/* Practical Guides Card */}
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Practical Guides
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Convert videos into step-by-step recipes, detailed workout
                  plans, travel guides, and more.
                </p>
                <div className="bg-gray-100 h-48 rounded-xl"></div>
              </div>

              {/* AI Assistant Card */}
              <div className="bg-white p-6 rounded-3xl shadow-md">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  AI Assistant at Your Fingertips
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Got questions? Need clarification? Chat directly with your
                  notes using our built-in AI chat feature for deeper insights.
                </p>
                <div className="bg-gray-100 h-48 rounded-xl"></div>
              </div>
            </div>
          </section>
        </div>

        {/* Why Notabl Section */}
        <div className="border-dashed border-b-3 border-gray-300 relative">
          <section className="max-w-6xl mx-auto pt-0 p-6 my-8  border-gray-300">
            {/* Intersection points for Why Notabl section */}

            <div className="absolute left-0 bottom-0">
              <IntersectionPoint />
            </div>
            <div className="absolute right-0 bottom-0">
              <IntersectionPoint />
            </div>

            <h2 className="text-4xl font-semibold text-neutral-900 text-center mb-12">
              Why Notabl?
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Save Hours Card */}
              <div className="bg-[#FCFAF8] pt-20 p-6 rounded-3xl shadow-md">
                <div className="h-40 flex items-center justify-center mb-2">
                  <div className="w-60 h-60 rounded-full flex items-center justify-center">
                    <img
                      src="/save-hours.svg"
                      className="w-full h-full"
                      alt="Clock Icon"
                    />
                  </div>
                </div>
                <h3 className="text-2xl pt-20 font-semibold text-neutral-900 mb-3">
                  Save Hours
                </h3>
                <p className="text-sm text-neutral-500">
                  Skip the fluff and dive straight into the insight that matter
                </p>
              </div>

              {/* Personalized Learning Card */}
              <div className="bg-[#FCFAF8] pt-20 p-6 rounded-3xl shadow-md">
                <div className="h-40 flex items-center justify-center mb-6">
                  <div className="w-60 h-60 rounded-full flex items-center justify-center">
                    <img src="/personalized_learning.svg" alt="Learning Icon" />
                  </div>
                </div>
                <h3 className="text-2xl pt-20 font-semibold text-neutral-900 mb-3">
                  Personalized Learning
                </h3>
                <p className="text-base text-neutral-500">
                  Customize notes and learning formats to match your unique
                  needs
                </p>
              </div>

              {/* Deepen Your Understanding Card */}
              <div className="bg-[#FCFAF8] pt-20 p-6 rounded-3xl shadow-md">
                <div className="h-40 flex items-center justify-center mb-6">
                  <div className="w-60 h-60 rounded-full flex items-center justify-center">
                    <img
                      src="/deepen-understanding.svg"
                      alt="Understanding Icon"
                    />
                  </div>
                </div>
                <h3 className="text-2xl pt-10 font-semibold text-neutral-900 mb-3">
                  Deepen Your Understanding
                </h3>
                <p className="text-base text-neutral-500">
                  Integrate new information more effectively with AI-powered
                  learning tools
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto p-6 my-16">
          <div className="bg-gradient-to-b from-[#FDFAF7] to-[#FCF7F2] rounded-2xl shadow-sm p-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl font-semibold text-neutral-900 mb-6">
                Experience Smarter
                <br />
                Learning Today
              </h2>
              <p className="text-xl text-neutral-500 mb-8">
                Join thousands transforming how they engage
                <br />
                with youtube content
              </p>

              <div className="w-[80%] max-w-xl mx-auto space-y-8">
                <div className="bg-neutral-50 border border-neutral-400 rounded-2xl p-4 flex items-center">
                  <input
                    type="text"
                    placeholder="Paste YouTube URL here"
                    className="w-[80%] bg-transparent text-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="w-full grid grid-cols-4 gap-2 justify-center">
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Notes
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Recipes
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Workouts
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Travel
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Quiz
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Flashcards
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Chat
                  </button>
                  <button className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-semibold hover:border-orange-400 hover:bg-orange-50">
                    Transcript
                  </button>
                </div>

                <button className="w-full bg-orange-500 text-white font-semibold py-5 rounded-xl">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom intersection points */}
        <div className="absolute left-0 bottom-0">
          <IntersectionPoint />
        </div>
        <div className="absolute right-0 bottom-0">
          <IntersectionPoint />
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto p-6 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="Notabl Logo" className="h-10 mb-3" />
            <p className="text-sm text-neutral-500">
              © 2025 Notabl. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8">
            <Link href="/terms" className="text-neutral-500 text-sm">
              Terms and conditions
            </Link>
            <a href="#" className="text-neutral-500 text-sm">
              Privacy policy
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-neutral-800 rounded-xl flex items-center justify-center"
            >
              <span className="text-sm">LI</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-neutral-800 rounded-xl flex items-center justify-center"
            >
              <span className="text-sm">IG</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-neutral-800 rounded-xl flex items-center justify-center"
            >
              <span className="text-sm">TW</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-neutral-800 rounded-xl flex items-center justify-center"
            >
              <span className="text-sm">YT</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotablLandingPage;
