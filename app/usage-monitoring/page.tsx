"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BarChart3, CalendarIcon, Download, Search, TrendingUp, DollarSign, Clock, Users, Activity } from "lucide-react"
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { ja } from "date-fns/locale"

// サンプルデータ
const usageHistory = [
  {
    id: 1,
    agentName: "データ分析エージェント",
    timestamp: "2024-01-15 14:30:25",
    workTime: "00:05:32",
    cost: 1250,
    result: "売上データ分析完了",
    evaluation: 4.8,
    userName: "田中太郎",
    type: "agent",
  },
  {
    id: 2,
    agentName: "ゼロショット分析",
    timestamp: "2024-01-15 15:45:12",
    workTime: "00:02:18",
    cost: 680,
    result: "市場調査レポート生成",
    evaluation: 4.5,
    userName: "佐藤花子",
    type: "zero-shot",
  },
  {
    id: 3,
    agentName: "文書要約エージェント",
    timestamp: "2024-01-16 09:15:33",
    workTime: "00:03:45",
    cost: 920,
    result: "契約書要約完了",
    evaluation: 4.9,
    userName: "鈴木一郎",
    type: "agent",
  },
  {
    id: 4,
    agentName: "コード生成エージェント",
    timestamp: "2024-01-16 11:22:18",
    workTime: "00:08:15",
    cost: 2100,
    result: "API実装コード生成",
    evaluation: 4.6,
    userName: "高橋美咲",
    type: "agent",
  },
  {
    id: 5,
    agentName: "ゼロショット翻訳",
    timestamp: "2024-01-17 13:30:45",
    workTime: "00:01:52",
    cost: 450,
    result: "技術文書翻訳完了",
    evaluation: 4.7,
    userName: "田中太郎",
    type: "zero-shot",
  },
]

// 日別コストデータ
const dailyCostData = [
  { date: "01/15", cost: 1930, agents: 2 },
  { date: "01/16", cost: 3020, agents: 2 },
  { date: "01/17", cost: 450, agents: 1 },
  { date: "01/18", cost: 2800, agents: 3 },
  { date: "01/19", cost: 1650, agents: 2 },
  { date: "01/20", cost: 3200, agents: 4 },
  { date: "01/21", cost: 2100, agents: 2 },
]

// エージェント別使用状況
const agentUsageData = [
  { name: "データ分析", value: 35, color: "#8884d8" },
  { name: "文書要約", value: 25, color: "#82ca9d" },
  { name: "コード生成", value: 20, color: "#ffc658" },
  { name: "ゼロショット", value: 20, color: "#ff7300" },
]

export default function UsageMonitoringPage() {
  const [dateRange, setDateRange] = useState({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterUser, setFilterUser] = useState("all")

  // フィルタリングされた履歴データ
  const filteredHistory = useMemo(() => {
    return usageHistory.filter((item) => {
      const matchesDateRange = isWithinInterval(new Date(item.timestamp), {
        start: dateRange.from,
        end: dateRange.to,
      })

      const matchesSearch =
        item.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.result.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filterType === "all" || item.type === filterType
      const matchesUser = filterUser === "all" || item.userName === filterUser

      return matchesDateRange && matchesSearch && matchesType && matchesUser
    })
  }, [dateRange, searchTerm, filterType, filterUser])

  // 統計データ
  const stats = useMemo(() => {
    const totalCost = filteredHistory.reduce((sum, item) => sum + item.cost, 0)
    const totalTasks = filteredHistory.length
    const avgEvaluation = filteredHistory.reduce((sum, item) => sum + item.evaluation, 0) / totalTasks
    const uniqueUsers = new Set(filteredHistory.map((item) => item.userName)).size

    return {
      totalCost,
      totalTasks,
      avgEvaluation: avgEvaluation.toFixed(1),
      uniqueUsers,
    }
  }, [filteredHistory])

  const getEvaluationBadge = (evaluation: number) => {
    if (evaluation >= 4.5) return <Badge className="bg-green-100 text-green-800">優秀</Badge>
    if (evaluation >= 4.0) return <Badge className="bg-blue-100 text-blue-800">良好</Badge>
    if (evaluation >= 3.5) return <Badge className="bg-yellow-100 text-yellow-800">普通</Badge>
    return <Badge className="bg-red-100 text-red-800">要改善</Badge>
  }

  const getTypeBadge = (type: string) => {
    return type === "agent" ? (
      <Badge variant="default">エージェント</Badge>
    ) : (
      <Badge variant="outline">ゼロショット</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">利用状況モニタリング</h1>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, "yyyy/MM/dd", { locale: ja })} -{" "}
                {format(dateRange.to, "yyyy/MM/dd", { locale: ja })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">総コスト</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{stats.totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">前月比 +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">実行回数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">今月の実行数</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">平均評価</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgEvaluation}</div>
            <p className="text-xs text-muted-foreground">5点満点中</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">利用ユーザー</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">アクティブユーザー</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">
            <Activity className="mr-2 h-4 w-4" />
            実行履歴
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            分析グラフ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          {/* フィルター */}
          <Card>
            <CardHeader>
              <CardTitle>フィルター</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">検索</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="エージェント名、結果、ユーザー名で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type-filter">タイプ</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="agent">エージェント</SelectItem>
                      <SelectItem value="zero-shot">ゼロショット</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="user-filter">ユーザー</Label>
                  <Select value={filterUser} onValueChange={setFilterUser}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="田中太郎">田中太郎</SelectItem>
                      <SelectItem value="佐藤花子">佐藤花子</SelectItem>
                      <SelectItem value="鈴木一郎">鈴木一郎</SelectItem>
                      <SelectItem value="高橋美咲">高橋美咲</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 履歴テーブル */}
          <Card>
            <CardHeader>
              <CardTitle>実行履歴</CardTitle>
              <CardDescription>{filteredHistory.length}件の実行履歴が表示されています</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>エージェント名</TableHead>
                    <TableHead>時刻</TableHead>
                    <TableHead>作業時間</TableHead>
                    <TableHead>作業コスト</TableHead>
                    <TableHead>作業結果</TableHead>
                    <TableHead>評価</TableHead>
                    <TableHead>ユーザー名</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.agentName}</TableCell>
                      <TableCell>{item.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.workTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-1 h-3 w-3" />¥{item.cost.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{item.result}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.evaluation}</span>
                          {getEvaluationBadge(item.evaluation)}
                        </div>
                      </TableCell>
                      <TableCell>{item.userName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* 日別コストグラフ */}
            <Card>
              <CardHeader>
                <CardTitle>日別作業コスト</CardTitle>
                <CardDescription>過去7日間のコスト推移</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" label={{ value: "日付", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "費用 (¥)", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value) => [`¥${value.toLocaleString()}`, "作業コスト"]}
                      labelFormatter={(label) => `日付: ${label}`}
                    />
                    <Bar dataKey="cost" fill="#8884d8" name="作業コスト" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* エージェント別使用状況 */}
            <Card>
              <CardHeader>
                <CardTitle>エージェント別使用状況</CardTitle>
                <CardDescription>使用頻度の分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={agentUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {agentUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* コスト推移ライングラフ */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>コスト推移</CardTitle>
                <CardDescription>日別のコスト変動とエージェント実行数</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="cost"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="コスト (¥)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="agents"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="実行数"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
