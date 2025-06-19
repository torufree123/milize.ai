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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Recent History
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Tasks</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Agents</TabsTrigger>
          <TabsTrigger value="news">Latest News</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
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
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Quick access to frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/modes/chat" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>Chat Mode</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/knowledge" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>Knowledge Management</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tasks" className="flex items-center justify-between p-3 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span>Task Management</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Connection</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Normal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Connection</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Normal
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Usage</span>
                <span className="text-sm">68% (6.8/10GB)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="text-sm">2023/06/11 12:30</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
