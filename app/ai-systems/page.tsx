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
  Building2,
  Globe,
  FileText,
  MessageSquare,
  BarChart3,
  Star,
  Download,
  Play,
  Settings,
} from "lucide-react"

const aiSystems = [
  {
    id: "news-analysis",
    name: "ニュース分析",
    description: "企業・業界のニュースを包括的に分析し、重要な情報を抽出します",
    icon: Newspaper,
    color: "bg-blue-500",
  },
  {
    id: "market-analysis",
    name: "市場分析",
    description: "市場動向と競合状況を分析し、ビジネス機会を特定します",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    id: "risk-analysis",
    name: "リスク分析",
    description: "企業のリスク要因を評価し、潜在的な問題を特定します",
    icon: AlertTriangle,
    color: "bg-orange-500",
  },
  {
    id: "investment-analysis",
    name: "投資分析",
    description: "財務データと市場情報を基に投資判断を支援します",
    icon: DollarSign,
    color: "bg-purple-500",
  },
]

const countries = [
  { value: "japan", label: "日本" },
  { value: "usa", label: "アメリカ" },
  { value: "china", label: "中国" },
  { value: "europe", label: "ヨーロッパ" },
  { value: "global", label: "グローバル" },
]

const industries = [
  { value: "manufacturing", label: "製造業" },
  { value: "finance", label: "金融業" },
  { value: "it-telecom", label: "IT・通信" },
  { value: "retail", label: "小売業" },
  { value: "healthcare", label: "ヘルスケア" },
  { value: "energy", label: "エネルギー" },
  { value: "real-estate", label: "不動産" },
  { value: "transportation", label: "運輸・物流" },
]

const sectors = {
  manufacturing: ["自動車", "電子機器", "化学", "鉄鋼", "機械"],
  finance: ["銀行", "証券", "保険", "リース", "フィンテック"],
  "it-telecom": ["ソフトウェア", "ハードウェア", "通信", "インターネット", "AI・IoT"],
  retail: ["百貨店", "スーパー", "コンビニ", "EC", "アパレル"],
  healthcare: ["製薬", "医療機器", "病院", "バイオテック", "ヘルステック"],
  energy: ["石油・ガス", "電力", "再生可能エネルギー", "原子力", "エネルギー貯蔵"],
}

const informationSources = [
  { id: "news", label: "ニュース", icon: Newspaper },
  { id: "press", label: "プレスリリース", icon: FileText },
  { id: "website", label: "Webサイト", icon: Globe },
  { id: "sns", label: "SNS", icon: MessageSquare },
  { id: "securities", label: "有価証券報告書", icon: BarChart3 },
  { id: "integrated", label: "統合報告書", icon: Building2 },
]

const periods = [
  { value: "1week", label: "過去1週間" },
  { value: "1month", label: "過去1ヶ月" },
  { value: "3months", label: "過去3ヶ月" },
  { value: "1year", label: "過去1年" },
  { value: "custom", label: "カスタム期間" },
]

export default function AISystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
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

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // シミュレートされた分析プロセス
    const steps = [
      "データソースに接続中...",
      "情報を収集中...",
      "テキストを分析中...",
      "キーワードを抽出中...",
      "重要度を評価中...",
      "結果をまとめ中...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnalysisProgress((i + 1) * (100 / steps.length))
    }

    // サンプル分析結果
    setAnalysisResults({
      summary:
        "選択された企業について、過去1ヶ月間で重要なニュースが15件見つかりました。全体的にポジティブな傾向が見られ、新製品発表や業績向上に関する報道が多く確認されています。",
      keywords: [
        { word: "新製品", importance: 95, sentiment: "positive" },
        { word: "業績向上", importance: 88, sentiment: "positive" },
        { word: "市場拡大", importance: 82, sentiment: "positive" },
        { word: "投資", importance: 75, sentiment: "neutral" },
        { word: "競合", importance: 68, sentiment: "negative" },
      ],
      people: [
        { name: "田中太郎", role: "代表取締役社長", mentions: 8 },
        { name: "佐藤花子", role: "取締役CFO", mentions: 5 },
        { name: "山田次郎", role: "執行役員", mentions: 3 },
      ],
      categories: {
        positive: 60,
        neutral: 25,
        negative: 15,
      },
      importance: {
        high: 40,
        medium: 35,
        low: 25,
      },
      financialAnalysis:
        selectedSystem === "news-analysis" && analysisConfig.sources.includes("securities")
          ? {
              revenue: { value: "1,250億円", change: "+12.5%" },
              profit: { value: "180億円", change: "+8.3%" },
              roe: { value: "15.2%", rating: "優秀" },
              roa: { value: "8.7%", rating: "良好" },
              scores: {
                profitability: 85,
                safety: 78,
                growth: 92,
                efficiency: 81,
              },
            }
          : null,
    })

    setIsAnalyzing(false)
  }

  const selectedSystemData = aiSystems.find((s) => s.id === selectedSystem)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AIシステム</h1>
          <p className="text-muted-foreground mt-2">高度なAI分析システムで企業・市場情報を包括的に分析</p>
        </div>
      </div>

      {!selectedSystem ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiSystems.map((system) => {
            const IconComponent = system.icon
            return (
              <Card
                key={system.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSystemSelect(system.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${system.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{system.name}</CardTitle>
                  <CardDescription className="text-sm">{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">選択する</Button>
                </CardContent>
              </Card>
            )
          })}
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
                  <div
                    className={`w-10 h-10 ${selectedSystemData.color} rounded-full flex items-center justify-center`}
                  >
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

          <Tabs defaultValue="config" className="space-y-6">
            <TabsList>
              <TabsTrigger value="config">分析設定</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResults}>
                分析結果
              </TabsTrigger>
            </TabsList>

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
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
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
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sector">業種</Label>
                      <Select
                        value={analysisConfig.sector}
                        onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, sector: value }))}
                        disabled={!analysisConfig.industry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="業種を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {analysisConfig.industry &&
                            sectors[analysisConfig.industry as keyof typeof sectors]?.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
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
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>情報ソース</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {informationSources.map((source) => {
                        const IconComponent = source.icon
                        return (
                          <div key={source.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={source.id}
                              checked={analysisConfig.sources.includes(source.id)}
                              onCheckedChange={() => handleSourceToggle(source.id)}
                            />
                            <Label htmlFor={source.id} className="flex items-center gap-2 cursor-pointer">
                              <IconComponent className="h-4 w-4" />
                              {source.label}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>分析期間</Label>
                    <Select
                      value={analysisConfig.period}
                      onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, period: value }))}
                    >
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue placeholder="期間を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {analysisConfig.period === "custom" && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">開始日</Label>
                          <Input
                            id="start-date"
                            type="date"
                            value={analysisConfig.customStartDate}
                            onChange={(e) =>
                              setAnalysisConfig((prev) => ({ ...prev, customStartDate: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">終了日</Label>
                          <Input
                            id="end-date"
                            type="date"
                            value={analysisConfig.customEndDate}
                            onChange={(e) => setAnalysisConfig((prev) => ({ ...prev, customEndDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={startAnalysis}
                      disabled={isAnalyzing || !analysisConfig.company || analysisConfig.sources.length === 0}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isAnalyzing ? "分析中..." : "分析開始"}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>分析進行状況</span>
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
                        <span>分析結果サマリー</span>
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
                        <CardTitle>キーワード分析</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResults.keywords.map((keyword: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{keyword.word}</span>
                              <Badge
                                variant={
                                  keyword.sentiment === "positive"
                                    ? "default"
                                    : keyword.sentiment === "negative"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {keyword.sentiment === "positive"
                                  ? "ポジティブ"
                                  : keyword.sentiment === "negative"
                                    ? "ネガティブ"
                                    : "ニュートラル"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={keyword.importance} className="w-20" />
                              <span className="text-sm text-muted-foreground">{keyword.importance}%</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>登場人物</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResults.people.map((person: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{person.name}</div>
                              <div className="text-sm text-muted-foreground">{person.role}</div>
                            </div>
                            <Badge variant="outline">{person.mentions}回言及</Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>情報分類</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>ポジティブ</span>
                            <span>{analysisResults.categories.positive}%</span>
                          </div>
                          <Progress value={analysisResults.categories.positive} className="bg-green-100" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>ニュートラル</span>
                            <span>{analysisResults.categories.neutral}%</span>
                          </div>
                          <Progress value={analysisResults.categories.neutral} className="bg-gray-100" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>ネガティブ</span>
                            <span>{analysisResults.categories.negative}%</span>
                          </div>
                          <Progress value={analysisResults.categories.negative} className="bg-red-100" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>重要度評価</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              高重要度
                            </span>
                            <span>{analysisResults.importance.high}%</span>
                          </div>
                          <Progress value={analysisResults.importance.high} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>中重要度</span>
                            <span>{analysisResults.importance.medium}%</span>
                          </div>
                          <Progress value={analysisResults.importance.medium} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>低重要度</span>
                            <span>{analysisResults.importance.low}%</span>
                          </div>
                          <Progress value={analysisResults.importance.low} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {analysisResults.financialAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle>財務分析・総合評価</CardTitle>
                        <CardDescription>有価証券報告書に基づく財務分析結果</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResults.financialAnalysis.revenue.value}</div>
                            <div className="text-sm text-muted-foreground">売上高</div>
                            <Badge variant="default" className="mt-1">
                              {analysisResults.financialAnalysis.revenue.change}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResults.financialAnalysis.profit.value}</div>
                            <div className="text-sm text-muted-foreground">純利益</div>
                            <Badge variant="default" className="mt-1">
                              {analysisResults.financialAnalysis.profit.change}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResults.financialAnalysis.roe.value}</div>
                            <div className="text-sm text-muted-foreground">ROE</div>
                            <Badge variant="default" className="mt-1">
                              {analysisResults.financialAnalysis.roe.rating}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResults.financialAnalysis.roa.value}</div>
                            <div className="text-sm text-muted-foreground">ROA</div>
                            <Badge variant="default" className="mt-1">
                              {analysisResults.financialAnalysis.roa.rating}
                            </Badge>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-semibold">評価軸別スコア</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>収益性</span>
                                <span>{analysisResults.financialAnalysis.scores.profitability}点</span>
                              </div>
                              <Progress value={analysisResults.financialAnalysis.scores.profitability} />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>安全性</span>
                                <span>{analysisResults.financialAnalysis.scores.safety}点</span>
                              </div>
                              <Progress value={analysisResults.financialAnalysis.scores.safety} />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>成長性</span>
                                <span>{analysisResults.financialAnalysis.scores.growth}点</span>
                              </div>
                              <Progress value={analysisResults.financialAnalysis.scores.growth} />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>効率性</span>
                                <span>{analysisResults.financialAnalysis.scores.efficiency}点</span>
                              </div>
                              <Progress value={analysisResults.financialAnalysis.scores.efficiency} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
