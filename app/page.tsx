"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./components/sidebar"
import { Dashboard } from "./components/dashboard"
import LoginPage from "./components/auth/login-page"
import SignupPage from "./components/auth/signup-page"
import { SidebarProvider } from "@/components/ui/sidebar"
import { User } from "../lib/data"

export default function Home() {
  const [activeView, setActiveView] = useState("inbox")
  const [user, setUser] = useState<User | null>(null)
  const [authView, setAuthView] = useState<"login" | "signup">("login")
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {authView === "login" ? (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView("signup")} />
        ) : (
          <SignupPage onSignup={handleLogin} onSwitchToLogin={() => setAuthView("login")} />
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
