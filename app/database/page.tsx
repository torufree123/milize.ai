"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  TrendingUp,
  Leaf,
  Megaphone,
  Newspaper,
  BarChart3,
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Settings,
  Calendar,
  Building,
} from "lucide-react"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")

  // データベースカテゴリ
  const categories = [
    { id: "securities_reports", name: "有価証券報告書", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "integrated_reports", name: "統合レポート", icon: TrendingUp, color: "bg-green-100 text-green-800" },
    { id: "esg_reports", name: "ESGレポート", icon: Leaf, color: "bg-emerald-100 text-emerald-800" },
    { id: "press_releases", name: "プレス", icon: Megaphone, color: "bg-purple-100 text-purple-800" },
    { id: "market_news", name: "市場ニュース", icon: TrendingUp, color: "bg-orange-100 text-orange-800" },
    { id: "general_news", name: "一般ニュース", icon: Newspaper, color: "bg-gray-100 text-gray-800" },
    { id: "market_data", name: "市場データ", icon: BarChart3, color: "bg-red-100 text-red-800" },
  ]

  // サンプルデータ
  const databaseItems = [
    {
      id: 1,
      title: "トヨタ自動車株式会社 有価証券報告書 2023年度",
      category: "securities_reports",
      company: "トヨタ自動車",
      date: "2023/06/30",
      size: "15.2 MB",
      status: "処理済",
      downloads: 245,
    },
    {
      id: 2,
      title: "ソフトバンクグループ 統合レポート 2023",
      category: "integrated_reports",
      company: "ソフトバンクグループ",
      date: "2023/07/15",
      size: "8.7 MB",
      status: "処理済",
      downloads: 189,
    },
    {
      id: 3,
      title: "三菱UFJフィナンシャル・グループ ESGレポート 2023",
      category: "esg_reports",
      company: "三菱UFJフィナンシャル・グループ",
      date: "2023/08/01",
      size: "12.4 MB",
      status: "処理中",
      downloads: 156,
    },
    {
      id: 4,
      title: "日本銀行 金融政策決定会合の結果について",
      category: "press_releases",
      company: "日本銀行",
      date: "2023/12/19",
      size: "2.1 MB",
      status: "処理済",
      downloads: 892,
    },
    {
      id: 5,
      title: "東証株価指数（TOPIX）月次レポート 2023年12月",
      category: "market_data",
      company: "東京証券取引所",
      date: "2023/12/29",
      size: "5.8 MB",
      status: "処理済",
      downloads: 334,
    },
    {
      id: 6,
      title: "日経平均株価が年初来高値を更新",
      category: "market_news",
      company: "日本経済新聞",
      date: "2023/12/28",
      size: "1.2 MB",
      status: "処理済",
      downloads: 567,
    },
  ]

  const companies = [
    "トヨタ自動車",
    "ソフトバンクグループ",
    "三菱UFJフィナンシャル・グループ",
    "日本銀行",
    "東京証券取引所",
    "日本経済新聞",
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "処理済":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            処理済
          </Badge>
        )
      case "処理中":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            処理中
          </Badge>
        )
      case "未処理":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            未処理
          </Badge>
        )
      case "エラー":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            エラー
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0]
  }

  const filteredItems = databaseItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesCompany = !selectedCompany || item.company === selectedCompany

    return matchesSearch && matchesCategory && matchesCompany
  })

  const getCategoryStats = () => {
    return categories.map((category) => ({
      ...category,
      count: databaseItems.filter((item) => item.category === category.id).length,
      processed: databaseItems.filter((item) => item.category === category.id && item.status === "処理済").length,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">データベース</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            一括インポート
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        {getCategoryStats().map((category) => (
          <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <category.icon className="h-5 w-5 text-muted-foreground" />
                <Badge className={category.color}>{category.count}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  処理済: {category.processed}/{category.count}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 検索・フィルター */}
      <Card>
        <CardHeader>
          <CardTitle>検索・フィルター</CardTitle>
          <CardDescription>データベース内のドキュメントを検索・絞り込みできます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>キーワード検索</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="タイトル、企業名で検索..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>企業・組織</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="企業を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">すべて</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>期間</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="期間を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="today">今日</SelectItem>
                  <SelectItem value="week">今週</SelectItem>
                  <SelectItem value="month">今月</SelectItem>
                  <SelectItem value="quarter">今四半期</SelectItem>
                  <SelectItem value="year">今年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* データベース一覧 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>データベース一覧</CardTitle>
              <CardDescription>{filteredItems.length}件のドキュメントが見つかりました</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  新規追加
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>新しいドキュメントを追加</DialogTitle>
                  <DialogDescription>データベースに新しいドキュメントを追加します</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>タイトル</Label>
                      <Input placeholder="ドキュメントタイトル" />
                    </div>
                    <div className="space-y-2">
                      <Label>カテゴリ</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>企業・組織</Label>
                      <Input placeholder="企業名または組織名" />
                    </div>
                    <div className="space-y-2">
                      <Label>発行日</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>説明</Label>
                    <Textarea placeholder="ドキュメントの説明（任意）" />
                  </div>
                  <div className="space-y-2">
                    <Label>ファイル</Label>
                    <Input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>追加</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">テーブル表示</TabsTrigger>
              <TabsTrigger value="cards">カード表示</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead>カテゴリ</TableHead>
                    <TableHead>企業・組織</TableHead>
                    <TableHead>日付</TableHead>
                    <TableHead>サイズ</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>DL数</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const categoryInfo = getCategoryInfo(item.category)
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate" title={item.title}>
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <categoryInfo.icon className="h-4 w-4" />
                            <span className="text-sm">{categoryInfo.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.size}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.downloads}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" title="プレビュー">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="編集">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="削除">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="cards" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const categoryInfo = getCategoryInfo(item.category)
                  return (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <categoryInfo.icon className="h-5 w-5" />
                            <Badge className={categoryInfo.color}>{categoryInfo.name}</Badge>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{item.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>サイズ: {item.size}</span>
                          <span>DL: {item.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            プレビュー
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            DL
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
