"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Bot,
  FileText,
  Settings,
  ListTodo,
  Activity,
  Shield,
  User,
  HelpCircle,
  Home,
  MessageSquare,
  Table,
  Presentation,
  Layers,
  Database,
  FileCode,
  Menu,
  ChevronRight,
  ChevronDown,
  Search,
  BrainCircuit,
  Cpu,
  Volume2,
  ImageIcon,
  Server,
  Snowflake,
  FileSearch,
  HardDrive,
} from "lucide-react"

const navItems = [
  { name: "ホーム", href: "/", icon: Home },
  { name: "AIエージェント", href: "/agents", icon: Bot },
  { name: "AIシステム", href: "/ai-systems", icon: Cpu },
  { name: "レポート検索", href: "/report-search", icon: FileSearch },
  { name: "AI検索", href: "/ai-search", icon: Search },
  {
    name: "AIモード",
    href: "/modes",
    icon: Bot,
    submenu: [
      { name: "チャット", href: "/modes/chat", icon: MessageSquare },
      { name: "テーブル", href: "/modes/table", icon: Table },
      { name: "プレゼンテーション", href: "/modes/presentation", icon: Presentation },
      { name: "画像", href: "/modes/image", icon: ImageIcon },
      { name: "バッチ", href: "/modes/batch", icon: Layers },
    ],
  },
  { name: "Deep Research", href: "/deep-search", icon: BrainCircuit },
  {
    name: "ノレッジ",
    href: "/knowledge",
    icon: FileText,
    submenu: [
      { name: "ドキュメント", href: "/knowledge", icon: FileText },
      { name: "データベース", href: "/database", icon: Database },
      { name: "プロンプト", href: "/prompts", icon: FileCode },
      { name: "音声", href: "/knowledge/audio", icon: Volume2 },
      { name: "画像", href: "/knowledge/images", icon: ImageIcon },
      { name: "Databricks", href: "/knowledge/databricks", icon: Server },
      { name: "Snowflake", href: "/knowledge/snowflake", icon: Snowflake },
    ],
  },
  { name: "モデル設定", href: "/settings", icon: Settings },
  { name: "タスク", href: "/tasks", icon: ListTodo },
  { name: "利用状況・モニタリング", href: "/usage-monitoring", icon: Activity },
  { name: "管理機能", href: "/admin", icon: Shield },
  { name: "パーソナライズ", href: "/personalize", icon: User },
  { name: "MCPサーバー", href: "/mcp-server", icon: HardDrive },
  { name: "FAQ/マニュアル", href: "/faq", icon: HelpCircle },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

  const toggleSubmenu = (name: string) => {
    if (isCollapsed) return // 折りたたみ時はサブメニューを開かない

    if (openSubmenu === name) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(name)
    }
  }

  // 折りたたみ時にサブメニューを閉じる
  React.useEffect(() => {
    if (isCollapsed) {
      setOpenSubmenu(null)
    }
  }, [isCollapsed])

  const SidebarItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
    const hasSubmenu = item.submenu && item.submenu.length > 0

    if (hasSubmenu) {
      return (
        <li>
          <div>
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex flex-col gap-1">
                    <div className="font-medium">{item.name}</div>
                    {item.submenu.map((subitem: any) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="flex items-center gap-2 px-2 py-1 rounded text-sm hover:bg-accent"
                      >
                        <subitem.icon className="h-3 w-3" />
                        {subitem.name}
                      </Link>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {openSubmenu === item.name ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {openSubmenu === item.name && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subitem: any) => {
                      const isSubActive = pathname === subitem.href
                      return (
                        <li key={subitem.name}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                              isSubActive
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent hover:text-accent-foreground",
                            )}
                          >
                            <subitem.icon className="mr-2 h-4 w-4" />
                            <span>{subitem.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </>
            )}
          </div>
        </li>
      )
    }

    return (
      <li>
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>{item.name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )}
      </li>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-background border-r h-full transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* ヘッダー */}
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold truncate">Milize.ai</h1>}
        <Button variant="ghost" size="icon" onClick={onToggle} className="flex-shrink-0">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </ul>
      </nav>

      {/* フッター（折りたたみ時は非表示） */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">AI Front System v1.0</div>
        </div>
      )}
    </div>
  )
}
