"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bot,
  Star,
  Search,
  Filter,
  ArrowRight,
  Building,
  Briefcase,
  Upload,
  FileUp,
  Check,
  AlertCircle,
  X,
  Loader2,
  FileCode,
  Code,
  RefreshCw,
} from "lucide-react"

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedJob, setSelectedJob] = useState("")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importPlatform, setImportPlatform] = useState("dify")
  const [importStep, setImportStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState<"idle" | "importing" | "success" | "error">("idle")
  const [importError, setImportError] = useState("")
  const [importedAgent, setImportedAgent] = useState<any>(null)

  const industries = [
    { value: "finance", label: "金融（銀行、証券、保険、カード、代理店）" },
    { value: "medical", label: "医療" },
    { value: "education", label: "教育" },
    { value: "common", label: "共通" },
  ]

  const getJobsByIndustry = (industry: string) => {
    if (industry === "finance") {
      return [
        { value: "retail_sales", label: "リテール営業" },
        { value: "corporate_sales", label: "法人営業" },
        { value: "lending", label: "融資" },
        { value: "general_affairs", label: "総務" },
        { value: "ir", label: "IR" },
        { value: "market_operations", label: "市場運用" },
        { value: "risk_management", label: "リスク管理" },
        { value: "planning", label: "企画" },
        { value: "legal", label: "法務" },
        { value: "dx", label: "DX" },
      ]
    }
    return [
      { value: "general", label: "一般業務" },
      { value: "management", label: "管理業務" },
      { value: "planning", label: "企画" },
      { value: "dx", label: "DX" },
    ]
  }

  const agents = [
    {
      id: "1",
      name: "リテール営業支援AI",
      description: "個人顧客向けの営業活動を支援するエージェント",
      rating: 4.8,
      tags: ["営業支援", "顧客分析", "提案書作成"],
      industry: "finance",
      job: "retail_sales",
      category: "営業支援",
    },
    {
      id: "2",
      name: "リスク分析AI",
      description: "金融リスクの分析と評価を行うエージェント",
      rating: 4.7,
      tags: ["リスク分析", "データ分析", "レポート"],
      industry: "finance",
      job: "risk_management",
      category: "分析",
    },
    {
      id: "3",
      name: "法務文書チェックAI",
      description: "契約書や法務文書の確認と修正提案",
      rating: 4.6,
      tags: ["法務", "文書チェック", "コンプライアンス"],
      industry: "common",
      job: "legal",
      category: "文書処理",
    },
    {
      id: "4",
      name: "医療診断支援AI",
      description: "医療診断の支援と症例分析を行うエージェント",
      rating: 4.9,
      tags: ["診断支援", "症例分析", "医療"],
      industry: "medical",
      job: "general",
      category: "診断支援",
    },
    {
      id: "5",
      name: "教育コンテンツ作成AI",
      description: "教育用コンテンツの作成と最適化",
      rating: 4.5,
      tags: ["教育", "コンテンツ作成", "学習支援"],
      industry: "education",
      job: "general",
      category: "教育支援",
    },
    {
      id: "6",
      name: "DX戦略立案AI",
      description: "デジタル変革戦略の立案と実行支援",
      rating: 4.7,
      tags: ["DX", "戦略立案", "デジタル化"],
      industry: "common",
      job: "dx",
      category: "戦略立案",
    },
  ]

  // インポートしたエージェントを追加
  const allAgents = importedAgent ? [...agents, importedAgent] : agents

  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !selectedIndustry || agent.industry === selectedIndustry
    const matchesJob = !selectedJob || agent.job === selectedJob

    return matchesSearch && matchesIndustry && matchesJob
  })

  const getIndustryLabel = (value: string) => {
    return industries.find((industry) => industry.value === value)?.label || value
  }

  const getJobLabel = (value: string) => {
    const allJobs = [
      ...getJobsByIndustry("finance"),
      { value: "general", label: "一般業務" },
      { value: "management", label: "管理業務" },
    ]
    return allJobs.find((job) => job.value === value)?.label || value
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const resetImportDialog = () => {
    setImportStep(1)
    setSelectedFile(null)
    setImportProgress(0)
    setImportStatus("idle")
    setImportError("")
    setImportedAgent(null)
  }

  const closeImportDialog = () => {
    setIsImportDialogOpen(false)
    resetImportDialog()
  }

  const startImport = () => {
    setImportStep(2)
    setImportStatus("importing")
    setImportProgress(0)

    // インポート処理のシミュレーション
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // インポート完了のシミュレーション
    setTimeout(() => {
      clearInterval(interval)
      setImportProgress(100)

      if (Math.random() > 0.2) {
        // 80%の確率で成功
        setImportStatus("success")

        // インポートされたエージェントの情報を設定
        const newAgent = {
          id: `imported-${Date.now()}`,
          name: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, "") : "インポートされたエージェント",
          description: `${importPlatform}からインポートされたカスタムエージェント`,
          rating: 0,
          tags: ["インポート", importPlatform],
          industry: "common",
          job: "general",
          category: "カスタム",
          imported: true,
          importSource: importPlatform,
        }

        setImportedAgent(newAgent)
      } else {
        setImportStatus("error")
        setImportError("インポート中にエラーが発生しました。ファイル形式を確認してください。")
      }
    }, 3000)
  }

  const platformOptions = [
    { id: "dify", name: "Dify", description: "YMLファイルからDifyエージェントをインポート", icon: FileCode },
    { id: "smithos", name: "SmithOS", description: "SmithOSで作成したエージェントを接続", icon: Bot },
    { id: "langchain", name: "LangChain", description: "LangChainで構築したエージェントを統合", icon: Code },
    { id: "custom", name: "カスタム", description: "独自のエージェント定義をインポート", icon: RefreshCw },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AIエージェント</h1>
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Bot className="mr-2 h-4 w-4" />
              新しいエージェント
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            {importStep === 1 && (
              <>
                <DialogHeader>
                  <DialogTitle>新しいエージェントのインポート</DialogTitle>
                  <DialogDescription>
                    外部プラットフォームで作成したエージェントをインポートまたは接続します。
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <RadioGroup value={importPlatform} onValueChange={setImportPlatform} className="space-y-4">
                    {platformOptions.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                      >
                        <RadioGroupItem value={platform.id} id={platform.id} />
                        <Label htmlFor={platform.id} className="flex flex-1 items-center cursor-pointer">
                          <platform.icon className="mr-3 h-5 w-5" />
                          <div>
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-sm text-muted-foreground">{platform.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {importPlatform === "dify" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="yml-file">YMLファイルを選択</Label>
                      <div className="grid w-full items-center gap-1.5">
                        <Label
                          htmlFor="yml-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">クリックしてアップロード</span> またはドラッグ＆ドロップ
                            </p>
                            <p className="text-xs text-muted-foreground">YML形式のみ (最大10MB)</p>
                          </div>
                          <Input
                            id="yml-file"
                            type="file"
                            accept=".yml,.yaml"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                      </div>
                      {selectedFile && (
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center">
                            <FileUp className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[300px]">{selectedFile.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {importPlatform === "smithos" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="smithos-api-key">SmithOS API Key</Label>
                      <Input id="smithos-api-key" placeholder="sk-smithos-..." />
                      <Label htmlFor="smithos-agent-id">エージェントID</Label>
                      <Input id="smithos-agent-id" placeholder="agent_..." />
                    </div>
                  )}

                  {importPlatform === "langchain" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="langchain-url">LangChain エンドポイントURL</Label>
                      <Input id="langchain-url" placeholder="https://..." />
                      <Label htmlFor="langchain-api-key">API Key (オプション)</Label>
                      <Input id="langchain-api-key" placeholder="..." />
                    </div>
                  )}

                  {importPlatform === "custom" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="custom-config">エージェント設定 (JSON)</Label>
                      <Textarea id="custom-config" placeholder="{}" className="min-h-[150px]" />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeImportDialog}>
                    キャンセル
                  </Button>
                  <Button onClick={startImport} disabled={importPlatform === "dify" && !selectedFile}>
                    インポート開始
                  </Button>
                </DialogFooter>
              </>
            )}

            {importStep === 2 && (
              <>
                <DialogHeader>
                  <DialogTitle>エージェントのインポート</DialogTitle>
                  <DialogDescription>
                    {importStatus === "importing" && "エージェントをインポートしています..."}
                    {importStatus === "success" && "エージェントのインポートが完了しました！"}
                    {importStatus === "error" && "エージェントのインポートに失敗しました"}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6 space-y-6">
                  {importStatus === "importing" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      </div>
                      <Progress value={importProgress} className="w-full" />
                      <p className="text-center text-sm text-muted-foreground">
                        {importPlatform === "dify" ? "YMLファイルを解析中..." : "エージェント設定を処理中..."}
                      </p>
                    </div>
                  )}

                  {importStatus === "success" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="rounded-full bg-green-100 p-3">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="font-medium">インポート成功</h3>
                        <p className="text-sm text-muted-foreground">
                          エージェントが正常にインポートされ、利用可能になりました。
                        </p>
                      </div>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{importedAgent?.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">{importedAgent?.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {importedAgent?.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {importStatus === "error" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="rounded-full bg-red-100 p-3">
                          <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                      <Alert variant="destructive">
                        <AlertDescription>{importError}</AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  {importStatus === "importing" ? (
                    <Button variant="outline" onClick={closeImportDialog}>
                      キャンセル
                    </Button>
                  ) : importStatus === "success" ? (
                    <>
                      <Button variant="outline" onClick={closeImportDialog}>
                        閉じる
                      </Button>
                      <Button onClick={closeImportDialog}>エージェントを使用</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={closeImportDialog}>
                        閉じる
                      </Button>
                      <Button onClick={resetImportDialog}>再試行</Button>
                    </>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>エージェント検索</CardTitle>
          <CardDescription>業種と業務内容でエージェントを絞り込んで検索できます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Building className="mr-1 h-4 w-4" />
                業種
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="業種を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                業務内容
              </label>
              <Select value={selectedJob} onValueChange={setSelectedJob} disabled={!selectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="業務内容を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {selectedIndustry &&
                    getJobsByIndustry(selectedIndustry).map((job) => (
                      <SelectItem key={job.value} value={job.value}>
                        {job.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Search className="mr-1 h-4 w-4" />
                キーワード検索
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="エージェントを検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Filter className="mr-1 h-4 w-4" />
                フィルター
              </label>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="mr-2 h-4 w-4" />
                詳細フィルター
              </Button>
            </div>
          </div>

          {(selectedIndustry || selectedJob || searchQuery) && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">適用中のフィルター:</span>
              {selectedIndustry && (
                <Badge variant="secondary" className="gap-1">
                  {getIndustryLabel(selectedIndustry)}
                  <button onClick={() => setSelectedIndustry("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
              {selectedJob && (
                <Badge variant="secondary" className="gap-1">
                  {getJobLabel(selectedJob)}
                  <button onClick={() => setSelectedJob("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{filteredAgents.length}件のエージェントが見つかりました</div>
        <div className="flex items-center gap-2">
          <Select defaultValue="rating">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">評価順</SelectItem>
              <SelectItem value="name">名前順</SelectItem>
              <SelectItem value="category">カテゴリ順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">グリッド表示</TabsTrigger>
          <TabsTrigger value="list">リスト表示</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {agent.rating > 0 ? (
                        <>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">未評価</span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {agent.category}
                      </Badge>
                      {agent.imported && (
                        <Badge variant="secondary" className="text-xs">
                          インポート済み
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">業種: {getIndustryLabel(agent.industry)}</div>
                      <div className="text-xs text-muted-foreground">業務: {getJobLabel(agent.job)}</div>
                      {agent.importSource && (
                        <div className="text-xs text-muted-foreground">ソース: {agent.importSource}</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between">
                    <span>使ってみる</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        {agent.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{agent.rating}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">未評価</span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {agent.category}
                        </Badge>
                        {agent.imported && (
                          <Badge variant="secondary" className="text-xs">
                            インポート済み
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{agent.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>業種: {getIndustryLabel(agent.industry)}</span>
                        <span>業務: {getJobLabel(agent.job)}</span>
                        {agent.importSource && <span>ソース: {agent.importSource}</span>}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button>
                        使ってみる
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
