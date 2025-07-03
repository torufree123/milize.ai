"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import {
  Search,
  Filter,
  CalendarIcon,
  Grid,
  List,
  Download,
  Share2,
  BookmarkCheck,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
  Clock,
  Star,
  Eye,
  Save,
  Bot,
  MessageSquare,
  Hash,
  User,
  Tag,
  Edit,
  Copy,
  Archive,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// プロンプト・エージェント管理用の型定義
interface PromptData {
  id: string
  name: string
  content: string
  type: "prompt" | "agent"
  category: string
  author: string
  createdAt: string
  usageCount: number
  tags: string[]
}

interface ReportData {
  id: number
  title: string
  type: string
  date: string
  author: string
  views: number
  favorites: number
  tags: string[]
  trend: string
  summary: string
  promptId?: string
  agentName?: string
  generatedBy?: "prompt" | "agent"
  executionTime?: string
  accuracy?: number
}

export default function ReportSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedReportType, setSelectedReportType] = useState<string>("all")
  const [filteredReports, setFilteredReports] = useState<ReportData[]>([])
  const [sortOption, setSortOption] = useState("relevance")
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<number | null>(null)
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false)
  const [isAgentDialogOpen, setIsAgentDialogOpen] = useState(false)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [selectedPromptId, setSelectedPromptId] = useState<string>("")
  const [selectedAgentName, setSelectedAgentName] = useState<string>("")
  const { toast } = useToast()

  // プロンプト管理
  const [prompts, setPrompts] = useState<PromptData[]>([
    {
      id: "PRM-001",
      name: "財務分析レポート生成",
      content:
        "以下の財務データを分析し、包括的なレポートを作成してください。売上高、営業利益、純利益の推移を分析し、前年同期比較と業界平均との比較を含めてください。",
      type: "prompt",
      category: "財務分析",
      author: "財務部 山田太郎",
      createdAt: "2023-10-15",
      usageCount: 45,
      tags: ["財務", "分析", "レポート"],
    },
    {
      id: "PRM-002",
      name: "市場動向調査プロンプト",
      content:
        "指定された業界の市場動向を調査し、競合分析、成長予測、リスク要因を含む詳細なレポートを作成してください。",
      type: "prompt",
      category: "市場調査",
      author: "マーケティング部 佐藤花子",
      createdAt: "2023-09-28",
      usageCount: 32,
      tags: ["市場調査", "競合分析", "予測"],
    },
    {
      id: "AGT-001",
      name: "セキュリティ監査エージェント",
      content: "システムのセキュリティ状況を包括的に監査し、脆弱性の検出と対策案を提示するエージェント",
      type: "agent",
      category: "セキュリティ",
      author: "情報セキュリティ部 高橋健太",
      createdAt: "2023-11-05",
      usageCount: 28,
      tags: ["セキュリティ", "監査", "脆弱性"],
    },
    {
      id: "AGT-002",
      name: "ヘルスケアAI分析エージェント",
      content: "ヘルスケアデータを分析し、トレンド予測と改善提案を行うAIエージェント",
      type: "agent",
      category: "ヘルスケア",
      author: "新規事業開発部 中村あかり",
      createdAt: "2023-10-22",
      usageCount: 19,
      tags: ["ヘルスケア", "AI分析", "予測"],
    },
  ])

  // 新しいプロンプト作成用の状態
  const [newPrompt, setNewPrompt] = useState({
    name: "",
    content: "",
    category: "",
    tags: "",
  })

  // サンプルレポートデータ（プロンプト・エージェント情報を含む）
  const sampleReports: ReportData[] = [
    {
      id: 1,
      title: "2023年度第3四半期財務分析レポート",
      type: "財務",
      date: "2023-10-15",
      author: "財務部 山田太郎",
      views: 245,
      favorites: 18,
      tags: ["財務", "四半期", "分析"],
      trend: "up",
      summary:
        "2023年度第3四半期の財務状況を分析したレポートです。売上高は前年同期比15%増加し、営業利益率も2.3%向上しました。",
      promptId: "PRM-001",
      generatedBy: "prompt",
      executionTime: "3分45秒",
      accuracy: 94,
    },
    {
      id: 2,
      title: "AIモデル性能評価レポート - GPT-4比較",
      type: "技術",
      date: "2023-09-28",
      author: "AI研究部 佐藤花子",
      views: 412,
      favorites: 32,
      tags: ["AI", "モデル評価", "GPT-4"],
      trend: "up",
      summary:
        "最新のAIモデルとGPT-4の性能を比較評価したレポートです。テキスト生成、コード生成、推論タスクなど複数の観点から検証しています。",
      agentName: "AGT-002",
      generatedBy: "agent",
      executionTime: "8分12秒",
      accuracy: 91,
    },
    {
      id: 3,
      title: "市場動向調査：クラウドサービス2023",
      type: "マーケット",
      date: "2023-08-10",
      author: "マーケティング部 鈴木誠",
      views: 189,
      favorites: 12,
      tags: ["クラウド", "市場調査", "トレンド"],
      trend: "stable",
      summary:
        "2023年のクラウドサービス市場の動向を調査したレポートです。主要プレイヤーの動向、新サービス、価格戦略などを分析しています。",
      promptId: "PRM-002",
      generatedBy: "prompt",
      executionTime: "5分23秒",
      accuracy: 89,
    },
    {
      id: 4,
      title: "セキュリティ監査結果報告書",
      type: "セキュリティ",
      date: "2023-11-05",
      author: "情報セキュリティ部 高橋健太",
      views: 156,
      favorites: 8,
      tags: ["セキュリティ", "監査", "コンプライアンス"],
      trend: "down",
      summary: "社内システムのセキュリティ監査結果をまとめた報告書です。脆弱性の検出結果と対策案を提示しています。",
      agentName: "AGT-001",
      generatedBy: "agent",
      executionTime: "12分34秒",
      accuracy: 96,
    },
    {
      id: 5,
      title: "新規事業計画書：ヘルスケアAIサービス",
      type: "事業計画",
      date: "2023-10-22",
      author: "新規事業開発部 中村あかり",
      views: 203,
      favorites: 24,
      tags: ["ヘルスケア", "新規事業", "AI"],
      trend: "up",
      summary:
        "ヘルスケア分野におけるAIサービスの新規事業計画書です。市場分析、サービス概要、収益モデル、ロードマップを含みます。",
      agentName: "AGT-002",
      generatedBy: "agent",
      executionTime: "15分18秒",
      accuracy: 92,
    },
    {
      id: 6,
      title: "顧客満足度調査レポート2023",
      type: "カスタマー",
      date: "2023-07-18",
      author: "カスタマーサクセス部 小林直子",
      views: 178,
      favorites: 15,
      tags: ["顧客満足度", "調査", "フィードバック"],
      trend: "stable",
      summary: "2023年の顧客満足度調査の結果をまとめたレポートです。NPS、CSAT、CESなどの指標と改善提案を含みます。",
      promptId: "PRM-001",
      generatedBy: "prompt",
      executionTime: "4分56秒",
      accuracy: 88,
    },
  ]

  React.useEffect(() => {
    setFilteredReports(sampleReports)
  }, [])

  // プロンプトID生成関数
  const generatePromptId = (): string => {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substr(2, 5)
    return `PRM-${timestamp}-${randomStr}`.toUpperCase()
  }

  // エージェントID生成関数
  const generateAgentId = (): string => {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substr(2, 5)
    return `AGT-${timestamp}-${randomStr}`.toUpperCase()
  }

  // 検索とフィルタリングを処理する関数
  const handleSearch = () => {
    let results = [...sampleReports]

    // キーワード検索
    if (searchQuery) {
      results = results.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (report.promptId && report.promptId.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (report.agentName && report.agentName.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // レポートタイプでフィルタリング
    if (selectedReportType !== "all") {
      results = results.filter((report) => report.type === selectedReportType)
    }

    // 日付でフィルタリング
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      results = results.filter((report) => report.date === dateStr)
    }

    // ソート
    switch (sortOption) {
      case "date-new":
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "date-old":
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "views":
        results.sort((a, b) => b.views - a.views)
        break
      case "favorites":
        results.sort((a, b) => b.favorites - a.favorites)
        break
      case "accuracy":
        results.sort((a, b) => (b.accuracy || 0) - (a.accuracy || 0))
        break
      default:
        break
    }

    setFilteredReports(results)
  }

  // 検索実行
  React.useEffect(() => {
    handleSearch()
  }, [searchQuery, selectedReportType, selectedDate, sortOption])

  // プロンプト作成
  const handleCreatePrompt = () => {
    if (!newPrompt.name || !newPrompt.content) {
      toast({
        title: "エラー",
        description: "プロンプト名と内容は必須です。",
        variant: "destructive",
      })
      return
    }

    const promptId = generatePromptId()
    const prompt: PromptData = {
      id: promptId,
      name: newPrompt.name,
      content: newPrompt.content,
      type: "prompt",
      category: newPrompt.category || "その他",
      author: "現在のユーザー",
      createdAt: new Date().toLocaleDateString("ja-JP"),
      usageCount: 0,
      tags: newPrompt.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }

    setPrompts([...prompts, prompt])
    setNewPrompt({ name: "", content: "", category: "", tags: "" })
    setIsPromptDialogOpen(false)

    toast({
      title: "プロンプトを作成しました",
      description: `プロンプトID: ${promptId}`,
    })
  }

  // レポート保存
  const handleSaveReport = (reportId: number) => {
    const report = filteredReports.find((r) => r.id === reportId)
    if (!report) return

    // 選択されたプロンプト/エージェントと関連付けて保存
    const updatedReport = {
      ...report,
      promptId: selectedPromptId || report.promptId,
      agentName: selectedAgentName || report.agentName,
      generatedBy: selectedPromptId ? ("prompt" as const) : selectedAgentName ? ("agent" as const) : report.generatedBy,
    }

    // 実際の保存処理（ここではtoastで表示）
    toast({
      title: "レポートを保存しました",
      description: `${updatedReport.title} - ${selectedPromptId ? `プロンプト: ${selectedPromptId}` : `エージェント: ${selectedAgentName}`}`,
    })

    setIsSaveDialogOpen(false)
    setSelectedPromptId("")
    setSelectedAgentName("")
  }

  // トレンドアイコンを取得する関数
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  // プロンプト/エージェント情報を取得
  const getPromptInfo = (promptId?: string) => {
    return prompts.find((p) => p.id === promptId)
  }

  const getAgentInfo = (agentName?: string) => {
    return prompts.find((p) => p.id === agentName && p.type === "agent")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">レポート検索</h1>
          <div className="flex items-center space-x-2">
            <Dialog open={isPromptDialogOpen} onOpenChange={setIsPromptDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  プロンプト作成
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新しいプロンプトを作成</DialogTitle>
                  <DialogDescription>
                    レポート生成用のプロンプトを作成します。自動でIDが割り当てられます。
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>プロンプト名 *</Label>
                    <Input
                      placeholder="プロンプトの名前を入力"
                      value={newPrompt.name}
                      onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>カテゴリ</Label>
                    <Select
                      value={newPrompt.category}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="財務分析">財務分析</SelectItem>
                        <SelectItem value="市場調査">市場調査</SelectItem>
                        <SelectItem value="技術分析">技術分析</SelectItem>
                        <SelectItem value="セキュリティ">セキュリティ</SelectItem>
                        <SelectItem value="事業計画">事業計画</SelectItem>
                        <SelectItem value="その他">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>プロンプト内容 *</Label>
                    <Textarea
                      placeholder="プロンプトの内容を入力してください..."
                      className="min-h-32"
                      value={newPrompt.content}
                      onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>タグ（カンマ区切り）</Label>
                    <Input
                      placeholder="例: 分析, レポート, 財務"
                      value={newPrompt.tags}
                      onChange={(e) => setNewPrompt({ ...newPrompt, tags: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPromptDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={handleCreatePrompt}>作成</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              検索履歴
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              お気に入り
            </Button>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">総レポート数</p>
                  <p className="text-2xl font-bold">{sampleReports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">プロンプト数</p>
                  <p className="text-2xl font-bold">{prompts.filter((p) => p.type === "prompt").length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">エージェント数</p>
                  <p className="text-2xl font-bold">{prompts.filter((p) => p.type === "agent").length}</p>
                </div>
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">平均精度</p>
                  <p className="text-2xl font-bold">
                    {Math.round(sampleReports.reduce((sum, r) => sum + (r.accuracy || 0), 0) / sampleReports.length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* プロンプト・エージェント管理タブ */}
        <Card>
          <CardHeader>
            <CardTitle>プロンプト・エージェント管理</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prompts">
              <TabsList>
                <TabsTrigger value="prompts">プロンプト一覧</TabsTrigger>
                <TabsTrigger value="agents">エージェント一覧</TabsTrigger>
              </TabsList>
              <TabsContent value="prompts" className="mt-4">
                <div className="space-y-4">
                  {prompts
                    .filter((p) => p.type === "prompt")
                    .map((prompt) => (
                      <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  <Hash className="h-3 w-3 mr-1" />
                                  {prompt.id}
                                </Badge>
                                <Badge variant="secondary">{prompt.category}</Badge>
                                <span className="text-xs text-muted-foreground">使用回数: {prompt.usageCount}</span>
                              </div>
                              <h3 className="text-lg font-semibold">{prompt.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                <User className="h-3 w-3 inline mr-1" />
                                {prompt.author} | {prompt.createdAt}
                              </p>
                              <p className="text-sm mt-2 line-clamp-2">{prompt.content}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {prompt.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1 ml-4">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Archive className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="agents" className="mt-4">
                <div className="space-y-4">
                  {prompts
                    .filter((p) => p.type === "agent")
                    .map((agent) => (
                      <Card key={agent.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  <Bot className="h-3 w-3 mr-1" />
                                  {agent.id}
                                </Badge>
                                <Badge variant="secondary">{agent.category}</Badge>
                                <span className="text-xs text-muted-foreground">使用回数: {agent.usageCount}</span>
                              </div>
                              <h3 className="text-lg font-semibold">{agent.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                <User className="h-3 w-3 inline mr-1" />
                                {agent.author} | {agent.createdAt}
                              </p>
                              <p className="text-sm mt-2 line-clamp-2">{agent.content}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {agent.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1 ml-4">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Archive className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 検索バー */}
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="キーワード、プロンプトID、エージェント名で検索..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="default" onClick={handleSearch}>
              検索
            </Button>
            <Button variant="outline" onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              フィルター
              {isAdvancedFilterOpen ? (
                <ChevronDown className="h-4 w-4 ml-2" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>

          {/* 詳細フィルター */}
          {isAdvancedFilterOpen && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">レポートタイプ</h3>
                    <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="すべてのタイプ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべてのタイプ</SelectItem>
                        <SelectItem value="財務">財務</SelectItem>
                        <SelectItem value="技術">技術</SelectItem>
                        <SelectItem value="マーケット">マーケット</SelectItem>
                        <SelectItem value="セキュリティ">セキュリティ</SelectItem>
                        <SelectItem value="事業計画">事業計画</SelectItem>
                        <SelectItem value="カスタマー">カスタマー</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">生成方法</h3>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="すべて" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="prompt">プロンプト生成</SelectItem>
                        <SelectItem value="agent">エージェント生成</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">日付</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "yyyy年MM月dd日", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">並び替え</h3>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="関連性" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">関連性</SelectItem>
                        <SelectItem value="date-new">日付（新しい順）</SelectItem>
                        <SelectItem value="date-old">日付（古い順）</SelectItem>
                        <SelectItem value="views">閲覧数</SelectItem>
                        <SelectItem value="favorites">お気に入り数</SelectItem>
                        <SelectItem value="accuracy">精度順</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedReportType("all")
                      setSelectedDate(undefined)
                      setSortOption("relevance")
                    }}
                  >
                    リセット
                  </Button>
                  <Button onClick={handleSearch}>適用</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 検索結果 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-muted-foreground">{filteredReports.length} 件の結果</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => {
                const promptInfo = getPromptInfo(report.promptId)
                const agentInfo = getAgentInfo(report.agentName)

                return (
                  <Card
                    key={report.id}
                    className={`cursor-pointer ${selectedReport === report.id ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline">{report.type}</Badge>
                            <span className="text-xs text-muted-foreground">{report.date}</span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Eye className="h-3 w-3 mr-1" />
                              {report.views}
                            </div>
                            {report.accuracy && (
                              <Badge variant="secondary" className="text-xs">
                                精度: {report.accuracy}%
                              </Badge>
                            )}
                          </div>

                          {/* プロンプト/エージェント情報 */}
                          {(report.promptId || report.agentName) && (
                            <div className="flex items-center space-x-2 mb-2">
                              {report.promptId && (
                                <Badge variant="outline" className="text-xs font-mono">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {report.promptId}
                                </Badge>
                              )}
                              {report.agentName && (
                                <Badge variant="outline" className="text-xs font-mono">
                                  <Bot className="h-3 w-3 mr-1" />
                                  {report.agentName}
                                </Badge>
                              )}
                              {report.executionTime && (
                                <span className="text-xs text-muted-foreground">実行時間: {report.executionTime}</span>
                              )}
                            </div>
                          )}

                          <h3 className="text-lg font-semibold">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{report.author}</p>
                          <p className="text-sm mt-2">{report.summary}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {report.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2 ml-4">
                          {getTrendIcon(report.trend)}
                          <Button variant="ghost" size="icon">
                            <BookmarkCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {selectedReport === report.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {promptInfo && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  使用プロンプト
                                </h4>
                                <div className="p-3 bg-muted rounded-md">
                                  <p className="text-sm font-medium">{promptInfo.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {promptInfo.content.substring(0, 100)}...
                                  </p>
                                </div>
                              </div>
                            )}
                            {agentInfo && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium flex items-center">
                                  <Bot className="h-4 w-4 mr-2" />
                                  使用エージェント
                                </h4>
                                <div className="p-3 bg-muted rounded-md">
                                  <p className="text-sm font-medium">{agentInfo.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {agentInfo.content.substring(0, 100)}...
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium">レポート詳細</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                作成日: {report.date} | 最終更新: {report.date}
                                {report.executionTime && ` | 実行時間: ${report.executionTime}`}
                                {report.accuracy && ` | 精度: ${report.accuracy}%`}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Save className="h-4 w-4 mr-2" />
                                    保存
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>レポートを保存</DialogTitle>
                                    <DialogDescription>
                                      プロンプトまたはエージェントと関連付けて保存します。
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>プロンプトID（オプション）</Label>
                                      <Select value={selectedPromptId} onValueChange={setSelectedPromptId}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="プロンプトを選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {prompts
                                            .filter((p) => p.type === "prompt")
                                            .map((prompt) => (
                                              <SelectItem key={prompt.id} value={prompt.id}>
                                                {prompt.id} - {prompt.name}
                                              </SelectItem>
                                            ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>エージェント名（オプション）</Label>
                                      <Select value={selectedAgentName} onValueChange={setSelectedAgentName}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="エージェントを選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {prompts
                                            .filter((p) => p.type === "agent")
                                            .map((agent) => (
                                              <SelectItem key={agent.id} value={agent.id}>
                                                {agent.id} - {agent.name}
                                              </SelectItem>
                                            ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                                      キャンセル
                                    </Button>
                                    <Button onClick={() => handleSaveReport(report.id)}>保存</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                プレビュー
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                ダウンロード
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                共有
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">レポートが見つかりません</h3>
                <p className="mt-2 text-sm text-muted-foreground">検索条件を変更して再度お試しください。</p>
              </div>
            )}
          </div>
        </div>

        {/* 人気の検索キーワード */}
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-3">人気の検索キーワード</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "財務分析",
              "AI技術動向",
              "市場調査",
              "セキュリティ対策",
              "事業計画",
              "顧客満足度",
              "PRM-001",
              "AGT-001",
            ].map((keyword) => (
              <Button key={keyword} variant="outline" size="sm" onClick={() => setSearchQuery(keyword)}>
                {keyword}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
