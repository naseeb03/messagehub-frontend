"use client"

import { useState, useEffect } from "react"
import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Inbox, Send, Archive, Trash2, RefreshCw } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { api } from "@/lib/api"

interface GmailEmail {
  id: string
  service: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  priority?: string
  snippet?: string
  headers?: any[]
}

export function GmailView() {
  const { token, user } = useAuthStore();
  const [emails, setEmails] = useState<GmailEmail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && user?.gmail_token) {
      fetchEmails();
    }
  }, [token, user]);

  const fetchEmails = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const response = await api.getGmailEmails(token);
      if (response.emails) {
        const formattedEmails: GmailEmail[] = response.emails.map((email: any) => {
          const headers = email.headers || [];
          const fromHeader = headers.find((h: any) => h.name === 'From');
          const subjectHeader = headers.find((h: any) => h.name === 'Subject');
          const dateHeader = headers.find((h: any) => h.name === 'Date');
          
          return {
            id: email.id,
            service: "gmail",
            sender: fromHeader?.value || "Unknown Sender",
            subject: subjectHeader?.value || "No Subject",
            preview: email.snippet || "No preview available",
            timestamp: formatTimestamp(dateHeader?.value),
            isRead: false,
            priority: "normal",
            snippet: email.snippet,
            headers: email.headers
          };
        });
        setEmails(formattedEmails);
      }
    } catch (error) {
      console.error("Failed to fetch Gmail emails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (dateString: string) => {
    if (!dateString) return "Unknown time";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      
      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      return `${days} days ago`;
    } catch {
      return "Unknown time";
    }
  };

  if (!user?.gmail_token) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gmail Not Connected</h3>
          <p className="text-gray-500">Please connect your Gmail account to view emails.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      {/* Gmail Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-6 w-6 text-red-600" />
          <h3 className="font-bold text-lg">Gmail</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              <span className="text-sm">Inbox</span>
            </div>
            {emails.length > 0 && <Badge variant="secondary">{emails.length}</Badge>}
          </div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span className="text-sm">Sent</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              <span className="text-sm">Archive</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Trash</span>
            </div>
          </div>
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
            <Button onClick={fetchEmails} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-4">
              {emails.length > 0 ? (
                emails.map((email) => (
                  <MessageCard key={email.id} message={email} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No emails found in your inbox.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
