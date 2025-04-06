import React from "react";
import Link from "next/link";
import Image from "next/image";

const MobileNotablLandingPage = () => {
  const [man, aunt, boy, girl] = ["/emoji-man.svg", "/emoji-aunt.svg", "/emoji-boy.svg", "/emoji-girl.svg"];

  return (
    <div className="w-full min-h-screen bg-zinc-100 overflow-x-hidden">
      {/* Header */}
      <div className="w-80 mx-auto mt-6 flex justify-between items-center">
        <Image width={138} height={47} src="/logo.svg" alt="Notabl Logo" className="w-36 h-12" />
        <Link href="/signin">
          <div className="px-3.5 py-2.5 bg-neutral-800 rounded-xl flex justify-center items-center">
            <div className="text-white text-sm font-semibold font-['Plus_Jakarta_Sans']">Sign In</div>
          </div>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="w-80 mx-auto mt-20 flex flex-col items-center gap-6">
        {/* Social Proof */}
        <div className="w-72 px-4 py-2 bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] outline-1 outline-stone-300/80 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[man, aunt, boy, girl].map((i) => (
              <div key={i} className="size-5 relative rounded-[10px] overflow-hidden">
                <Image width={20} height={20} src={i} alt={`User ${i}`} className="size-5 absolute rounded-[10px]" />
                <div className="size-5 absolute rounded-[10px] border border-white" />
              </div>
            ))}
          </div>
          <div className="text-neutral-800 text-sm font-medium font-['Plus_Jakarta_Sans']">loved by 20,000+ customers</div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-neutral-800 text-3xl font-bold font-['Plus_Jakarta_Sans']">
            Transform YouTube Videos Into Actionable Content
          </h1>
          <p className="text-center text-slate-600 text-base font-medium font-['Plus_Jakarta_Sans'] leading-7">
            Convert any YouTube video into organized notes, plans, and learning materials
          </p>
        </div>

        {/* URL Input and Document Type Selection */}
        <div className="p-4 bg-gradient-to-b from-stone-50 to-red-50 rounded-2xl outline-1 outline-stone-300/80 flex flex-col gap-6">
          <div className="px-6 py-4 bg-zinc-100 rounded-2xl  outline-1 outline-neutral-400/50 flex items-center">
            <input 
              type="text"
              placeholder="Paste YouTube URL here"
              className="w-full bg-transparent text-slate-600 text-base font-medium font-['Plus_Jakarta_Sans'] outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-center text-slate-600 text-base font-medium font-['Plus_Jakarta_Sans'] leading-7">
              Select Document Type
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Notes", icon: "blue-700", bg: "rose-100", border: "orange-500/40" },
                { name: "Recipes", icon: "violet-700", bg: "neutral-50", border: "stone-300/40" },
                { name: "Workouts", icon: "orange-600", bg: "neutral-50", border: "stone-300/40" },
                { name: "Travel", icon: "emerald-600", bg: "neutral-50", border: "stone-300/40" },
                { name: "Quiz", icon: "red-600", bg: "neutral-50", border: "stone-300/40" },
                { name: "Flashcards", icon: "indigo-600", bg: "neutral-50", border: "stone-300/40" },
                { name: "Chat", icon: "teal-600", bg: "neutral-50", border: "stone-300/40" },
                { name: "Transcript", icon: "gray-700", bg: "neutral-50", border: "stone-300/40" }
              ].map((item, index) => (
                <button 
                  key={index}
                  className={`px-3 py-3.5 bg-${item.bg} rounded-xl outline-1 outline-${item.border} flex justify-center items-center`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 bg-${item.icon}`} />
                    <span className="text-neutral-800 text-sm font-semibold font-['Plus_Jakarta_Sans']">{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full px-4 py-3.5 bg-amber-600 rounded-xl flex justify-center items-center gap-2.5">
            <div className="w-4 h-3.5 bg-white" />
            <span className="text-white text-base font-semibold font-['Plus_Jakarta_Sans']">Generate</span>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-80 mx-auto mt-20 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="px-3.5 py-1.5 bg-orange-100 rounded-[80px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] outline-1 outline-orange-300">
            <span className="text-amber-600 text-xs font-medium font-['Plus_Jakarta_Sans']">Benefits</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-center text-neutral-800 text-3xl font-semibold font-['Plus_Jakarta_Sans']">Learn Smarter, Your Way</h2>
            <p className="w-64 text-center text-slate-600 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-snug">
              Transform YouTube Videos into Notes, Quizzes, Flashcards, and More – Right at Your Fingertips
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-6">
          {/* Structured Summaries Card */}
          <div className="h-96 p-4 bg-white rounded-3xl shadow-lg">
            <div className="px-4 pb-6 flex flex-col gap-3">
              <h3 className="text-neutral-800 text-2xl font-semibold font-['Plus_Jakarta_Sans']">Structured Summaries</h3>
              <p className="text-slate-600 text-sm font-medium font-['Plus_Jakarta_Sans']">
                From bullet points to in-depth articles, instantly generate notes tailored to your learning style
              </p>
            </div>
            <div className="relative h-64 bg-neutral-50 rounded-xl overflow-hidden">
              <Image 
                src="/summaries.svg" 
                alt="Summaries" 
                layout="fill" 
                objectFit="cover"
                className="p-4"
              />
            </div>
          </div>

          {/* Interactive Learning Card */}
          <div className="h-[694px] p-4 bg-white rounded-3xl shadow-lg">
            <div className="px-4 pb-6 flex flex-col gap-3">
              <h3 className="text-neutral-800 text-2xl font-semibold font-['Plus_Jakarta_Sans']">Interactive Learning</h3>
              <p className="text-slate-600 text-sm font-medium font-['Plus_Jakarta_Sans']">
                Test your understanding with auto-generated quizzes and flashcards.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-neutral-50 rounded-2xl">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-neutral-800 text-sm font-semibold">What is the main topic of the podcast's Episode?</h4>
                    <span className="text-gray-500 text-xs">Question 1 of 16</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Learning With Hero Podcast", "Traveling in England", "Cooking English Food", "History of English Language"].map((answer, i) => (
                      <button key={i} className={`w-full px-3 py-2 bg-zinc-100 rounded-xl ${i === 1 ? 'outline outline-1 outline-amber-600' : ''} flex justify-between items-center`}>
                        <span className="text-neutral-800 text-xs font-medium">{answer}</span>
                        {i === 1 && <div className="size-3.5 bg-green-500 rounded-full" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-64 bg-neutral-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-neutral-800 text-base font-semibold mb-4">What is the main topic of the podcast's Episode?</h4>
                  <p className="text-slate-600 text-base font-medium">Press to Flip</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Guides Card */}
          <div className="p-4 bg-white rounded-3xl shadow-lg">
            <div className="px-4 pb-6 flex flex-col gap-3">
              <h3 className="text-neutral-800 text-2xl font-semibold font-['Plus_Jakarta_Sans']">Practical Guides</h3>
              <p className="text-slate-600 text-sm font-medium font-['Plus_Jakarta_Sans']">
                Convert videos into step-by-step recipes, detailed workout plans, travel guides, and more.
              </p>
            </div>
            <div className="relative h-40">
              <Image 
                src="/practical-guides.svg" 
                alt="Practical Guides" 
                layout="fill" 
                objectFit="contain"
                className="p-4"
              />
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="h-96 p-4 bg-white rounded-3xl shadow-lg">
            <div className="px-4 pb-6 flex flex-col gap-3">
              <h3 className="text-neutral-800 text-2xl font-semibold font-['Plus_Jakarta_Sans']">AI Assistant at Your Fingertips</h3>
              <p className="text-slate-600 text-sm font-medium font-['Plus_Jakarta_Sans']">
                Got questions? Need clarification? Chat directly with your notes using our built-in AI chat feature for deeper insights.
              </p>
            </div>
            <div className="relative h-56">
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
              <div className="p-6 bg-white rounded-[32px] shadow-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="size-7 bg-rose-100 rounded-full flex items-center justify-center">
                      <Image src="/bot-icon.svg" alt="Bot" width={20} height={12} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Hi, I'm notable bot. Ask me anything about this note!</p>
                  </div>
                  <div className="self-end">
                    <div className="px-3 py-1.5 bg-orange-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl">
                      <p className="text-neutral-800 text-sm font-medium">summarize this video</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="size-7 bg-rose-100 rounded-full flex items-center justify-center">
                      <Image src="/bot-icon.svg" alt="Bot" width={20} height={12} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">The lecture explores multiple pathways to self-discovery...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Notabl Section */}
      <div className="w-80 mx-auto mt-20">
        <h2 className="text-center text-neutral-800 text-3xl font-semibold font-['Plus_Jakarta_Sans'] mb-6">Why Notabl?</h2>
        <div className="flex flex-col gap-4">
          {/* Save Hours Card */}
          <div className="h-84 px-4 pt-6 pb-2 bg-stone-50 rounded-3xl shadow-lg flex flex-col justify-between">
            <div className="relative h-50 flex items-center justify-center">
              <Image src="/save-hours.svg" alt="Save Hours" layout="fill" objectFit="contain" />
            </div>
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold mb-3">Save Hours</h3>
              <p className="text-slate-600 text-base">Skip the fluff and dive straight into the insight that matter</p>
            </div>
          </div>

          {/* Personalized Learning Card */}
          <div className="h-84 px-4 pt-6 pb-2 bg-stone-50 rounded-3xl shadow-lg flex flex-col justify-between">
            <div className="relative h-50 flex items-center justify-center">
              <Image src="/personalized_learning.svg" alt="Personalized Learning" layout="fill" objectFit="contain" />
            </div>
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-slate-600 text-base">Customize notes and learning formats to match your unique needs</p>
            </div>
          </div>

          {/* Deepen Understanding Card */}
          <div className="h-84 px-4 pt-6 pb-2 bg-stone-50 rounded-3xl shadow-lg flex flex-col justify-between">
            <div className="relative h-50 flex items-center justify-center">
              <Image src="/deepen-understanding.svg" alt="Deepen Understanding" layout="fill" objectFit="contain" />
            </div>
            <div>
              <h3 className="text-neutral-800 text-xl font-semibold mb-3">Deepen Your Understanding</h3>
              <p className="text-slate-600 text-base">Integrate new information more effectively with AI-powered learning tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-80 mx-auto mt-20 pb-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Image width={167} height={57} src="/logo.svg" alt="Notabl Logo" className="w-40 h-14" />
              <p className="text-zinc-400 text-sm font-medium font-['Inter'] leading-tight">© 2025 Notabl. All rights reserved.</p>
            </div>
            <div className="flex gap-5">
              <Link href="/terms" className="text-slate-600 text-sm font-medium leading-tight">Terms and conditions</Link>
              <Link href="/privacy" className="text-slate-600 text-sm font-medium leading-tight">Privacy policy</Link>
            </div>
            <div className="flex gap-4">
              {[
                { id: 'LI', href: '#', icon: 'M5 5h10v10H5z' },
                { id: 'IG', href: '#', icon: 'M12 4h4v4h-4z' },
                { id: 'TW', href: '#', icon: 'M15 3H9v10h6z' },
                { id: 'YT', href: '#', icon: 'M4 4h12v8H4z' }
              ].map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className="w-7 h-6 rounded-md outline outline-1 outline-zinc-800 flex items-center justify-center"
                >
                  <span className="text-sm">{social.id}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileNotablLandingPage; 