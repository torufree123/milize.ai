"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
} from "lucide-react"

// サンプルレポートデータ
const sampleReports = [
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
  },
]

export default function ReportSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedReportType, setSelectedReportType] = useState<string>("all")
  const [filteredReports, setFilteredReports] = useState(sampleReports)
  const [sortOption, setSortOption] = useState("relevance")
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  // 検索とフィルタリングを処理する関数
  const handleSearch = () => {
    let results = [...sampleReports]

    // キーワード検索
    if (searchQuery) {
      results = results.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
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
      // relevanceはデフォルトのソート順（検索クエリとの関連性）
      default:
        break
    }

    setFilteredReports(results)
  }

  // 検索実行
  React.useEffect(() => {
    handleSearch()
  }, [searchQuery, selectedReportType, selectedDate, sortOption])

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

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">レポート検索</h1>
          <div className="flex items-center space-x-2">
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

        {/* 検索バー */}
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="キーワードで検索..."
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <h3 className="text-sm font-medium">日付</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">タグ</h3>
                    <div className="flex flex-wrap gap-2">
                      {["AI", "財務", "四半期", "セキュリティ", "市場調査"].map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox id={`tag-${tag}`} />
                          <label
                            htmlFor={`tag-${tag}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">作成者</h3>
                    <Input placeholder="作成者名" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">閲覧数</h3>
                    <Slider defaultValue={[0]} max={500} step={10} />
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
              filteredReports.map((report) => (
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
                        </div>
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
                      <div className="mt-4 pt-4 border-t flex justify-between">
                        <div>
                          <h4 className="text-sm font-medium">レポート詳細</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            作成日: {report.date} | 最終更新: {report.date}
                          </p>
                        </div>
                        <div className="flex space-x-2">
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
                    )}
                  </CardContent>
                </Card>
              ))
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
            {["財務分析", "AI技術動向", "市場調査", "セキュリティ対策", "事業計画", "顧客満足度"].map((keyword) => (
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
