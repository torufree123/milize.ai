"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Presentation,
  Plus,
  Settings,
  Play,
  Download,
  Save,
  Edit,
  Trash2,
  ChevronRight,
  FileText,
  BarChart3,
  Lightbulb,
  Loader2,
  Eye,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PresentationMode() {
  const [presentationTitle, setPresentationTitle] = useState("")
  const [selectedFramework, setSelectedFramework] = useState("")
  const [chapters, setChapters] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [slides, setSlides] = useState<any[]>([])
  const [isCreateChapterOpen, setIsCreateChapterOpen] = useState(false)
  const [newChapter, setNewChapter] = useState({ title: "", description: "", order: 1 })
  const { toast } = useToast()

  // プレゼンテーションフレームワーク
  const frameworks = [
    {
      id: "problem-solution",
      name: "問題解決型",
      description: "問題提起 → 解決策 → 効果",
      chapters: [
        { title: "現状の課題", description: "現在直面している問題や課題を明確化" },
        { title: "原因分析", description: "問題の根本原因を分析" },
        { title: "解決策の提案", description: "具体的な解決策を提示" },
        { title: "実施計画", description: "解決策の実行プランを説明" },
        { title: "期待効果", description: "解決策による効果と成果を予測" },
      ],
    },
    {
      id: "business-plan",
      name: "事業計画型",
      description: "市場分析 → 戦略 → 実行計画",
      chapters: [
        { title: "エグゼクティブサマリー", description: "事業の概要と要点" },
        { title: "市場分析", description: "市場規模、競合、機会の分析" },
        { title: "事業戦略", description: "差別化戦略と競争優位性" },
        { title: "マーケティング戦略", description: "顧客獲得と販売戦略" },
        { title: "財務計画", description: "収益予測と資金計画" },
        { title: "リスクと対策", description: "想定リスクと対応策" },
      ],
    },
    {
      id: "product-launch",
      name: "製品発表型",
      description: "製品紹介 → 特徴 → 市場投入",
      chapters: [
        { title: "製品概要", description: "新製品の基本情報と位置づけ" },
        { title: "主要機能", description: "製品の核となる機能と特徴" },
        { title: "競合比較", description: "競合製品との差別化ポイント" },
        { title: "ターゲット市場", description: "想定顧客と市場セグメント" },
        { title: "価格戦略", description: "価格設定と収益モデル" },
        { title: "ローンチ計画", description: "市場投入スケジュールと戦略" },
      ],
    },
    {
      id: "quarterly-report",
      name: "四半期報告型",
      description: "実績 → 分析 → 今後の計画",
      chapters: [
        { title: "業績ハイライト", description: "四半期の主要成果と数値" },
        { title: "売上分析", description: "売上実績の詳細分析" },
        { title: "市場動向", description: "市場環境と競合状況" },
        { title: "課題と対策", description: "直面した課題と対応策" },
        { title: "次四半期計画", description: "今後の戦略と目標" },
      ],
    },
  ]

  // サンプルスライドデータ
  const sampleSlides = [
    {
      id: 1,
      title: "プレゼンテーションタイトル",
      type: "title",
      content: {
        title: "AI駆動型営業戦略の提案",
        subtitle: "デジタル変革による売上向上計画",
        author: "営業企画部",
        date: "2023年12月",
      },
    },
    {
      id: 2,
      title: "現状の課題",
      type: "content",
      content: {
        title: "現状の課題",
        bullets: [
          "営業効率の低下（前年比-15%）",
          "顧客データの分散と活用不足",
          "競合他社のデジタル化に遅れ",
          "営業プロセスの標準化不足",
        ],
        chart: "bar",
      },
    },
    {
      id: 3,
      title: "解決策の提案",
      type: "content",
      content: {
        title: "AI営業支援システムの導入",
        bullets: [
          "顧客行動予測AIによるリード優先順位付け",
          "自動化された営業プロセス管理",
          "リアルタイム売上予測ダッシュボード",
          "パーソナライズされた提案書自動生成",
        ],
        image: "ai-system-diagram",
      },
    },
  ]

  const handleFrameworkSelect = (frameworkId: string) => {
    const framework = frameworks.find((f) => f.id === frameworkId)
    if (framework) {
      setSelectedFramework(frameworkId)
      setChapters(framework.chapters.map((ch, index) => ({ ...ch, id: index + 1, order: index + 1 })))
      toast({
        title: "フレームワークを適用しました",
        description: `${framework.name}の章構成を設定しました。`,
      })
    }
  }

  const handleGenerateContent = async () => {
    if (!currentQuestion.trim()) {
      toast({
        title: "エラー",
        description: "質問を入力してください。",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // AI生成のシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const content = `# ${currentQuestion}に関する分析結果

## 概要
${currentQuestion}について、現在の市場動向と業界のベストプラクティスを分析し、具体的な提案をまとめました。

## 主要なポイント

### 1. 現状分析
- 市場規模は前年比12%成長を記録
- デジタル化の進展により顧客行動が変化
- 競合他社の新サービス投入が活発化

### 2. 機会と課題
**機会**
- AI技術の活用による効率化の可能性
- 新規顧客セグメントの開拓余地
- パートナーシップによる事業拡大

**課題**
- 既存システムとの統合の複雑さ
- 人材のスキルアップの必要性
- 初期投資コストの確保

### 3. 推奨アクション
1. **短期（3ヶ月）**: パイロットプロジェクトの実施
2. **中期（6ヶ月）**: システム本格導入と人材育成
3. **長期（12ヶ月）**: 効果測定と全社展開

## 期待効果
- 売上向上: 15-20%の増加を予測
- 効率化: 業務時間30%削減
- 顧客満足度: NPS向上10ポイント

## 次のステップ
1. ステークホルダーとの合意形成
2. 詳細な実施計画の策定
3. 予算確保と承認プロセス
4. プロジェクトチームの編成`

    setGeneratedContent(content)
    setIsGenerating(false)

    // スライド自動生成
    generateSlides(content)

    toast({
      title: "コンテンツを生成しました",
      description: "AIがプレゼンテーション内容を作成しました。",
    })
  }

  const generateSlides = (content: string) => {
    // コンテンツからスライドを自動生成
    const newSlides = [
      {
        id: Date.now() + 1,
        title: "タイトルスライド",
        type: "title",
        content: {
          title: currentQuestion,
          subtitle: "AI分析による提案",
          author: "AI Front System",
          date: new Date().toLocaleDateString("ja-JP"),
        },
      },
      {
        id: Date.now() + 2,
        title: "概要",
        type: "content",
        content: {
          title: "概要",
          bullets: [
            "市場規模は前年比12%成長を記録",
            "デジタル化の進展により顧客行動が変化",
            "競合他社の新サービス投入が活発化",
            "AI技術活用による効率化の機会",
          ],
        },
      },
      {
        id: Date.now() + 3,
        title: "現状分析",
        type: "content",
        content: {
          title: "現状分析",
          bullets: [
            "市場規模: 前年比12%成長",
            "顧客行動: デジタル化により変化",
            "競合状況: 新サービス投入が活発",
            "技術動向: AI活用が加速",
          ],
          chart: "line",
        },
      },
      {
        id: Date.now() + 4,
        title: "機会と課題",
        type: "two-column",
        content: {
          title: "機会と課題",
          left: {
            title: "機会",
            bullets: ["AI技術の活用による効率化", "新規顧客セグメントの開拓", "パートナーシップによる事業拡大"],
          },
          right: {
            title: "課題",
            bullets: ["既存システムとの統合の複雑さ", "人材のスキルアップの必要性", "初期投資コストの確保"],
          },
        },
      },
      {
        id: Date.now() + 5,
        title: "推奨アクション",
        type: "timeline",
        content: {
          title: "推奨アクション",
          timeline: [
            { period: "短期（3ヶ月）", action: "パイロットプロジェクトの実施" },
            { period: "中期（6ヶ月）", action: "システム本格導入と人材育成" },
            { period: "長期（12ヶ月）", action: "効果測定と全社展開" },
          ],
        },
      },
      {
        id: Date.now() + 6,
        title: "期待効果",
        type: "metrics",
        content: {
          title: "期待効果",
          metrics: [
            { label: "売上向上", value: "15-20%", description: "増加予測" },
            { label: "効率化", value: "30%", description: "業務時間削減" },
            { label: "顧客満足度", value: "+10pt", description: "NPS向上" },
          ],
        },
      },
    ]

    setSlides(newSlides)
  }

  const addChapter = () => {
    if (!newChapter.title.trim()) {
      toast({
        title: "エラー",
        description: "章のタイトルを入力してください。",
        variant: "destructive",
      })
      return
    }

    const chapter = {
      id: chapters.length + 1,
      ...newChapter,
      order: chapters.length + 1,
    }

    setChapters([...chapters, chapter])
    setNewChapter({ title: "", description: "", order: 1 })
    setIsCreateChapterOpen(false)

    toast({
      title: "章を追加しました",
      description: "新しい章が追加されました。",
    })
  }

  const SlidePreview = ({ slide }: { slide: any }) => {
    const renderSlideContent = () => {
      switch (slide.type) {
        case "title":
          return (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <h1 className="text-2xl font-bold mb-2">{slide.content.title}</h1>
              <h2 className="text-lg text-muted-foreground mb-4">{slide.content.subtitle}</h2>
              <div className="text-sm text-muted-foreground">
                <div>{slide.content.author}</div>
                <div>{slide.content.date}</div>
              </div>
            </div>
          )

        case "content":
          return (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{slide.content.title}</h2>
              <ul className="space-y-2">
                {slide.content.bullets?.map((bullet: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>
              {slide.content.chart && (
                <div className="mt-4 h-32 bg-muted rounded flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">チャート: {slide.content.chart}</span>
                </div>
              )}
            </div>
          )

        case "two-column":
          return (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{slide.content.title}</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-green-600">{slide.content.left.title}</h3>
                  <ul className="space-y-1">
                    {slide.content.left.bullets.map((bullet: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-600">+</span>
                        <span className="text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">{slide.content.right.title}</h3>
                  <ul className="space-y-1">
                    {slide.content.right.bullets.map((bullet: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-red-600">-</span>
                        <span className="text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )

        case "timeline":
          return (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{slide.content.title}</h2>
              <div className="space-y-4">
                {slide.content.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.period}</div>
                      <div className="text-sm text-muted-foreground">{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )

        case "metrics":
          return (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{slide.content.title}</h2>
              <div className="grid grid-cols-3 gap-4">
                {slide.content.metrics.map((metric: any, index: number) => (
                  <div key={index} className="text-center p-4 bg-muted rounded">
                    <div className="text-2xl font-bold text-primary">{metric.value}</div>
                    <div className="font-semibold text-sm">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )

        default:
          return (
            <div className="flex items-center justify-center h-full">
              <span className="text-muted-foreground">スライド内容</span>
            </div>
          )
      }
    }

    return (
      <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="h-48 border-b">{renderSlideContent()}</div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{slide.title}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">プレゼンテーションモード</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            保存
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

      <div className="grid gap-6 lg:grid-cols-12">
        {/* 左側: 章構成とフレームワーク */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プレゼンテーション設定</CardTitle>
              <CardDescription>タイトルとフレームワークを設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>プレゼンテーションタイトル</Label>
                <Input
                  placeholder="タイトルを入力..."
                  value={presentationTitle}
                  onChange={(e) => setPresentationTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>フレームワーク</Label>
                <Select value={selectedFramework} onValueChange={handleFrameworkSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="フレームワークを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((framework) => (
                      <SelectItem key={framework.id} value={framework.id}>
                        <div>
                          <div className="font-medium">{framework.name}</div>
                          <div className="text-xs text-muted-foreground">{framework.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>章構成</CardTitle>
                  <CardDescription>プレゼンテーションの構成を管理</CardDescription>
                </div>
                <Dialog open={isCreateChapterOpen} onOpenChange={setIsCreateChapterOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新しい章を追加</DialogTitle>
                      <DialogDescription>章のタイトルと説明を入力してください</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>章タイトル</Label>
                        <Input
                          placeholder="章のタイトル"
                          value={newChapter.title}
                          onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>説明</Label>
                        <Textarea
                          placeholder="章の説明"
                          value={newChapter.description}
                          onChange={(e) => setNewChapter({ ...newChapter, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateChapterOpen(false)}>
                        キャンセル
                      </Button>
                      <Button onClick={addChapter}>追加</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {chapters.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <FileText className="mx-auto h-8 w-8 mb-2" />
                  <p className="text-sm">フレームワークを選択するか、章を追加してください</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chapters.map((chapter, index) => (
                    <div key={chapter.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <span className="font-medium text-sm">{chapter.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{chapter.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 中央: 質問と回答 */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>コンテンツ生成</CardTitle>
              <CardDescription>質問を入力してAIにプレゼンテーション内容を生成させます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>質問・テーマ</Label>
                <Textarea
                  placeholder="プレゼンテーションで扱いたいテーマや質問を入力してください..."
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <Button onClick={handleGenerateContent} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    コンテンツ生成
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle>生成されたコンテンツ</CardTitle>
                <CardDescription>AIが生成したプレゼンテーション内容</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md overflow-auto max-h-96">
                    {generatedContent}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右側: スライドプレビュー */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>スライドプレビュー</CardTitle>
                  <CardDescription>{slides.length}枚のスライド</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  プレビュー
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {slides.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Presentation className="mx-auto h-12 w-12 mb-4" />
                  <p>コンテンツを生成するとスライドが表示されます</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {slides.map((slide, index) => (
                    <div key={slide.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="text-sm font-medium">{slide.title}</span>
                      </div>
                      <SlidePreview slide={slide} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
