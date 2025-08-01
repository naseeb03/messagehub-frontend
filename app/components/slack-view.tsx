"use client"

import { useState, useEffect } from "react"
import { MessageCard } from "./message-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Hash, Users, RefreshCw } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { api } from "@/lib/api"

interface SlackChannel {
  id: string
  name: string
  is_channel: boolean
  is_private: boolean
  is_im: boolean
  num_members?: number
  username?: string
  real_name?: string
}

interface SlackMessage {
  id: string
  service: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  channel: string
  username?: string
  real_name?: string
  text?: string
  ts?: string
}

export function SlackView() {
  const { token, user } = useAuthStore();
  const [channels, setChannels] = useState<SlackChannel[]>([]);
  const [messages, setMessages] = useState<SlackMessage[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && user?.slack_token) {
      fetchChannels();
    }
  }, [token, user?.slack_token]);

  const fetchChannels = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      console.log("fetchChannels");
      const response = await api.getSlackChannels(token);
      console.log(response);
      if (response.ok) {
        setChannels(response.channels || []);
        if (response.channels && response.channels.length > 0) {
          setSelectedChannel(response.channels[0].id);
          fetchMessages(response.channels[0].id);
        }
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (channelId: string) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const response = await api.getSlackMessages(token, channelId);
      if (response.ok) {
        const formattedMessages: SlackMessage[] = (response.messages || []).map((msg: any) => ({
          id: msg.ts || Math.random().toString(),
          service: "slack",
          sender: msg.username || msg.real_name || "Unknown User",
          subject: `Message in ${channels.find(c => c.id === channelId)?.name || 'channel'}`,
          preview: msg.text || "No text content",
          timestamp: formatTimestamp(msg.ts),
          isRead: false,
          channel: channels.find(c => c.id === channelId)?.name || 'Unknown',
          username: msg.username,
          real_name: msg.real_name,
          text: msg.text,
          ts: msg.ts
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Failed to fetch Slack messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (ts: string) => {
    if (!ts) return "Unknown time";
    const date = new Date(parseFloat(ts) * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    fetchMessages(channelId);
  };

  if (!user?.slack_token) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Slack Not Connected</h3>
          <p className="text-gray-500">Please connect your Slack workspace to view messages.</p>
        </div>
      </div>
    );
  }

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
              {isLoading ? (
                <div className="flex items-center justify-center p-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                channels
                  .filter(channel => channel.is_channel)
                  .map((channel) => (
                    <div
                      key={channel.id}
                      className={`flex items-center justify-between p-2 rounded hover:bg-slate-800 cursor-pointer ${
                        selectedChannel === channel.id ? 'bg-slate-800' : ''
                      }`}
                      onClick={() => handleChannelSelect(channel.id)}
                    >
                      <span className="text-sm">#{channel.name}</span>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Direct Messages
            </h4>
            <div className="space-y-1">
              {channels
                .filter(channel => channel.is_im)
                .map((channel) => (
                  <div
                    key={channel.id}
                    className={`flex items-center justify-between p-2 rounded hover:bg-slate-800 cursor-pointer ${
                      selectedChannel === channel.id ? 'bg-slate-800' : ''
                    }`}
                    onClick={() => handleChannelSelect(channel.id)}
                  >
                    <span className="text-sm">{channel.real_name || channel.username || 'Unknown User'}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedChannel ? channels.find(c => c.id === selectedChannel)?.name || 'Slack Messages' : 'Slack Messages'}
              </h2>
              <p className="text-sm text-gray-500">Your Slack messages</p>
            </div>
            <Button onClick={fetchChannels} disabled={isLoading}>
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
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No messages found in this channel.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
