"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./components/sidebar"
import { Dashboard } from "./components/dashboard"
import LoginPage from "./components/auth/login-page"
import SignupPage from "./components/auth/signup-page"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useAuthStore } from "../store/auth-store"

export default function Home() {
  const [activeView, setActiveView] = useState("inbox")
  const [authView, setAuthView] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(true)

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")
    
    if (savedUser && savedToken) {
      // Restore user state from localStorage
      useAuthStore.setState({
        user: JSON.parse(savedUser),
        token: savedToken,
      })
    }
    
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    logout()
    setActiveView("inbox")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gray-50">
        {authView === "login" ? (
          <LoginPage onSwitchToSignup={() => setAuthView("signup")} />
        ) : (
          <SignupPage onSwitchToLogin={() => setAuthView("login")} />
        )}
      </div>
    )
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} user={user} onLogout={handleLogout} />
        <div className="flex-1 overflow-hidden">
          <Dashboard activeView={activeView} />
        </div>
      </div>
    </SidebarProvider>
  )
}
