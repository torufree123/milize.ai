"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  ImageIcon,
  Wand2,
  Pencil,
  Download,
  Layers,
  Palette,
  Crop,
  Undo,
  Redo,
  Loader2,
  Video,
  Sparkles,
  Heart,
  HeartOff,
  Share2,
  FolderOpen,
  SlidersHorizontal,
  Clock,
  Calendar,
  RotateCcw,
  Play,
  Pause,
  Trash2,
  Save,
  FileIcon,
  CalendarClock,
  TimerIcon,
  ChromeIcon as GoogleIcon,
  DropletsIcon as DropboxIcon,
  AlertCircle,
  CheckCircle2,
  Info,
  Search,
  Filter,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export default function ImageMode() {
  const [activeTab, setActiveTab] = useState("generate")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // バッチ処理関連の状態
  const [batchName, setBatchName] = useState("")
  const [batchPrompt, setBatchPrompt] = useState("")
  const [batchNegativePrompt, setBatchNegativePrompt] = useState("")
  const [batchCount, setBatchCount] = useState(10)
  const [batchStartDate, setBatchStartDate] = useState<Date | undefined>(new Date())
  const [batchStartTime, setBatchStartTime] = useState("09:00")
  const [batchRecurrence, setBatchRecurrence] = useState("once")
  const [batchDuration, setBatchDuration] = useState(7)
  const [batchDays, setBatchDays] = useState<string[]>(["mon", "wed", "fri"])
  const [batchStorage, setBatchStorage] = useState("google-drive")
  const [batchFolderPath, setBatchFolderPath] = useState("AI生成画像/バッチ処理")
  const [batchNotifyEmail, setBatchNotifyEmail] = useState(true)
  const [batchNotifySlack, setBatchNotifySlack] = useState(false)
  const [batchEmailAddress, setBatchEmailAddress] = useState("")
  const [batchSlackChannel, setBatchSlackChannel] = useState("")

  // バッチ詳細ダイアログ関連の状態
  const [showBatchDetails, setShowBatchDetails] = useState(false)
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null)
  const [logFilter, setLogFilter] = useState("all")
  const [expandedLogGroups, setExpandedLogGroups] = useState<string[]>([])

  // サンプルのバッチログデータ
  const batchLogs = {
    "batch-1": [
      { id: "log-1", type: "info", timestamp: "2023/12/20 09:00:05", message: "バッチ処理を開始しました" },
      { id: "log-2", type: "info", timestamp: "2023/12/20 09:00:10", message: "画像生成を開始: 1/50" },
      { id: "log-3", type: "success", timestamp: "2023/12/20 09:00:45", message: "画像生成完了: 1/50" },
      { id: "log-4", type: "info", timestamp: "2023/12/20 09:00:50", message: "画像生成を開始: 2/50" },
      { id: "log-5", type: "success", timestamp: "2023/12/20 09:01:25", message: "画像生成完了: 2/50" },
      { id: "log-6", type: "info", timestamp: "2023/12/20 09:01:30", message: "画像生成を開始: 3/50" },
      { id: "log-7", type: "error", timestamp: "2023/12/20 09:01:45", message: "エラー: APIレート制限に達しました" },
      { id: "log-8", type: "info", timestamp: "2023/12/20 09:02:45", message: "再試行: 3/50" },
      { id: "log-9", type: "success", timestamp: "2023/12/20 09:03:15", message: "画像生成完了: 3/50" },
      { id: "log-10", type: "info", timestamp: "2023/12/20 09:03:20", message: "画像生成を開始: 4/50" },
      {
        id: "log-11",
        type: "warning",
        timestamp: "2023/12/20 09:03:40",
        message: "警告: プロンプトが最適ではありません",
      },
      { id: "log-12", type: "success", timestamp: "2023/12/20 09:04:10", message: "画像生成完了: 4/50" },
      // ... 省略 ...
      { id: "log-97", type: "info", timestamp: "2023/12/20 09:44:30", message: "画像生成を開始: 50/50" },
      { id: "log-98", type: "success", timestamp: "2023/12/20 09:45:00", message: "画像生成完了: 50/50" },
      { id: "log-99", type: "info", timestamp: "2023/12/20 09:45:05", message: "Googleドライブに保存中..." },
      {
        id: "log-100",
        type: "success",
        timestamp: "2023/12/20 09:45:15",
        message: "Googleドライブへの保存が完了しました",
      },
      { id: "log-101", type: "info", timestamp: "2023/12/20 09:45:20", message: "通知メールを送信中..." },
      { id: "log-102", type: "success", timestamp: "2023/12/20 09:45:25", message: "通知メールを送信しました" },
      { id: "log-103", type: "success", timestamp: "2023/12/20 09:45:30", message: "バッチ処理が正常に完了しました" },
    ],
    "batch-2": [
      { id: "log-1", type: "info", timestamp: "2023/12/25 15:30:00", message: "バッチ処理を開始しました" },
      { id: "log-2", type: "info", timestamp: "2023/12/25 15:30:05", message: "画像生成を開始: 1/100" },
      { id: "log-3", type: "success", timestamp: "2023/12/25 15:30:40", message: "画像生成完了: 1/100" },
      // ... 省略 ...
      { id: "log-70", type: "info", timestamp: "2023/12/25 16:45:10", message: "画像生成を開始: 35/100" },
      { id: "log-71", type: "success", timestamp: "2023/12/25 16:45:45", message: "画像生成完了: 35/100" },
      { id: "log-72", type: "info", timestamp: "2023/12/25 16:45:50", message: "処理を一時停止しました" },
    ],
    "batch-3": [
      { id: "log-1", type: "info", timestamp: "2024/01/05 10:00:00", message: "バッチ処理がスケジュールされました" },
    ],
  }

  // バッチ統計情報のサンプルデータ
  const batchStats = {
    "batch-1": {
      totalImages: 50,
      completedImages: 50,
      successRate: 98,
      errorRate: 2,
      warningRate: 4,
      totalTime: "45分25秒",
      averageTimePerImage: "54秒",
      startTime: "2023/12/20 09:00:05",
      endTime: "2023/12/20 09:45:30",
      storageUsed: "156 MB",
      apiCalls: 52,
      modelDistribution: [{ name: "Stable Diffusion XL", value: 50 }],
      resolutionDistribution: [{ name: "512x512", value: 50 }],
      promptLength: {
        average: 45,
        min: 32,
        max: 68,
      },
      processingTimeByHour: [{ hour: "09:00", time: 45.5 }],
    },
    "batch-2": {
      totalImages: 100,
      completedImages: 35,
      successRate: 100,
      errorRate: 0,
      warningRate: 0,
      totalTime: "1時間15分50秒",
      averageTimePerImage: "2分10秒",
      startTime: "2023/12/25 15:30:00",
      endTime: "進行中",
      storageUsed: "112 MB",
      apiCalls: 35,
      modelDistribution: [{ name: "Stable Diffusion XL", value: 35 }],
      resolutionDistribution: [{ name: "1024x1024", value: 35 }],
      promptLength: {
        average: 62,
        min: 48,
        max: 85,
      },
      processingTimeByHour: [
        { hour: "15:00", time: 30.7 },
        { hour: "16:00", time: 45.1 },
      ],
    },
    "batch-3": {
      totalImages: 25,
      completedImages: 0,
      successRate: 0,
      errorRate: 0,
      warningRate: 0,
      totalTime: "0秒",
      averageTimePerImage: "0秒",
      startTime: "予定: 2024/01/05 10:00:00",
      endTime: "未開始",
      storageUsed: "0 MB",
      apiCalls: 0,
      modelDistribution: [],
      resolutionDistribution: [],
      promptLength: {
        average: 0,
        min: 0,
        max: 0,
      },
      processingTimeByHour: [],
    },
  }

  // バッチジョブのサンプルデータ
  const [batchJobs, setBatchJobs] = useState([
    {
      id: "batch-1",
      name: "風景画像バッチ",
      status: "completed",
      progress: 100,
      total: 50,
      startDate: "2023/12/20 09:00",
      endDate: "2023/12/20 09:45",
      prompt: "美しい自然風景、山、湖、森",
    },
    {
      id: "batch-2",
      name: "抽象アートコレクション",
      status: "in-progress",
      progress: 35,
      total: 100,
      startDate: "2023/12/25 15:30",
      endDate: "-",
      prompt: "カラフルな抽象アート、流体的な形状、鮮やかな色彩",
    },
    {
      id: "batch-3",
      name: "ポートレートシリーズ",
      status: "scheduled",
      progress: 0,
      total: 25,
      startDate: "2024/01/05 10:00",
      endDate: "-",
      prompt: "プロフェッショナルなポートレート写真、スタジオライティング",
    },
  ])

  // サンプルデータ
  const samplePortfolio = [
    {
      id: "1",
      url: "/abstract-blue-purple.png",
      prompt: "抽象的なデジタルアート、青と紫の色調",
      createdAt: "2023/12/25",
      isFavorite: true,
      tags: ["抽象", "デジタルアート", "青", "紫"],
    },
    {
      id: "2",
      url: "/futuristic-cityscape-neon.png",
      prompt: "未来的な都市の夜景、ネオンライト",
      createdAt: "2023/12/24",
      isFavorite: false,
      tags: ["都市", "夜景", "未来", "ネオン"],
    },
    {
      id: "3",
      url: "/japanese-cherry-blossom-garden.png",
      prompt: "桜と伝統的な建築物がある日本庭園",
      createdAt: "2023/12/23",
      isFavorite: true,
      tags: ["日本", "庭園", "桜", "伝統"],
    },
    {
      id: "4",
      url: "/colorful-coral-reef.png",
      prompt: "カラフルなサンゴ礁と熱帯魚がある水中シーン",
      createdAt: "2023/12/22",
      isFavorite: false,
      tags: ["水中", "サンゴ礁", "魚", "海"],
    },
    {
      id: "5",
      url: "/snowy-mountain-sunset.png",
      prompt: "夕暮れ時の雪山と森の風景",
      createdAt: "2023/12/21",
      isFavorite: true,
      tags: ["山", "雪", "森", "夕暮れ"],
    },
    {
      id: "6",
      url: "/cyberpunk-glowing-future.png",
      prompt: "サイバーパンクキャラクター、光る要素と未来的な背景",
      createdAt: "2023/12/20",
      isFavorite: false,
      tags: ["サイバーパンク", "キャラクター", "SF", "未来"],
    },
  ]

  const [portfolio, setPortfolio] = useState(samplePortfolio)
  const [filteredPortfolio, setFilteredPortfolio] = useState(samplePortfolio)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFavorites, setFilterFavorites] = useState(false)

  // 画像生成処理
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "エラー",
        description: "プロンプトを入力してください",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // 生成処理のシミュレーション
    setTimeout(() => {
      const newImage = {
        id: (portfolio.length + 1).toString(),
        url: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`,
        prompt: prompt,
        createdAt: new Date().toLocaleDateString("ja-JP"),
        isFavorite: false,
        tags: prompt
          .split(" ")
          .filter((tag) => tag.length > 1)
          .slice(0, 4),
      }

      setPortfolio([newImage, ...portfolio])
      setFilteredPortfolio([newImage, ...filteredPortfolio])
      setSelectedImage(newImage.url)
      setIsGenerating(false)
      setActiveTab("edit")

      toast({
        title: "画像生成完了",
        description: "AIによる画像生成が完了しました",
      })
    }, 3000)
  }

  // バッチ処理の作成
  const handleCreateBatch = () => {
    if (!batchName.trim() || !batchPrompt.trim()) {
      toast({
        title: "エラー",
        description: "バッチ名とプロンプトは必須です",
        variant: "destructive",
      })
      return
    }

    const newBatch = {
      id: `batch-${batchJobs.length + 1}`,
      name: batchName,
      status: "scheduled",
      progress: 0,
      total: batchCount,
      startDate: `${batchStartDate ? format(batchStartDate, "yyyy/MM/dd") : ""} ${batchStartTime}`,
      endDate: "-",
      prompt: batchPrompt,
    }

    setBatchJobs([newBatch, ...batchJobs])

    toast({
      title: "バッチ処理が作成されました",
      description: `${batchName}は${batchStartDate ? format(batchStartDate, "yyyy/MM/dd") : ""} ${batchStartTime}に開始されます`,
    })

    // フォームをリセット
    setBatchName("")
    setBatchPrompt("")
    setBatchNegativePrompt("")
    setBatchCount(10)
  }

  // バッチジョブの削除
  const handleDeleteBatch = (id: string) => {
    setBatchJobs(batchJobs.filter((job) => job.id !== id))
    toast({
      title: "バッチ処理が削除されました",
      description: "選択したバッチ処理が削除されました",
    })
  }

  // バッチジョブの一時停止/再開
  const handleToggleBatchStatus = (id: string) => {
    setBatchJobs(
      batchJobs.map((job) => {
        if (job.id === id && job.status === "in-progress") {
          toast({
            title: "バッチ処理が一時停止されました",
            description: `${job.name}の処理が一時停止されました`,
          })
          return { ...job, status: "paused" }
        } else if (job.id === id && job.status === "paused") {
          toast({
            title: "バッチ処理が再開されました",
            description: `${job.name}の処理が再開されました`,
          })
          return { ...job, status: "in-progress" }
        }
        return job
      }),
    )
  }

  // バッチ詳細を表示
  const handleShowBatchDetails = (id: string) => {
    setSelectedBatchId(id)
    setShowBatchDetails(true)
    setExpandedLogGroups([])
  }

  // ログのフィルタリング
  const getFilteredLogs = () => {
    if (!selectedBatchId || !batchLogs[selectedBatchId]) return []

    if (logFilter === "all") return batchLogs[selectedBatchId]
    return batchLogs[selectedBatchId].filter((log) => log.type === logFilter)
  }

  // ログタイプに応じたアイコンを返す
  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // ロググループの展開/折りたたみを切り替え
  const toggleLogGroup = (group: string) => {
    if (expandedLogGroups.includes(group)) {
      setExpandedLogGroups(expandedLogGroups.filter((g) => g !== group))
    } else {
      setExpandedLogGroups([...expandedLogGroups, group])
    }
  }

  // ログをグループ化する
  const groupLogs = (logs: any[]) => {
    const groups: { [key: string]: any[] } = {}

    logs.forEach((log) => {
      const date = log.timestamp.split(" ")[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(log)
    })

    return groups
  }

  // バッチステータスに応じたバッジの色を返す
  const getBatchStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">完了</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">実行中</Badge>
      case "paused":
        return <Badge className="bg-yellow-500">一時停止</Badge>
      case "scheduled":
        return <Badge className="bg-purple-500">予定</Badge>
      case "failed":
        return <Badge className="bg-red-500">失敗</Badge>
      default:
        return <Badge>不明</Badge>
    }
  }

  // ファイルアップロード処理
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ファイルタイプチェック
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "エラー",
        description: "画像または動画ファイルを選択してください",
        variant: "destructive",
      })
      return
    }

    // ファイルサイズチェック (20MB以下)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "エラー",
        description: "ファイルサイズは20MB以下にしてください",
        variant: "destructive",
      })
      return
    }

    // アップロード処理のシミュレーション
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const uploadedUrl = event.target.result.toString()

        const newImage = {
          id: (portfolio.length + 1).toString(),
          url: uploadedUrl,
          prompt: "アップロードされた画像",
          createdAt: new Date().toLocaleDateString("ja-JP"),
          isFavorite: false,
          tags: ["アップロード"],
        }

        setPortfolio([newImage, ...portfolio])
        setFilteredPortfolio([newImage, ...filteredPortfolio])
        setSelectedImage(newImage.url)
        setActiveTab("edit")

        toast({
          title: "アップロード完了",
          description: `${file.name}のアップロードが完了しました`,
        })
      }
    }
    reader.readAsDataURL(file)
  }

  // 画像編集開始
  const handleStartEditing = () => {
    if (!selectedImage) {
      toast({
        title: "エラー",
        description: "編集する画像を選択してください",
        variant: "destructive",
      })
      return
    }

    setIsEditing(true)
    toast({
      title: "編集モード",
      description: "画像の編集を開始しました",
    })
  }

  // 画像編集保存
  const handleSaveEdit = () => {
    setIsEditing(false)
    toast({
      title: "編集保存",
      description: "画像の編集内容を保存しました",
    })
  }

  // お気に入り切り替え
  const toggleFavorite = (id: string) => {
    const updatedPortfolio = portfolio.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
    )
    setPortfolio(updatedPortfolio)
    setFilteredPortfolio(filterFavorites ? updatedPortfolio.filter((item) => item.isFavorite) : updatedPortfolio)

    const action = updatedPortfolio.find((item) => item.id === id)?.isFavorite ? "追加" : "削除"

    toast({
      title: `お気に入り${action}`,
      description: `画像をお気に入りに${action}しました`,
    })
  }

  // 検索とフィルタリング
  const handleSearch = () => {
    let filtered = portfolio

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (filterFavorites) {
      filtered = filtered.filter((item) => item.isFavorite)
    }

    setFilteredPortfolio(filtered)
  }

  // ポートフォリオ画像選択
  const handleSelectPortfolioImage = (url: string) => {
    setSelectedImage(url)
    setActiveTab("edit")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">画像モード</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            設定
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="generate">
                <Wand2 className="mr-2 h-4 w-4" />
                画像生成
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                アップロード
              </TabsTrigger>
              <TabsTrigger value="edit">
                <Pencil className="mr-2 h-4 w-4" />
                編集
              </TabsTrigger>
              <TabsTrigger value="batch">
                <Clock className="mr-2 h-4 w-4" />
                バッチ処理
              </TabsTrigger>
            </TabsList>

            {/* 画像生成タブ */}
            <TabsContent value="generate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AIによる画像生成</CardTitle>
                  <CardDescription>プロンプトを入力して画像を生成</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">プロンプト</Label>
                    <Textarea
                      id="prompt"
                      placeholder="生成したい画像の詳細な説明を入力..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="negative-prompt">ネガティブプロンプト（オプション）</Label>
                    <Textarea
                      id="negative-prompt"
                      placeholder="画像に含めたくない要素を入力..."
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="advanced-options" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                    <Label htmlFor="advanced-options">詳細設定を表示</Label>
                  </div>

                  {showAdvanced && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>モデル</Label>
                          <span className="text-sm font-medium">Stable Diffusion XL</span>
                        </div>
                        <Select defaultValue="sdxl">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sdxl">Stable Diffusion XL</SelectItem>
                            <SelectItem value="sd15">Stable Diffusion 1.5</SelectItem>
                            <SelectItem value="dalle3">DALL-E 3</SelectItem>
                            <SelectItem value="midjourney">Midjourney</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>サイズ</Label>
                          <span className="text-sm font-medium">512 x 512</span>
                        </div>
                        <Select defaultValue="512">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="512">512 x 512</SelectItem>
                            <SelectItem value="768">768 x 768</SelectItem>
                            <SelectItem value="1024">1024 x 1024</SelectItem>
                            <SelectItem value="custom">カスタム</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>ステップ数</Label>
                          <span className="text-sm font-medium">30</span>
                        </div>
                        <Slider defaultValue={[30]} min={10} max={50} step={1} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>CFG Scale</Label>
                          <span className="text-sm font-medium">7.0</span>
                        </div>
                        <Slider defaultValue={[7]} min={1} max={15} step={0.5} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>シード</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" placeholder="ランダム" className="w-32" />
                            <Button variant="outline" size="sm">
                              ランダム
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    プロンプト例
                  </Button>
                  <Button onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        画像を生成
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* アップロードタブ */}
            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>画像・動画のアップロード</CardTitle>
                  <CardDescription>編集したいファイルをアップロード</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <Video className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">ファイルをドラッグ＆ドロップ</h3>
                      <p className="text-sm text-muted-foreground">または、クリックしてファイルを選択</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        対応形式: JPG, PNG, GIF, SVG, WEBP, MP4, WEBM (最大20MB)
                      </p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col w-full gap-2">
                    <div className="text-sm text-muted-foreground">最近アップロードしたファイル</div>
                    <div className="grid grid-cols-4 gap-2">
                      {portfolio.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleSelectPortfolioImage(item.url)}
                        >
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.prompt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* 編集タブ */}
            <TabsContent value="edit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>画像編集</CardTitle>
                  <CardDescription>画像の加工・修正</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedImage ? (
                    <div className="space-y-4">
                      <div className="relative aspect-square rounded-lg overflow-hidden border">
                        <img
                          src={selectedImage || "/placeholder.svg"}
                          alt="Selected image"
                          className="w-full h-full object-contain"
                        />
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white text-center">
                              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                              <p className="mt-2">編集モード</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={isEditing ? "default" : "outline"}
                          size="sm"
                          onClick={isEditing ? handleSaveEdit : handleStartEditing}
                        >
                          {isEditing ? (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              編集を保存
                            </>
                          ) : (
                            <>
                              <Pencil className="mr-2 h-4 w-4" />
                              編集を開始
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          ダウンロード
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentImage = portfolio.find((item) => item.url === selectedImage)
                            if (currentImage) {
                              toggleFavorite(currentImage.id)
                            }
                          }}
                        >
                          {portfolio.find((item) => item.url === selectedImage)?.isFavorite ? (
                            <>
                              <HeartOff className="mr-2 h-4 w-4" />
                              お気に入り解除
                            </>
                          ) : (
                            <>
                              <Heart className="mr-2 h-4 w-4" />
                              お気に入り
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          共有
                        </Button>
                      </div>

                      {isEditing && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="mb-2 block">調整</Label>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">明るさ</span>
                                    <span className="text-sm font-medium">0</span>
                                  </div>
                                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">コントラスト</span>
                                    <span className="text-sm font-medium">0</span>
                                  </div>
                                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">彩度</span>
                                    <span className="text-sm font-medium">0</span>
                                  </div>
                                  <Slider defaultValue={[0]} min={-100} max={100} step={1} />
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label className="mb-2 block">フィルター</Label>
                              <div className="grid grid-cols-3 gap-2">
                                {["ノーマル", "モノクロ", "セピア", "ビンテージ", "ドラマチック", "シャープ"].map(
                                  (filter) => (
                                    <Button key={filter} variant="outline" size="sm" className="h-auto py-1 px-2">
                                      {filter}
                                    </Button>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>ツール</Label>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                <Crop className="mr-2 h-4 w-4" />
                                切り抜き
                              </Button>
                              <Button variant="outline" size="sm">
                                <Palette className="mr-2 h-4 w-4" />
                                カラー
                              </Button>
                              <Button variant="outline" size="sm">
                                <Layers className="mr-2 h-4 w-4" />
                                レイヤー
                              </Button>
                              <Button variant="outline" size="sm">
                                <Undo className="mr-2 h-4 w-4" />
                                元に戻す
                              </Button>
                              <Button variant="outline" size="sm">
                                <Redo className="mr-2 h-4 w-4" />
                                やり直し
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>AIによる編集</Label>
                            <div className="flex gap-2">
                              <Input placeholder="AIに編集指示を入力..." className="flex-1" />
                              <Button>
                                <Wand2 className="mr-2 h-4 w-4" />
                                適用
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center text-center border rounded-lg">
                      <div>
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">画像が選択されていません</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          編集する画像を生成またはアップロードしてください
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* バッチ処理タブ */}
            <TabsContent value="batch" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>バッチ処理設定</CardTitle>
                  <CardDescription>複数の画像を自動生成するバッチ処理を設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch-name">バッチ名</Label>
                      <Input
                        id="batch-name"
                        placeholder="バッチ処理の名前"
                        value={batchName}
                        onChange={(e) => setBatchName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="batch-prompt">プロンプト</Label>
                      <Textarea
                        id="batch-prompt"
                        placeholder="生成する画像のプロンプト"
                        value={batchPrompt}
                        onChange={(e) => setBatchPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="batch-negative-prompt">ネガティブプロンプト（オプション）</Label>
                      <Textarea
                        id="batch-negative-prompt"
                        placeholder="画像に含めたくない要素"
                        value={batchNegativePrompt}
                        onChange={(e) => setBatchNegativePrompt(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="batch-count">生成数</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="batch-count"
                          type="number"
                          min={1}
                          max={1000}
                          value={batchCount}
                          onChange={(e) => setBatchCount(Number.parseInt(e.target.value) || 10)}
                          className="w-32"
                        />
                        <span className="text-sm text-muted-foreground">画像</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>開始日</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <Calendar className="mr-2 h-4 w-4" />
                              {batchStartDate ? format(batchStartDate, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={batchStartDate}
                              onSelect={setBatchStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="batch-start-time">開始時刻</Label>
                        <Input
                          id="batch-start-time"
                          type="time"
                          value={batchStartTime}
                          onChange={(e) => setBatchStartTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>実行周期</Label>
                      <RadioGroup
                        value={batchRecurrence}
                        onValueChange={setBatchRecurrence}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="once" id="once" />
                          <Label htmlFor="once" className="cursor-pointer">
                            1回のみ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily" className="cursor-pointer">
                            毎日
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly" className="cursor-pointer">
                            毎週
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="cursor-pointer">
                            毎月
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {batchRecurrence !== "once" && (
                      <>
                        <div className="space-y-2">
                          <Label>実行期間</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={1}
                              value={batchDuration}
                              onChange={(e) => setBatchDuration(Number.parseInt(e.target.value) || 7)}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              {batchRecurrence === "daily" ? "日間" : batchRecurrence === "weekly" ? "週間" : "ヶ月間"}
                            </span>
                          </div>
                        </div>

                        {batchRecurrence === "weekly" && (
                          <div className="space-y-2">
                            <Label>実行する曜日</Label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { id: "mon", label: "月" },
                                { id: "tue", label: "火" },
                                { id: "wed", label: "水" },
                                { id: "thu", label: "木" },
                                { id: "fri", label: "金" },
                                { id: "sat", label: "土" },
                                { id: "sun", label: "日" },
                              ].map((day) => (
                                <Button
                                  key={day.id}
                                  variant={batchDays.includes(day.id) ? "default" : "outline"}
                                  size="sm"
                                  className="w-10 h-10 p-0"
                                  onClick={() => {
                                    if (batchDays.includes(day.id)) {
                                      setBatchDays(batchDays.filter((d) => d !== day.id))
                                    } else {
                                      setBatchDays([...batchDays, day.id])
                                    }
                                  }}
                                >
                                  {day.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">保存設定</h3>

                      <div className="space-y-2">
                        <Label>保存先</Label>
                        <RadioGroup
                          value={batchStorage}
                          onValueChange={setBatchStorage}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="local" id="local" />
                            <Label htmlFor="local" className="cursor-pointer flex items-center">
                              <FileIcon className="mr-2 h-4 w-4" />
                              ローカルストレージ
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="google-drive" id="google-drive" />
                            <Label htmlFor="google-drive" className="cursor-pointer flex items-center">
                              <GoogleIcon className="mr-2 h-4 w-4" />
                              Googleドライブ
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dropbox" id="dropbox" />
                            <Label htmlFor="dropbox" className="cursor-pointer flex items-center">
                              <DropboxIcon className="mr-2 h-4 w-4" />
                              Dropbox
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="folder-path">保存フォルダパス</Label>
                        <div className="flex gap-2">
                          <Input
                            id="folder-path"
                            placeholder="保存先のフォルダパス"
                            value={batchFolderPath}
                            onChange={(e) => setBatchFolderPath(e.target.value)}
                          />
                          <Button variant="outline">
                            <FolderOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-medium">通知設定</h3>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notify-email"
                          checked={batchNotifyEmail}
                          onCheckedChange={(checked) => setBatchNotifyEmail(checked === true)}
                        />
                        <Label htmlFor="notify-email" className="cursor-pointer">
                          メールで通知
                        </Label>
                      </div>

                      {batchNotifyEmail && (
                        <div className="pl-6 space-y-2">
                          <Label htmlFor="email-address">メールアドレス</Label>
                          <Input
                            id="email-address"
                            type="email"
                            placeholder="example@company.com"
                            value={batchEmailAddress}
                            onChange={(e) => setBatchEmailAddress(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notify-slack"
                          checked={batchNotifySlack}
                          onCheckedChange={(checked) => setBatchNotifySlack(checked === true)}
                        />
                        <Label htmlFor="notify-slack" className="cursor-pointer">
                          Slackで通知
                        </Label>
                      </div>

                      {batchNotifySlack && (
                        <div className="pl-6 space-y-2">
                          <Label htmlFor="slack-channel">Slackチャンネル</Label>
                          <Input
                            id="slack-channel"
                            placeholder="#ai-notifications"
                            value={batchSlackChannel}
                            onChange={(e) => setBatchSlackChannel(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    リセット
                  </Button>
                  <Button onClick={handleCreateBatch}>
                    <Save className="mr-2 h-4 w-4" />
                    バッチを作成
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>バッチ処理一覧</CardTitle>
                  <CardDescription>作成したバッチ処理の管理</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {batchJobs.length > 0 ? (
                      batchJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex flex-col space-y-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleShowBatchDetails(job.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{job.name}</h3>
                              {getBatchStatusBadge(job.status)}
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.status === "in-progress" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleBatchStatus(job.id)
                                  }}
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>
                              )}
                              {job.status === "paused" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleBatchStatus(job.id)
                                  }}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteBatch(job.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground truncate">{job.prompt}</div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <CalendarClock className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span>{job.startDate}</span>
                              </div>
                              {job.status === "in-progress" && (
                                <div className="flex items-center">
                                  <TimerIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {job.progress}/{job.total} 完了
                                  </span>
                                </div>
                              )}
                            </div>

                            {job.status === "in-progress" && (
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${(job.progress / job.total) * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="mx-auto h-12 w-12 mb-2 opacity-50" />
                        <p>バッチ処理がありません</p>
                        <p className="text-sm">新しいバッチ処理を作成してください</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ポートフォリオ</CardTitle>
              <CardDescription>生成・編集した画像一覧</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="画像を検索..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant={filterFavorites ? "default" : "outline"}
                  size="icon"
                  onClick={() => {
                    setFilterFavorites(!filterFavorites)
                    handleSearch()
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSelectPortfolioImage(item.url)}
                  >
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.prompt}
                      className="w-full h-full object-cover"
                    />
                    {item.isFavorite && (
                      <div className="absolute top-1 right-1">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredPortfolio.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>画像が見つかりません</p>
                  <p className="text-sm">検索条件を変更するか、新しい画像を生成してください</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                すべての画像を表示
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* バッチ詳細ダイアログ */}
      {showBatchDetails && selectedBatchId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {batchJobs.find((job) => job.id === selectedBatchId)?.name} - 詳細情報
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowBatchDetails(false)}>
                ✕
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <Tabs defaultValue="logs">
                <TabsList className="mb-4">
                  <TabsTrigger value="logs">ログ</TabsTrigger>
                  <TabsTrigger value="stats">統計情報</TabsTrigger>
                </TabsList>

                <TabsContent value="logs" className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Select value={logFilter} onValueChange={setLogFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="info">情報</SelectItem>
                        <SelectItem value="success">成功</SelectItem>
                        <SelectItem value="warning">警告</SelectItem>
                        <SelectItem value="error">エラー</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">{getFilteredLogs().length} 件のログ</span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(groupLogs(getFilteredLogs())).map(([date, logs]) => (
                      <div key={date} className="border rounded-lg overflow-hidden">
                        <div
                          className="bg-muted p-2 flex items-center justify-between cursor-pointer"
                          onClick={() => toggleLogGroup(date)}
                        >
                          <div className="font-medium">{date}</div>
                          <div className="text-sm text-muted-foreground">{logs.length} 件のログ</div>
                        </div>

                        {expandedLogGroups.includes(date) && (
                          <div className="divide-y">
                            {logs.map((log) => (
                              <div key={log.id} className="p-2 flex items-start gap-2 hover:bg-muted/50">
                                <div className="pt-0.5">{getLogTypeIcon(log.type)}</div>
                                <div className="flex-1">
                                  <div className="text-sm">{log.message}</div>
                                  <div className="text-xs text-muted-foreground">{log.timestamp.split(" ")[1]}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="stats">
                  {selectedBatchId && batchStats[selectedBatchId] && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">
                              {batchStats[selectedBatchId].completedImages}/{batchStats[selectedBatchId].totalImages}
                            </div>
                            <p className="text-sm text-muted-foreground">完了画像数</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{batchStats[selectedBatchId].successRate}%</div>
                            <p className="text-sm text-muted-foreground">成功率</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{batchStats[selectedBatchId].totalTime}</div>
                            <p className="text-sm text-muted-foreground">合計処理時間</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-2xl font-bold">{batchStats[selectedBatchId].averageTimePerImage}</div>
                            <p className="text-sm text-muted-foreground">平均処理時間/画像</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>処理詳細</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">開始時間:</span>
                                <span>{batchStats[selectedBatchId].startTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">終了時間:</span>
                                <span>{batchStats[selectedBatchId].endTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">ストレージ使用量:</span>
                                <span>{batchStats[selectedBatchId].storageUsed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">API呼び出し回数:</span>
                                <span>{batchStats[selectedBatchId].apiCalls}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">エラー率:</span>
                                <span>{batchStats[selectedBatchId].errorRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">警告率:</span>
                                <span>{batchStats[selectedBatchId].warningRate}%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>プロンプト情報</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">平均プロンプト長:</span>
                                <span>{batchStats[selectedBatchId].promptLength.average} 文字</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">最短プロンプト:</span>
                                <span>{batchStats[selectedBatchId].promptLength.min} 文字</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">最長プロンプト:</span>
                                <span>{batchStats[selectedBatchId].promptLength.max} 文字</span>
                              </div>
                              <div className="pt-2">
                                <h4 className="text-sm font-medium mb-2">使用モデル分布</h4>
                                <div className="space-y-1">
                                  {batchStats[selectedBatchId].modelDistribution.map((item) => (
                                    <div key={item.name} className="flex justify-between">
                                      <span className="text-sm">{item.name}</span>
                                      <span className="text-sm">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="pt-2">
                                <h4 className="text-sm font-medium mb-2">解像度分布</h4>
                                <div className="space-y-1">
                                  {batchStats[selectedBatchId].resolutionDistribution.map((item) => (
                                    <div key={item.name} className="flex justify-between">
                                      <span className="text-sm">{item.name}</span>
                                      <span className="text-sm">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-4 border-t flex justify-end">
              <Button variant="outline" onClick={() => setShowBatchDetails(false)}>
                閉じる
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
