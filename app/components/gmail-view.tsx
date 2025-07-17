"use client"

import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Inbox, Send, Archive, Trash2 } from "lucide-react"

const gmailMessages = [
  {
    id: "g1",
    service: "gmail",
    sender: "sarah@company.com",
    subject: "Meeting Reminder - Q4 Planning",
    preview:
      "Don't forget about our meeting tomorrow at 2 PM. I've attached the agenda and relevant documents for review...",
    timestamp: "15 minutes ago",
    isRead: false,
    priority: "high",
  },
  {
    id: "g2",
    service: "gmail",
    sender: "notifications@github.com",
    subject: "Pull Request Merged",
    preview: "Your pull request 'Add user authentication' has been successfully merged into the main branch...",
    timestamp: "1 hour ago",
    isRead: true,
  },
  {
    id: "g3",
    service: "gmail",
    sender: "newsletter@techcrunch.com",
    subject: "Daily Tech News Digest",
    preview:
      "Today's top stories: AI breakthrough in healthcare, new startup funding rounds, and the latest in cybersecurity...",
    timestamp: "4 hours ago",
    isRead: true,
  },
]

const folders = [
  { name: "Inbox", icon: Inbox, count: 3 },
  { name: "Sent", icon: Send, count: 0 },
  { name: "Archive", icon: Archive, count: 0 },
  { name: "Trash", icon: Trash2, count: 0 },
]

export function GmailView() {
  return (
    <div className="flex-1 flex">
      {/* Gmail Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-6 w-6 text-red-600" />
          <h3 className="font-bold text-lg">Gmail</h3>
        </div>

        <div className="space-y-2">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <folder.icon className="h-4 w-4" />
                <span className="text-sm">{folder.name}</span>
              </div>
              {folder.count > 0 && <Badge variant="secondary">{folder.count}</Badge>}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gmail Inbox</h2>
              <p className="text-sm text-gray-500">Your recent Gmail messages</p>
            </div>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {gmailMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
