"use client"

import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Bug, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const jiraMessages = [
  {
    id: "j1",
    service: "jira",
    sender: "JIRA System",
    subject: "Bug Report #JRA-123 - Authentication Issue",
    preview:
      "A new critical bug has been reported in the authentication module. Users are unable to log in with their credentials...",
    timestamp: "1 hour ago",
    isRead: true,
    priority: "critical",
  },
  {
    id: "j2",
    service: "jira",
    sender: "JIRA System",
    subject: "Task #JRA-124 - UI Component Update",
    preview: "New task assigned: Update the dashboard components to match the new design system requirements...",
    timestamp: "3 hours ago",
    isRead: false,
    priority: "high",
  },
]

const issueStats = [
  { label: "Open Issues", count: 12, icon: AlertTriangle, color: "text-orange-600" },
  { label: "In Progress", count: 8, icon: Clock, color: "text-blue-600" },
  { label: "Resolved", count: 24, icon: CheckCircle, color: "text-green-600" },
  { label: "Critical", count: 2, icon: Bug, color: "text-red-600" },
]

export function JiraView() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Jira Issues</h2>
            <p className="text-sm text-gray-500">Recent updates and notifications from Jira</p>
          </div>
          <Button>
            <Bug className="h-4 w-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {issueStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Issues */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Updates</h3>
          {jiraMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}
