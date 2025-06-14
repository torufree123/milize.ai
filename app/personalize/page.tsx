"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Brain,
  TrendingUp,
  Hash,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Save,
  RefreshCw,
} from "lucide-react"

// サンプルデータ
const sampleUserData = {
  profile: {
    name: "田中太郎",
    role: "データアナリスト",
    department: "マーケティング部",
    experience: "3年",
    interests: ["データ分析", "機械学習", "ビジネスインテリジェンス"],
  },
  usageHistory: {
    totalSessions: 156,
    totalQueries: 1247,
    averageSessionTime: "15分",
    mostActiveTime: "14:00-16:00",
    favoriteMode: "テーブル",
  },
  themeAnalysis: [
    { theme: "データ分析", count: 45, percentage: 36 },
    { theme: "レポート作成", count: 32, percentage: 26 },
    { theme: "予測モデル", count: 28, percentage: 22 },
    { theme: "可視化", count: 20, percentage: 16 },
  ],
  keywordAnalysis: [
    { keyword: "売上", frequency: 89, trend: "up" },
    { keyword: "予測", frequency: 67, trend: "up" },
    { keyword: "分析", frequency: 54, trend: "stable" },
    { keyword: "グラフ", frequency: 43, trend: "down" },
    { keyword: "レポート", frequency: 38, trend: "up" },
  ],
  personalityInsights: {
    analyticalThinking: 85,
    creativeProblemSolving: 72,
    dataOriented: 91,
    collaborativeWork: 68,
    technicalExpertise: 79,
  },
}

export default function PersonalizePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [profileData, setProfileData] = useState(sampleUserData.profile)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // 実際の分析処理をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
  }

  const handleSaveProfile = () => {
    // プロフィール保存処理
    console.log("Profile saved:", profileData)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">パーソナライズ</h1>
          <p className="text-muted-foreground mt-2">
            あなたの属性と利用パターンを分析し、最適化されたAI体験を提供します
          </p>
        </div>
        <Button onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              再分析
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="usage">利用履歴</TabsTrigger>
          <TabsTrigger value="themes">テーマ分析</TabsTrigger>
          <TabsTrigger value="keywords">キーワード分析</TabsTrigger>
          <TabsTrigger value="insights">属性推計</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ユーザープロフィール
              </CardTitle>
              <CardDescription>
                あなたの基本情報を入力してください。より精度の高いパーソナライズが可能になります。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">役職</Label>
                  <Input
                    id="role"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">経験年数</Label>
                  <Select
                    value={profileData.experience}
                    onValueChange={(value) => setProfileData({ ...profileData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1年未満">1年未満</SelectItem>
                      <SelectItem value="1-3年">1-3年</SelectItem>
                      <SelectItem value="3-5年">3-5年</SelectItem>
                      <SelectItem value="5-10年">5-10年</SelectItem>
                      <SelectItem value="10年以上">10年以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">興味・関心分野</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <Textarea
                  id="interests"
                  placeholder="興味のある分野やスキルを入力してください（カンマ区切り）"
                  className="min-h-[80px]"
                />
              </div>
              <Button onClick={handleSaveProfile} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                プロフィールを保存
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">総セッション数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleUserData.usageHistory.totalSessions}</div>
                <p className="text-xs text-muted-foreground">過去30日間</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">総クエリ数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleUserData.usageHistory.totalQueries}</div>
                <p className="text-xs text-muted-foreground">累計</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">平均セッション時間</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleUserData.usageHistory.averageSessionTime}</div>
                <p className="text-xs text-muted-foreground">1セッションあたり</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">最も活発な時間帯</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sampleUserData.usageHistory.mostActiveTime}</div>
                <p className="text-xs text-muted-foreground">利用頻度が高い</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                利用パターン分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>最も使用するモード</span>
                    <span className="font-medium">{sampleUserData.usageHistory.favoriteMode}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>平日利用率</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>複雑なクエリ率</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                テーマ分析
              </CardTitle>
              <CardDescription>あなたの質問や作業内容から抽出された主要テーマの分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleUserData.themeAnalysis.map((theme, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{theme.theme}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{theme.count}回</span>
                        <Badge variant="outline">{theme.percentage}%</Badge>
                      </div>
                    </div>
                    <Progress value={theme.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                テーマトレンド
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>テーマの時系列変化グラフがここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                キーワード分析
              </CardTitle>
              <CardDescription>頻繁に使用されるキーワードとその傾向</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleUserData.keywordAnalysis.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-mono">
                        {keyword.keyword}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{keyword.frequency}回使用</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {keyword.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {keyword.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                      {keyword.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                ユーザー属性推計
              </CardTitle>
              <CardDescription>利用履歴とパターン分析から推計されたあなたの特性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(sampleUserData.personalityInsights).map(([key, value]) => {
                  const labels = {
                    analyticalThinking: "分析的思考",
                    creativeProblemSolving: "創造的問題解決",
                    dataOriented: "データ指向",
                    collaborativeWork: "協調作業",
                    technicalExpertise: "技術的専門性",
                  }
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{labels[key as keyof typeof labels]}</span>
                        <span className="text-sm font-bold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-3" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                パーソナライズ提案
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium mb-2">推奨AIモード</h4>
                  <p className="text-sm text-muted-foreground">
                    データ分析に特化した使用パターンから、<strong>テーブルモード</strong>と
                    <strong>プレゼンテーションモード</strong>の組み合わせをお勧めします。
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium mb-2">効率化提案</h4>
                  <p className="text-sm text-muted-foreground">
                    よく使用するキーワード「売上」「予測」を含むテンプレートを作成することで、作業効率が向上します。
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <h4 className="font-medium mb-2">学習提案</h4>
                  <p className="text-sm text-muted-foreground">
                    機械学習への関心が高いため、予測モデリング機能の活用をお勧めします。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
