"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Globe,
  Database,
  FileText,
  Download,
  Copy,
  Settings,
  Loader2,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Clock,
  Filter,
  Target,
  Star,
  CheckCircle,
  AlertCircle,
  X,
  Trophy,
  Award,
  Medal,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SiteResult {
  id: number
  rank: number
  url: string
  title: string
  description: string
  relevanceScore: number
  importanceScore: number
  trustScore: number
  authorityScore: number
  freshnessScore: number
  overallScore: number
  category: string
  lastUpdated: string
  selected: boolean
  domain: string
  pageRank: number
  trafficRank: number
}

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [searchSource, setSearchSource] = useState("web")
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [generatedReport, setGeneratedReport] = useState("")
  const [showSiteSelector, setShowSiteSelector] = useState(false)
  const [siteSearchQuery, setSiteSearchQuery] = useState("")
  const [isSiteSearching, setIsSiteSearching] = useState(false)
  const [siteResults, setSiteResults] = useState<SiteResult[]>([])
  const [selectedSites, setSelectedSites] = useState<SiteResult[]>([])
  const [siteOnlyMode, setSiteOnlyMode] = useState(false)
  const { toast } = useToast()

  const models = [
    { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI" },
    { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic" },
    { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },
  ]

  const knowledgeSources = [
    { value: "documents", label: "ドキュメント", count: 1248 },
    { value: "database", label: "データベース", count: 567 },
    { value: "prompts", label: "プロンプト", count: 89 },
  ]

  // よく検索する内容
  const frequentSearches = [
    { id: 1, query: "金融政策の最新動向", count: 15 },
    { id: 2, query: "ESG投資の評価基準", count: 12 },
    { id: 3, query: "デジタル通貨の規制", count: 10 },
    { id: 4, query: "市場リスク分析手法", count: 8 },
    { id: 5, query: "金融商品の自動評価", count: 7 },
  ]

  // 人気の検索内容
  const popularSearches = [
    { id: 1, query: "AIによる市場予測", count: 245, trend: "up" },
    { id: 2, query: "サステナブルファイナンス", count: 189, trend: "up" },
    { id: 3, query: "量子コンピューティングと金融", count: 156, trend: "stable" },
    { id: 4, query: "ブロックチェーン技術の応用", count: 132, trend: "down" },
    { id: 5, query: "レギュレーションテック最新動向", count: 118, trend: "up" },
  ]

  // 検索先設定オプション
  const searchTargets = [
    { value: "all", label: "すべて" },
    { value: "news", label: "ニュース" },
    { value: "academic", label: "学術論文" },
    { value: "financial", label: "金融データ" },
    { value: "regulatory", label: "規制情報" },
    { value: "custom", label: "カスタム設定" },
  ]

  // サンプル検索結果
  const sampleResults = [
    {
      id: 1,
      title: "日本の金融政策の現状と今後の展望",
      url: "https://example.com/article1",
      snippet: "日本銀行は金融政策決定会合において、現行の金融緩和政策を継続することを決定した...",
      source: "日本経済新聞",
      depth: 1,
      relevance: 0.95,
    },
    {
      id: 2,
      title: "ESG投資の動向と企業への影響",
      url: "https://example.com/article2",
      snippet: "ESG投資が急速に拡大する中、企業は環境・社会・ガバナンス要素を重視した経営が求められている...",
      source: "金融庁レポート",
      depth: 2,
      relevance: 0.89,
    },
    {
      id: 3,
      title: "デジタル通貨の技術的課題と解決策",
      url: "https://example.com/article3",
      snippet: "中央銀行デジタル通貨（CBDC）の実装において、技術的な課題が多数存在している...",
      source: "技術レポート",
      depth: 3,
      relevance: 0.82,
    },
  ]

  // 拡張されたサンプルサイト検索結果（20サイト）
  const generateSiteResults = (query: string): SiteResult[] => {
    const baseSites = [
      {
        id: 1,
        url: "https://www.boj.or.jp",
        title: "日本銀行",
        description: "日本の中央銀行として金融政策、金融システムの安定に関する公式情報を提供",
        category: "政府・公的機関",
        domain: "boj.or.jp",
        pageRank: 9.2,
        trafficRank: 1250,
      },
      {
        id: 2,
        url: "https://www.nikkei.com",
        title: "日本経済新聞",
        description: "日本の経済・金融に関する最新ニュースと分析記事を提供する信頼性の高いメディア",
        category: "ニュース・メディア",
        domain: "nikkei.com",
        pageRank: 8.9,
        trafficRank: 85,
      },
      {
        id: 3,
        url: "https://www.fsa.go.jp",
        title: "金融庁",
        description: "金融行政、金融規制に関する公式情報と政策文書を提供する政府機関",
        category: "政府・公的機関",
        domain: "fsa.go.jp",
        pageRank: 9.1,
        trafficRank: 2100,
      },
      {
        id: 4,
        url: "https://www.bloomberg.co.jp",
        title: "Bloomberg Japan",
        description: "グローバルな金融市場情報と経済分析を提供する国際的な金融情報サービス",
        category: "金融情報サービス",
        domain: "bloomberg.co.jp",
        pageRank: 8.7,
        trafficRank: 120,
      },
      {
        id: 5,
        url: "https://www.reuters.com/markets/",
        title: "Reuters Markets",
        description: "世界の金融市場に関するリアルタイムニュースと分析を提供",
        category: "国際ニュース",
        domain: "reuters.com",
        pageRank: 8.8,
        trafficRank: 95,
      },
      {
        id: 6,
        url: "https://www.imf.org",
        title: "国際通貨基金 (IMF)",
        description: "世界経済の安定と成長に関する政策提言と経済分析を提供する国際機関",
        category: "国際機関",
        domain: "imf.org",
        pageRank: 9.0,
        trafficRank: 1800,
      },
      {
        id: 7,
        url: "https://www.bis.org",
        title: "国際決済銀行 (BIS)",
        description: "中央銀行間の協力促進と金融システムの安定に関する研究・政策提言",
        category: "国際機関",
        domain: "bis.org",
        pageRank: 8.9,
        trafficRank: 3200,
      },
      {
        id: 8,
        url: "https://www.jsda.or.jp",
        title: "日本証券業協会",
        description: "証券業界の自主規制機関として市場の健全性確保と投資家保護を推進",
        category: "業界団体",
        domain: "jsda.or.jp",
        pageRank: 8.2,
        trafficRank: 4500,
      },
      {
        id: 9,
        url: "https://www.jbaudit.go.jp",
        title: "会計検査院",
        description: "国の財政運営と会計経理の適正性を検査する独立機関",
        category: "政府・公的機関",
        domain: "jbaudit.go.jp",
        pageRank: 8.5,
        trafficRank: 5200,
      },
      {
        id: 10,
        url: "https://www.mof.go.jp",
        title: "財務省",
        description: "国の財政政策、税制、国際金融に関する政策立案と実施を担当",
        category: "政府・公的機関",
        domain: "mof.go.jp",
        pageRank: 8.8,
        trafficRank: 1600,
      },
      {
        id: 11,
        url: "https://www.mizuho-ri.co.jp",
        title: "みずほ総合研究所",
        description: "経済・金融・政策分野の調査研究とコンサルティングサービスを提供",
        category: "シンクタンク",
        domain: "mizuho-ri.co.jp",
        pageRank: 7.8,
        trafficRank: 8500,
      },
      {
        id: 12,
        url: "https://www.nri.com",
        title: "野村総合研究所",
        description: "IT・金融・経営に関する総合的なコンサルティングと調査研究",
        category: "シンクタンク",
        domain: "nri.com",
        pageRank: 8.1,
        trafficRank: 3800,
      },
      {
        id: 13,
        url: "https://www.daiwa-grp.jp/daiwa-sb/",
        title: "大和証券",
        description: "証券取引、投資銀行業務、資産管理サービスを提供する総合証券会社",
        category: "金融機関",
        domain: "daiwa-grp.jp",
        pageRank: 7.9,
        trafficRank: 2800,
      },
      {
        id: 14,
        url: "https://www.nomura.com",
        title: "野村證券",
        description: "投資銀行業務、証券取引、資産運用サービスを提供するグローバル金融機関",
        category: "金融機関",
        domain: "nomura.com",
        pageRank: 8.0,
        trafficRank: 2200,
      },
      {
        id: 15,
        url: "https://www.smbc.co.jp",
        title: "三井住友銀行",
        description: "個人・法人向け銀行サービスと国際金融業務を提供するメガバンク",
        category: "金融機関",
        domain: "smbc.co.jp",
        pageRank: 8.3,
        trafficRank: 450,
      },
      {
        id: 16,
        url: "https://www.mizuhobank.co.jp",
        title: "みずほ銀行",
        description: "総合金融サービスを提供する日本の主要銀行の一つ",
        category: "金融機関",
        domain: "mizuhobank.co.jp",
        pageRank: 8.2,
        trafficRank: 520,
      },
      {
        id: 17,
        url: "https://www.bk.mufg.jp",
        title: "三菱UFJ銀行",
        description: "国内最大級の総合金融グループの中核銀行",
        category: "金融機関",
        domain: "bk.mufg.jp",
        pageRank: 8.4,
        trafficRank: 380,
      },
      {
        id: 18,
        url: "https://www.jiji.com/jc/list?g=eco",
        title: "時事通信 経済ニュース",
        description: "経済・金融分野の最新ニュースと市場動向を迅速に配信",
        category: "ニュース・メディア",
        domain: "jiji.com",
        pageRank: 7.6,
        trafficRank: 650,
      },
      {
        id: 19,
        url: "https://www.asahi.com/business/",
        title: "朝日新聞デジタル 経済",
        description: "経済・ビジネス分野の詳細な分析記事とニュースを提供",
        category: "ニュース・メディア",
        domain: "asahi.com",
        pageRank: 8.1,
        trafficRank: 180,
      },
      {
        id: 20,
        url: "https://www.yomiuri.co.jp/economy/",
        title: "読売新聞オンライン 経済",
        description: "経済政策、市場動向、企業ニュースを幅広くカバー",
        category: "ニュース・メディア",
        domain: "yomiuri.co.jp",
        pageRank: 8.0,
        trafficRank: 220,
      },
    ]

    // クエリに基づいてスコアを計算
    return baseSites
      .map((site, index) => {
        // 関連度スコア（クエリとの関連性）
        const relevanceScore = Math.max(0.6, Math.random() * 0.4 + 0.6)

        // 重要度スコア（サイトの権威性）
        const importanceScore = site.pageRank / 10

        // 信頼度スコア（カテゴリベース）
        const trustScore =
          site.category === "政府・公的機関"
            ? 1.0
            : site.category === "国際機関"
              ? 0.98
              : site.category === "金融機関"
                ? 0.92
                : site.category === "ニュース・メディア"
                  ? 0.88
                  : site.category === "シンクタンク"
                    ? 0.85
                    : 0.8

        // 権威性スコア（PageRankベース）
        const authorityScore = site.pageRank / 10

        // 新鮮度スコア（ランダム生成）
        const freshnessScore = Math.max(0.7, Math.random() * 0.3 + 0.7)

        // 総合スコア計算（重み付き平均）
        const overallScore =
          relevanceScore * 0.3 +
          importanceScore * 0.25 +
          trustScore * 0.2 +
          authorityScore * 0.15 +
          freshnessScore * 0.1

        return {
          ...site,
          rank: index + 1,
          relevanceScore,
          importanceScore,
          trustScore,
          authorityScore,
          freshnessScore,
          overallScore,
          lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          selected: false,
        }
      })
      .sort((a, b) => b.overallScore - a.overallScore)
      .map((site, index) => ({ ...site, rank: index + 1 }))
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "エラー",
        description: "検索クエリを入力してください。",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setSearchProgress(0)
    setSearchResults([])
    setGeneratedReport("")

    // 検索プロセスのシミュレーション
    const steps =
      siteOnlyMode && selectedSites.length > 0
        ? [
            "選択されたサイトを分析中...",
            "指定サイトからデータを抽出中...",
            "コンテンツを収集中...",
            "関連情報を抽出中...",
            "AIモデルで分析中...",
            "レポートを生成中...",
          ]
        : [
            "検索クエリを分析中...",
            "Web検索を実行中...",
            "検索結果を収集中...",
            "深層スクレイピングを実行中...",
            "関連情報を抽出中...",
            "AIモデルで分析中...",
            "レポートを生成中...",
          ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSearchProgress(((i + 1) / steps.length) * 100)

      if (i === 2) {
        // 検索結果を表示
        setSearchResults(sampleResults)
      }
    }

    // レポート生成
    const siteInfo =
      siteOnlyMode && selectedSites.length > 0
        ? `\n\n## 使用したサイト\n${selectedSites.map((site) => `- ${site.title} (${site.url}) - スコア: ${(site.overallScore * 100).toFixed(1)}`).join("\n")}\n`
        : ""

    const report = `# AI検索レポート: ${searchQuery}

## 概要
検索クエリ「${searchQuery}」に関して、${siteOnlyMode && selectedSites.length > 0 ? "指定された信頼できるサイト" : "Web上の10以上の情報源"}から収集した情報を分析し、以下のレポートを作成しました。${siteInfo}

## 主要な発見事項

### 1. 現状分析
- 日本の金融政策は現在も緩和的な姿勢を維持している
- ESG投資の重要性が企業経営において急速に高まっている
- デジタル通貨の技術的課題が注目されている

### 2. 市場動向
- 金融市場では政策変更への注目が高まっている
- 投資家のESGへの関心が継続的に増加している
- 中央銀行デジタル通貨の研究開発が進展している

### 3. 今後の展望
- 金融政策の正常化に向けた議論が活発化する可能性
- ESG投資の制度整備が進むと予想される
- デジタル通貨の実用化に向けた技術開発が加速

## 詳細分析

### 金融政策の動向
日本銀行の金融政策決定会合では、現行の大規模金融緩和政策の継続が決定されました。これは、インフレ目標の達成と経済の持続的成長を支援するための措置です。

### ESG投資の拡大
ESG投資は世界的に拡大しており、日本でも企業のESG経営への取り組みが重要視されています。投資家は財務指標だけでなく、環境・社会・ガバナンス要素を重視した投資判断を行っています。

### デジタル通貨の技術課題
中央銀行デジタル通貨（CBDC）の実装には、プライバシー保護、セキュリティ、スケーラビリティなどの技術的課題があります。これらの課題解決に向けた研究開発が進められています。

## 結論
${searchQuery}に関する調査結果から、金融業界は大きな変革期にあることが明らかになりました。政策、投資、技術の各分野で重要な動きが見られ、今後の動向に注目が必要です。

---
*このレポートは${selectedModel}を使用して生成されました。*
*検索実行日時: ${new Date().toLocaleString("ja-JP")}*
${siteOnlyMode && selectedSites.length > 0 ? `*厳選された${selectedSites.length}サイトのみを使用*` : ""}`

    setGeneratedReport(report)
    setIsSearching(false)

    toast({
      title: "検索完了",
      description:
        siteOnlyMode && selectedSites.length > 0
          ? `指定された${selectedSites.length}サイトからAIレポートが生成されました。`
          : "AIレポートが生成されました。",
    })
  }

  const handleSiteSearch = async () => {
    if (!siteSearchQuery.trim()) {
      toast({
        title: "エラー",
        description: "検索キーワードを入力してください。",
        variant: "destructive",
      })
      return
    }

    setIsSiteSearching(true)
    setSiteResults([])

    // サイト検索のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // 検索クエリに基づいてサイト結果を生成
    const results = generateSiteResults(siteSearchQuery)
    setSiteResults(results)
    setIsSiteSearching(false)

    toast({
      title: "サイト検索完了",
      description: `${results.length}件の関連サイトが見つかりました。総合スコア順に表示されています。`,
    })
  }

  const handleSiteSelection = (site: SiteResult, selected: boolean) => {
    if (selected) {
      setSelectedSites((prev) => [...prev, { ...site, selected: true }])
    } else {
      setSelectedSites((prev) => prev.filter((s) => s.id !== site.id))
    }

    setSiteResults((prev) => prev.map((s) => (s.id === site.id ? { ...s, selected } : s)))
  }

  const handleRemoveSelectedSite = (siteId: number) => {
    setSelectedSites((prev) => prev.filter((s) => s.id !== siteId))
    setSiteResults((prev) => prev.map((s) => (s.id === siteId ? { ...s, selected: false } : s)))
  }

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generatedReport)
    toast({
      title: "コピーしました",
      description: "レポートがクリップボードにコピーされました。",
    })
  }

  const handleDownloadReport = () => {
    const blob = new Blob([generatedReport], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-search-report-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "ダウンロード開始",
      description: "レポートファイルのダウンロードを開始しました。",
    })
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
  }

  const getTrustBadgeColor = (score: number) => {
    if (score >= 0.95) return "bg-green-100 text-green-800"
    if (score >= 0.9) return "bg-blue-100 text-blue-800"
    if (score >= 0.8) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-yellow-500" />
    if (rank === 2) return <Award className="h-4 w-4 text-gray-400" />
    if (rank === 3) return <Medal className="h-4 w-4 text-amber-600" />
    return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return "text-green-600 font-semibold"
    if (score >= 0.8) return "text-blue-600 font-medium"
    if (score >= 0.7) return "text-yellow-600"
    return "text-gray-600"
  }

  const handleSiteButtonClick = () => {
    setShowSiteSelector(true)
    // 検索クエリが入力されている場合は自動的にサイト検索を実行
    if (searchQuery.trim()) {
      setSiteSearchQuery(searchQuery)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI検索</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 検索設定パネル */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>検索設定</CardTitle>
              <CardDescription>AIモデルと検索ソースを選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>検索クエリ</Label>
                <Textarea
                  placeholder="検索したい内容を入力してください..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>AIモデル</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{model.provider}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>検索ソース</Label>
                <Select value={searchSource} onValueChange={setSearchSource}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Web検索
                      </div>
                    </SelectItem>
                    <SelectItem value="knowledge">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        ナレッジベース
                      </div>
                    </SelectItem>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Web + ナレッジ
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(searchSource === "web" || searchSource === "both") && (
                <>
                  <div className="space-y-2">
                    <Label>検索先設定</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {searchTargets.map((target) => (
                          <SelectItem key={target.value} value={target.value}>
                            {target.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* サイト指定ボタン */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleSiteButtonClick}>
                      <Target className="mr-2 h-4 w-4" />
                      サイト指定
                      {selectedSites.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedSites.length}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  {/* 選択されたサイトのみ使用オプション */}
                  {selectedSites.length > 0 && (
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Checkbox id="site-only-mode" checked={siteOnlyMode} onCheckedChange={setSiteOnlyMode} />
                      <Label htmlFor="site-only-mode" className="text-sm">
                        選択したサイトのみを使用
                      </Label>
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </>
              )}

              {(searchSource === "knowledge" || searchSource === "both") && (
                <div className="space-y-2">
                  <Label>ナレッジソース</Label>
                  <div className="space-y-2">
                    {knowledgeSources.map((source) => (
                      <div key={source.value} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">{source.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {source.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleSearch} disabled={isSearching} className="w-full">
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    検索中...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    検索開始
                  </>
                )}
              </Button>

              {isSearching && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>進行状況</span>
                    <span>{Math.round(searchProgress)}%</span>
                  </div>
                  <Progress value={searchProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* よく検索する内容 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">よく検索する内容</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {frequentSearches.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleQuickSearch(item.query)}
                >
                  <span className="text-sm">{item.query}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.count}回
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                すべて表示
              </Button>
            </CardFooter>
          </Card>

          {/* 人気の検索内容 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">人気の検索内容</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularSearches.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleQuickSearch(item.query)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.query}</span>
                    {item.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {item.trend === "down" && <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                すべて表示
              </Button>
            </CardFooter>
          </Card>

          {searchSource === "web" || searchSource === "both" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Web検索設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>検索結果数</span>
                  <span>10+ 件</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>スクレイピング深度</span>
                  <span>10層</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>言語フィルター</span>
                  <span>日本語・英語</span>
                </div>
                {siteOnlyMode && selectedSites.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>指定サイト数</span>
                    <span className="text-blue-600 font-medium">{selectedSites.length} サイト</span>
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                  <Filter className="mr-2 h-3 w-3" />
                  詳細設定
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* 結果表示エリア */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="report">
            <TabsList>
              <TabsTrigger value="report">AIレポート</TabsTrigger>
              <TabsTrigger value="sources">検索結果</TabsTrigger>
            </TabsList>

            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>生成されたレポート</CardTitle>
                      <CardDescription>
                        {siteOnlyMode && selectedSites.length > 0
                          ? `厳選された${selectedSites.length}サイト（平均スコア: ${((selectedSites.reduce((sum, site) => sum + site.overallScore, 0) / selectedSites.length) * 100).toFixed(0)}）からAIが分析して作成したレポート`
                          : "AIが検索結果を分析して作成したレポート"}
                      </CardDescription>
                    </div>
                    {generatedReport && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyReport}>
                          <Copy className="mr-2 h-4 w-4" />
                          コピー
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                          <Download className="mr-2 h-4 w-4" />
                          ダウンロード
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedReport ? (
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm">{generatedReport}</pre>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="mx-auto h-12 w-12 mb-4" />
                      <p>検索を実行するとAIレポートが生成されます</p>
                      {siteOnlyMode && selectedSites.length > 0 && (
                        <p className="text-sm mt-2 text-blue-600">
                          厳選された{selectedSites.length}サイト（平均スコア:{" "}
                          {(
                            (selectedSites.reduce((sum, site) => sum + site.overallScore, 0) / selectedSites.length) *
                            100
                          ).toFixed(0)}
                          ）のみを使用してレポートを生成します
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources">
              <Card>
                <CardHeader>
                  <CardTitle>検索結果</CardTitle>
                  <CardDescription>収集された情報源と関連度</CardDescription>
                </CardHeader>
                <CardContent>
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <div key={result.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-lg">{result.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">深度 {result.depth}</Badge>
                              <Badge variant="outline">関連度 {(result.relevance * 100).toFixed(0)}%</Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{result.snippet}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>出典: {result.source}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              詳細を見る
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="mx-auto h-12 w-12 mb-4" />
                      <p>検索結果がここに表示されます</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={showSiteSelector} onOpenChange={setShowSiteSelector}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>信頼できるサイトを指定</DialogTitle>
            <DialogDescription>
              検索キーワードに基づいて関連サイトを20件検索し、スコア順にランキング表示します。信頼できるサイトを選択してください。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* サイト検索 */}
            <div className="flex gap-2">
              <Input
                placeholder="サイト検索キーワードを入力（例：金融政策、ESG投資、デジタル通貨）"
                value={siteSearchQuery}
                onChange={(e) => setSiteSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSiteSearch} disabled={isSiteSearching}>
                {isSiteSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>

            {/* 選択されたサイト */}
            {selectedSites.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">選択されたサイト ({selectedSites.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSites.map((site) => (
                    <Badge key={site.id} variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {site.title}
                      <span className="text-xs">({(site.overallScore * 100).toFixed(0)})</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveSelectedSite(site.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* サイト検索結果 */}
            {siteResults.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    検索結果 ({siteResults.length}件) - 総合スコア順ランキング
                  </Label>
                  <div className="text-xs text-muted-foreground">関連度・重要度・信頼度・権威性・新鮮度で評価</div>
                </div>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {siteResults.map((site) => (
                    <div key={site.id} className="border rounded-lg p-4 space-y-3 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={site.selected}
                            onCheckedChange={(checked) => handleSiteSelection(site, checked as boolean)}
                          />
                          <div className="flex items-center gap-2">{getRankIcon(site.rank)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{site.title}</h4>
                              <Badge className={getTrustBadgeColor(site.trustScore)}>
                                信頼度 {(site.trustScore * 100).toFixed(0)}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {site.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{site.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="font-mono">{site.domain}</span>
                              <span>PageRank: {site.pageRank.toFixed(1)}</span>
                              <span>更新: {site.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className={`text-lg font-bold ${getScoreColor(site.overallScore)}`}>
                              {(site.overallScore * 100).toFixed(0)}
                            </span>
                          </div>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>関連度:</span>
                              <span className="font-medium">{(site.relevanceScore * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>重要度:</span>
                              <span className="font-medium">{(site.importanceScore * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>権威性:</span>
                              <span className="font-medium">{(site.authorityScore * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>新鮮度:</span>
                              <span className="font-medium">{(site.freshnessScore * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSiteSearching && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">関連サイトを検索中...</p>
                <p className="text-xs text-muted-foreground mt-1">20サイトをスコア順にランキング中</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
