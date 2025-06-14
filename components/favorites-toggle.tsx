"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function FavoritesToggle() {
  const { toast } = useToast()
  const [favorites] = useState([
    {
      id: "1",
      name: "Q4売上分析レポート",
      type: "分析結果",
      path: "/modes/table",
      createdAt: "2023/12/20",
    },
    {
      id: "2",
      name: "顧客提案書作成支援",
      type: "プロンプト",
      path: "/prompts",
      createdAt: "2023/12/18",
    },
    {
      id: "3",
      name: "リスク分析AI",
      type: "エージェント",
      path: "/agents",
      createdAt: "2023/12/15",
    },
    {
      id: "4",
      name: "財務レポート.xlsx",
      type: "ドキュメント",
      path: "/knowledge",
      createdAt: "2023/12/10",
    },
  ])

  const handleFavoriteClick = (favorite: any) => {
    toast({
      title: "お気に入りを開きます",
      description: `「${favorite.name}」を開きます。`,
    })
    // 実際の実装では、適切なページに遷移する処理を追加
    // window.location.href = favorite.path
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "分析結果":
        return "bg-blue-100 text-blue-800"
      case "プロンプト":
        return "bg-green-100 text-green-800"
      case "エージェント":
        return "bg-purple-100 text-purple-800"
      case "ドキュメント":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Star className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">お気に入り</span>
          {favorites.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {favorites.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>お気に入り</span>
          <Badge variant="outline">{favorites.length}件</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {favorites.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">お気に入りはありません</div>
        ) : (
          favorites.map((favorite) => (
            <DropdownMenuItem
              key={favorite.id}
              className="flex flex-col items-start p-3 cursor-pointer"
              onClick={() => handleFavoriteClick(favorite)}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-medium text-sm truncate flex-1">{favorite.name}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-2 flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between w-full">
                <Badge variant="outline" className={`text-xs ${getTypeColor(favorite.type)}`}>
                  {favorite.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{favorite.createdAt}</span>
              </div>
            </DropdownMenuItem>
          ))
        )}
        {favorites.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-muted-foreground">
              すべてのお気に入りを表示
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
