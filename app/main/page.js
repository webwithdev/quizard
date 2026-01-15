// app/page.tsx or pages/index.tsx
"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Dashboard() {

  const [usernamee, setUsernamee] = useState("")
  const [quizdata, setQuizdata] = useState([])
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => {
        console.log("STATUS:", res.status)
        return res.json()
      })
      .then(data => {
        console.log("DATA:", data)
        console.log(data.quizdata)
        
        setUsernamee(data.name || "")
        setQuizdata(data.quizdata )
      })
      .catch(err => console.log("FETCH ERROR:", err))
  }, [])


  async function handlelogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={`min-h-screen bg-[#050609] text-slate-100 ${inter.className}`}>
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-[#050609]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <img src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png" alt="No logo" className="h-10 w-10 rounded-xl bg-[#07F054]/20 ring-1 ring-[#7BD931]/50" />

            <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-200">
              Quizard
            </span>
          </div>

          <h1 className="text-sm font-semibold text-slate-300 max-sm:hidden mx-auto">Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-100 max-sm:text-xs">{usernamee}</span>
              <span className="text-xs font-medium text-[#07F054] max-sm:text-[10px]">Online</span>
            </div>
            <div className="h-9 w-9 max-sm:w-7 max-sm:h-7 rounded-full bg-gradient-to-br from-[#07F054] to-slate-[#07F054]" />
            <button onClick={handlelogout} className="rounded-full border border-slate-700 px-5 py-2  text-[14px] font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/70 max-sm:hidden">
              Logout
            </button>
            <Link href="/" className=' max-sm:hidden'>
              <button className="rounded-full border border-slate-700 px-5 py-2 text-[14px] font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/70">
                Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main 3-div flex layout */}
      <main className="mx-auto max-w-7xl px-6 py-8">
         <h2 className=' text-xl font-semibold text-slate-300 text-center mb-4 sm:hidden'>Dashboard</h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* 1. Previous Quizzes (left) */}


       <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-[#070b10]/95 via-black/90 to-[#0a0f15]/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md h-[70vh] overflow-y-scroll max-sm:h-[55vh] custom-scrollbar">

  {/* Header */}
  <div className="mb-8 pb-4 border-b border-slate-800/50">
    <h2 className="text-2xl font-bold text-white tracking-tight text-center">
      Previous Quizzes
    </h2>
  </div>

  <div className="space-y-4 ">
   {quizdata?.length>0 ? (
  quizdata.map((quiz, index) => (
    <div
      key={quiz.id || index}
      className="group flex items-center justify-between rounded-xl border border-slate-800/60 bg-black/30 hover:bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#07F054]/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:-translate-y-1"
    >
      {/* Left Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white line-clamp-1 max-w-[200px]">
          {quiz?.category}
        </h3>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 bg-slate-900/50 border border-slate-700/50">
            {quiz?.difficulty || "Easy"}
          </span>
          <span className="text-xs text-slate-400">
            {quiz.totalquestions || 0} Questions
          </span>
        </div>
      </div>

      {/* Right Accuracy */}
      <div className="text-right min-w-[80px]">
        <p className="text-2xl font-black text-[#07F054]">
          {quiz.accuracy || 0}%
        </p>
        <p className="text-xs text-slate-500">Accuracy</p>
      </div>
    </div>
  ))
) : (
  <div className='text-2xl font-extrabold leading-tight text-slate-50 text-center'>
    <h2>No Quiz</h2>
    <h2 className=' font-black text-[#07F054] drop-shadow-[0_0_20px_rgba(7,240,84,0.6)]'>Attempted Yet</h2>
  </div>
)}

  </div>
</div>





          {/* 2. Start Quiz (middle) - untouched */}
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-[#070b10]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(7,240,84,0.15),_transparent_60%)]" />

            <div className="relative flex h-full flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#07F054]">
                  Ready to Test?
                </p>
                <h2 className="text-3xl font-extrabold leading-tight text-slate-50">
                  Start Your Next
                  <br />
                  Quiz Challenge
                </h2>
                <p className="mx-auto max-w-xs text-xs leading-relaxed text-slate-400">
                  Pick a topic, test your skills, and climb the leaderboard. Every quiz sharpens
                  your edge.
                </p>
              </div>

              <button className="group relative inline-flex items-center justify-center rounded-full bg-[#07F054] px-8 py-4 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(7,240,84,0.7)] transition hover:bg-[#06d949] hover:shadow-[0_0_40px_rgba(7,240,84,1)]">
                <Link href="/quiz">     <span className="relative z-10" >Launch Quiz</span></Link>
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#07F054]/50 via-[#06d949]/40 to-[#07F054]/50 blur-xl transition group-hover:blur-2xl" />
              </button>

              <div className="flex items-center gap-6 pt-2 text-[11px] font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#07F054] shadow-[0_0_10px_rgba(7,240,84,0.8)]" />
                  <span>10 Topics Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>Avg 12 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Stats (right) - clean 3-container layout */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Container 1: Total Quizzes */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#070b10]/90 to-[#0a0f15]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Total Questions
              </p>
              <p className="mt-2 text-5xl font-black text-slate-50">12,477</p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                More than 5287+ completed
              </p>
            </div>

            {/* Container 2: Best Score */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#070b10]/90 to-[#0a0f15]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Best Average
              </p>
              <p className="mt-2 text-5xl font-black text-[#07F054] drop-shadow-[0_0_20px_rgba(7,240,84,0.6)]">
                93%
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Achieved on React Deep Dive
              </p>
            </div>

            {/* Container 3: Time Invested */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#070b10]/90 to-[#0a0f15]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Registerd users
              </p>
              <p className="mt-2 text-5xl font-black text-slate-50">126</p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Hours spent learning
              </p>
            </div>
          </div>
        </div>
        
      </main>
      <div className=' flex justify-center '><div className='bg-red-600 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.8)] sm:hidden max-sm:w-[30vw] text-center mx-auto mb-4' onClick={handlelogout}>
  Logout
</div>
</div>

    </div>
  );
}
