"use client"

import { UnifiedInbox } from "./unified-inbox"
import { SlackView } from "./slack-view"
import { GmailView } from "./gmail-view"
import { OutlookView } from "./outlook-view"
import { JiraView } from "./jira-view"
import { ConnectionsView } from "./connections-view"

interface DashboardProps {
  activeView: string
}

export function Dashboard({ activeView }: DashboardProps) {
  const renderView = () => {
    switch (activeView) {
      case "inbox":
        return <UnifiedInbox />
      case "slack":
        return <SlackView />
      case "gmail":
        return <GmailView />
      case "outlook":
        return <OutlookView />
      case "jira":
        return <JiraView />
      case "connections":
        return <ConnectionsView />
      default:
        return <UnifiedInbox />
    }
  }

  return <div className="flex-1 flex flex-col overflow-hidden">{renderView()}</div>
}
