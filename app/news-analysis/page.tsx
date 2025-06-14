"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import {
  CalendarIcon,
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Info,
  Settings,
  Newspaper,
  Clock,
  Tag,
  Zap,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
} from "lucide-react"

export default function NewsAnalysisPage() {
  // 状態管理
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30)),
  )
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(new Date())
  const [keywords, setKeywords] = useState<string[]>(["AI", "金融", "投資"])
  const [newKeyword, setNewKeyword] = useState("")
  const [selectedSources, setSelectedSources] = useState<string[]>(["major-media"])
  const [analysisType, setAnalysisType] = useState("sentiment")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [summaryLength, setSummaryLength] = useState("standard")

  // 分析開始
  const startAnalysis = () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep("データ収集中...")
    setAnalysisComplete(false)

    // 分析プロセスのシミュレーション
    const steps = [
      { step: "データ収集中...", duration: 1500 },
      { step: "ニュース記事の前処理中...", duration: 2000 },
      { step: "感情分析実行中...", duration: 2500 },
      { step: "トレンド分析中...", duration: 2000 },
      { step: "キーワード抽出中...", duration: 1500 },
      { step: "レポート生成中...", duration: 1500 },
    ]

    let currentProgress = 0
    let stepIndex = 0

    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex].step)
        stepIndex++
      }

      currentProgress += Math.random() * 15 + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
        setCurrentStep("分析完了")
      }
      setProgress(Math.min(currentProgress, 100))
    }, 2000)
  }

  // キーワード追加
  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()])
      setNewKeyword("")
    }
  }

  // キーワード削除
  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  // ニュースソース切り替え
  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((s) => s !== source))
    } else {
      setSelectedSources([...selectedSources, source])
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ニュース分析</h1>
          <p className="text-muted-foreground">
            ニュース記事を分析して、トレンド、感情、キーワードなどの洞察を得ることができます
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            分析履歴
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            設定
          </Button>
        </div>
      </div>

      {/* 分析設定 */}
      <Card>
        <CardHeader>
          <CardTitle>分析設定</CardTitle>
          <CardDescription>分析対象のニュースソース、期間、キーワードを設定します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ニュースソース */}
          <div className="space-y-2">
            <Label>ニュースソース</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSources.includes("major-media") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource("major-media")}
              >
                主要メディア
              </Button>
              <Button
                variant={selectedSources.includes("financial-news") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource("financial-news")}
              >
                金融ニュース
              </Button>
              <Button
                variant={selectedSources.includes("tech-news") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource("tech-news")}
              >
                テクノロジーニュース
              </Button>
              <Button
                variant={selectedSources.includes("blogs") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource("blogs")}
              >
                ブログ
              </Button>
              <Button
                variant={selectedSources.includes("social-media") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSource("social-media")}
              >
                ソーシャルメディア
              </Button>
            </div>
          </div>

          {/* 期間設定 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>開始日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedStartDate ? (
                      format(selectedStartDate, "yyyy年MM月dd日", { locale: ja })
                    ) : (
                      <span>日付を選択</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedStartDate} onSelect={setSelectedStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>終了日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedEndDate ? (
                      format(selectedEndDate, "yyyy年MM月dd日", { locale: ja })
                    ) : (
                      <span>日付を選択</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedEndDate} onSelect={setSelectedEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* キーワード */}
          <div className="space-y-2">
            <Label>キーワード</Label>
            <div className="flex gap-2">
              <Input
                placeholder="キーワードを入力..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              />
              <Button onClick={addKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="px-2 py-1">
                  {keyword}
                  <button onClick={() => removeKeyword(keyword)} className="ml-2">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* 分析タイプ */}
          <div className="space-y-2">
            <Label>分析タイプ</Label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger>
                <SelectValue placeholder="分析タイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sentiment">感情分析</SelectItem>
                <SelectItem value="trend">トレンド分析</SelectItem>
                <SelectItem value="competitor">競合分析</SelectItem>
                <SelectItem value="topic">トピック分析</SelectItem>
                <SelectItem value="comprehensive">総合分析</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 詳細オプション */}
          <div>
            <Button variant="ghost" className="px-0" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
              {showAdvancedOptions ? (
                <ChevronDown className="mr-2 h-4 w-4" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4" />
              )}
              詳細オプション
            </Button>
            {showAdvancedOptions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>言語</Label>
                  <Select defaultValue="ja">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">英語</SelectItem>
                      <SelectItem value="all">すべて</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>記事数制限</Label>
                  <Select defaultValue="500">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100件</SelectItem>
                      <SelectItem value="500">500件</SelectItem>
                      <SelectItem value="1000">1,000件</SelectItem>
                      <SelectItem value="5000">5,000件</SelectItem>
                      <SelectItem value="unlimited">制限なし</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>分析深度</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">基本</SelectItem>
                      <SelectItem value="standard">標準</SelectItem>
                      <SelectItem value="deep">詳細</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>要約の長さ</Label>
                  <Select value={summaryLength} onValueChange={setSummaryLength}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">簡潔</SelectItem>
                      <SelectItem value="standard">標準</SelectItem>
                      <SelectItem value="detailed">詳細</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="exclude-duplicates" defaultChecked />
                  <Label htmlFor="exclude-duplicates">重複記事を除外</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-images" defaultChecked />
                  <Label htmlFor="include-images">画像分析を含める</Label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">リセット</Button>
          <Button onClick={startAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                分析開始
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* 分析進捗 */}
      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle>分析進捗</CardTitle>
            <CardDescription>ニュース分析の進行状況</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentStep}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>処理中</AlertTitle>
              <AlertDescription>
                分析には数分かかる場合があります。このページを開いたままにしておいてください。
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsAnalyzing(false)}>
              キャンセル
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* 分析結果 */}
      {analysisComplete && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">分析結果</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                エクスポート
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                共有
              </Button>
            </div>
          </div>

          {/* 概要 */}
          <Card>
            <CardHeader>
              <CardTitle>概要</CardTitle>
              <CardDescription>
                {selectedStartDate && selectedEndDate
                  ? `${format(selectedStartDate, "yyyy年MM月dd日")} から ${format(
                      selectedEndDate,
                      "yyyy年MM月dd日",
                    )} までの分析結果`
                  : "分析期間の結果"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">分析対象記事数</div>
                  <div className="text-2xl font-bold">1,248</div>
                  <div className="text-sm text-muted-foreground">記事</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">感情スコア</div>
                  <div className="text-2xl font-bold">+0.24</div>
                  <div className="text-sm text-muted-foreground">やや肯定的</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">主要トピック</div>
                  <div className="text-2xl font-bold">AI投資</div>
                  <div className="text-sm text-muted-foreground">関連記事: 342件</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">感情分布</h3>
                  <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">感情分布チャート</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">時系列トレンド</h3>
                  <div className="h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">時系列トレンドチャート</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 感情分析 */}
          <Card>
            <CardHeader>
              <CardTitle>感情分析</CardTitle>
              <CardDescription>ニュース記事の感情傾向分析</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ポジティブ</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <Progress value={42} className="bg-muted h-2" />
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span>前回比 +5%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ネガティブ</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <Progress value={18} className="bg-muted h-2" />
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                    <span>前回比 -3%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">中立</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="bg-muted h-2" />
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Minus className="h-4 w-4 mr-1 text-gray-500" />
                    <span>前回比 -2%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">感情スコア推移</h3>
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">感情スコア推移チャート</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* トピック分析 */}
          <Card>
            <CardHeader>
              <CardTitle>トピック分析</CardTitle>
              <CardDescription>主要トピックとその関連性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">主要トピック</h3>
                    <div className="space-y-2">
                      {[
                        { topic: "AI投資", count: 342, trend: "up" },
                        { topic: "金融テクノロジー", count: 215, trend: "up" },
                        { topic: "市場動向", count: 189, trend: "stable" },
                        { topic: "規制変更", count: 124, trend: "down" },
                        { topic: "新興企業", count: 98, trend: "up" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{item.topic}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">{item.count}件</span>
                            {item.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : item.trend === "down" ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <Minus className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">トピック関連性</h3>
                    <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                      <BarChart className="h-8 w-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">トピック関連性チャート</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 財務分析・総合評価 */}
          <Card>
            <CardHeader>
              <CardTitle>財務分析・総合評価</CardTitle>
              <CardDescription>財務関連ニュースの分析と総合評価</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">財務指標言及</h3>
                  <div className="space-y-2">
                    {[
                      { indicator: "収益成長", sentiment: 0.65, mentions: 124 },
                      { indicator: "利益率", sentiment: 0.42, mentions: 98 },
                      { indicator: "負債比率", sentiment: -0.15, mentions: 76 },
                      { indicator: "キャッシュフロー", sentiment: 0.38, mentions: 65 },
                      { indicator: "投資収益率", sentiment: 0.51, mentions: 58 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <span>{item.indicator}</span>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant="outline"
                            className={
                              item.sentiment > 0.3
                                ? "bg-green-100 text-green-800"
                                : item.sentiment < -0.3
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {item.sentiment > 0.3 ? "ポジティブ" : item.sentiment < -0.3 ? "ネガティブ" : "中立"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{item.mentions}件</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">総合評価</h3>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">良好</Badge>
                      <span className="text-sm">総合スコア: 78/100</span>
                    </div>
                    <p className="text-sm">
                      分析対象期間中のニュース記事は全体的にポジティブな傾向を示しています。特にAI投資と金融テクノロジーに関する記事が多く、市場の関心の高さが伺えます。一方で、規制変更に関するネガティブな言及も見られ、今後の動向に注意が必要です。
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">投資家心理は概ね良好</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">規制リスクに注意</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ニュース要約 */}
          <Card>
            <CardHeader>
              <CardTitle>ニュース要約</CardTitle>
              <CardDescription>分析対象ニュースの要点まとめ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="summary">
                <TabsList>
                  <TabsTrigger value="summary">要約</TabsTrigger>
                  <TabsTrigger value="key-points">重要ポイント</TabsTrigger>
                  <TabsTrigger value="topics">主要トピック</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4 pt-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p>
                      分析期間中のニュースでは、AIと金融テクノロジーの融合が主要なテーマとなっています。特に、AIを活用した投資戦略が注目を集め、多くの金融機関がAI技術への投資を拡大しています。市場アナリストらは、この傾向が今後も続くと予測しており、AI関連企業の株価は上昇傾向にあります。
                    </p>
                    <p className="mt-2">
                      一方で、AIの金融分野への応用に関する規制の動きも見られ、特にデータプライバシーとアルゴリズムの透明性に関する懸念が高まっています。規制当局は、AIを活用した金融サービスに対する新たなガイドラインの策定を進めており、業界はこれに対応するための準備を進めています。
                    </p>
                    <p className="mt-2">
                      また、新興フィンテック企業の台頭も顕著で、従来の金融機関との競争が激化しています。これらの企業は、AIを活用した革新的なサービスを提供し、特に若年層の顧客を獲得しています。この動きに対応するため、伝統的な金融機関もデジタル変革を加速させています。
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Select value={summaryLength} onValueChange={setSummaryLength}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">簡潔</SelectItem>
                          <SelectItem value="standard">標準</SelectItem>
                          <SelectItem value="detailed">詳細</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-muted-foreground">要約の長さ</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      要約をエクスポート
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="key-points" className="space-y-4 pt-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>
                        金融機関のAI投資が前年比35%増加し、特に自動取引システムと顧客分析への応用が進んでいます。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>
                        規制当局は、AIを活用した金融サービスに対する新たなガイドラインを2023年末までに発表する予定です。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>
                        フィンテックスタートアップへの投資が第3四半期に記録的な水準に達し、特にAIを活用した個人向け資産管理サービスが注目を集めています。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>
                        大手金融機関の75%が今後2年以内にAIを活用したサービスの拡大を計画しており、人材獲得競争が激化しています。
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span>
                        AIによる市場予測の精度向上が報告されており、特に短期的な価格変動の予測において従来のモデルを上回る結果が示されています。
                      </span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="topics" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        topic: "AI投資戦略",
                        importance: 85,
                        sentiment: "positive",
                        description: "AIを活用した投資戦略の開発と実装に関する記事",
                      },
                      {
                        topic: "規制動向",
                        importance: 72,
                        sentiment: "neutral",
                        description: "AI金融サービスに対する規制の動向と影響に関する記事",
                      },
                      {
                        topic: "フィンテック競争",
                        importance: 68,
                        sentiment: "positive",
                        description: "新興フィンテック企業と従来の金融機関の競争に関する記事",
                      },
                      {
                        topic: "データプライバシー",
                        importance: 64,
                        sentiment: "negative",
                        description: "金融AIにおけるデータプライバシーの懸念に関する記事",
                      },
                    ].map((item, i) => (
                      <Card key={i} className="bg-muted/50 border-0">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{item.topic}</CardTitle>
                            <Badge
                              variant="outline"
                              className={
                                item.sentiment === "positive"
                                  ? "bg-green-100 text-green-800"
                                  : item.sentiment === "negative"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {item.sentiment === "positive"
                                ? "ポジティブ"
                                : item.sentiment === "negative"
                                  ? "ネガティブ"
                                  : "中立"}
                            </Badge>
                          </div>
                          <CardDescription>重要度: {item.importance}%</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* キーワードマップ */}
          <Card>
            <CardHeader>
              <CardTitle>キーワードマップ</CardTitle>
              <CardDescription>頻出キーワードの視覚化</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="positive">ポジティブ</SelectItem>
                      <SelectItem value="negative">ネガティブ</SelectItem>
                      <SelectItem value="neutral">中立</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">感情フィルター</span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-80 bg-muted/50 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <span className="text-4xl font-bold text-primary">AI投資</span>
                    <span className="absolute top-0 right-0 text-xs bg-green-100 text-green-800 px-1 rounded">342</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <div className="relative inline-block">
                      <span className="text-2xl font-medium text-primary/80">金融テクノロジー</span>
                      <span className="absolute top-0 right-0 text-xs bg-green-100 text-green-800 px-1 rounded">
                        215
                      </span>
                    </div>
                    <div className="relative inline-block">
                      <span className="text-2xl font-medium text-primary/80">市場動向</span>
                      <span className="absolute top-0 right-0 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">
                        189
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-3">
                    <div className="relative inline-block">
                      <span className="text-xl text-primary/60">規制変更</span>
                      <span className="absolute top-0 right-0 text-xs bg-red-100 text-red-800 px-1 rounded">124</span>
                    </div>
                    <div className="relative inline-block">
                      <span className="text-xl text-primary/60">新興企業</span>
                      <span className="absolute top-0 right-0 text-xs bg-green-100 text-green-800 px-1 rounded">
                        98
                      </span>
                    </div>
                    <div className="relative inline-block">
                      <span className="text-xl text-primary/60">投資戦略</span>
                      <span className="absolute top-0 right-0 text-xs bg-green-100 text-green-800 px-1 rounded">
                        87
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <span className="text-sm text-primary/40">データ分析</span>
                    <span className="text-sm text-primary/40">アルゴリズム</span>
                    <span className="text-sm text-primary/40">自動化</span>
                    <span className="text-sm text-primary/40">リスク管理</span>
                    <span className="text-sm text-primary/40">予測モデル</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">ポジティブ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">中立</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">ネガティブ</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  エクスポート
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 関連ニュース */}
          <Card>
            <CardHeader>
              <CardTitle>関連ニュース</CardTitle>
              <CardDescription>分析対象の主要ニュース記事</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "大手銀行、AI投資戦略部門を新設",
                    source: "金融ニュース",
                    date: "2023-10-12",
                    sentiment: "positive",
                    summary:
                      "大手銀行が、AIを活用した投資戦略の開発と実装を専門とする新部門を設立。今後2年間で100億円の投資を計画。",
                  },
                  {
                    title: "金融庁、AI利用のガイドライン案を発表",
                    source: "日本経済新聞",
                    date: "2023-10-08",
                    sentiment: "neutral",
                    summary:
                      "金融庁が金融機関におけるAI利用に関する新たなガイドライン案を発表。データプライバシーとアルゴリズムの透明性確保を重視。",
                  },
                  {
                    title: "フィンテックスタートアップ、シリーズCで100億円調達",
                    source: "テックニュース",
                    date: "2023-09-30",
                    sentiment: "positive",
                    summary:
                      "AIを活用した個人向け資産管理サービスを提供するフィンテックスタートアップが、シリーズCラウンドで100億円の資金調達に成功。",
                  },
                  {
                    title: "AI投資モデルの精度に関する研究結果発表",
                    source: "学術ジャーナル",
                    date: "2023-09-25",
                    sentiment: "positive",
                    summary:
                      "最新の研究によると、AIを活用した投資モデルが従来の予測モデルと比較して15%高い精度を示したことが明らかに。",
                  },
                  {
                    title: "データプライバシー懸念、金融AIの普及に影響",
                    source: "テクノロジーレビュー",
                    date: "2023-09-18",
                    sentiment: "negative",
                    summary:
                      "金融分野におけるAI活用に対するデータプライバシーの懸念が高まり、一部の金融機関がAI導入計画を見直す動きも。",
                  },
                ].map((news, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{news.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          news.sentiment === "positive"
                            ? "bg-green-100 text-green-800"
                            : news.sentiment === "negative"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {news.sentiment === "positive"
                          ? "ポジティブ"
                          : news.sentiment === "negative"
                            ? "ネガティブ"
                            : "中立"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Newspaper className="h-3 w-3" />
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.date}</span>
                    </div>
                    <p className="text-sm mt-2">{news.summary}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                すべてのニュースを表示
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
