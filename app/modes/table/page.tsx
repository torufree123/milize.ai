"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, Download, FileSpreadsheet, Trash2, Settings, Play, Save, Star, Loader2, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TableMode() {
  const [activeTab, setActiveTab] = useState("data")
  const [importedData, setImportedData] = useState<any[]>([])
  const [tableHeaders, setTableHeaders] = useState<string[]>([])
  const [fileName, setFileName] = useState("")
  const [analysisPrompt, setAnalysisPrompt] = useState("")
  const [selectedAnalysisPrompt, setSelectedAnalysisPrompt] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState("")
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [saveData, setSaveData] = useState({ name: "", rating: 3, tags: "" })
  const { toast } = useToast()

  // サンプル分析プロンプト
  const analysisPrompts = [
    {
      id: "1",
      name: "基本統計分析",
      content:
        "このデータの基本統計（平均、中央値、標準偏差、最大値、最小値）を計算し、データの分布と特徴を分析してください。",
      category: "統計分析",
    },
    {
      id: "2",
      name: "売上トレンド分析",
      content:
        "売上データの時系列トレンドを分析し、季節性、成長率、異常値を特定してください。将来の予測も含めてください。",
      category: "売上分析",
    },
    {
      id: "3",
      name: "顧客セグメント分析",
      content: "顧客データを分析し、購買行動、年齢層、地域などの特徴に基づいてセグメンテーションを行ってください。",
      category: "顧客分析",
    },
    {
      id: "4",
      name: "財務比率分析",
      content: "財務データから主要な財務比率（収益性、安全性、効率性）を計算し、企業の財務健全性を評価してください。",
      category: "財務分析",
    },
    {
      id: "5",
      name: "相関関係分析",
      content:
        "データ内の各変数間の相関関係を分析し、強い相関を持つ要素を特定してビジネスインサイトを提供してください。",
      category: "相関分析",
    },
  ]

  // 保存された分析結果
  const [savedAnalyses, setSavedAnalyses] = useState([
    {
      id: "1",
      name: "Q4売上データ分析",
      prompt: "売上データの時系列トレンドを分析し...",
      result: "Q4の売上は前年同期比15%増加し、特に12月に顕著な伸びを示しました...",
      rating: 4,
      createdAt: "2023/12/20",
      tags: ["売上", "Q4", "トレンド"],
      fileName: "sales_q4_2023.csv",
    },
    {
      id: "2",
      name: "顧客行動パターン分析",
      prompt: "顧客データを分析し、購買行動を...",
      result: "顧客は3つの主要セグメントに分類され、高価値顧客は全体の20%を占めています...",
      rating: 5,
      createdAt: "2023/12/18",
      tags: ["顧客", "セグメント", "行動分析"],
      fileName: "customer_data.xlsx",
    },
  ])

  // サンプルデータ
  const sampleData = [
    { id: 1, product: "製品A", sales: 1200, growth: 5.2, category: "電子機器", region: "東京" },
    { id: 2, product: "製品B", sales: 950, growth: -2.3, category: "家具", region: "大阪" },
    { id: 3, product: "製品C", sales: 1500, growth: 7.8, category: "電子機器", region: "名古屋" },
    { id: 4, product: "製品D", sales: 800, growth: 3.1, category: "衣料品", region: "福岡" },
    { id: 5, product: "製品E", sales: 2100, growth: 10.5, category: "電子機器", region: "東京" },
  ]

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    // ファイル拡張子に基づいて処理を分岐（実際の実装では適切なパーサーを使用）
    const extension = file.name.split(".").pop()?.toLowerCase()

    if (extension === "csv" || extension === "xlsx" || extension === "xls") {
      // サンプルデータを設定（実際の実装ではファイルを解析）
      setImportedData(sampleData)
      setTableHeaders(Object.keys(sampleData[0]))

      toast({
        title: "ファイルをインポートしました",
        description: `${file.name} を正常に読み込みました。`,
      })
    } else {
      toast({
        title: "サポートされていないファイル形式",
        description: "CSV、Excel、PDFファイルのみサポートしています。",
        variant: "destructive",
      })
    }
  }, [])

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

  const handleAnalysisPromptSelect = (promptId: string) => {
    const prompt = analysisPrompts.find((p) => p.id === promptId)
    if (prompt) {
      setAnalysisPrompt(prompt.content)
      setSelectedAnalysisPrompt(promptId)
    }
  }

  const handleRunAnalysis = async () => {
    if (!analysisPrompt.trim()) {
      toast({
        title: "エラー",
        description: "分析プロンプトを入力してください。",
        variant: "destructive",
      })
      return
    }

    if (importedData.length === 0) {
      toast({
        title: "エラー",
        description: "分析するデータがありません。ファイルをインポートしてください。",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // 分析処理のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // サンプル分析結果
    const result = `# データ分析結果

## 分析対象
- ファイル名: ${fileName}
- データ件数: ${importedData.length}件
- 分析日時: ${new Date().toLocaleString("ja-JP")}

## 分析内容
${analysisPrompt}

## 主要な発見事項

### 1. 基本統計
- 総売上: ${importedData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}円
- 平均売上: ${Math.round(importedData.reduce((sum, item) => sum + item.sales, 0) / importedData.length).toLocaleString()}円
- 最高売上: ${Math.max(...importedData.map((item) => item.sales)).toLocaleString()}円
- 最低売上: ${Math.min(...importedData.map((item) => item.sales)).toLocaleString()}円

### 2. カテゴリ別分析
- 電子機器: ${importedData.filter((item) => item.category === "電子機器").length}件
- 家具: ${importedData.filter((item) => item.category === "家具").length}件
- 衣料品: ${importedData.filter((item) => item.category === "衣料品").length}件

### 3. 成長率分析
- 平均成長率: ${(importedData.reduce((sum, item) => sum + item.growth, 0) / importedData.length).toFixed(1)}%
- 成長率が正の製品: ${importedData.filter((item) => item.growth > 0).length}件
- 成長率が負の製品: ${importedData.filter((item) => item.growth < 0).length}件

### 4. 地域別分析
- 東京: ${importedData.filter((item) => item.region === "東京").length}件
- 大阪: ${importedData.filter((item) => item.region === "大阪").length}件
- その他: ${importedData.filter((item) => !["東京", "大阪"].includes(item.region)).length}件

## 推奨事項

1. **電子機器カテゴリの強化**: 電子機器は高い成長率を示しており、さらなる投資を検討することを推奨します。

2. **地域戦略の見直し**: 東京地域での売上が好調なため、同様の戦略を他地域にも展開することを検討してください。

3. **成長率の改善**: 成長率が負の製品については、原因分析と改善策の検討が必要です。

## 結論
データ分析の結果、全体的に良好な傾向が見られますが、一部改善の余地があります。特に電子機器カテゴリと東京地域での成功要因を他の分野にも応用することで、さらなる成長が期待できます。`

    setAnalysisResult(result)
    setIsAnalyzing(false)

    toast({
      title: "分析完了",
      description: "データ分析が完了しました。",
    })
  }

  const handleSaveAnalysis = () => {
    if (!saveData.name.trim()) {
      toast({
        title: "エラー",
        description: "分析結果の名前を入力してください。",
        variant: "destructive",
      })
      return
    }

    const newAnalysis = {
      id: (savedAnalyses.length + 1).toString(),
      name: saveData.name,
      prompt: analysisPrompt,
      result: analysisResult,
      rating: saveData.rating,
      createdAt: new Date().toLocaleDateString("ja-JP"),
      tags: saveData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      fileName: fileName,
    }

    setSavedAnalyses([newAnalysis, ...savedAnalyses])
    setSaveData({ name: "", rating: 3, tags: "" })
    setIsSaveDialogOpen(false)

    toast({
      title: "分析結果を保存しました",
      description: "分析結果が保存されました。",
    })
  }

  const loadSavedAnalysis = (analysis: any) => {
    setAnalysisPrompt(analysis.prompt)
    setAnalysisResult(analysis.result)
    toast({
      title: "分析結果を読み込みました",
      description: `「${analysis.name}」の分析結果を読み込みました。`,
    })
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">テーブルモード</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* データインポートエリア */}
        <div className="lg:col-span-2 space-y-6">
          {/* ファイルインポート */}
          {importedData.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>データインポート</CardTitle>
                <CardDescription>Excel、CSV、PDFファイルをインポートして分析を開始</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">ファイルをドロップまたはクリックして選択</h3>
                  <p className="text-muted-foreground mb-4">
                    Excel (.xlsx, .xls)、CSV (.csv)、PDF (.pdf) ファイルをサポート
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    ファイルを選択
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* インポートされたデータ表示 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>インポートされたデータ</CardTitle>
                      <CardDescription>
                        ファイル: {fileName} | {importedData.length}件のデータ
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImportedData([])
                        setTableHeaders([])
                        setFileName("")
                        setAnalysisResult("")
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      クリア
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {tableHeaders.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importedData.map((row, index) => (
                          <TableRow key={index}>
                            {tableHeaders.map((header) => (
                              <TableCell key={header}>
                                {typeof row[header] === "number" && header === "growth"
                                  ? `${row[header] > 0 ? "+" : ""}${row[header]}%`
                                  : typeof row[header] === "number" && header === "sales"
                                    ? row[header].toLocaleString()
                                    : row[header]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* 分析プロンプト入力 */}
              <Card>
                <CardHeader>
                  <CardTitle>データ分析</CardTitle>
                  <CardDescription>分析プロンプトを入力または選択してデータを分析</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Select value={selectedAnalysisPrompt} onValueChange={handleAnalysisPromptSelect}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="保存された分析プロンプトを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {analysisPrompts.map((prompt) => (
                          <SelectItem key={prompt.id} value={prompt.id}>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4" />
                              <div>
                                <div className="font-medium">{prompt.name}</div>
                                <div className="text-xs text-muted-foreground">{prompt.category}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>分析プロンプト</Label>
                    <Textarea
                      placeholder="データに対して実行したい分析内容を入力してください..."
                      value={analysisPrompt}
                      onChange={(e) => setAnalysisPrompt(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <Button onClick={handleRunAnalysis} disabled={isAnalyzing} className="w-full">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        分析実行
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* 分析結果表示 */}
              {analysisResult && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>分析結果</CardTitle>
                        <CardDescription>AIによるデータ分析結果</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsSaveDialogOpen(true)}>
                          <Save className="mr-2 h-4 w-4" />
                          結果を保存
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          ダウンロード
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md overflow-auto max-h-96">
                        {analysisResult}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        {/* サイドパネル */}
        <div className="space-y-6">
          {/* 分析プロンプトライブラリ */}
          <Card>
            <CardHeader>
              <CardTitle>分析プロンプトライブラリ</CardTitle>
              <CardDescription>よく使う分析パターン</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysisPrompts.slice(0, 4).map((prompt) => (
                  <Button
                    key={prompt.id}
                    variant="ghost"
                    className="w-full justify-start text-sm h-auto p-3"
                    onClick={() => handleAnalysisPromptSelect(prompt.id)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{prompt.name}</div>
                      <div className="text-xs text-muted-foreground">{prompt.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 保存された分析結果 */}
          <Card>
            <CardHeader>
              <CardTitle>保存された分析</CardTitle>
              <CardDescription>過去の分析結果を再利用</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedAnalyses.map((analysis) => (
                  <div key={analysis.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{analysis.name}</h4>
                      <div className="flex items-center gap-1">{getRatingStars(analysis.rating)}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {analysis.createdAt} | {analysis.fileName}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {analysis.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => loadSavedAnalysis(analysis)}
                    >
                      分析結果を読み込み
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 分析統計 */}
          <Card>
            <CardHeader>
              <CardTitle>分析統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">総分析回数</span>
                  <span className="font-medium">{savedAnalyses.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">平均評価</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {(savedAnalyses.reduce((sum, a) => sum + a.rating, 0) / savedAnalyses.length).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">今月の分析</span>
                  <span className="font-medium">
                    {savedAnalyses.filter((a) => a.createdAt.includes("2023/12")).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 分析結果保存ダイアログ */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>分析結果を保存</DialogTitle>
            <DialogDescription>分析結果に名前を付けて保存し、後で再利用できます</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>分析結果の名前 *</Label>
              <Input
                placeholder="分析結果の名前を入力"
                value={saveData.name}
                onChange={(e) => setSaveData({ ...saveData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>評価 (1-5)</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 cursor-pointer ${
                        i < saveData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setSaveData({ ...saveData, rating: i + 1 })}
                    />
                  ))}
                </div>
                <span className="font-medium">{saveData.rating}/5</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>タグ (カンマ区切り)</Label>
              <Input
                placeholder="タグを入力 (例: 売上,分析,Q4)"
                value={saveData.tags}
                onChange={(e) => setSaveData({ ...saveData, tags: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSaveAnalysis}>
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
