"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, MessageSquare, Calendar, Bug, Github } from "lucide-react"
import { useAuthStore } from "../../../store/auth-store"

interface LoginPageProps {
  onSwitchToSignup: () => void
}

const LoginPage = ({ onSwitchToSignup }: LoginPageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { login, isLoading, error, clearError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    await login(email, password)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">Unified Dashboard</h1>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              All your messages
              <br />
              in one place
            </h2>
            <p className="text-xl text-blue-100">
              Connect Slack, Gmail, Outlook, and Jira to streamline your workflow and never miss important updates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
            <MessageSquare className="h-8 w-8 text-purple-200" />
            <div>
              <div className="font-semibold">Slack</div>
              <div className="text-sm text-blue-200">Team messages</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
            <Mail className="h-8 w-8 text-red-200" />
            <div>
              <div className="font-semibold">Gmail</div>
              <div className="text-sm text-blue-200">Email management</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-200" />
            <div>
              <div className="font-semibold">Outlook</div>
              <div className="text-sm text-blue-200">Calendar & email</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg">
            <Bug className="h-8 w-8 text-green-200" />
            <div>
              <div className="font-semibold">Jira</div>
              <div className="text-sm text-blue-200">Issue tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Unified Dashboard</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Button variant="link" onClick={onSwitchToSignup} className="px-0">
                  Sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
