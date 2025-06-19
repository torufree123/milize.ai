import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Clock, Bell, ArrowRight } from "lucide-react"
import Link from "next/link"
import RecentAnalyses from "@/components/recent-analyses"
import RecommendedAgents from "@/components/recommended-agents"
import LatestNews from "@/components/latest-news"
import Announcements from "@/components/announcements"

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            最近の履歴
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            通知
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">総分析数</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+20.1% 先月比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">アクティブエージェント</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 先週比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">処理中タスク</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 先週比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API使用量</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% 先週比</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">最近の分析</TabsTrigger>
          <TabsTrigger value="recommended">おすすめエージェント</TabsTrigger>
          <TabsTrigger value="news">最新ニュース</TabsTrigger>
          <TabsTrigger value="announcements">お知らせ</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-4">
          <RecentAnalyses />
        </TabsContent>
        <TabsContent value="recommended" className="mt-4">
          <RecommendedAgents />
        </TabsContent>
        <TabsContent value="news" className="mt-4">
          <LatestNews />
        </TabsContent>
        <TabsContent value="announcements" className="mt-4">
          <Announcements />
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>クイックアクセス</CardTitle>
            <CardDescription>よく使う機能にすぐアクセス</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/modes/chat" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>チャットモード</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/knowledge" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>ノレッジ管理</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tasks" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>タスク管理</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>システム状態</CardTitle>
            <CardDescription>システムの現在の状態</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API接続状態</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  正常
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">データベース接続</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  正常
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ストレージ使用量</span>
                <span className="text-sm">68% (6.8/10GB)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">最終更新</span>
                <span className="text-sm">2023/06/11 12:30</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
