"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Database, Upload, Trash2, Edit, Eye, Search, Plus, Settings } from "lucide-react"

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // サンプルデータ
  const documents = [
    { id: 1, name: "製品マニュアル.pdf", type: "PDF", size: "2.4 MB", date: "2023/06/01", status: "処理済" },
    { id: 2, name: "財務レポート.xlsx", type: "Excel", size: "1.8 MB", date: "2023/05/15", status: "処理済" },
    { id: 3, name: "顧客データ.csv", type: "CSV", size: "3.2 MB", date: "2023/05/10", status: "処理済" },
    { id: 4, name: "プレゼン資料.pptx", type: "PowerPoint", size: "5.1 MB", date: "2023/06/05", status: "処理中" },
    { id: 5, name: "会議議事録.docx", type: "Word", size: "1.2 MB", date: "2023/06/08", status: "未処理" },
  ]

  const databases = [
    { id: 1, name: "顧客データベース", type: "MySQL", tables: 12, records: "15,000+", lastSync: "2023/06/10" },
    { id: 2, name: "製品カタログ", type: "PostgreSQL", tables: 8, records: "5,200+", lastSync: "2023/06/08" },
    { id: 3, name: "販売履歴", type: "SQLite", tables: 5, records: "32,000+", lastSync: "2023/06/05" },
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
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ナレッジ管理</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            アップロード
          </Button>
          <Button variant="outline" size="sm">
            <Database className="mr-2 h-4 w-4" />
            接続
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ナレッジを検索..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          検索
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ナレッジソース</CardTitle>
          <CardDescription>AIが参照するナレッジソースを管理します</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">
                <FileText className="mr-2 h-4 w-4" />
                ドキュメント
              </TabsTrigger>
              <TabsTrigger value="databases">
                <Database className="mr-2 h-4 w-4" />
                データベース
              </TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名前</TableHead>
                      <TableHead>タイプ</TableHead>
                      <TableHead>サイズ</TableHead>
                      <TableHead>アップロード日</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
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
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  ドキュメントを追加
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="databases" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名前</TableHead>
                      <TableHead>タイプ</TableHead>
                      <TableHead>テーブル数</TableHead>
                      <TableHead>レコード数</TableHead>
                      <TableHead>最終同期</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow key={db.id}>
                        <TableCell className="font-medium">{db.name}</TableCell>
                        <TableCell>{db.type}</TableCell>
                        <TableCell>{db.tables}</TableCell>
                        <TableCell>{db.records}</TableCell>
                        <TableCell>{db.lastSync}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
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
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  データベースを接続
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ナレッジ処理</CardTitle>
            <CardDescription>ドキュメントの処理状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">処理済み</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">処理済</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">処理中</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">未処理</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              すべて処理
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ナレッジ使用状況</CardTitle>
            <CardDescription>AIによるナレッジの参照状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">最も参照されたドキュメント</span>
                <span className="text-sm font-medium">製品マニュアル.pdf</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">最も参照されたデータベース</span>
                <span className="text-sm font-medium">顧客データベース</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">今月の参照回数</span>
                <span className="text-sm font-medium">248回</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">前月比</span>
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              詳細レポート
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
