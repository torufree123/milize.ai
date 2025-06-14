"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  FileText,
  TrendingUp,
  TrendingDown,
  Building2,
  BarChart3,
  Download,
  Loader2,
  Eye,
  Search,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SecuritiesAnalysis() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const { toast } = useToast()

  // サンプル分析データ
  const [companyInfo] = useState({
    name: "株式会社サンプル",
    code: "1234",
    industry: "情報・通信業",
    fiscalYear: "2023年3月期",
    employees: "1,250名",
    capital: "50億円",
  })

  const [summary] = useState({
    overview: `当社は、クラウドサービスとAIソリューションを主力事業とする情報通信企業です。
2023年3月期は売上高が前年同期比15.2%増の320億円となり、過去最高を更新しました。
主力のクラウド事業が好調で、特にSaaS分野での成長が顕著でした。
営業利益は45億円（前年同期比22.1%増）、当期純利益は32億円（前年同期比18.5%増）となりました。`,
    keyPoints: [
      "売上高320億円（前年同期比+15.2%）で過去最高を更新",
      "クラウド事業の売上が全体の65%を占める主力事業に成長",
      "海外展開を本格化、アジア市場での売上が前年比40%増",
      "AI技術への投資を拡大、R&D費用は売上の12%に増加",
      "従業員数は前年比8%増の1,250名、優秀な人材の確保が課題",
    ],
    risks: [
      "競合他社との価格競争激化",
      "技術革新への対応遅れリスク",
      "人材確保・育成コストの増加",
      "為替変動による海外事業への影響",
    ],
  })

  const [wordMap] = useState([
    { word: "クラウド", frequency: 156, category: "事業" },
    { word: "AI", frequency: 89, category: "技術" },
    { word: "デジタル変革", frequency: 67, category: "戦略" },
    { word: "SaaS", frequency: 54, category: "サービス" },
    { word: "セキュリティ", frequency: 43, category: "技術" },
    { word: "データ分析", frequency: 38, category: "サービス" },
    { word: "IoT", frequency: 32, category: "技術" },
    { word: "機械学習", frequency: 28, category: "技術" },
    { word: "API", frequency: 25, category: "技術" },
    { word: "マイクロサービス", frequency: 22, category: "技術" },
  ])

  const [financialData] = useState({
    balanceSheet: [
      { item: "総資産", current: 45000, previous: 38500, change: 16.9 },
      { item: "流動資産", current: 28000, previous: 24200, change: 15.7 },
      { item: "固定資産", current: 17000, previous: 14300, change: 18.9 },
      { item: "総負債", current: 18000, previous: 16800, change: 7.1 },
      { item: "純資産", current: 27000, previous: 21700, change: 24.4 },
    ],
    incomeStatement: [
      { item: "売上高", current: 32000, previous: 27800, change: 15.1 },
      { item: "売上総利益", current: 18500, previous: 15200, change: 21.7 },
      { item: "営業利益", current: 4500, previous: 3680, change: 22.3 },
      { item: "経常利益", current: 4200, previous: 3450, change: 21.7 },
      { item: "当期純利益", current: 3200, previous: 2700, change: 18.5 },
    ],
    ratios: [
      { name: "ROE（自己資本利益率）", value: 12.8, benchmark: 10.5, status: "good" },
      { name: "ROA（総資産利益率）", value: 7.8, benchmark: 6.2, status: "good" },
      { name: "売上高営業利益率", value: 14.1, benchmark: 12.0, status: "good" },
      { name: "流動比率", value: 155.6, benchmark: 120.0, status: "good" },
      { name: "自己資本比率", value: 60.0, benchmark: 40.0, status: "excellent" },
      { name: "負債比率", value: 66.7, benchmark: 100.0, status: "excellent" },
    ],
  })

  const [relatedCompanies] = useState([
    {
      name: "株式会社テックパートナー",
      relationship: "子会社",
      ownership: "100%",
      business: "システム開発",
      capital: "5億円",
      employees: "180名",
    },
    {
      name: "クラウドソリューションズ株式会社",
      relationship: "関連会社",
      ownership: "35%",
      business: "クラウドインフラ",
      capital: "12億円",
      employees: "320名",
    },
    {
      name: "AIイノベーション株式会社",
      relationship: "合弁会社",
      ownership: "50%",
      business: "AI研究開発",
      capital: "8億円",
      employees: "95名",
    },
    {
      name: "データアナリティクス株式会社",
      relationship: "持分法適用会社",
      ownership: "25%",
      business: "データ分析サービス",
      capital: "3億円",
      employees: "120名",
    },
  ])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      toast({
        title: "エラー",
        description: "PDFファイルのみアップロード可能です。",
        variant: "destructive",
      })
      return
    }

    setPdfFile(file)
    const url = URL.createObjectURL(file)
    setPdfUrl(url)

    // 分析開始
    startAnalysis()

    toast({
      title: "ファイルをアップロードしました",
      description: `${file.name} の分析を開始します。`,
    })
  }, [])

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // 分析プロセスのシミュレーション
    const steps = [
      { name: "PDFテキスト抽出", duration: 1000 },
      { name: "財務データ識別", duration: 1500 },
      { name: "要約生成", duration: 2000 },
      { name: "ワードマップ作成", duration: 1000 },
      { name: "財務分析実行", duration: 1500 },
      { name: "関係会社抽出", duration: 1000 },
    ]

    let progress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      progress += 100 / steps.length
      setAnalysisProgress(progress)
    }

    setIsAnalyzing(false)
    setAnalysisComplete(true)

    toast({
      title: "分析完了",
      description: "有価証券報告書の分析が完了しました。",
    })
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (file) {
        const fakeEvent = {
          target: { files: [file] },
        } as React.ChangeEvent<HTMLInputElement>
        handleFileUpload(fakeEvent)
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const formatCurrency = (value: number) => {
    return `${(value / 100).toFixed(0)}億円`
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return null
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getRatioStatus = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">優秀</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">良好</Badge>
      case "average":
        return <Badge className="bg-yellow-100 text-yellow-800">平均</Badge>
      case "poor":
        return <Badge className="bg-red-100 text-red-800">要改善</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">有価証券報告書分析</h1>
        </div>
        <div className="flex items-center gap-2">
          {analysisComplete && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              分析結果をエクスポート
            </Button>
          )}
          <input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          <Button onClick={() => document.getElementById("pdf-upload")?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            PDFをアップロード
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 左側パネル - 分析結果 */}
        <div className="w-1/2 border-r overflow-auto">
          {!pdfFile ? (
            <div className="h-full flex items-center justify-center p-8">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer w-full max-w-md"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">有価証券報告書をアップロード</h3>
                <p className="text-muted-foreground mb-4">PDFファイルをドロップまたはクリックして選択</p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  ファイルを選択
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* 分析進行状況 */}
              {isAnalyzing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      分析中...
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={analysisProgress} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{Math.round(analysisProgress)}% 完了</p>
                  </CardContent>
                </Card>
              )}

              {/* 企業基本情報 */}
              {analysisComplete && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        企業基本情報
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">会社名</p>
                          <p className="font-medium">{companyInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">証券コード</p>
                          <p className="font-medium">{companyInfo.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">業種</p>
                          <p className="font-medium">{companyInfo.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">決算期</p>
                          <p className="font-medium">{companyInfo.fiscalYear}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">従業員数</p>
                          <p className="font-medium">{companyInfo.employees}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">資本金</p>
                          <p className="font-medium">{companyInfo.capital}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* タブコンテンツ */}
                  <Tabs defaultValue="summary" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="summary">要約</TabsTrigger>
                      <TabsTrigger value="wordmap">ワードマップ</TabsTrigger>
                      <TabsTrigger value="financial">財務データ</TabsTrigger>
                      <TabsTrigger value="analysis">財務分析</TabsTrigger>
                      <TabsTrigger value="related">関係会社</TabsTrigger>
                    </TabsList>

                    {/* 要約タブ */}
                    <TabsContent value="summary">
                      <Card>
                        <CardHeader>
                          <CardTitle>事業概要</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed mb-4">{summary.overview}</p>
                          <Separator className="my-4" />
                          <h4 className="font-medium mb-3">主要ポイント</h4>
                          <ul className="space-y-2">
                            {summary.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                          <Separator className="my-4" />
                          <h4 className="font-medium mb-3">主要リスク</h4>
                          <ul className="space-y-2">
                            {summary.risks.map((risk, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* ワードマップタブ */}
                    <TabsContent value="wordmap">
                      <Card>
                        <CardHeader>
                          <CardTitle>キーワード分析</CardTitle>
                          <CardDescription>報告書内で頻出するキーワードとその出現頻度</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {wordMap.map((word, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline">{word.category}</Badge>
                                  <span className="font-medium">{word.word}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${(word.frequency / 156) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-muted-foreground w-8">{word.frequency}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* 財務データタブ */}
                    <TabsContent value="financial">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>貸借対照表</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>項目</TableHead>
                                  <TableHead className="text-right">当期</TableHead>
                                  <TableHead className="text-right">前期</TableHead>
                                  <TableHead className="text-right">増減率</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {financialData.balanceSheet.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{item.item}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.current)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.previous)}</TableCell>
                                    <TableCell className="text-right">
                                      <div
                                        className={`flex items-center justify-end gap-1 ${getChangeColor(item.change)}`}
                                      >
                                        {getChangeIcon(item.change)}
                                        {item.change > 0 ? "+" : ""}
                                        {item.change.toFixed(1)}%
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>損益計算書</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>項目</TableHead>
                                  <TableHead className="text-right">当期</TableHead>
                                  <TableHead className="text-right">前期</TableHead>
                                  <TableHead className="text-right">増減率</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {financialData.incomeStatement.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{item.item}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.current)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.previous)}</TableCell>
                                    <TableCell className="text-right">
                                      <div
                                        className={`flex items-center justify-end gap-1 ${getChangeColor(item.change)}`}
                                      >
                                        {getChangeIcon(item.change)}
                                        {item.change > 0 ? "+" : ""}
                                        {item.change.toFixed(1)}%
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* 財務分析タブ */}
                    <TabsContent value="analysis">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            財務比率分析
                          </CardTitle>
                          <CardDescription>主要な財務指標と業界ベンチマークとの比較</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {financialData.ratios.map((ratio, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <p className="font-medium">{ratio.name}</p>
                                  <p className="text-sm text-muted-foreground">業界平均: {ratio.benchmark}%</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="text-lg font-bold">{ratio.value}%</p>
                                  </div>
                                  {getRatioStatus(ratio.status)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* 関係会社タブ */}
                    <TabsContent value="related">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            関係会社一覧
                          </CardTitle>
                          <CardDescription>子会社・関連会社・合弁会社の情報</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {relatedCompanies.map((company, index) => (
                              <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h4 className="font-medium">{company.name}</h4>
                                    <p className="text-sm text-muted-foreground">{company.business}</p>
                                  </div>
                                  <Badge variant="outline">{company.relationship}</Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">出資比率</p>
                                    <p className="font-medium">{company.ownership}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">資本金</p>
                                    <p className="font-medium">{company.capital}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">従業員数</p>
                                    <p className="font-medium">{company.employees}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          )}
        </div>

        {/* 右側パネル - PDFビューア */}
        <div className="w-1/2 bg-gray-50">
          {pdfUrl ? (
            <div className="h-full">
              <div className="flex items-center justify-between p-3 bg-white border-b">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">{pdfFile?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <iframe src={pdfUrl} className="w-full h-full border-0" title="PDF Viewer" />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileText className="mx-auto h-16 w-16 mb-4" />
                <p>PDFファイルをアップロードすると、ここに表示されます</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
