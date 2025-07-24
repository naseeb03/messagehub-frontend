"use client"

import { Inbox, MessageSquare, Mail, Calendar, Bug, Settings, Search, LogOut, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { User } from "../../lib/data"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  user: User
  onLogout: () => void
}

const menuItems = [
  { id: "inbox", label: "Unified Inbox", icon: Inbox, count: 12 },
  { id: "connections", label: "Connections", icon: Settings, count: 0 },
  { id: "slack", label: "Slack", icon: MessageSquare, count: 5 },
  { id: "gmail", label: "Gmail", icon: Mail, count: 3 },
  { id: "outlook", label: "Outlook", icon: Calendar, count: 2 },
  { id: "jira", label: "Jira", icon: Bug, count: 2 },
]

export function Sidebar({ activeView, setActiveView, user, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Unified Dashboard</h1>
        <p className="text-sm text-gray-500">All your messages in one place</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search messages..." className="pl-10" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10",
              activeView === item.id && "bg-blue-50 text-blue-700 border-blue-200",
            )}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.count > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {item.count}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Settings
        </Button>

        {/* Quick Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}
