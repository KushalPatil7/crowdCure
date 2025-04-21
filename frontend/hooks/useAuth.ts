import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    router.push("/auth") // or wherever your login page is
  }

  return { isAuthenticated, logout }
}
