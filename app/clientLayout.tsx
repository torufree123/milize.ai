"use client"

import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import UserMenu from "@/components/user-menu"
import ThemeToggle from "@/components/theme-toggle"
import FavoritesToggle from "@/components/favorites-toggle"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="border-b p-4 flex justify-end items-center gap-2">
            <ThemeToggle />
            <FavoritesToggle />
            <UserMenu />
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
