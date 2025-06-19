import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, TableIcon, Presentation, ImageIcon, Layers } from "lucide-react"

const analyses = [
  {
    id: "1",
    name: "四半期レポート分析",
    date: "2023/06/10",
    mode: "chat",
    status: "完了",
    source: "PDF",
  },
  {
    id: "2",
    name: "売上データ可視化",
    date: "2023/06/09",
    mode: "table",
    status: "完了",
    source: "CSV",
  },
  {
    id: "3",
    name: "プレゼン資料作成",
    date: "2023/06/08",
    mode: "presentation",
    status: "完了",
    source: "PPTX",
  },
  {
    id: "4",
    name: "製品画像生成",
    date: "2023/06/07",
    mode: "image",
    status: "完了",
    source: "JPG",
  },
  {
    id: "5",
    name: "データバッチ処理",
    date: "2023/06/06",
    mode: "batch",
    status: "処理中",
    source: "JSON",
  },
]

const getModeIcon = (mode: string) => {
  switch (mode) {
    case "chat":
      return <MessageSquare className="h-4 w-4" />
    case "table":
      return <TableIcon className="h-4 w-4" />
    case "presentation":
      return <Presentation className="h-4 w-4" />
    case "image":
      return <ImageIcon className="h-4 w-4" />
    case "batch":
      return <Layers className="h-4 w-4" />
    default:
      return <MessageSquare className="h-4 w-4" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "完了":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Donene
        </Badge>
      )
    case "処理中":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          処理中
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

export default function RecentAnalyses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest report</CardTitle>
        <CardDescription>List of Latest report just created</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>日時</TableHead>
              <TableHead>モード</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>ソース</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id}>
                <TableCell className="font-medium">{analysis.name}</TableCell>
                <TableCell>{analysis.date}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getModeIcon(analysis.mode)}
                    <span className="ml-2">{analysis.mode}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(analysis.status)}</TableCell>
                <TableCell>{analysis.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
