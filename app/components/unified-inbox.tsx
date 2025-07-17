"use client"

import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Filter } from "lucide-react"

const mockMessages = [
  {
    id: "1",
    service: "slack",
    sender: "John Doe",
    subject: "Project Update",
    preview: "Hey team, just wanted to give you an update on the current project status...",
    timestamp: "2 minutes ago",
    isRead: false,
    channel: "#general",
  },
  {
    id: "2",
    service: "gmail",
    sender: "sarah@company.com",
    subject: "Meeting Reminder",
    preview: "Don't forget about our meeting tomorrow at 2 PM. I've attached the agenda...",
    timestamp: "15 minutes ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "3",
    service: "jira",
    sender: "JIRA System",
    subject: "Bug Report #JRA-123",
    preview: "A new bug has been reported in the authentication module...",
    timestamp: "1 hour ago",
    isRead: true,
    priority: "critical",
  },
  {
    id: "4",
    service: "outlook",
    sender: "team@company.com",
    subject: "Weekly Newsletter",
    preview: "This week's highlights include new feature releases and team updates...",
    timestamp: "2 hours ago",
    isRead: true,
  },
  {
    id: "5",
    service: "slack",
    sender: "Alice Smith",
    subject: "Code Review Request",
    preview: "Could you please review my latest PR? It includes the new authentication flow...",
    timestamp: "3 hours ago",
    isRead: false,
    channel: "#dev-team",
  },
]

export function UnifiedInbox() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Unified Inbox</h2>
            <p className="text-sm text-gray-500">All your messages from Slack, Gmail, Outlook, and Jira</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  )
}
