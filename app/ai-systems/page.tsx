"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Newspaper,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Star,
  Download,
  Play,
  Settings,
  Search,
  Filter,
  Users,
  Layers,
  Eye,
  Zap,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
  Share2,
  BookOpen,
  Target,
  Cpu,
  Database,
  PieChart,
  Activity,
} from "lucide-react"

// AIシステムの詳細データ
const aiSystems = [
  {
    id: "news-analysis",
    name: "ニュース分析システム",
    description: "企業・業界のニュースを包括的に分析し、重要な情報を抽出する統合システム",
    icon: Newspaper,
    color: "bg-blue-500",
    category: "情報分析",
    businessType: "メディア・情報",
    workType: "分析・レポート",
    industry: "全業種",
    agents: ["ニュース収集エージェント", "感情分析エージェント", "要約生成エージェント", "トレンド分析エージェント"],
    features: {
      uiux: ["ダッシュボード", "リアルタイム更新", "カスタマイズ可能なレイアウト"],
      visualization: ["トレンドグラフ", "感情分析チャート", "キーワードクラウド", "時系列分析"],
      integration: ["RSS連携", "SNS API", "ニュースAPI", "Slack通知"],
    },
    rating: 4.8,
    usageCount: 1250,
    createdDate: "2024-01-15",
    updatedDate: "2024-06-20",
    creator: "システム管理者",
    version: "2.1.0",
    complexity: "高",
    processingTime: "2-5分",
    accuracy: 95,
    isFavorite: false,
    isMySystem: true,
  },
  {
    id: "market-analysis",
    name: "市場分析システム",
    description: "市場動向と競合状況を分析し、ビジネス機会を特定する包括的システム",
    icon: TrendingUp,
    color: "bg-green-500",
    category: "市場分析",
    businessType: "コンサルティング",
    workType: "戦略立案",
    industry: "製造業",
    agents: [
      "市場データ収集エージェント",
      "競合分析エージェント",
      "予測モデルエージェント",
      "レポート生成エージェント",
    ],
    features: {
      uiux: ["インタラクティブダッシュボード", "ドリルダウン機能", "カスタムフィルター"],
      visualization: ["市場シェア円グラフ", "成長率推移", "競合マップ", "予測チャート"],
      integration: ["Bloomberg API", "Yahoo Finance", "Google Analytics", "CRM連携"],
    },
    rating: 4.6,
    usageCount: 890,
    createdDate: "2024-02-10",
    updatedDate: "2024-06-18",
    creator: "田中太郎",
    version: "1.8.2",
    complexity: "高",
    processingTime: "3-8分",
    accuracy: 92,
    isFavorite: true,
    isMySystem: false,
  },
  {
    id: "risk-analysis",
    name: "リスク分析システム",
    description: "企業のリスク要因を評価し、潜在的な問題を特定する予防的システム",
    icon: AlertTriangle,
    color: "bg-orange-500",
    category: "リスク管理",
    businessType: "金融・保険",
    workType: "リスク評価",
    industry: "金融業",
    agents: ["リスク検出エージェント", "影響度評価エージェント", "対策提案エージェント", "監視エージェント"],
    features: {
      uiux: ["アラートシステム", "リスクマトリックス", "シナリオシミュレーター"],
      visualization: ["リスクヒートマップ", "影響度チャート", "時系列リスク推移", "対策効果グラフ"],
      integration: ["監査システム", "コンプライアンス管理", "アラート通知", "レポート自動配信"],
    },
    rating: 4.7,
    usageCount: 650,
    createdDate: "2024-03-05",
    updatedDate: "2024-06-15",
    creator: "佐藤花子",
    version: "1.5.1",
    complexity: "中",
    processingTime: "1-3分",
    accuracy: 88,
    isFavorite: false,
    isMySystem: true,
  },
  {
    id: "investment-analysis",
    name: "投資分析システム",
    description: "財務データと市場情報を基に投資判断を支援する高度な分析システム",
    icon: DollarSign,
    color: "bg-purple-500",
    category: "投資分析",
    businessType: "投資・資産管理",
    workType: "投資判断",
    industry: "金融業",
    agents: [
      "財務分析エージェント",
      "バリュエーションエージェント",
      "ポートフォリオ最適化エージェント",
      "リスク計測エージェント",
    ],
    features: {
      uiux: ["ポートフォリオダッシュボード", "リアルタイム価格表示", "カスタム指標設定"],
      visualization: ["パフォーマンスチャート", "リスクリターン散布図", "セクター配分円グラフ", "バックテスト結果"],
      integration: ["証券会社API", "財務データベース", "経済指標API", "アラート配信"],
    },
    rating: 4.9,
    usageCount: 2100,
    createdDate: "2024-01-20",
    updatedDate: "2024-06-25",
    creator: "山田次郎",
    version: "3.2.0",
    complexity: "高",
    processingTime: "1-4分",
    accuracy: 94,
    isFavorite: true,
    isMySystem: false,
  },
  {
    id: "customer-analysis",
    name: "顧客分析システム",
    description: "顧客行動とニーズを分析し、マーケティング戦略を最適化するシステム",
    icon: Users,
    color: "bg-pink-500",
    category: "顧客分析",
    businessType: "マーケティング",
    workType: "顧客理解",
    industry: "小売業",
    agents: [
      "顧客セグメンテーションエージェント",
      "行動分析エージェント",
      "予測エージェント",
      "レコメンドエージェント",
    ],
    features: {
      uiux: ["顧客360度ビュー", "セグメント管理画面", "キャンペーン管理"],
      visualization: ["顧客分布マップ", "購買パターン分析", "LTV予測グラフ", "チャーン率推移"],
      integration: ["CRM連携", "EC サイト連携", "メール配信", "広告プラットフォーム"],
    },
    rating: 4.5,
    usageCount: 780,
    createdDate: "2024-02-28",
    updatedDate: "2024-06-10",
    creator: "鈴木一郎",
    version: "2.0.3",
    complexity: "中",
    processingTime: "2-6分",
    accuracy: 89,
    isFavorite: false,
    isMySystem: true,
  },
  {
    id: "supply-chain-analysis",
    name: "サプライチェーン分析システム",
    description: "サプライチェーン全体を可視化し、効率化と最適化を支援するシステム",
    icon: Layers,
    color: "bg-teal-500",
    category: "オペレーション分析",
    businessType: "製造・物流",
    workType: "業務最適化",
    industry: "製造業",
    agents: ["在庫管理エージェント", "需要予測エージェント", "調達最適化エージェント", "配送計画エージェント"],
    features: {
      uiux: ["サプライチェーンマップ", "在庫ダッシュボード", "アラート管理"],
      visualization: ["フローチャート", "在庫レベル推移", "コスト分析グラフ", "配送ルート最適化"],
      integration: ["ERP連携", "WMS連携", "IoTセンサー", "配送業者API"],
    },
    rating: 4.4,
    usageCount: 420,
    createdDate: "2024-03-15",
    updatedDate: "2024-06-12",
    creator: "高橋美咲",
    version: "1.7.0",
    complexity: "高",
    processingTime: "5-10分",
    accuracy: 91,
    isFavorite: true,
    isMySystem: false,
  },
]

// フィルター用の選択肢
const categories = [
  { value: "information-analysis", label: "情報分析" },
  { value: "market-analysis", label: "市場分析" },
  { value: "risk-management", label: "リスク管理" },
  { value: "investment-analysis", label: "投資分析" },
  { value: "customer-analysis", label: "顧客分析" },
  { value: "operation-analysis", label: "オペレーション分析" },
]

const businessTypes = [
  { value: "media-information", label: "メディア・情報" },
  { value: "consulting", label: "コンサルティング" },
  { value: "finance-insurance", label: "金融・保険" },
  { value: "investment-asset", label: "投資・資産管理" },
  { value: "marketing", label: "マーケティング" },
  { value: "manufacturing-logistics", label: "製造・物流" },
]

const workTypes = [
  { value: "analysis-report", label: "分析・レポート" },
  { value: "strategy-planning", label: "戦略立案" },
  { value: "risk-assessment", label: "リスク評価" },
  { value: "investment-decision", label: "投資判断" },
  { value: "customer-understanding", label: "顧客理解" },
  { value: "business-optimization", label: "業務最適化" },
]

const industries = [
  { value: "all-industries", label: "全業種" },
  { value: "manufacturing", label: "製造業" },
  { value: "finance", label: "金融業" },
  { value: "retail", label: "小売業" },
  { value: "it-telecom", label: "IT・通信" },
  { value: "healthcare", label: "ヘルスケア" },
  { value: "energy", label: "エネルギー" },
  { value: "real-estate", label: "不動産" },
]

const complexityLevels = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
]

const sortOptions = [
  { value: "rating", label: "評価順" },
  { value: "usage", label: "利用数順" },
  { value: "name", label: "名前順" },
  { value: "created", label: "作成日順" },
  { value: "updated", label: "更新日順" },
]

export default function AISystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [showMySystemsOnly, setShowMySystemsOnly] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // フィルター状態
  const [filters, setFilters] = useState({
    category: "",
    businessType: "",
    workType: "",
    industry: "",
    complexity: "",
    minRating: "",
  })

  const [analysisConfig, setAnalysisConfig] = useState({
    country: "",
    industry: "",
    sector: "",
    company: "",
    sources: [] as string[],
    period: "",
    customStartDate: "",
    customEndDate: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  // フィルター適用
  const filteredSystems = aiSystems.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.agents.some((agent) => agent.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !filters.category || system.category === filters.category
    const matchesBusinessType = !filters.businessType || system.businessType === filters.businessType
    const matchesWorkType = !filters.workType || system.workType === filters.workType
    const matchesIndustry = !filters.industry || system.industry === filters.industry
    const matchesComplexity = !filters.complexity || system.complexity === filters.complexity
    const matchesRating = !filters.minRating || system.rating >= Number.parseFloat(filters.minRating)
    const matchesMySystemsOnly = !showMySystemsOnly || system.isMySystem
    const matchesFavoritesOnly = !showFavoritesOnly || system.isFavorite

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBusinessType &&
      matchesWorkType &&
      matchesIndustry &&
      matchesComplexity &&
      matchesRating &&
      matchesMySystemsOnly &&
      matchesFavoritesOnly
    )
  })

  // ソート適用
  const sortedSystems = [...filteredSystems].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "usage":
        return b.usageCount - a.usageCount
      case "name":
        return a.name.localeCompare(b.name)
      case "created":
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      case "updated":
        return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
      default:
        return 0
    }
  })

  // アクティブフィルター数を計算
  const activeFiltersCount =
    Object.values(filters).filter((value) => value !== "").length +
    (showMySystemsOnly ? 1 : 0) +
    (showFavoritesOnly ? 1 : 0)

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId)
    setAnalysisResults(null)
  }

  const handleSourceToggle = (sourceId: string) => {
    setAnalysisConfig((prev) => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter((s) => s !== sourceId)
        : [...prev.sources, sourceId],
    }))
  }

  const toggleFavorite = (systemId: string) => {
    // 実際の実装では、ここでAPIを呼び出してお気に入り状態を更新
    console.log(`Toggle favorite for system: ${systemId}`)
  }

  const toggleMySystem = (systemId: string) => {
    // 実際の実装では、ここでAPIを呼び出してマイシステム状態を更新
    console.log(`Toggle my system for system: ${systemId}`)
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      businessType: "",
      workType: "",
      industry: "",
      complexity: "",
      minRating: "",
    })
    setShowMySystemsOnly(false)
    setShowFavoritesOnly(false)
  }

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // シミュレートされた分析プロセス
    const steps = [
      "システム初期化中...",
      "エージェント連携中...",
      "データ収集中...",
      "分析処理中...",
      "結果統合中...",
      "レポート生成中...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnalysisProgress((i + 1) * (100 / steps.length))
    }

    // サンプル分析結果
    setAnalysisResults({
      summary:
        "選択されたAIシステムによる分析が完了しました。複数のエージェントが連携して包括的な分析を実行し、高精度な結果を生成しました。",
      systemPerformance: {
        accuracy: 94,
        processingTime: "3分15秒",
        agentsUsed: 4,
        dataPoints: 15420,
      },
      agentResults: [
        { name: "データ収集エージェント", status: "完了", accuracy: 98, processingTime: "45秒" },
        { name: "分析エージェント", status: "完了", accuracy: 92, processingTime: "1分30秒" },
        { name: "可視化エージェント", status: "完了", accuracy: 96, processingTime: "50秒" },
        { name: "レポート生成エージェント", status: "完了", accuracy: 90, processingTime: "10秒" },
      ],
      insights: [
        { category: "トレンド", content: "上昇傾向が確認されました", confidence: 95 },
        { category: "リスク", content: "中程度のリスクが検出されました", confidence: 88 },
        { category: "機会", content: "新たなビジネス機会を特定しました", confidence: 92 },
      ],
    })

    setIsAnalyzing(false)
  }

  const selectedSystemData = aiSystems.find((s) => s.id === selectedSystem)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AIシステム</h1>
          <p className="text-muted-foreground mt-2">複数エージェントで構成される高度なAI分析システム群</p>
        </div>
      </div>

      {!selectedSystem ? (
        <div className="space-y-6">
          {/* 検索・フィルターセクション */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                システム検索・フィルター
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 検索バー */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="システム名、説明、エージェント名で検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="並び順" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  フィルター
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              {/* 詳細フィルター */}
              {showFilters && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>分類</Label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="分類を選択" />
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

                    <div className="space-y-2">
                      <Label>業態</Label>
                      <Select
                        value={filters.businessType}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="業態を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>業務タイプ</Label>
                      <Select
                        value={filters.workType}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, workType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="業務タイプを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {workTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>業種</Label>
                      <Select
                        value={filters.industry}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="業種を選択" />
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
                      <Label>複雑度</Label>
                      <Select
                        value={filters.complexity}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, complexity: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="複雑度を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {complexityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>最小評価</Label>
                      <Select
                        value={filters.minRating}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, minRating: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="最小評価を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4.5">4.5以上</SelectItem>
                          <SelectItem value="4.0">4.0以上</SelectItem>
                          <SelectItem value="3.5">3.5以上</SelectItem>
                          <SelectItem value="3.0">3.0以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="my-systems" checked={showMySystemsOnly} onCheckedChange={setShowMySystemsOnly} />
                        <Label htmlFor="my-systems">マイシステムのみ</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="favorites" checked={showFavoritesOnly} onCheckedChange={setShowFavoritesOnly} />
                        <Label htmlFor="favorites">お気に入りのみ</Label>
                      </div>
                    </div>
                    <Button variant="outline" onClick={clearFilters} size="sm">
                      <X className="h-4 w-4 mr-2" />
                      フィルタークリア
                    </Button>
                  </div>
                </div>
              )}

              {/* 検索結果サマリー */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{sortedSystems.length}件のシステムが見つかりました</span>
                {activeFiltersCount > 0 && <span>{activeFiltersCount}個のフィルターが適用されています</span>}
              </div>
            </CardContent>
          </Card>

          {/* システム一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSystems.map((system) => {
              const IconComponent = system.icon
              return (
                <Card
                  key={system.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 relative"
                  onClick={() => handleSystemSelect(system.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 ${system.color} rounded-lg flex items-center justify-center mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(system.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${system.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            // 共有機能
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg leading-tight">{system.name}</CardTitle>
                        {system.isMySystem && (
                          <Badge variant="secondary" className="text-xs">
                            マイシステム
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{system.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>{system.usageCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{system.agents.length}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm line-clamp-2">{system.description}</CardDescription>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {system.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {system.industry}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          複雑度: {system.complexity}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">構成エージェント</span>
                          <span className="font-medium">{system.agents.length}個</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {system.agents.slice(0, 2).map((agent, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                          ))}
                          {system.agents.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{system.agents.length - 2}個
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">処理時間: </span>
                          <span className="font-medium">{system.processingTime}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">精度: </span>
                          <span className="font-medium">{system.accuracy}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">作成者: </span>
                          <span className="font-medium">{system.creator}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">バージョン: </span>
                          <span className="font-medium">{system.version}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      システムを選択
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {sortedSystems.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">システムが見つかりません</h3>
                <p className="text-muted-foreground mb-4">検索条件を変更するか、フィルターをクリアしてください。</p>
                <Button variant="outline" onClick={clearFilters}>
                  フィルターをクリア
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedSystem(null)}>
              ← 戻る
            </Button>
            <div className="flex items-center gap-3">
              {selectedSystemData && (
                <>
                  <div className={`w-10 h-10 ${selectedSystemData.color} rounded-lg flex items-center justify-center`}>
                    <selectedSystemData.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSystemData.name}</h2>
                    <p className="text-muted-foreground">{selectedSystemData.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">システム概要</TabsTrigger>
              <TabsTrigger value="config">分析設定</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResults}>
                分析結果
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {selectedSystemData && (
                <>
                  {/* システム詳細情報 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Cpu className="h-5 w-5" />
                          システム情報
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">分類</Label>
                            <p className="font-medium">{selectedSystemData.category}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">業態</Label>
                            <p className="font-medium">{selectedSystemData.businessType}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">業務タイプ</Label>
                            <p className="font-medium">{selectedSystemData.workType}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">対象業種</Label>
                            <p className="font-medium">{selectedSystemData.industry}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">複雑度</Label>
                            <Badge variant="outline">{selectedSystemData.complexity}</Badge>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">処理時間</Label>
                            <p className="font-medium">{selectedSystemData.processingTime}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">評価・統計</Label>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{selectedSystemData.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-4 w-4" />
                              <span className="font-medium">
                                {selectedSystemData.usageCount.toLocaleString()}回利用
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span className="font-medium">精度{selectedSystemData.accuracy}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          構成エージェント
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedSystemData.agents.map((agent, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Zap className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{agent}</p>
                                <p className="text-xs text-muted-foreground">アクティブ</p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                v{selectedSystemData.version}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 機能詳細 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          UI/UX機能
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedSystemData.features.uiux.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5" />
                          可視化機能
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedSystemData.features.visualization.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Database className="h-5 w-5" />
                          連携機能
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedSystemData.features.integration.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* メタ情報 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        システム詳細情報
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">作成者</Label>
                          <p className="font-medium">{selectedSystemData.creator}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">バージョン</Label>
                          <p className="font-medium">{selectedSystemData.version}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">作成日</Label>
                          <p className="font-medium">
                            {new Date(selectedSystemData.createdDate).toLocaleDateString("ja-JP")}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">最終更新</Label>
                          <p className="font-medium">
                            {new Date(selectedSystemData.updatedDate).toLocaleDateString("ja-JP")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    分析条件設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">国・地域</Label>
                      <Select
                        value={analysisConfig.country}
                        onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="国を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="japan">日本</SelectItem>
                          <SelectItem value="usa">アメリカ</SelectItem>
                          <SelectItem value="china">中国</SelectItem>
                          <SelectItem value="europe">ヨーロッパ</SelectItem>
                          <SelectItem value="global">グローバル</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">産業</Label>
                      <Select
                        value={analysisConfig.industry}
                        onValueChange={(value) =>
                          setAnalysisConfig((prev) => ({ ...prev, industry: value, sector: "" }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="産業を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturing">製造業</SelectItem>
                          <SelectItem value="finance">金融業</SelectItem>
                          <SelectItem value="it-telecom">IT・通信</SelectItem>
                          <SelectItem value="retail">小売業</SelectItem>
                          <SelectItem value="healthcare">ヘルスケア</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">企業名</Label>
                      <Input
                        id="company"
                        placeholder="企業名を入力"
                        value={analysisConfig.company}
                        onChange={(e) => setAnalysisConfig((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>分析期間</Label>
                      <Select
                        value={analysisConfig.period}
                        onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, period: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="期間を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1week">過去1週間</SelectItem>
                          <SelectItem value="1month">過去1ヶ月</SelectItem>
                          <SelectItem value="3months">過去3ヶ月</SelectItem>
                          <SelectItem value="1year">過去1年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={startAnalysis}
                      disabled={isAnalyzing || !analysisConfig.company}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isAnalyzing ? "分析中..." : "システム実行"}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>システム実行状況</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <Progress value={analysisProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {analysisResults && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>システム実行結果</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          エクスポート
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{analysisResults.summary}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>システムパフォーマンス</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">精度</Label>
                            <p className="text-2xl font-bold">{analysisResults.systemPerformance.accuracy}%</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">処理時間</Label>
                            <p className="text-2xl font-bold">{analysisResults.systemPerformance.processingTime}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">使用エージェント</Label>
                            <p className="text-2xl font-bold">{analysisResults.systemPerformance.agentsUsed}個</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">処理データ数</Label>
                            <p className="text-2xl font-bold">
                              {analysisResults.systemPerformance.dataPoints.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>エージェント実行結果</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResults.agentResults.map((agent: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium text-sm">{agent.name}</div>
                              <div className="text-xs text-muted-foreground">処理時間: {agent.processingTime}</div>
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="mb-1">
                                {agent.status}
                              </Badge>
                              <div className="text-xs text-muted-foreground">精度: {agent.accuracy}%</div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>分析インサイト</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResults.insights.map((insight: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{insight.category}</Badge>
                            <span>{insight.content}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="w-20" />
                            <span className="text-sm text-muted-foreground">{insight.confidence}%</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
