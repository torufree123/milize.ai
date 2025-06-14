import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CalendarDays, ArrowRight } from "lucide-react"

const announcements = [
  {
    id: "1",
    title: "システムメンテナンスのお知らせ",
    date: "2023/06/15",
    priority: "重要",
    content: "6月15日の深夜1:00から3:00までシステムメンテナンスを実施します。この間はサービスをご利用いただけません。",
  },
  {
    id: "2",
    title: "新機能のベータテスト参加者募集",
    date: "2023/06/20",
    priority: "一般",
    content: "新しい画像生成機能のベータテスト参加者を募集しています。興味のある方は管理者までご連絡ください。",
  },
  {
    id: "3",
    title: "利用規約の改定について",
    date: "2023/07/01",
    priority: "重要",
    content: "7月1日より利用規約を改定いたします。主な変更点は個人情報の取り扱いとAPIの利用制限に関する部分です。",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "重要":
      return <Badge variant="destructive">{priority}</Badge>
    case "一般":
      return <Badge variant="outline">{priority}</Badge>
    default:
      return <Badge>{priority}</Badge>
  }
}

export default function Announcements() {
  return (
    <div className="space-y-4">
      {announcements.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                <CardTitle>{item.title}</CardTitle>
              </div>
              {getPriorityBadge(item.priority)}
            </div>
            <CardDescription className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3" />
              {item.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
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
