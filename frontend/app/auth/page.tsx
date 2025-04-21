"use client"

import type React from "react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import axios from "../api/axios.js"
import {loginUser,registerUser} from "../api/auth.js"

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
  
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields")
      return
    }
  
    try {
      let data
      if (isLogin) {
        data = await loginUser(email, password)
      } else {
        data = await registerUser(name, email, password)
      }
  
      console.log("Authentication success", data)
      
      // Check for accessToken instead of token
      if (data.accessToken) {
        // Store both tokens in localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        
        // Store user data in localStorage for use in header and other components
        if (data.user) {
          localStorage.setItem("userData", JSON.stringify(data.user));
        }
        
        // Set success message based on action type
        setSuccess(isLogin ? "Login successful!" : "Account created successfully!")
        setIsRedirecting(true);
        
        console.log("Redirecting to /")
        // Immediate redirect instead of timeout
        router.push("/");
      } else {
        setSuccess(isLogin ? "Login successful!" : "Account created successfully!")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-blue-600 text-white p-8 md:p-12 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {isLogin ? "Welcome back!" : "Join CrowdCure today!"}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            {isLogin
              ? "Sign in to continue your journey of problem-solving and collaboration."
              : "Start your journey of solving real problems and collaborating with others."}
          </p>

          <div className="hidden md:block">
            <h2 className="text-xl font-semibold mb-4">Why join CrowdCure?</h2>
            <ul className="space-y-3">
              {[
                "Get answers to your technical questions",
                "Collaborate on open-source projects",
                "Build your professional network",
                "Showcase your expertise and grow your reputation",
              ].map((item, index) => (
                <li className="flex items-start" key={index}>
                  <div className="mr-2 mt-1 bg-blue-500 rounded-full p-1">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 hidden md:block">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Collaboration illustration"
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">
                  {isLogin ? "Sign in to your account" : "Create a new account"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {isLogin ? "Enter your credentials to access your account" : "Fill in your details to get started"}
                </p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md text-sm"
                  >
                    {isRedirecting ? `${success} Redirecting to home...` : success}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pt-6 pb-2 w-full"
                      placeholder=" "
                    />
                    <Label htmlFor="name" className="absolute left-3 top-2 text-xs text-gray-500">
                      Full Name
                    </Label>
                  </div>
                )}

                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pt-6 pb-2 w-full"
                    placeholder=" "
                  />
                  <Label htmlFor="email" className="absolute left-3 top-2 text-xs text-gray-500">
                    Email Address
                  </Label>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pt-6 pb-2 w-full"
                    placeholder=" "
                  />
                  <Label htmlFor="password" className="absolute left-3 top-2 text-xs text-gray-500">
                    Password
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isRedirecting}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="text-center mt-4 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:underline"
                  disabled={isRedirecting}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}