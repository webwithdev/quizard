"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Inter } from 'next/font/google';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const page = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [correct, setCorrect] = useState("")

  function handleLogin(e) {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setPasswordError("Wrong credentials!");
          setTimeout(() => setPasswordError(""), 2000);
          return;
        }
        setTimeout(() => {
          setCorrect("Successfull")
        }, 500);
        setTimeout(() => {
          window.location=("/main")
        },1000 );
      })
      .catch((err) => {
        console.log("Wrong credentials!")
      });
  }

  return (
    <div className={`relative min-h-screen bg-[#050609] flex items-center justify-center overflow-hidden ${inter.className}`}>
      {/* Glowing green wave background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Wave 1 */}
        <div className="absolute -top-[40%] left-0 h-[800px] w-full opacity-20">
          <div className="h-full w-full animate-wave-1 bg-gradient-to-r from-transparent via-[#07F054]/30 to-transparent blur-[80px]" 
               style={{ clipPath: 'ellipse(60% 50% at 50% 50%)' }}
          />
        </div>
        
        {/* Wave 2 */}
        <div className="absolute -bottom-[30%] right-0 h-[600px] w-full opacity-15">
          <div className="h-full w-full animate-wave-2 bg-gradient-to-l from-transparent via-[#07F054]/40 to-transparent blur-[90px]"
               style={{ clipPath: 'ellipse(50% 40% at 50% 50%)' }}
          />
        </div>
        
        {/* Center pulse */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="h-full w-full animate-pulse-glow rounded-full bg-[#07F054]/30 blur-[120px]" />
        </div>

        {/* Diagonal sweep */}
        <div className="absolute top-1/4 -right-[20%] h-[700px] w-[700px] opacity-12">
          <div className="h-full w-full animate-wave-3 bg-gradient-to-br from-[#07F054]/25 via-transparent to-[#07F054]/20 blur-[100px]" />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-2xl border border-slate-800/80 bg-[#070b10]/90 p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Logo/Brand */}
          <div className="mb-8 flex justify-center">
             <div className="flex items-center gap-2.5">
            <img src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fdd0b287-1af9-44cd-b7cd-9700fcae8e72.png" alt="No logo" className="h-12 w-12 rounded-xl bg-[#07F054]/20 ring-1 ring-[#7BD931]/50" />

            <span className="text-xl font-bold tracking-[0.2em] uppercase text-slate-200">
              Quizard
            </span>
          </div>
          </div>

          <h1 className="mb-2 text-center text-3xl font-extrabold text-slate-50">
            Welcome Back
          </h1>
          <p className="mb-8 text-center text-xs text-slate-400">
            Enter your credentials to continue
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-100 placeholder-slate-500 shadow-sm transition-all duration-300 hover:border-slate-600 focus:border-[#07F054] focus:outline-none focus:ring-2 focus:ring-[#07F054]/30"
              />

              {emailError && (
                <p className="mt-2 animate-slideFade text-xs font-medium text-red-400">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-300">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-100 placeholder-slate-500 shadow-sm transition-all duration-300 hover:border-slate-600 focus:border-[#07F054] focus:outline-none focus:ring-2 focus:ring-[#07F054]/30"
              />

              {passwordError && (
                <p className="mt-2 animate-slideFade text-xs font-medium text-red-400">
                  {passwordError}
                </p>
              )}
              <Link href="/signup"> <span className=" text-xs text-[#07F054] w-full text-right ml-1">Don't have a account?</span></Link> 
            </div>

            {correct && (
              <p className="animate-slideFade text-center text-sm font-semibold text-[#07F054] drop-shadow-[0_0_10px_rgba(7,240,84,0.8)]">
                {correct}
              </p>
            )}

            <button
              type="submit"
              onClick={handleLogin}
              className="group relative mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#07F054] px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_40px_rgba(7,240,84,0.7)] transition-all duration-500 hover:scale-[1.02] hover:bg-[#06d949] hover:shadow-[0_0_60px_rgba(7,240,84,1)] active:scale-[0.98]"
            >
              <span className="relative z-10">Log In</span>
              
              {/* Background glow */}
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#07F054]/50 via-[#06d949]/40 to-[#07F054]/50 blur-xl transition-all duration-500 group-hover:blur-2xl" />
              
              {/* Shimmer effect */}
              <span className="pointer-events-none absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
              
              {/* Pulse ring */}
              <span className="pointer-events-none absolute inset-0 -z-20 rounded-xl bg-[#07F054] opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-20" />
            </button>
          </form>

          {/* Footer links */}
          
        </div>
      </div>

      <style jsx>{`
        .animate-slideFade {
          animation: slideFade 0.4s ease-out;
        }
        @keyframes slideFade {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave-1 {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
          }
          50% { 
            transform: translateY(-40px) translateX(30px) scale(1.05); 
          }
        }
        
        @keyframes wave-2 {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
          }
          50% { 
            transform: translateY(35px) translateX(-25px) scale(1.03); 
          }
        }

        @keyframes wave-3 {
          0%, 100% { 
            transform: rotate(0deg) scale(1); 
          }
          50% { 
            transform: rotate(5deg) scale(1.08); 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.15;
          }
        }
        
        .animate-wave-1 {
          animation: wave-1 15s ease-in-out infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 18s ease-in-out infinite;
        }

        .animate-wave-3 {
          animation: wave-3 20s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default page
