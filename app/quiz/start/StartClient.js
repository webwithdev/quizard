"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import he from 'he'
import { shaderMaterial } from '@react-three/drei'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })


export default function StartClient() {
  const searchParams = useSearchParams()


  const category = searchParams.get('category')


  const difficulty = searchParams.get('difficulty')


  const newdifficulty = difficulty?.toLowerCase()


  const count = searchParams.get('count')


  const [data, setdata] = useState([])


  const categorynum = searchParams.get('categorytype')


  const [questionnumber, setquestionnumber] = useState(0)


  const [Usernamee, setUsernamee] = useState("")


  let amount = parseInt(count);


  const [selectedAnswer, setSelectedAnswer] = useState("")


  const [shuffledAnswers, setShuffledAnswers] = useState([])


  const [Check, setCheck] = useState(false)


  const [Correct, setCorrect] = useState(false)

  const [Right, setRight] = useState(0)
  const [Wrong, setWrong] = useState(0)



  useEffect(() => {
    async function Getdata() {
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categorynum}&difficulty=${newdifficulty}&type=multiple`,
        {
          method: "GET",
        })
      if (res.ok) {
        const datax = await res.json();
        setdata(datax.results)
      }
      else {
        setTimeout(() => {
          location.reload()
        }, 1000);
      }
    }
    Getdata()
  }, [count, categorynum, difficulty])



  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => {

        return res.json();
      })
      .then(data => {
        if (!data?.name) {
          window.location.href = "/login"
        }
        else
          setUsernamee(data?.name || "");
      })
      .catch(err => console.log("FETCH ERROR:", err));
  }, []);


  // NEW: Shuffle answers when question changes
  useEffect(() => {
    if (data && data[questionnumber]) {
      const incorrectanswers = data[questionnumber]?.incorrect_answers || []
      const correctanswer = data[questionnumber]?.correct_answer


      // Combine all answers
      const allAnswers = [...incorrectanswers, correctanswer]


      // Shuffle them
      const shuffled = [...allAnswers]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }


      setShuffledAnswers(shuffled)
    }
  }, [data, questionnumber]) // Shuffle when data loads or question changes


  const questions = data[questionnumber]?.question
  const questext = questions ? he.decode(questions) : ""


  const correct_answer = data[questionnumber]?.correct_answer


  const handleSelected = (answer) => {

    setSelectedAnswer(answer)

  }


  let result = false;

  if (questionnumber === amount) {
    result = true


  }

  const handleCheck = () => {
    if (selectedAnswer === correct_answer) {
      if (!Check) {
        setRight(Right + 1)
      }

      toast.success('Correct Answer! ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, rgba(10, 15, 20, 0.98) 0%, rgba(15, 23, 30, 0.98) 100%)',
          border: '2px solid #07F054',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 40px rgba(7, 240, 84, 0.3), inset 0 1px 0 rgba(7, 240, 84, 0.1)',
          backdropFilter: 'blur(16px)',
          color: '#FFFFFF',
          padding: '16px 20px',
          fontWeight: '600',
          fontSize: '15px',
        },
        progressStyle: {
          background: 'linear-gradient(90deg, #07F054 0%, #06d949 50%, #05c042 100%)',
          boxShadow: '0 0 20px rgba(7, 240, 84, 0.9)',
          height: '4px',
        },
        icon: <span style={{ fontSize: '24px', gap: "12px" }}>🎯</span>,
      })
      setCheck(true)
      setCorrect(true)
    }
    else {
      if (!Check) {
        setWrong(Wrong + 1)
      }

      toast.error('Wrong Answer ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, rgba(10, 15, 20, 0.98) 0%, rgba(20, 15, 15, 0.98) 100%)',
          border: '2px solid #EF4444',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(16px)',
          color: '#FFFFFF',
          padding: '16px 20px',
          fontWeight: '600',
          fontSize: '15px',
        },
        progressStyle: {
          background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.9)',
          height: '4px',
        },
        icon: <span style={{ fontSize: '24px', gap: "12px" }}>❌</span>,
      })
      setCheck(true)
      setCorrect(false)
    }
  }

  const handleNext = () => {
    setquestionnumber(questionnumber + 1)
    setCheck(false)
    setSelectedAnswer("")
    if (!Check) {
      if (correct_answer === selectedAnswer) {
        setCorrect(true)
        setRight(Right + 1)
        toast.success('Correct Answer! ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            background: 'linear-gradient(135deg, rgba(10, 15, 20, 0.98) 0%, rgba(15, 23, 30, 0.98) 100%)',
            border: '2px solid #07F054',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 40px rgba(7, 240, 84, 0.3), inset 0 1px 0 rgba(7, 240, 84, 0.1)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            padding: '16px 20px',
            fontWeight: '600',
            fontSize: '15px',
          },
          progressStyle: {
            background: 'linear-gradient(90deg, #07F054 0%, #06d949 50%, #05c042 100%)',
            boxShadow: '0 0 20px rgba(7, 240, 84, 0.9)',
            height: '4px',
          },
          icon: <span style={{ fontSize: '24px', gap: "12px" }}>🎯</span>,
        })
      }
      else {
        setWrong(Wrong + 1)
        toast.error('Wrong Answer ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            background: 'linear-gradient(135deg, rgba(10, 15, 20, 0.98) 0%, rgba(20, 15, 15, 0.98) 100%)',
            border: '2px solid #EF4444',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            padding: '16px 20px',
            fontWeight: '600',
            fontSize: '15px',
          },
          progressStyle: {
            background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.9)',
            height: '4px',
          },
          icon: <span style={{ fontSize: '24px', gap: "12px" }}>❌</span>,
        })
      }
    }
  }

  const handleSubmit = () => {
    const accuracy = Math.ceil((Right / amount) * 100)

    fetch("/api/quizdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "category": category,
        "accuracy": accuracy,
        "difficulty": difficulty,
        "totalquestions": amount
      }),
    })

  }


  return (<>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={false}
      draggable
      pauseOnHover={false}
      theme="dark"
      transition={Bounce}
    />


    {result ? (
      // RESULT SECTION 
      <div className={`relative min-h-screen bg-black text-slate-100 ${inter.className} overflow-hidden`}>

        {/* Background glow (same as quiz) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-15">
            <div className="h-full w-full rounded-full bg-[#07F054]/30 blur-[140px]" />
          </div>
        </div>

        {/* Top bar */}
        <div className="relative z-10 border-b border-slate-800/50 bg-black/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png"
                  alt="Quizard"
                  className="h-10 w-10 max-sm:h-8 max-sm:w-8 rounded-xl bg-[#07F054]/20 ring-1 ring-[#7BD931]/50 transition-all duration-200 hover:scale-105 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  {/* Title - Always visible, responsive sizing */}
                  <span className="block text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-slate-200 truncate">
                    Quizard
                  </span>

                  {/* Category/Difficulty - Hidden on very small screens */}
                  <p className="text-xs sm:text-[13px] text-slate-400 font-medium mt-0.5 max-md:hidden xs:inline">
                    {category} • {difficulty}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h1 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
                Quiz</h1>

              <h1 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300">
                Result</h1></div>
            <div className="flex items-center justify-center gap-6 text-sm max-md:gap-3">

              {/* GitHub */}
              <a
                href="https://github.com/webwithdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-[#07F054] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.02c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.38 1.236-3.22-.124-.304-.535-1.53.117-3.185 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.655.242 2.88.118 3.185.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.37.823 1.1.823 2.22v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/webwithdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-[#07F054] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26L22.75 21.75h-6.6l-5.17-6.78-5.93 6.78H1.74l7.73-8.84L1.25 2.25h6.77l4.67 6.18 5.55-6.18z" />
                </svg>
                <span className="hidden sm:inline">Twitter</span>
              </a>

              {/* Email */}
              <a
                href="mailto:bishtdevansh03@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-[#07F054] transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
                </svg>
                <span className="hidden sm:inline">Email</span>
              </a>

            </div>

          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center px-4">

          {/* Result card (same as question card) */}
          <div className="rounded-xl border border-slate-800/80 bg-[#070b10]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-5">

            <h2 className="text-lg font-semibold text-slate-100 text-center">
              Quiz Completed
            </h2>

            {/* Accuracy */}
            <div className="text-center">
              <p className="text-4xl font-black text-[#07F054]">
                {Math.ceil((Right / amount) * 100)}%
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Accuracy
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[#07F054]/40 bg-[#07F054]/10 p-4 text-center">
                <p className="text-xl font-bold text-[#07F054]">{Right}</p>
                <p className="text-xs text-slate-500 uppercase">Correct</p>
              </div>

              <div className="rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-center">
                <p className="text-xl font-bold text-[#EF4444]">{Wrong}</p>
                <p className="text-xs text-slate-500 uppercase">Wrong</p>
              </div>
            </div>

            {/* Meta */}
            <div className="border-t border-slate-800 pt-3 text-sm text-slate-500 space-y-1">
              <div>📚 Category: {category}</div>
              <div>⚡ Difficulty: {difficulty}</div>
              <div>📊 Total Questions: {amount}</div>
            </div>

            {/* Buttons (same style as quiz buttons) */}
            <div className="flex gap-3 pt-2">


              <Link
                href="/main"
                className="w-full rounded-lg bg-[#07F054] px-5 py-3 text-sm font-bold text-black 
             shadow-[0_0_30px_rgba(7,240,84,0.6)] transition hover:scale-[1.02]
             flex items-center justify-center" onClick={handleSubmit}
              >
                Submit Quiz
              </Link>

            </div>
          </div>
        </div>
      </div>
    ) : (
      // NORMAL QUIZ SECTION
      <div className={`relative min-h-screen bg-black text-slate-100 ${inter.className} overflow-hidden`}>
        {/* Background waves */}
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

        {/* Top bar */}
        <div className="relative z-10 border-b border-slate-800/50 bg-black/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png"
                alt="Quizard"
                className="h-10 w-10 max-sm:h-8 max-sm:w-8 rounded-xl bg-[#07F054]/20 ring-1 ring-[#7BD931]/50 transition-all duration-200 hover:scale-105 shrink-0"
              />

              <div className="min-w-0 flex-1">
                {/* Title - Always visible, responsive sizing */}
                <span className="block text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-slate-200 truncate">
                  Quizard
                </span>

                {/* Category/Difficulty - Hidden on very small screens */}
                <p className="text-xs sm:text-[13px] text-slate-400 font-medium mt-0.5 max-md:hidden xs:inline">
                  {category} • {difficulty}
                </p>
              </div>
            </div>



            <div className="flex items-center gap-3 sm:gap-5">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">RIGHT</p>
                <p className="text-sm font-bold text-[#07F054]">{Right}</p>
              </div>
              <div className="h-10 w-px bg-slate-800" />
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">WRONG</p>
                <p className="text-sm font-bold text-[#EF4444]">{Wrong}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Question</p>
                <p className="text-sm font-bold text-slate-100">
                  {questionnumber + 1}<span className="text-slate-600">/{amount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center px-4 py-6 sm:px-6">
          {/* Question card */}
          <div className="mb-4 rounded-xl border border-slate-800/80 bg-[#070b10]/90 py-4 px-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <h2 className="text-base sm:text-lg font-semibold leading-relaxed text-slate-50">
              {questext ? `${questionnumber + 1}. ${questext}` : "Loading..."}
            </h2>
          </div>

          {/* Answer options */}
          <div className="space-y-2">
            {shuffledAnswers.map((answer, index) => (
              <button
                className="group relative w-full overflow-hidden rounded-lg border-2 border-slate-700 p-3 text-left text-sm sm:text-base font-medium transition-all duration-300 hover:border-[#07F054]/50 hover:bg-slate-900/70 hover:shadow-[0_0_20px_rgba(7,240,84,0.15)]"
                disabled={Check}
                key={index}
                onClick={() => handleSelected(answer, index)}
                value={answer}
                style={{
                  border: selectedAnswer === answer ? "2px solid #07F054" : "2px solid #1f1f1f",
                  backgroundColor:
                    Check && selectedAnswer === answer
                      ? (Correct
                        ? "rgba(7, 240, 84, 0.2)"
                        : "rgba(239, 68, 68, 0.4)")
                      : "transparent"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-slate-400">
                    {String.fromCharCode(index + 65)}
                  </div>
                  <span className="text-slate-100">{he.decode(answer)}</span>
                </div>
                <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#07F054]/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              </button>
            ))}
          </div>

          {/* Correct answer display */}
          {Check && Correct === false && (
            <div className='mt-3 w-full overflow-hidden rounded-lg border-2 border-[#07F054] bg-[#07F054]/10 p-3 text-sm font-medium'>
              <div className="flex items-center gap-3">
                <span className='text-slate-300'>Correct Answer:</span>
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#07F054] text-sm font-bold text-black'>
                  {String.fromCharCode(shuffledAnswers.indexOf(correct_answer) + 65)}
                </span>
                <span className='text-slate-100'>{he.decode(correct_answer)}</span>
              </div>
            </div>
          )}

          {/* Buttons */}
          {questext && (
            <div className='flex gap-3 mt-5'>
              <button className="group relative overflow-hidden rounded-lg bg-[#07F054] px-5 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(7,240,84,0.6)] transition-all duration-500 hover:scale-[1.02] hover:bg-[#06d949] hover:shadow-[0_0_40px_rgba(7,240,84,1)] active:scale-[0.98] w-full" onClick={handleCheck}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Check Answer
                </span>
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#07F054]/50 via-[#06d949]/40 to-[#07F054]/50 blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <span className="pointer-events-none absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
              </button>

              <button className="group relative overflow-hidden rounded-lg border-2 border-[#07F054] bg-transparent px-5 py-3 text-sm font-bold text-[#07F054] shadow-[0_0_20px_rgba(7,240,84,0.3)] transition-all duration-500 hover:scale-[1.02] hover:border-[#06d949] hover:bg-[#07F054]/10 hover:shadow-[0_0_30px_rgba(7,240,84,0.6)] active:scale-[0.98] w-full" onClick={handleNext}  >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Next Question
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    )}

    {/* SHARED STYLES */}
    <style jsx>{`
    @keyframes float-in {
      0% { opacity: 0; transform: scale(0.8) translateY(30px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 1; } }
    @keyframes bounce-up {
      0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
      25% { transform: translateY(-20px) scale(1.2); }
      50% { transform: translateY(-40px) scale(1.1); }
      75% { transform: translateY(-10px) scale(1.15); }
    }
    @keyframes confetti-burst {
      0% { opacity: 1; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
      100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    @keyframes wave-1 { 0%, 100% { transform: translateY(0) translateX(0) scale(1); } 50% { transform: translateY(-40px) translateX(30px) scale(1.05); } }
    @keyframes wave-2 { 0%, 100% { transform: translateY(0) translateX(0) scale(1); } 50% { transform: translateY(35px) translateX(-25px) scale(1.03); } }
    @keyframes pulse-glow { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; } 50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.15; } }

    .animate-float-in { animation: float-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .animate-pulse-glow { animation: pulse-slow 3s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    .animate-wave-1 { animation: wave-1 15s ease-in-out infinite; }
    .animate-wave-2 { animation: wave-2 18s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 10s ease-in-out infinite; }
    .animate-confetti-burst span { display: inline-block; animation: bounce-up 1s ease-in-out infinite, confetti-burst 2s ease-out 0s infinite; }
    .animate-confetti-burst span:nth-child(2) { animation-delay: 0.1s; }
    .animate-confetti-burst span:nth-child(3) { animation-delay: 0.2s; }
  `}</style>
  </>)




}



