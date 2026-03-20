"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Loader2, Mail, Lock, User, MonitorSmartphone, Layers, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
    setIsLoading(false)
  }

  const demoCredentials = [
    { role: "Super Admin", email: "superadmin@test.com" },
    { role: "Admin", email: "admin@test.com" },
    { role: "Teacher", email: "teacher@test.com" },
    { role: "Accountant", email: "accountant@test.com" },
    { role: "Student", email: "student@test.com" },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#2bb673]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex text-gray-900 bg-white font-sans selection:bg-[#725ef1] selection:text-white">
      {/* Left side - Gradient Background & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#725ef1] to-[#7d3ced] items-center justify-center p-12">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="absolute w-96 h-96 -top-20 -left-20 text-white animate-spin-slow" fill="currentColor" viewBox="0 0 200 200">
            <path d="M42.7,-73.4C55.9,-67.6,67.6,-56.9,76.5,-44.2C85.5,-31.4,91.8,-15.7,92.5,0.4C93.2,16.5,88.4,32.9,79.5,47.2C70.6,61.5,57.7,73.6,42.5,80.7C27.4,87.7,13.7,89.7,-0.5,90.6C-14.7,91.4,-29.4,91,-42.6,84.4C-55.8,77.8,-67.4,64.9,-75.4,50.7C-83.3,36.4,-87.6,20.8,-88.4,5.1C-89.2,-10.6,-86.5,-26.4,-79.1,-40.4C-71.7,-54.3,-59.5,-66.5,-45.5,-71.8C-31.5,-77.2,-15.7,-75.7,0.7,-76.9C17.1,-78.2,34.2,-82.1,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
          </svg>
          <svg className="absolute w-96 h-96 bottom-10 right-10 text-white opacity-60" fill="currentColor" viewBox="0 0 200 200">
            <path d="M47.7,-57.2C59.4,-44.6,65,-26.4,66.8,-8.1C68.6,10.2,66.6,28.6,56.7,42.3C46.8,56.1,29,65.2,10.7,68.9C-7.6,72.6,-26.4,70.9,-41.2,61.4C-56,51.8,-66.7,34.3,-71.3,15.6C-75.9,-3.1,-74.4,-23,-65.2,-38.7C-55.9,-54.3,-38.8,-65.7,-21.8,-69.1C-4.8,-72.5,12.1,-67.9,28,-60.1Z" transform="translate(100 100) scale(1.1)" />
          </svg>
        </div>

        {/* Content */}
        <div className="z-10 flex flex-col items-center text-center text-white max-w-lg">
          <div className="mb-8 p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
            <MonitorSmartphone className="w-32 h-32 text-white" strokeWidth={1.2} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Manage your coaching institute <span className="text-[#c7d2fe]">seamlessly.</span>
          </h1>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            Everything you need in one modern, unified platform to run your classes effectively.
          </p>

          <div className="mt-12 flex gap-8 text-sm font-medium text-white/90 bg-white/10 py-3 px-6 rounded-2xl backdrop-blur-sm shadow-sm border border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#a4f0c9]" />
              <span>Intuitive Dashboards</span>
            </div>
            <div className="w-px h-5 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c7d2fe]" />
              <span>Smart Analytics</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          {/* Mobile Only Graphic Header */}
          <div className="lg:hidden flex flex-col items-center justify-center mb-10">
            <div className="p-4 bg-gradient-to-br from-[#725ef1] to-[#7d3ced] rounded-2xl shadow-lg shadow-[#725ef1]/30 mb-4 inline-flex">
              <MonitorSmartphone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              CoachingHub
            </h1>
          </div>

          <div className="text-center mb-10">
            <div className="mx-auto relative w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white border border-gray-100">
              <User className="w-10 h-10 text-[#725ef1]" strokeWidth={1.5} />
              <div className="absolute top-0 right-0 w-5 h-5 bg-[#7d3ced] rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              WELCOME
            </h2>
            <p className="text-sm font-medium text-gray-500">
              Sign in to CoachingHub Dashboard
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#725ef1] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out shadow-sm outline-none placeholder:text-gray-400 font-medium text-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#2bb673] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-[#725ef1] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out shadow-sm outline-none placeholder:text-gray-400 font-medium text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#725ef1] focus:ring-[#725ef1] border-gray-300 rounded cursor-pointer transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-[#725ef1] hover:text-[#7d3ced] transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm font-semibold">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[#725ef1]/25 text-sm font-bold text-white bg-gradient-to-r from-[#725ef1] to-[#7d3ced] hover:from-[#634ed1] hover:to-[#6d2ed9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#725ef1] transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 tracking-wide"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>

          {/* Demo Credentials Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-center mb-5 flex items-center justify-center gap-4">
              <span className="h-px bg-gray-200 w-8"></span>
              Demo Access
              <span className="h-px bg-gray-200 w-8"></span>
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-white text-gray-600 rounded-lg border border-gray-200 hover:border-[#725ef1] hover:text-[#725ef1] hover:bg-slate-50 hover:shadow-sm transition-all duration-200"
                  onClick={() => {
                    setEmail(cred.email)
                    setPassword("123456")
                  }}
                >
                  {cred.role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
