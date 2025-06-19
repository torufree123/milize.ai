"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Brain,
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  Download,
  Share2,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

export default function DeepSearchPage() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const steps = [
    { id: "plan", name: "分析計画", icon: Brain },
    { id: "search", name: "Web検索", icon: Search },
    { id: "ideas", name: "アイデア生成", icon: Lightbulb },
    { id: "critique", name: "批判的評価", icon: AlertTriangle },
    { id: "finalize", name: "最終化", icon: CheckCircle },
  ]

  const experts = [
    {
      name: "田中 データ",
      role: "データサイエンティスト",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "統計分析・機械学習",
      score: 4.8,
    },
    {
      name: "佐藤 ビジネス",
      role: "ビジネスアナリスト",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "市場分析・戦略立案",
      score: 4.9,
    },
    {
      name: "山田 テック",
      role: "テクニカルアーキテクト",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "システム設計・技術評価",
      score: 4.7,
    },
  ]

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    // シミュレーション: 各ステップを順次実行
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return prev
        }
        return prev + 1
      })
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deep Search</h1>
          <p className="text-muted-foreground">複数の専門家による深い分析と洞察</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            共有
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* 進行状況 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            分析進行状況
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`p-2 rounded-full ${
                      index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メイン分析エリア */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={steps[currentStep]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {steps.map((step, index) => (
                <TabsTrigger key={step.id} value={step.id} disabled={index > currentStep} className="text-xs">
                  {step.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="plan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>分析計画</CardTitle>
                  <CardDescription>分析したいトピックと目的を入力してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">分析クエリ</label>
                    <Input
                      placeholder="例: 電気自動車市場の今後5年間の成長予測"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">分析の目的</label>
                    <Textarea placeholder="分析の目的、期待される成果、活用方法を記述してください" />
                  </div>
                  <Button onClick={handleStartAnalysis} disabled={!query || isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        分析開始
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Web検索結果</CardTitle>
                  <CardDescription>関連性の高い情報を収集しています</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">検索結果 {i}</h4>
                            <p className="text-sm text-muted-foreground">関連性の高い情報が見つかりました...</p>
                          </div>
                          <Badge variant="secondary">関連度: {95 - i * 5}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ideas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>専門家によるアイデア生成</CardTitle>
                  <CardDescription>3名の専門家が多角的な視点でアイデアを提案</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experts.map((expert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={expert.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{expert.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{expert.name}</h4>
                              <Badge variant="outline">{expert.role}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{expert.score}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm">
                                {expert.role}の観点から、{query}について詳細な分析を行いました。
                                主要な洞察とアイデアを提案いたします...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="critique" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>批判的評価と監査</CardTitle>
                  <CardDescription>提案されたアイデアの検証と改善点の特定</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-medium text-red-800">潜在的リスク</h4>
                      <p className="text-sm text-red-700 mt-1">市場の変動性、技術的制約、競合他社の動向など...</p>
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-medium text-yellow-800">改善提案</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        より詳細なデータ収集、追加の検証実験、ステークホルダーとの協議...
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-medium text-blue-800">監査意見</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        全体的に妥当性の高い分析ですが、以下の点で追加検討が必要...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finalize" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>最終統合アイデア</CardTitle>
                  <CardDescription>専門家による最終的な統合と洗練</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">統合アイデア</h4>
                      <p className="text-sm text-green-700 mt-2">
                        3名の専門家による議論と批判的評価を経て、以下の統合アイデアが完成しました...
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">実装計画</h5>
                        <p className="text-sm text-muted-foreground mt-1">段階的な実装アプローチ...</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">期待効果</h5>
                        <p className="text-sm text-muted-foreground mt-1">定量的・定性的な効果...</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* サイドパネル */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                専門家チーム
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {experts.map((expert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={expert.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{expert.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{expert.name}</p>
                      <p className="text-xs text-muted-foreground">{expert.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{expert.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                分析履歴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">AI市場分析</p>
                  <p className="text-muted-foreground">2時間前</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">競合分析レポート</p>
                  <p className="text-muted-foreground">1日前</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">技術トレンド調査</p>
                  <p className="text-muted-foreground">3日前</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
