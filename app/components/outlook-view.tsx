"use client"

import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail } from "lucide-react"

const outlookMessages = [
  {
    id: "o1",
    service: "outlook",
    sender: "team@company.com",
    subject: "Weekly Newsletter - Team Updates",
    preview:
      "This week's highlights include new feature releases, team updates, and upcoming events. Don't miss the all-hands meeting...",
    timestamp: "2 hours ago",
    isRead: true,
  },
  {
    id: "o2",
    service: "outlook",
    sender: "hr@company.com",
    subject: "Holiday Schedule Reminder",
    preview:
      "Please remember that the office will be closed next Friday for the holiday. Make sure to submit your timesheets...",
    timestamp: "1 day ago",
    isRead: false,
  },
]

export function OutlookView() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Outlook</h2>
            <p className="text-sm text-gray-500">Your Outlook emails and calendar events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              New Email
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Recent Emails</h3>
            {outlookMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm">Team Standup</div>
                <div className="text-xs text-gray-500">Today, 9:00 AM</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-sm">Client Meeting</div>
                <div className="text-xs text-gray-500">Tomorrow, 2:00 PM</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="font-medium text-sm">Project Review</div>
                <div className="text-xs text-gray-500">Friday, 10:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
