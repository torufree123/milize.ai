import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Star, ArrowRight } from "lucide-react"

const agents = [
  {
    id: "1",
    name: "データアナリストAI",
    description: "データの分析と可視化を行うエージェント",
    rating: 4.8,
    tags: ["データ分析", "可視化", "レポート"],
  },
  {
    id: "2",
    name: "ドキュメントサマリーAI",
    description: "長文ドキュメントの要約と重要ポイント抽出",
    rating: 4.7,
    tags: ["要約", "文書処理", "PDF"],
  },
  {
    id: "3",
    name: "プレゼンテーションAI",
    description: "プレゼン資料の自動生成と編集支援",
    rating: 4.5,
    tags: ["プレゼン", "スライド", "デザイン"],
  },
  {
    id: "4",
    name: "画像生成AI",
    description: "テキスト指示から高品質な画像を生成",
    rating: 4.9,
    tags: ["画像生成", "デザイン", "クリエイティブ"],
  },
]

export default function RecommendedAgents() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {agents.map((agent) => (
        <Card key={agent.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <Bot className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>{agent.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{agent.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {agent.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between">
              <span>使ってみる</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
