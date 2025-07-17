"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Dashboard } from "./components/dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  const [activeView, setActiveView] = useState("inbox")

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 overflow-hidden">
          <Dashboard activeView={activeView} />
        </div>
      </div>
    </SidebarProvider>
  )
}
