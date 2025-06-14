import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowRight } from "lucide-react"

const news = [
  {
    id: "1",
    title: "新しいAIモデルがリリースされました",
    date: "2023/06/10",
    category: "新機能",
    summary: "最新のAIモデルがリリースされ、より高度な分析が可能になりました。特に自然言語処理の精度が向上しています。",
  },
  {
    id: "2",
    title: "バッチ処理モードの機能強化",
    date: "2023/06/08",
    category: "アップデート",
    summary: "バッチ処理モードに新機能が追加され、大量のデータをより効率的に処理できるようになりました。",
  },
  {
    id: "3",
    title: "APIの利用制限が拡大されました",
    date: "2023/06/05",
    category: "お知らせ",
    summary:
      "すべてのユーザーに対して、APIの利用制限が拡大されました。より多くのリクエストを処理できるようになっています。",
  },
]

export default function LatestNews() {
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{item.title}</CardTitle>
              <Badge>{item.category}</Badge>
            </div>
            <CardDescription className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3" />
              {item.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.summary}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="ml-auto">
              詳細を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
