"use client"

import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Hash, Users } from "lucide-react"

const slackMessages = [
  {
    id: "s1",
    service: "slack",
    sender: "John Doe",
    subject: "Project Update",
    preview:
      "Hey team, just wanted to give you an update on the current project status. We're making good progress on the frontend components...",
    timestamp: "2 minutes ago",
    isRead: false,
    channel: "#general",
  },
  {
    id: "s2",
    service: "slack",
    sender: "Alice Smith",
    subject: "Code Review Request",
    preview:
      "Could you please review my latest PR? It includes the new authentication flow and some UI improvements...",
    timestamp: "3 hours ago",
    isRead: false,
    channel: "#dev-team",
  },
  {
    id: "s3",
    service: "slack",
    sender: "Bob Wilson",
    subject: "Design Feedback",
    preview:
      "I've uploaded the latest mockups to Figma. Would love to get everyone's thoughts on the new dashboard design...",
    timestamp: "5 hours ago",
    isRead: true,
    channel: "#design",
  },
]

const channels = [
  { name: "#general", members: 24, unread: 3 },
  { name: "#dev-team", members: 8, unread: 2 },
  { name: "#design", members: 5, unread: 0 },
  { name: "#random", members: 15, unread: 1 },
]

export function SlackView() {
  return (
    <div className="flex-1 flex">
      {/* Channels Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-6 w-6" />
          <h3 className="font-bold text-lg">Slack Workspace</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Channels
            </h4>
            <div className="space-y-1">
              {channels.map((channel) => (
                <div
                  key={channel.name}
                  className="flex items-center justify-between p-2 rounded hover:bg-slate-800 cursor-pointer"
                >
                  <span className="text-sm">{channel.name}</span>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Direct Messages
            </h4>
            <div className="space-y-1">
              <div className="p-2 rounded hover:bg-slate-800 cursor-pointer">
                <span className="text-sm">John Doe</span>
              </div>
              <div className="p-2 rounded hover:bg-slate-800 cursor-pointer">
                <span className="text-sm">Alice Smith</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Slack Messages</h2>
              <p className="text-sm text-gray-500">Recent messages from your Slack workspace</p>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Slack
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {slackMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
