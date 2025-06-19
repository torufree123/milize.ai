"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  Eye,
  BookOpen,
  Video,
  MessageCircle,
  TrendingUp,
  Filter,
  Star,
  Users,
  Settings,
  FileText,
  HelpCircle,
  Zap,
} from "lucide-react"

const topQuestions = [
  {
    id: 1,
    rank: 1,
    question: "AIエージェントの作成方法は？",
    answer:
      "AIエージェントを作成するには、以下の手順に従ってください：\n1. 「AIエージェント」メニューをクリック\n2. 「新しいエージェント」ボタンを押す\n3. エージェント名と説明を入力\n4. 使用するAIモデルを選択\n5. プロンプトを設定\n6. 「保存」をクリック",
    category: "基本操作",
    views: 1234,
    helpful: 89,
    notHelpful: 12,
  },
  {
    id: 2,
    rank: 2,
    question: "ファイルアップロードの制限は？",
    answer:
      "ファイルアップロードには以下の制限があります：\n• 最大ファイルサイズ: 100MB\n• 対応形式: PDF, CSV, Excel, Word, PowerPoint\n• 同時アップロード: 最大10ファイル\n• 月間アップロード制限: プランにより異なります",
    category: "基本操作",
    views: 987,
    helpful: 76,
    notHelpful: 8,
  },
  {
    id: 3,
    rank: 3,
    question: "分析結果の保存方法は？",
    answer:
      "分析結果を保存するには：\n1. 分析完了後、「保存」ボタンをクリック\n2. 分析名を入力\n3. カテゴリを選択（任意）\n4. 「保存」を確定\n\n保存された分析は「マイページ」から確認できます。",
    category: "データ分析",
    views: 856,
    helpful: 82,
    notHelpful: 6,
  },
  {
    id: 4,
    rank: 4,
    question: "プロンプトの最適化方法は？",
    answer:
      "効果的なプロンプト作成のコツ：\n• 具体的で明確な指示を書く\n• 期待する出力形式を指定\n• 例を含める\n• 段階的な指示を提供\n• 制約条件を明記\n\nプロンプトライブラリも活用してください。",
    category: "AIエージェント",
    views: 743,
    helpful: 91,
    notHelpful: 4,
  },
  {
    id: 5,
    rank: 5,
    question: "コスト計算の仕組みは？",
    answer:
      "コストは以下の要素で計算されます：\n• 使用したAIモデル\n• 処理したトークン数\n• 実行時間\n• 使用した機能\n\n詳細は「利用状況・モニタリング」で確認できます。",
    category: "アカウント",
    views: 692,
    helpful: 73,
    notHelpful: 11,
  },
  {
    id: 6,
    rank: 6,
    question: "データの安全性は？",
    answer:
      "データセキュリティ対策：\n• エンドツーエンド暗号化\n• SOC2 Type II準拠\n• GDPR対応\n• 定期的なセキュリティ監査\n• アクセス制御とログ管理\n\nお客様のデータは厳重に保護されています。",
    category: "アカウント",
    views: 634,
    helpful: 88,
    notHelpful: 7,
  },
  {
    id: 7,
    rank: 7,
    question: "API連携の設定方法は？",
    answer:
      "API連携の設定手順：\n1. 「設定」→「API設定」を開く\n2. 「新しいAPI接続」をクリック\n3. API種類を選択（Dify、LangChain等）\n4. 認証情報を入力\n5. 接続テストを実行\n6. 設定を保存",
    category: "AIエージェント",
    views: 578,
    helpful: 79,
    notHelpful: 9,
  },
  {
    id: 8,
    rank: 8,
    question: "エラーの対処法は？",
    answer:
      "一般的なエラーの対処法：\n• ページを再読み込み\n• ブラウザのキャッシュをクリア\n• 異なるブラウザで試す\n• ファイル形式を確認\n• インターネット接続を確認\n\n解決しない場合はサポートにお問い合わせください。",
    category: "トラブルシューティング",
    views: 523,
    helpful: 65,
    notHelpful: 15,
  },
  {
    id: 9,
    rank: 9,
    question: "チーム共有機能の使い方は？",
    answer:
      "チーム共有の設定：\n1. 共有したい分析を選択\n2. 「共有」ボタンをクリック\n3. 共有相手のメールアドレスを入力\n4. 権限レベルを設定（閲覧のみ/編集可能）\n5. 「共有」を確定",
    category: "基本操作",
    views: 467,
    helpful: 71,
    notHelpful: 8,
  },
  {
    id: 10,
    rank: 10,
    question: "バックアップ・復元方法は？",
    answer:
      "データのバックアップ：\n• 自動バックアップ: 毎日実行\n• 手動バックアップ: 「設定」→「データ管理」\n• エクスポート機能: CSV、JSON形式\n• 復元: サポートチームにお問い合わせ\n\nデータは30日間保持されます。",
    category: "アカウント",
    views: 412,
    helpful: 68,
    notHelpful: 12,
  },
]

const categories = [
  { name: "すべて", count: 63, icon: HelpCircle },
  { name: "基本操作", count: 15, icon: Settings },
  { name: "AIエージェント", count: 12, icon: Zap },
  { name: "データ分析", count: 18, icon: FileText },
  { name: "アカウント", count: 8, icon: Users },
  { name: "トラブルシューティング", count: 10, icon: HelpCircle },
]

const guides = [
  {
    title: "クイックスタートガイド",
    description: "AI Front Systemの基本的な使い方を学ぶ",
    icon: BookOpen,
    duration: "10分",
    type: "ガイド",
  },
  {
    title: "AIエージェント作成チュートリアル",
    description: "効果的なAIエージェントの作成方法",
    icon: Video,
    duration: "15分",
    type: "動画",
  },
  {
    title: "データ分析ベストプラクティス",
    description: "分析精度を向上させるためのコツ",
    icon: TrendingUp,
    duration: "20分",
    type: "ガイド",
  },
  {
    title: "プロンプトエンジニアリング",
    description: "高品質なプロンプトの作成方法",
    icon: Star,
    duration: "25分",
    type: "動画",
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [sortBy, setSortBy] = useState("人気順")

  const filteredQuestions = topQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "すべて" || q.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "人気順") return a.rank - b.rank
    if (sortBy === "閲覧数") return b.views - a.views
    if (sortBy === "評価順") return b.helpful / (b.helpful + b.notHelpful) - a.helpful / (a.helpful + a.notHelpful)
    return 0
  })

  const handleVote = (questionId: number, isHelpful: boolean) => {
    // 実際の実装では、ここでAPIを呼び出して投票を記録
    console.log(`Question ${questionId} voted as ${isHelpful ? "helpful" : "not helpful"}`)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">FAQ・マニュアル</h1>
        <p className="text-muted-foreground">よくある質問とシステムの使い方をご案内します</p>
      </div>

      {/* 統計サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">総質問数</p>
                <p className="text-2xl font-bold">63</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">総閲覧数</p>
                <p className="text-2xl font-bold">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">満足度</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">今月の質問</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">よくある質問</TabsTrigger>
          <TabsTrigger value="guides">ガイド・マニュアル</TabsTrigger>
          <TabsTrigger value="support">サポート</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* 検索・フィルター */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="質問を検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-4 w-4" />
                          <span>{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="人気順">人気順</SelectItem>
                    <SelectItem value="閲覧数">閲覧数</SelectItem>
                    <SelectItem value="評価順">評価順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* TOP10ランキング */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>よくある質問 TOP10</span>
              </CardTitle>
              <CardDescription>最も多く閲覧されている質問のランキングです</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {sortedQuestions.map((question) => (
                  <AccordionItem key={question.id} value={`item-${question.id}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-3 w-full">
                        <Badge variant="outline" className="text-xs">
                          #{question.rank}
                        </Badge>
                        <span className="flex-1">{question.question}</span>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{question.views}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">{question.answer}</pre>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{question.category}</Badge>
                            <span className="text-sm text-muted-foreground">{question.views}回閲覧</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">この回答は役に立ちましたか？</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(question.id, true)}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{question.helpful}</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(question.id, false)}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span>{question.notHelpful}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{guide.type}</Badge>
                        <span className="text-sm text-muted-foreground">約{guide.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>お問い合わせ</CardTitle>
                <CardDescription>解決しない問題がございましたら、お気軽にお問い合わせください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  サポートチャット
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  お問い合わせフォーム
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>システム状況</CardTitle>
                <CardDescription>現在のサービス稼働状況をご確認いただけます</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>APIサービス</span>
                  <Badge className="bg-green-500">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>データベース</span>
                  <Badge className="bg-green-500">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>ファイルアップロード</span>
                  <Badge className="bg-green-500">正常</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  詳細ステータスページ
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
