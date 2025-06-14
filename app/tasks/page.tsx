"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ListTodo,
  Play,
  Plus,
  Calendar,
  Repeat,
  Settings,
  Bot,
  Zap,
  ArrowRight,
  ArrowDown,
  Trash2,
  Edit,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TasksPage() {
  const [availableAgents, setAvailableAgents] = useState([
    { id: "agent-1", name: "データ収集エージェント", type: "agent", category: "データ処理" },
    { id: "agent-2", name: "分析エージェント", type: "agent", category: "分析" },
    { id: "agent-3", name: "レポート生成エージェント", type: "agent", category: "レポート" },
    { id: "zeroshot-1", name: "市場分析", type: "zeroshot", category: "分析" },
    { id: "zeroshot-2", name: "リスク評価", type: "zeroshot", category: "評価" },
  ])

  const [displayFilter, setDisplayFilter] = useState("all") // "all" or "latest"
  const [activeTab, setActiveTab] = useState("execution")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(true)
  const { toast } = useToast()

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    executionPattern: "serial", // serial or parallel
    maxConcurrent: 1, // 並列実行時の最大同時実行数
    schedule: {
      time: "",
      frequency: "once", // once, daily, weekly, monthly
      weekdays: [], // 週次実行時の曜日選択
      startDate: "",
      endDate: "",
      enabled: true,
    },
    agents: [],
    displaySettings: {
      showAll: true,
      maxResults: 50,
    },
  })

  // サンプルタスクデータ
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "日次レポート生成",
      description: "毎日の市場データを分析してレポートを生成",
      type: "agent",
      executionMode: "serial",
      status: "running",
      schedule: {
        time: "09:00",
        frequency: "daily",
        endDate: "2024-12-31",
        enabled: true,
      },
      agents: [
        { id: "1", name: "市場データ収集エージェント", type: "agent" },
        { id: "2", name: "データ分析エージェント", type: "agent" },
        { id: "3", name: "レポート生成エージェント", type: "agent" },
      ],
      lastRun: "2023/12/28 09:00",
      nextRun: "2023/12/29 09:00",
      runCount: 45,
    },
    {
      id: 2,
      name: "週次リスク分析",
      description: "週次でポートフォリオのリスク分析を実行",
      type: "zeroshot",
      executionMode: "parallel",
      status: "scheduled",
      schedule: {
        time: "18:00",
        frequency: "weekly",
        endDate: "2024-06-30",
        enabled: true,
      },
      agents: [
        { id: "4", name: "リスク計算エージェント", type: "agent" },
        { id: "5", name: "ストレステストエージェント", type: "agent" },
        { id: "6", name: "VaR計算", type: "zeroshot" },
      ],
      lastRun: "2023/12/22 18:00",
      nextRun: "2023/12/29 18:00",
      runCount: 12,
    },
    {
      id: 3,
      name: "顧客データ更新",
      description: "顧客情報の定期更新と分析",
      type: "agent",
      executionMode: "serial",
      status: "paused",
      schedule: {
        time: "02:00",
        frequency: "daily",
        endDate: "2024-03-31",
        enabled: false,
      },
      agents: [
        { id: "7", name: "顧客データ同期エージェント", type: "agent" },
        { id: "8", name: "データクレンジングエージェント", type: "agent" },
      ],
      lastRun: "2023/12/25 02:00",
      nextRun: "-",
      runCount: 89,
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            実行中
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            スケジュール済
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            一時停止
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            完了
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "once":
        return "一回のみ"
      case "daily":
        return "毎日"
      case "weekly":
        return "毎週"
      case "monthly":
        return "毎月"
      default:
        return frequency
    }
  }

  const handleCreateTask = () => {
    if (!newTask.name || newTask.agents.length === 0) {
      toast({
        title: "エラー",
        description: "タスク名とエージェントは必須です。",
        variant: "destructive",
      })
      return
    }

    if (newTask.agents.length > 10) {
      toast({
        title: "エラー",
        description: "エージェントは最大10個まで選択できます。",
        variant: "destructive",
      })
      return
    }

    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "scheduled",
      lastRun: "-",
      nextRun: newTask.schedule.time ? `2023/12/29 ${newTask.schedule.time}` : "-",
      runCount: 0,
    }

    setTasks([...tasks, task])
    setNewTask({
      name: "",
      description: "",
      executionPattern: "serial",
      maxConcurrent: 1,
      schedule: {
        time: "",
        frequency: "once",
        weekdays: [],
        startDate: "",
        endDate: "",
        enabled: true,
      },
      agents: [],
      displaySettings: {
        showAll: true,
        maxResults: 50,
      },
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "タスクを作成しました",
      description: `${newTask.agents.length}個のエージェントを含む実行タスクがスケジュールされました。`,
    })
  }

  const addAgent = () => {
    if (newTask.agents.length < 10) {
      setNewTask({
        ...newTask,
        agents: [...newTask.agents, { id: "", name: "", type: "agent" }],
      })
    }
  }

  const removeAgent = (index: number) => {
    const updatedAgents = newTask.agents.filter((_, i) => i !== index)
    setNewTask({ ...newTask, agents: updatedAgents })
  }

  const updateAgent = (index: number, field: string, value: string) => {
    const updatedAgents = newTask.agents.map((agent, i) => (i === index ? { ...agent, [field]: value } : agent))
    setNewTask({ ...newTask, agents: updatedAgents })
  }

  const filteredTasks = showAllTasks
    ? tasks
    : tasks.filter((task) => task.status === "running" || task.status === "scheduled")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">タスク管理</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="execution">実行管理</TabsTrigger>
          <TabsTrigger value="history">実行履歴</TabsTrigger>
          <TabsTrigger value="monitoring">監視</TabsTrigger>
        </TabsList>

        <TabsContent value="execution" className="space-y-6">
          {/* 統計カード */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">総タスク数</p>
                    <p className="text-2xl font-bold">{tasks.length}</p>
                  </div>
                  <ListTodo className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">実行中</p>
                    <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "running").length}</p>
                  </div>
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">スケジュール済</p>
                    <p className="text-2xl font-bold">{tasks.filter((t) => t.status === "scheduled").length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">総実行回数</p>
                    <p className="text-2xl font-bold">{tasks.reduce((sum, t) => sum + t.runCount, 0)}</p>
                  </div>
                  <Repeat className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* コントロールパネル */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>実行管理</CardTitle>
                  <CardDescription>エージェントとゼロショットの実行をスケジュール管理</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="display-filter" className="text-sm">
                      表示設定
                    </Label>
                    <Select value={displayFilter} onValueChange={setDisplayFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全て表示</SelectItem>
                        <SelectItem value="latest">最新のみ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="show-all" className="text-sm">
                      全て表示
                    </Label>
                    <Switch id="show-all" checked={showAllTasks} onCheckedChange={setShowAllTasks} />
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        新規タスク
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>新しい実行タスクを作成</DialogTitle>
                        <DialogDescription>
                          エージェントやゼロショットを組み合わせて実行タスクを作成します（最大10個まで）
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* 基本情報 */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">基本情報</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>タスク名 *</Label>
                              <Input
                                placeholder="タスク名を入力"
                                value={newTask.name}
                                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>実行パターン</Label>
                              <Select
                                value={newTask.executionPattern}
                                onValueChange={(value) => setNewTask({ ...newTask, executionPattern: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="serial">
                                    <div className="flex items-center gap-2">
                                      <ArrowDown className="h-4 w-4" />
                                      直列実行（順番に実行）
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="parallel">
                                    <div className="flex items-center gap-2">
                                      <ArrowRight className="h-4 w-4" />
                                      並列実行（同時に実行）
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {newTask.executionPattern === "parallel" && (
                            <div className="space-y-2">
                              <Label>最大同時実行数</Label>
                              <Select
                                value={newTask.maxConcurrent.toString()}
                                onValueChange={(value) =>
                                  setNewTask({ ...newTask, maxConcurrent: Number.parseInt(value) })
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num}個
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>説明</Label>
                            <Textarea
                              placeholder="タスクの説明を入力"
                              value={newTask.description}
                              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* エージェント選択 */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">エージェント選択（最大10個）</h3>
                            <Badge variant="outline">{newTask.agents.length}/10 選択済み</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            {/* 利用可能なエージェント */}
                            <div className="space-y-3">
                              <h4 className="font-medium">利用可能なエージェント</h4>
                              <div className="border rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
                                {availableAgents.map((agent) => (
                                  <div
                                    key={agent.id}
                                    className="flex items-center justify-between p-2 border rounded hover:bg-muted cursor-pointer"
                                    onClick={() => {
                                      if (
                                        newTask.agents.length < 10 &&
                                        !newTask.agents.find((a) => a.id === agent.id)
                                      ) {
                                        setNewTask({
                                          ...newTask,
                                          agents: [...newTask.agents, { ...agent, order: newTask.agents.length + 1 }],
                                        })
                                      }
                                    }}
                                  >
                                    <div>
                                      <div className="font-medium text-sm">{agent.name}</div>
                                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        {agent.type === "agent" ? (
                                          <Bot className="h-3 w-3" />
                                        ) : (
                                          <Zap className="h-3 w-3" />
                                        )}
                                        {agent.category}
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      disabled={
                                        newTask.agents.length >= 10 || newTask.agents.find((a) => a.id === agent.id)
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 選択されたエージェント */}
                            <div className="space-y-3">
                              <h4 className="font-medium">選択されたエージェント</h4>
                              <div className="border rounded-lg p-3 max-h-64 overflow-y-auto space-y-2">
                                {newTask.agents.map((agent, index) => (
                                  <div key={agent.id} className="flex items-center justify-between p-2 border rounded">
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs">
                                        {index + 1}
                                      </div>
                                      <div>
                                        <div className="font-medium text-sm">{agent.name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                          {agent.type === "agent" ? (
                                            <Bot className="h-3 w-3" />
                                          ) : (
                                            <Zap className="h-3 w-3" />
                                          )}
                                          {agent.category}
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setNewTask({
                                          ...newTask,
                                          agents: newTask.agents.filter((a) => a.id !== agent.id),
                                        })
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                {newTask.agents.length === 0 && (
                                  <div className="text-center py-8 text-muted-foreground text-sm">
                                    エージェントを選択してください
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* スケジュール設定 */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">スケジュール設定</h3>
                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label>実行時刻</Label>
                              <Input
                                type="time"
                                value={newTask.schedule.time}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    schedule: { ...newTask.schedule, time: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>実行周期</Label>
                              <Select
                                value={newTask.schedule.frequency}
                                onValueChange={(value) =>
                                  setNewTask({
                                    ...newTask,
                                    schedule: { ...newTask.schedule, frequency: value },
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="once">一回のみ</SelectItem>
                                  <SelectItem value="daily">毎日</SelectItem>
                                  <SelectItem value="weekly">毎週</SelectItem>
                                  <SelectItem value="monthly">毎月</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>開始日</Label>
                              <Input
                                type="date"
                                value={newTask.schedule.startDate}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    schedule: { ...newTask.schedule, startDate: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>終了日</Label>
                              <Input
                                type="date"
                                value={newTask.schedule.endDate}
                                onChange={(e) =>
                                  setNewTask({
                                    ...newTask,
                                    schedule: { ...newTask.schedule, endDate: e.target.value },
                                  })
                                }
                              />
                            </div>
                          </div>

                          {newTask.schedule.frequency === "weekly" && (
                            <div className="space-y-2">
                              <Label>実行曜日</Label>
                              <div className="flex gap-2">
                                {["月", "火", "水", "木", "金", "土", "日"].map((day, index) => (
                                  <Button
                                    key={day}
                                    variant={newTask.schedule.weekdays?.includes(index) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                      const weekdays = newTask.schedule.weekdays || []
                                      const newWeekdays = weekdays.includes(index)
                                        ? weekdays.filter((d) => d !== index)
                                        : [...weekdays, index]
                                      setNewTask({
                                        ...newTask,
                                        schedule: { ...newTask.schedule, weekdays: newWeekdays },
                                      })
                                    }}
                                  >
                                    {day}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Switch
                              checked={newTask.schedule.enabled}
                              onCheckedChange={(checked) =>
                                setNewTask({
                                  ...newTask,
                                  schedule: { ...newTask.schedule, enabled: checked },
                                })
                              }
                            />
                            <Label>スケジュールを有効にする</Label>
                          </div>
                        </div>

                        {/* 表示設定 */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">表示設定</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={newTask.displaySettings.showAll}
                                onCheckedChange={(checked) =>
                                  setNewTask({
                                    ...newTask,
                                    displaySettings: { ...newTask.displaySettings, showAll: checked },
                                  })
                                }
                              />
                              <Label>全ての実行履歴を表示（オフの場合は最新のみ）</Label>
                            </div>
                            <div className="space-y-2">
                              <Label>最大表示件数</Label>
                              <Select
                                value={newTask.displaySettings.maxResults.toString()}
                                onValueChange={(value) =>
                                  setNewTask({
                                    ...newTask,
                                    displaySettings: { ...newTask.displaySettings, maxResults: Number.parseInt(value) },
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10">10件</SelectItem>
                                  <SelectItem value="25">25件</SelectItem>
                                  <SelectItem value="50">50件</SelectItem>
                                  <SelectItem value="100">100件</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          キャンセル
                        </Button>
                        <Button onClick={handleCreateTask} disabled={newTask.agents.length === 0}>
                          作成
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タスク名</TableHead>
                    <TableHead>実行モード</TableHead>
                    <TableHead>スケジュール</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>最終実行</TableHead>
                    <TableHead>次回実行</TableHead>
                    <TableHead>実行回数</TableHead>
                    <TableHead className="w-[120px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.name}</div>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {task.executionMode === "serial" ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                          <span className="text-sm">{task.executionMode === "serial" ? "直列" : "並列"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {task.schedule.time} - {getFrequencyLabel(task.schedule.frequency)}
                          </div>
                          <div className="text-muted-foreground">〜{task.schedule.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-sm">{task.lastRun}</TableCell>
                      <TableCell className="text-sm">{task.nextRun}</TableCell>
                      <TableCell className="text-sm">{task.runCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>実行履歴</CardTitle>
              <CardDescription>過去の実行履歴を確認できます</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">実行履歴機能は開発中です</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>監視</CardTitle>
              <CardDescription>実行中のタスクをリアルタイムで監視</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">監視機能は開発中です</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
