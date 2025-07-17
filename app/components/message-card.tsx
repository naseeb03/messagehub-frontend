"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Mail, Calendar, Bug } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  service: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  channel?: string
  priority?: string
}

interface MessageCardProps {
  message: Message
}

const serviceIcons = {
  slack: MessageSquare,
  gmail: Mail,
  outlook: Calendar,
  jira: Bug,
}

const serviceColors = {
  slack: "bg-purple-100 text-purple-700",
  gmail: "bg-red-100 text-red-700",
  outlook: "bg-blue-100 text-blue-700",
  jira: "bg-green-100 text-green-700",
}

const priorityColors = {
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
  normal: "bg-gray-100 text-gray-700",
}

export function MessageCard({ message }: MessageCardProps) {
  const ServiceIcon = serviceIcons[message.service as keyof typeof serviceIcons]

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        !message.isRead && "border-l-4 border-l-blue-500 bg-blue-50/30",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
            <AvatarFallback>
              {message.sender
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  serviceColors[message.service as keyof typeof serviceColors],
                )}
              >
                <ServiceIcon className="h-3 w-3" />
                {message.service.charAt(0).toUpperCase() + message.service.slice(1)}
              </div>

              {message.priority && (
                <Badge
                  variant="secondary"
                  className={cn("text-xs", priorityColors[message.priority as keyof typeof priorityColors])}
                >
                  {message.priority}
                </Badge>
              )}

              {message.channel && (
                <Badge variant="outline" className="text-xs">
                  {message.channel}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between mb-1">
              <h3 className={cn("font-medium text-gray-900 truncate", !message.isRead && "font-semibold")}>
                {message.subject}
              </h3>
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{message.timestamp}</span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">{message.sender}</span>
            </p>

            <p className="text-sm text-gray-500 line-clamp-2">{message.preview}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
