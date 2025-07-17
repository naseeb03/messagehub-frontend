"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  MessageSquare,
  Mail,
  Calendar,
  Bug,
  CheckCircle,
  AlertCircle,
  Settings,
  ExternalLink,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Connection {
  id: string
  name: string
  description: string
  icon: any
  color: string
  isConnected: boolean
  lastSync?: string
  accountInfo?: string
  permissions?: string[]
}

export function ConnectionsView() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "slack",
      name: "Slack",
      description: "Connect your Slack workspace to receive messages and notifications",
      icon: MessageSquare,
      color: "bg-purple-500",
      isConnected: true,
      lastSync: "2 minutes ago",
      accountInfo: "workspace: company-team.slack.com",
      permissions: ["Read messages", "Send messages", "Access channels"],
    },
    {
      id: "gmail",
      name: "Gmail",
      description: "Connect your Gmail account to manage emails from the dashboard",
      icon: Mail,
      color: "bg-red-500",
      isConnected: true,
      lastSync: "5 minutes ago",
      accountInfo: "john.doe@company.com",
      permissions: ["Read emails", "Send emails", "Manage labels"],
    },
    {
      id: "outlook",
      name: "Microsoft Outlook",
      description: "Connect your Outlook account for emails and calendar integration",
      icon: Calendar,
      color: "bg-blue-500",
      isConnected: false,
      permissions: ["Read emails", "Send emails", "Access calendar", "Manage contacts"],
    },
    {
      id: "jira",
      name: "Jira",
      description: "Connect to Jira to track issues, bugs, and project updates",
      icon: Bug,
      color: "bg-blue-600",
      isConnected: true,
      lastSync: "1 hour ago",
      accountInfo: "company.atlassian.net",
      permissions: ["Read issues", "Create issues", "Update issues", "Access projects"],
    },
  ])

  const handleConnect = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((conn) => (conn.id === connectionId ? { ...conn, isConnected: true, lastSync: "Just now" } : conn)),
    )
  }

  const handleDisconnect = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === connectionId ? { ...conn, isConnected: false, lastSync: undefined, accountInfo: undefined } : conn,
      ),
    )
  }

  const handleToggleNotifications = (connectionId: string) => {
    // Handle notification toggle logic here
    console.log(`Toggle notifications for ${connectionId}`)
  }

  const connectedCount = connections.filter((conn) => conn.isConnected).length

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connections</h2>
            <p className="text-sm text-gray-500">Manage your integrations with external services</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {connectedCount} of {connections.length} services connected
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Connection Status Overview */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg text-white", connection.color)}>
                <connection.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{connection.name}</div>
                <div className="flex items-center gap-1">
                  {connection.isConnected ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Not connected</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Cards */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {connections.map((connection) => (
            <Card key={connection.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-3 rounded-lg text-white", connection.color)}>
                      <connection.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{connection.name}</CardTitle>
                      <CardDescription className="mt-1">{connection.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={connection.isConnected ? "default" : "secondary"}
                    className={connection.isConnected ? "bg-green-500" : ""}
                  >
                    {connection.isConnected ? "Connected" : "Not Connected"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {connection.isConnected ? (
                  <>
                    {/* Connection Info */}
                    <div className="space-y-2">
                      {connection.accountInfo && (
                        <div className="text-sm">
                          <span className="font-medium">Account: </span>
                          <span className="text-gray-600">{connection.accountInfo}</span>
                        </div>
                      )}
                      {connection.lastSync && (
                        <div className="text-sm">
                          <span className="font-medium">Last sync: </span>
                          <span className="text-gray-600">{connection.lastSync}</span>
                        </div>
                      )}
                    </div>

                    {/* Permissions */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Permissions</h4>
                      <div className="flex flex-wrap gap-1">
                        {connection.permissions?.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Settings */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Switch
                          id={`notifications-${connection.id}`}
                          defaultChecked={true}
                          onCheckedChange={() => handleToggleNotifications(connection.id)}
                        />
                        <label htmlFor={`notifications-${connection.id}`} className="text-sm font-medium">
                          Notifications
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnect(connection.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Permissions Preview */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">This integration will have access to:</h4>
                      <div className="space-y-1">
                        {connection.permissions?.map((permission) => (
                          <div key={permission} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connect Button */}
                    <div className="pt-2 border-t">
                      <Button className="w-full" onClick={() => handleConnect(connection.id)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect to {connection.name}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
            <CardDescription>Having trouble connecting your services? Here are some helpful resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Common Issues</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Make sure you have admin permissions for your workspace</li>
                  <li>• Check that your account has the necessary API access</li>
                  <li>• Verify your organization allows third-party integrations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Support</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
