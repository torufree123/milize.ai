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
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [searchSource, setSearchSource] = useState("web")
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [generatedReport, setGeneratedReport] = useState("")
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
    const steps = [
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
    const report = `# AI検索レポート: ${searchQuery}

## 概要
検索クエリ「${searchQuery}」に関して、Web上の10以上の情報源から収集した情報を分析し、以下のレポートを作成しました。

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
*検索実行日時: ${new Date().toLocaleString("ja-JP")}*`

    setGeneratedReport(report)
    setIsSearching(false)

    toast({
      title: "検索完了",
      description: "AIレポートが生成されました。",
    })
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
                <Button variant="outline" size="sm" className="w-full mt-2">
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
                      <CardDescription>AIが検索結果を分析して作成したレポート</CardDescription>
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
    </div>
  )
}
