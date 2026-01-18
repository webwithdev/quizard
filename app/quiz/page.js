"use client"


import React from 'react'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });


const page = () => {
  const [selectcategory, setselectcategory] = useState("")
  const [difficulty, setdifficulty] = useState("")
  const [questioncount, setquestioncount] = useState(0)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [categorynumber, setCategorynumber] = useState(0)

  const router = useRouter()


  const handleclick=async()=> {
    if (!selectcategory || !questioncount || !difficulty) {
    alert("Please select all manually⚠️")
    window.location.href="/quiz"
  }
  else{
   const res= await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "category":selectcategory,
        "difficulty": difficulty,
        "count":questioncount
      }),
    })
 if (res.ok) {
  router.push(`/quiz/start?category=${selectcategory}&difficulty=${difficulty}&count=${questioncount}&categorytype=${categorynum}`);
 }
  
  }
  }


  const [usernamee, setUsernamee] = useState("")
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => {
        console.log("STATUS:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("DATA:", data);
        if (!data.name) {
        window.location.href="/login"
      }
      else
        setUsernamee(data.name || "");
      })
      .catch(err => console.log("FETCH ERROR:", err));
  }, []);


  const categories = ["General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music", "Entertainment: Musicals & Theatres", "Entertainment: Television", "Entertainment: Video Games", "Entertainment: Board Games", "Science & Nature", "Science: Computers", "Science: Mathematics", "Mythology", "Sports", "Geography", "History", "Politics", "Art", "Celebrities", "Animals", "Vehicles", "Entertainment: Comics", "Science: Gadgets", "Entertainment: Japanese Anime & Manga", "Entertainment: Cartoon & Animations"]
  
 let categorynum
 for (let i = 0; i < categories.length; i++) {
  if(selectcategory==categories[i]){
    categorynum=i+9
    console.log(categorynum)
    
  }
 }
 
 async function handlelogout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  }

  const difficulties = ["Easy", "Medium", "Hard"]
  const counts = ["5", "10", "15", "20","30"]


  const CustomDropdown = ({ label, options, selected, setSelected, id }) => {
    const isOpen = openDropdown === id
 

    return (
      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-300">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(isOpen ? null : id)}
            className="group w-full appearance-none rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-left text-sm font-medium text-slate-100 shadow-sm transition-all duration-300 hover:border-[#07F054]/50 hover:shadow-[0_0_20px_rgba(7,240,84,0.15)] focus:border-[#07F054] focus:outline-none focus:ring-2 focus:ring-[#07F054]/30"
          >
            <span className="relative z-10">{selected || options[0]}</span>
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#07F054]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400 transition-all duration-500 ${isOpen ? 'rotate-180 text-[#07F054]' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>


          {/* Dropdown menu with FIXED HEIGHT + CUSTOM SCROLLBAR */}
          <div
            className={`absolute z-20 mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/95 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-300 ease-out ${
              isOpen
                ? 'max-h-[280px] opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="custom-scrollbar max-h-[280px] overflow-y-auto p-1">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelected(option)
                    setOpenDropdown(null)
                  }}
                  className={`group relative w-full overflow-hidden rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                  selected === option
                      ? 'bg-[#07F054]/20 text-[#07F054] shadow-[0_0_15px_rgba(7,240,84,0.3)]'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-50'
                  }`}
                >
                  <span className="relative z-10">{option}</span>
                  <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#07F054]/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
  <div
    className={`relative min-h-screen bg-[#050609] text-slate-100 ${inter.className} overflow-hidden`}
  >
    {/* Animated glowing wave background */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] left-0 h-[800px] w-full opacity-20">
        <div
          className="h-full w-full animate-wave-1 bg-gradient-to-r from-transparent via-[#07F054]/30 to-transparent blur-[80px]"
          style={{ clipPath: "ellipse(60% 50% at 50% 50%)" }}
        />
      </div>

      <div className="absolute -bottom-[30%] right-0 h-[600px] w-full opacity-15">
        <div
          className="h-full w-full animate-wave-2 bg-gradient-to-l from-transparent via-[#07F054]/40 to-transparent blur-[90px]"
          style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="h-full w-full animate-pulse-glow rounded-full bg-[#07F054]/30 blur-[120px]" />
      </div>

      <div className="absolute top-1/4 -right-[20%] h-[700px] w-[700px] opacity-12">
        <div className="h-full w-full animate-wave-3 bg-gradient-to-br from-[#07F054]/25 via-transparent to-[#07F054]/20 blur-[100px]" />
      </div>
    </div>

    {/* Top nav */}
    <header className="border-b border-slate-800 bg-[#050609]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <img src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png" alt="No logo" className="h-10 w-10 rounded-xl bg-[#07F054]/20 ring-1 ring-[#7BD931]/50" />

            <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-200">
              Quizard
            </span>
          </div>

          <h1 className="text-sm font-semibold text-slate-300 max-sm:hidden">Select Quiz</h1>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-100 max-sm:text-xs">{usernamee}</span>
              <span className="text-xs font-medium text-[#07F054] max-sm:text-[10px]">Online</span>
            </div>
            <div className="h-9 w-9 max-sm:w-7 max-sm:h-7 rounded-full bg-gradient-to-br from-[#07F054] to-slate-[#07F054]" />
            <button onClick={handlelogout} className="rounded-full border border-slate-700 px-5 py-2  text-[14px] font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/70 max-sm:hidden">
              Logout
            </button>
            <Link href="/main" className=' max-sm:hidden'>
              <button className="rounded-full border border-slate-700 px-5 py-2 text-[14px] font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/70">
                Home
              </button>
            </Link>
          </div>
        </div>
      </header>

    {/* Main content */}
    <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full space-y-6 rounded-2xl border border-slate-800 bg-[#070b10]/90 p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm">
        <div className="space-y-1 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-50">
            Configure Your Quiz
          </h2>
          <p className="text-xs text-slate-400">
            Select your preferences and start
          </p>
        </div>

        <div className="space-y-5">
          <CustomDropdown
            label="Category"
            options={categories}
            selected={selectcategory}
            setSelected={setselectcategory}
            id="category"
          />

          <CustomDropdown
            label="Difficulty"
            options={difficulties}
            selected={difficulty}
            setSelected={setdifficulty}
            id="difficulty"
          />

          <CustomDropdown
            label="Number of Questions"
            options={counts}
            selected={questioncount}
            setSelected={setquestioncount}
            id="count"
          />

          <Link
            href={
              selectcategory || questioncount || difficulty
                ? "/quiz/start"
                : "/quiz"
            }
          >
            <button
              onClick={handleclick}
              className="group relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#07F054] px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(7,240,84,0.6)] transition-all duration-500 hover:scale-[1.02] hover:bg-[#06d949] hover:shadow-[0_0_50px_rgba(7,240,84,1)] active:scale-[0.98]"
            >
              <span className="relative z-10">
                Start Quiz
              </span>

              <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#07F054]/50 via-[#06d949]/40 to-[#07F054]/50 blur-xl transition-all duration-500 group-hover:blur-2xl" />

              <span className="pointer-events-none absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

              <span className="pointer-events-none absolute inset-0 -z-20 rounded-xl bg-[#07F054] opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-20" />
            </button>
          </Link>
        </div>
      </div>
    </main>
  </div>
);

}


export default page
