"use client"
import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

export default function Home() {

   useEffect(() => {
      fetch("/api/me",)
        .then(res => {
          console.log("STATUS:", res.status)
          if (res.ok) {
        window.location.href = "/main";
      }
          return res.json()
        })
        .then(data => {
          console.log("DATA:", data)
        })
       
        .catch(err => console.log("FETCH ERROR:", err))
        
    }, [])
   
   
  
    

  return (
    <div className={`relative min-h-screen bg-[#050609] text-slate-100 overflow-hidden ${inter.className}`}>
      {/* Animated Background Waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-0 h-[800px] w-full opacity-20">
          <div className="h-full w-full animate-wave-1 bg-gradient-to-r from-transparent via-[#07F054]/30 to-transparent blur-[80px]"
            style={{ clipPath: 'ellipse(60% 50% at 50% 50%)' }}
          />
        </div>
        <div className="absolute -bottom-[30%] right-0 h-[600px] w-full opacity-15">
          <div className="h-full w-full animate-wave-2 bg-gradient-to-l from-transparent via-[#07F054]/40 to-transparent blur-[90px]"
            style={{ clipPath: 'ellipse(50% 40% at 50% 50%)' }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="h-full w-full animate-pulse-glow rounded-full bg-[#07F054]/30 blur-[120px]" />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">

        {/* Hero Section - Logo & Title */}
        <section className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-12">

          {/* Giant Logo */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-3xl bg-[#07F054]/20 blur-3xl group-hover:blur-[100px] transition-all duration-700" />
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png"
              alt="Quizard Logo"
              className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-3xl ring-4 ring-[#07F054]/50 shadow-[0_0_80px_rgba(7,240,84,0.6)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_120px_rgba(7,240,84,0.9)]"
            />
          </div>

          {/* Brand Name */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-200 bg-clip-text text-transparent">
                QUIZ
              </span>
              <span className="bg-gradient-to-r from-[#07F054] via-[#06d949] to-[#07F054] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(7,240,84,0.8)]">
                ARD
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Test your knowledge. Challenge yourself. <br />
              <span className="text-[#07F054] font-bold">Master every topic.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 mb-3">
            <Link href="/signup">
              <button className="group relative inline-flex items-center justify-center rounded-2xl bg-[#07F054] px-8 py-4 text-base  text-black shadow-[0_0_50px_rgba(7,240,84,0.7)] transition-all duration-500 hover:scale-105 hover:bg-[#06d949] hover:shadow-[0_0_80px_rgba(7,240,84,1)] active:scale-95 font-bold">
                <span className="relative z-10">Create Account</span>
                
              </button>
            </Link>

            <Link href="/login">
              <button className="group inline-flex items-center justify-center rounded-2xl border-2 border-slate-700 bg-slate-950/50 px-8 py-4 text-base font-bold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-[#07F054]/70 hover:bg-slate-900/80 hover:text-white hover:shadow-[0_0_30px_rgba(7,240,84,0.3)] active:scale-95">
                Login
              </button>
            </Link>
          </div>

        
        </section>

        {/* Footer - About & Contact */}
        <footer className="border-t border-slate-800/60 pt-20 pb-12 space-y-20">

          {/* About Quizard Section - EXTENDED */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
                What is <span className="text-[#07F054]">Quizard</span>?
              </h2>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#07F054] to-transparent" />
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-[#070b10]/90 to-[#0a0f15]/90 p-8 sm:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-base sm:text-lg">
                  <span className="text-[#07F054] font-bold">Quizard</span> is a modern, interactive quiz platform designed to make learning fun and competitive. Whether you're brushing up on React hooks, testing your JavaScript knowledge, or exploring new technologies, Quizard has you covered.
                </p>
                <p className="text-base sm:text-lg">
                  Built with <span className="text-[#07F054] font-semibold">Next.js 14</span>, <span className="text-[#07F054] font-semibold">React</span>, and <span className="text-[#07F054] font-semibold">Tailwind CSS</span>, this platform features real-time score tracking, beautiful neon-themed UI, and a seamless user experience. Track your progress, compete with others, and climb the leaderboard.
                </p>
                <p className="text-base sm:text-lg">
                  Quizard isn't just a quiz app—it's your personal knowledge gymnasium. Every question sharpens your skills, every quiz builds your confidence, and every completion brings you closer to mastery.
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#07F054] shadow-[0_0_10px_rgba(7,240,84,0.8)]" />
                    <div>
                      <p className="font-semibold text-slate-200">Real-time Tracking</p>
                      <p className="text-sm text-slate-400">Monitor your accuracy and progress live</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#07F054] shadow-[0_0_10px_rgba(7,240,84,0.8)]" />
                    <div>
                      <p className="font-semibold text-slate-200">Multiple Topics</p>
                      <p className="text-sm text-slate-400">From React to General Knowledge</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#07F054] shadow-[0_0_10px_rgba(7,240,84,0.8)]" />
                    <div>
                      <p className="font-semibold text-slate-200">Beautiful UI</p>
                      <p className="text-sm text-slate-400">Neon-themed modern design</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#07F054] shadow-[0_0_10px_rgba(7,240,84,0.8)]" />
                    <div>
                      <p className="font-semibold text-slate-200">Competitive Edge</p>
                      <p className="text-sm text-slate-400">Compare scores and improve</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* About Developer Section - EXTENDED */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
                Meet the <span className="text-[#07F054]">Creator</span>
              </h2>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[#07F054] to-transparent" />
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-[#070b10]/90 to-[#0a0f15]/90 p-8 sm:p-12 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="space-y-6">
                {/* Name & Title */}
                <div className="text-center pb-6 border-b border-slate-800/50">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#07F054] mb-2">
                    Devansh Bisht
                  </h3>
                  <p className="text-slate-400 font-semibold">Full-Stack Developer & Quiz Enthusiast</p>
                </div>

                {/* Bio */}
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    Hey there! 👋 I'm <span className="text-[#07F054] font-semibold">Devansh</span>, a passionate full-stack developer who loves building interactive web applications. I created Quizard to combine my love for learning with my passion for clean, modern UI design.
                  </p>
                  <p className="text-base sm:text-lg">
                    When I'm not coding, you'll find me exploring the latest web technologies, contributing to open-source projects, or challenging myself with new programming concepts. I believe in learning by doing, and Quizard is my way of helping others do the same.
                  </p>
                  <p className="text-base sm:text-lg">
                    This project showcases my skills in <span className="text-[#07F054] font-semibold">React</span>, <span className="text-[#07F054] font-semibold">Next.js</span>, <span className="text-[#07F054] font-semibold">API development</span>, <span className="text-[#07F054] font-semibold">authentication</span>, and <span className="text-[#07F054] font-semibold">database management</span>. Every line of code is written with performance, user experience, and scalability in mind.
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="pt-6 border-t border-slate-800/50">
                  <p className="text-sm font-semibold text-slate-400 mb-3">Built With:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'JWT Auth','Javascript'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#07F054]/10 text-[#07F054] border border-[#07F054]/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-slate-800/50">
                  <p className="text-sm font-semibold text-slate-400 mb-4 text-center">Let's Connect:</p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {/* Email */}
                    <a
                      href="mailto:devanshbisht03@gmail.com"
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-[#07F054]/50 hover:bg-slate-900/70 hover:text-white hover:shadow-[0_0_25px_rgba(7,240,84,0.3)] hover:-translate-y-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>Email</span>
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/webwithdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-[#07F054]/50 hover:bg-slate-900/70 hover:text-white hover:shadow-[0_0_25px_rgba(7,240,84,0.3)] hover:-translate-y-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href="https://x.com/webwithdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-[#07F054]/50 hover:bg-slate-900/70 hover:text-white hover:shadow-[0_0_25px_rgba(7,240,84,0.3)] hover:-translate-y-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>X / Twitter</span>
                    </a>

                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8">
            <p className="text-xs text-slate-600">
              © 2026 Quizard. Crafted with ❤️ by Devansh Bisht. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* Animations */}
      <style jsx>{`
        @keyframes wave-1 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-40px) translateX(30px) scale(1.05); }
        }
        @keyframes wave-2 {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(35px) translateX(-25px) scale(1.03); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.15; }
        }
        .animate-wave-1 { animation: wave-1 15s ease-in-out infinite; }
        .animate-wave-2 { animation: wave-2 18s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
