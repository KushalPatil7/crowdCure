"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, HelpCircle, Users, User, Settings, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    }
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/qa", icon: HelpCircle, label: "Q&A" },
    { href: "/collaboration", icon: Users, label: "Collaboration" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 h-full w-16 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col items-center py-6 z-10">
        <Link href="/" className="mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            C
          </div>
        </Link>

        <nav className="flex flex-col items-center space-y-6 flex-grow">
          {navItems.map((item) => (
            <Tooltip key={item.href} delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`p-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="mt-auto text-gray-600 dark:text-gray-400"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  )
}
