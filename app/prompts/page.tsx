"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import {
  FileCode,
  Search,
  Plus,
  Copy,
  Edit,
  Trash2,
  Settings,
  Star,
  Calendar,
  User,
  Building,
  Briefcase,
  Tag,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedJob, setSelectedJob] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<any>(null)
  const { toast } = useToast()

  const [newPrompt, setNewPrompt] = useState({
    title: "",
    content: "",
    industry: "",
    job: "",
    category: "",
    description: "",
  })

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

  const categories = [
    { value: "analysis", label: "分析・レポート" },
    { value: "writing", label: "文書作成" },
    { value: "customer_service", label: "顧客対応" },
    { value: "planning", label: "企画・戦略" },
    { value: "education", label: "教育・研修" },
    { value: "compliance", label: "コンプライアンス" },
    { value: "marketing", label: "マーケティング" },
    { value: "other", label: "その他" },
  ]

  // サンプルプロンプトデータ
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: "顧客提案書作成支援",
      content:
        "あなたは経験豊富な金融営業担当者です。以下の顧客情報を基に、最適な金融商品の提案書を作成してください。\n\n顧客情報：\n- 年齢：{age}\n- 職業：{occupation}\n- 年収：{income}\n- 投資経験：{experience}\n- リスク許容度：{risk_tolerance}\n\n提案書には以下を含めてください：\n1. 顧客のニーズ分析\n2. 推奨商品とその理由\n3. リスクとリターンの説明\n4. 具体的な投資プラン",
      industry: "finance",
      job: "retail_sales",
      category: "analysis",
      description: "個人顧客向けの金融商品提案書を自動生成するプロンプト",
      author: "田中太郎",
      createdAt: "2023/12/15",
      updatedAt: "2023/12/20",
      usageCount: 45,
      rating: 4.8,
      isPublic: true,
      tags: ["営業支援", "提案書", "顧客分析"],
    },
    {
      id: 2,
      title: "リスク分析レポート生成",
      content:
        "あなたは金融リスク管理の専門家です。以下のデータを分析し、包括的なリスク分析レポートを作成してください。\n\n分析対象：\n- 投資ポートフォリオ：{portfolio}\n- 市場環境：{market_conditions}\n- 規制環境：{regulatory_environment}\n\nレポートには以下を含めてください：\n1. 主要リスクの特定と評価\n2. リスク指標の計算結果\n3. ストレステストの結果\n4. リスク軽減策の提案\n5. 監視すべき指標",
      industry: "finance",
      job: "risk_management",
      category: "analysis",
      description: "金融リスクの包括的な分析レポートを生成するプロンプト",
      author: "佐藤花子",
      createdAt: "2023/12/10",
      updatedAt: "2023/12/18",
      usageCount: 32,
      rating: 4.6,
      isPublic: true,
      tags: ["リスク管理", "分析", "レポート"],
    },
    {
      id: 3,
      title: "法務文書レビュー支援",
      content:
        "あなたは経験豊富な法務担当者です。以下の契約書を詳細にレビューし、法的リスクと改善点を指摘してください。\n\n契約書内容：\n{contract_content}\n\nレビューポイント：\n1. 法的リスクの特定\n2. 不明確な条項の指摘\n3. 修正提案\n4. コンプライアンス観点での確認\n5. 業界標準との比較",
      industry: "common",
      job: "legal",
      category: "compliance",
      description: "契約書や法務文書のレビューを支援するプロンプト",
      author: "鈴木一郎",
      createdAt: "2023/12/08",
      updatedAt: "2023/12/16",
      usageCount: 28,
      rating: 4.7,
      isPublic: false,
      tags: ["法務", "契約書", "コンプライアンス"],
    },
    {
      id: 4,
      title: "医療診断支援プロンプト",
      content:
        "あなたは経験豊富な医師です。以下の患者情報と症状を基に、可能性のある診断と推奨される検査を提案してください。\n\n患者情報：\n- 年齢：{age}\n- 性別：{gender}\n- 主訴：{chief_complaint}\n- 現病歴：{present_illness}\n- 既往歴：{past_history}\n- 身体所見：{physical_findings}\n\n以下の形式で回答してください：\n1. 鑑別診断（可能性の高い順）\n2. 推奨検査\n3. 緊急度の評価\n4. 初期治療方針",
      industry: "medical",
      job: "general",
      category: "analysis",
      description: "医療診断の支援を行うプロンプト",
      author: "高橋美咲",
      createdAt: "2023/12/05",
      updatedAt: "2023/12/14",
      usageCount: 67,
      rating: 4.9,
      isPublic: true,
      tags: ["医療", "診断", "症例分析"],
    },
  ])

  // AI自動分類機能（模擬）
  const analyzePromptContent = (content: string) => {
    // 実際の実装では、AIを使用してプロンプト内容を分析
    const keywords = content.toLowerCase()

    let industry = "common"
    let job = "general"
    let category = "other"

    // 業種の判定
    if (
      keywords.includes("金融") ||
      keywords.includes("投資") ||
      keywords.includes("融資") ||
      keywords.includes("銀行")
    ) {
      industry = "finance"
    } else if (keywords.includes("医療") || keywords.includes("診断") || keywords.includes("患者")) {
      industry = "medical"
    } else if (keywords.includes("教育") || keywords.includes("学習") || keywords.includes("授業")) {
      industry = "education"
    }

    // 業務の判定（金融の場合）
    if (industry === "finance") {
      if (keywords.includes("営業") || keywords.includes("顧客") || keywords.includes("提案")) {
        job = keywords.includes("法人") ? "corporate_sales" : "retail_sales"
      } else if (keywords.includes("リスク")) {
        job = "risk_management"
      } else if (keywords.includes("融資")) {
        job = "lending"
      } else if (keywords.includes("法務") || keywords.includes("契約")) {
        job = "legal"
      } else if (keywords.includes("ir") || keywords.includes("投資家")) {
        job = "ir"
      }
    }

    // カテゴリの判定
    if (keywords.includes("分析") || keywords.includes("レポート")) {
      category = "analysis"
    } else if (keywords.includes("文書") || keywords.includes("作成")) {
      category = "writing"
    } else if (keywords.includes("顧客対応") || keywords.includes("サポート")) {
      category = "customer_service"
    } else if (keywords.includes("企画") || keywords.includes("戦略")) {
      category = "planning"
    } else if (keywords.includes("教育") || keywords.includes("研修")) {
      category = "education"
    } else if (keywords.includes("コンプライアンス") || keywords.includes("法的")) {
      category = "compliance"
    }

    return { industry, job, category }
  }

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesIndustry = selectedIndustry === "all" || !selectedIndustry || prompt.industry === selectedIndustry
    const matchesJob = selectedJob === "all" || !selectedJob || prompt.job === selectedJob
    const matchesCategory = selectedCategory === "all" || !selectedCategory || prompt.category === selectedCategory

    return matchesSearch && matchesIndustry && matchesJob && matchesCategory
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

  const getCategoryLabel = (value: string) => {
    return categories.find((category) => category.value === value)?.label || value
  }

  const handleCreatePrompt = () => {
    if (!newPrompt.title || !newPrompt.content) {
      toast({
        title: "エラー",
        description: "タイトルと内容は必須です。",
        variant: "destructive",
      })
      return
    }

    // AI自動分類
    const autoClassification = analyzePromptContent(newPrompt.content)

    const prompt = {
      id: prompts.length + 1,
      ...newPrompt,
      industry: newPrompt.industry || autoClassification.industry,
      job: newPrompt.job || autoClassification.job,
      category: newPrompt.category || autoClassification.category,
      author: "現在のユーザー",
      createdAt: new Date().toLocaleDateString("ja-JP"),
      updatedAt: new Date().toLocaleDateString("ja-JP"),
      usageCount: 0,
      rating: 0,
      isPublic: false,
      tags: [],
    }

    setPrompts([...prompts, prompt])
    setNewPrompt({ title: "", content: "", industry: "", job: "", category: "", description: "" })
    setIsCreateDialogOpen(false)

    toast({
      title: "プロンプトを作成しました",
      description: "AI分析により業種・業務・カテゴリが自動設定されました。",
    })
  }

  const handleCopyPrompt = (prompt: any) => {
    navigator.clipboard.writeText(prompt.content)
    toast({
      title: "コピーしました",
      description: "プロンプトがクリップボードにコピーされました。",
    })
  }

  const handleEditPrompt = (prompt: any) => {
    setEditingPrompt(prompt)
    setIsEditDialogOpen(true)
  }

  const handleUpdatePrompt = () => {
    if (!editingPrompt) return

    const updatedPrompts = prompts.map((p) =>
      p.id === editingPrompt.id
        ? {
            ...editingPrompt,
            updatedAt: new Date().toLocaleDateString("ja-JP"),
          }
        : p,
    )

    setPrompts(updatedPrompts)
    setIsEditDialogOpen(false)
    setEditingPrompt(null)

    toast({
      title: "プロンプトを更新しました",
      description: "変更が保存されました。",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">プロンプト管理</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規作成
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>新しいプロンプトを作成</DialogTitle>
                <DialogDescription>
                  プロンプトを作成すると、AI分析により業種・業務・カテゴリが自動設定されます。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>タイトル *</Label>
                    <Input
                      placeholder="プロンプトのタイトル"
                      value={newPrompt.title}
                      onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>説明</Label>
                    <Input
                      placeholder="プロンプトの説明"
                      value={newPrompt.description}
                      onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>プロンプト内容 *</Label>
                  <Textarea
                    placeholder="プロンプトの内容を入力してください..."
                    className="min-h-48"
                    value={newPrompt.content}
                    onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      業種（上書き可能）
                    </Label>
                    <Select
                      value={newPrompt.industry}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="自動設定されます" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      業務内容（上書き可能）
                    </Label>
                    <Select
                      value={newPrompt.job}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, job: value })}
                      disabled={!newPrompt.industry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="自動設定されます" />
                      </SelectTrigger>
                      <SelectContent>
                        {newPrompt.industry &&
                          getJobsByIndustry(newPrompt.industry).map((job) => (
                            <SelectItem key={job.value} value={job.value}>
                              {job.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      カテゴリ（上書き可能）
                    </Label>
                    <Select
                      value={newPrompt.category}
                      onValueChange={(value) => setNewPrompt({ ...newPrompt, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="自動設定されます" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    プロンプト内容を分析して、業種・業務・カテゴリを自動で設定します。間違っている場合は上書きしてください。
                  </span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleCreatePrompt}>作成</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">総プロンプト数</p>
                <p className="text-2xl font-bold">{prompts.length}</p>
              </div>
              <FileCode className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">公開プロンプト</p>
                <p className="text-2xl font-bold">{prompts.filter((p) => p.isPublic).length}</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">総使用回数</p>
                <p className="text-2xl font-bold">{prompts.reduce((sum, p) => sum + p.usageCount, 0)}</p>
              </div>
              <Copy className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">平均評価</p>
                <p className="text-2xl font-bold">
                  {(prompts.reduce((sum, p) => sum + p.rating, 0) / prompts.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle>検索・フィルター</CardTitle>
          <CardDescription>プロンプトを検索・絞り込みできます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <Label>キーワード検索</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="タイトル、説明、タグで検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>業種</Label>
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
              <Label>業務内容</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob} disabled={!selectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="業務を選択" />
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
              <Label>カテゴリ</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>並び順</Label>
              <Select defaultValue="updated">
                <SelectTrigger>
                  <SelectValue placeholder="並び順を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">更新日順</SelectItem>
                  <SelectItem value="created">作成日順</SelectItem>
                  <SelectItem value="usage">使用回数順</SelectItem>
                  <SelectItem value="rating">評価順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* プロンプト一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>プロンプト一覧</CardTitle>
          <CardDescription>{filteredPrompts.length}件のプロンプトが見つかりました</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cards">
            <TabsList>
              <TabsTrigger value="cards">カード表示</TabsTrigger>
              <TabsTrigger value="table">テーブル表示</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrompts.map((prompt) => (
                  <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base leading-tight">{prompt.title}</CardTitle>
                          <CardDescription className="text-sm">{prompt.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{prompt.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {getIndustryLabel(prompt.industry)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getJobLabel(prompt.job)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(prompt.category)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{prompt.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{prompt.updatedAt}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">使用回数: {prompt.usageCount}</div>
                    </CardContent>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleCopyPrompt(prompt)}>
                          <Copy className="mr-1 h-4 w-4" />
                          コピー
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPrompt(prompt)}>
                          <Edit className="mr-1 h-4 w-4" />
                          編集
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="table" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead>業種</TableHead>
                    <TableHead>業務</TableHead>
                    <TableHead>カテゴリ</TableHead>
                    <TableHead>作成者</TableHead>
                    <TableHead>更新日</TableHead>
                    <TableHead>使用回数</TableHead>
                    <TableHead>評価</TableHead>
                    <TableHead className="w-[120px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrompts.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={prompt.title}>
                          {prompt.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{getIndustryLabel(prompt.industry)}</TableCell>
                      <TableCell className="text-sm">{getJobLabel(prompt.job)}</TableCell>
                      <TableCell className="text-sm">{getCategoryLabel(prompt.category)}</TableCell>
                      <TableCell className="text-sm">{prompt.author}</TableCell>
                      <TableCell className="text-sm">{prompt.updatedAt}</TableCell>
                      <TableCell className="text-sm">{prompt.usageCount}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {prompt.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleCopyPrompt(prompt)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditPrompt(prompt)}>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>プロンプトを編集</DialogTitle>
            <DialogDescription>プロンプトの内容と分類を編集できます。</DialogDescription>
          </DialogHeader>
          {editingPrompt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>タイトル</Label>
                  <Input
                    value={editingPrompt.title}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>説明</Label>
                  <Input
                    value={editingPrompt.description}
                    onChange={(e) => setEditingPrompt({ ...editingPrompt, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>プロンプト内容</Label>
                <Textarea
                  className="min-h-48"
                  value={editingPrompt.content}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, content: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>業種</Label>
                  <Select
                    value={editingPrompt.industry}
                    onValueChange={(value) => setEditingPrompt({ ...editingPrompt, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>業務内容</Label>
                  <Select
                    value={editingPrompt.job}
                    onValueChange={(value) => setEditingPrompt({ ...editingPrompt, job: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getJobsByIndustry(editingPrompt.industry).map((job) => (
                        <SelectItem key={job.value} value={job.value}>
                          {job.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>カテゴリ</Label>
                  <Select
                    value={editingPrompt.category}
                    onValueChange={(value) => setEditingPrompt({ ...editingPrompt, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleUpdatePrompt}>更新</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
