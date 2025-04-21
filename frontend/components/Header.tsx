"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInitials, setUserInitials] = useState("U")

  useEffect(() => {
    // Check if accessToken exists in localStorage instead of token
    const accessToken = localStorage.getItem("accessToken")
    
    if (accessToken) {
      setIsLoggedIn(true)
      
      // Try to get user info from localStorage if available
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || '{}')
        if (userData.fullName) {
          // Extract initials from full name
          const nameParts = userData.fullName.split(" ")
          const initials = nameParts.map((part:string) => (part)[0]).join("").toUpperCase()
          setUserInitials(initials || "U")
        }
      } catch (err) {
        console.error("Error parsing user data", err)
        setUserInitials("U")
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    // Remove both tokens
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userData")
    
    setIsLoggedIn(false)
    // Redirect to home
    window.location.href = "/"
  }

  return (
    <header className="border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">
          CrowdCure
        </Link>

        <div className="relative w-full max-w-md mx-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search questions, projects, or users..."
            className="pl-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="outline">Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}