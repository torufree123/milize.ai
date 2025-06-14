"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Upload,
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Trash2,
  Edit,
  Download,
  FileAudio,
  Mic,
  Volume2,
  VolumeX,
  Plus,
  Settings,
  RefreshCw,
  BarChart2,
  FileText,
  AudioWaveformIcon as Waveform,
  ListFilter,
} from "lucide-react"

export default function AudioKnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTab, setCurrentTab] = useState("library")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [selectedAudio, setSelectedAudio] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // サンプルデータ
  const audioFiles = [
    {
      id: 1,
      name: "顧客インタビュー_001.mp3",
      duration: "12:34",
      size: "8.2 MB",
      date: "2023/06/15",
      status: "処理済",
      tags: ["インタビュー", "顧客", "フィードバック"],
      transcription: true,
    },
    {
      id: 2,
      name: "会議録音_20230620.wav",
      duration: "45:12",
      size: "24.5 MB",
      date: "2023/06/20",
      status: "処理済",
      tags: ["会議", "企画部", "プロジェクトA"],
      transcription: true,
    },
    {
      id: 3,
      name: "製品説明_v2.mp3",
      duration: "05:45",
      size: "3.1 MB",
      date: "2023/06/25",
      status: "処理中",
      tags: ["製品", "マーケティング"],
      transcription: false,
    },
    {
      id: 4,
      name: "トレーニング音声_基礎編.mp3",
      duration: "32:18",
      size: "17.4 MB",
      date: "2023/07/01",
      status: "未処理",
      tags: ["トレーニング", "教育"],
      transcription: false,
    },
    {
      id: 5,
      name: "カスタマーサポート_通話記録.wav",
      duration: "08:52",
      size: "4.8 MB",
      date: "2023/07/05",
      status: "処理済",
      tags: ["カスタマーサポート", "問い合わせ"],
      transcription: true,
    },
  ]

  const recentAnalyses = [
    {
      id: 1,
      name: "顧客インタビュー_001.mp3",
      type: "感情分析",
      result: "ポジティブ: 65%, ネガティブ: 15%, 中立: 20%",
      date: "2023/07/10",
    },
    {
      id: 2,
      name: "会議録音_20230620.wav",
      type: "キーワード抽出",
      result: "プロジェクト, 予算, スケジュール, リソース, 課題",
      date: "2023/07/08",
    },
    {
      id: 3,
      name: "カスタマーサポート_通話記録.wav",
      type: "話者識別",
      result: "話者1: 45%, 話者2: 55%",
      date: "2023/07/07",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "処理済":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            処理済
          </Badge>
        )
      case "処理中":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            処理中
          </Badge>
        )
      case "未処理":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            未処理
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleSeek = (value: number[]) => {
    const seekTime = value[0]
    setCurrentTime(seekTime)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const selectAudio = (id: number) => {
    setSelectedAudio(id === selectedAudio ? null : id)
    setIsPlaying(false)
    // 実際のアプリでは、ここで選択した音声ファイルをロードする処理を行う
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">音声ナレッジ管理</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            アップロード
          </Button>
          <Button variant="outline" size="sm">
            <Mic className="mr-2 h-4 w-4" />
            録音
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="音声ファイルを検索..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="processed">処理済</SelectItem>
            <SelectItem value="processing">処理中</SelectItem>
            <SelectItem value="unprocessed">未処理</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          検索
        </Button>
      </div>

      <Tabs defaultValue="library" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library">
            <FileAudio className="mr-2 h-4 w-4" />
            ライブラリ
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <Waveform className="mr-2 h-4 w-4" />
            分析
          </TabsTrigger>
          <TabsTrigger value="transcription">
            <FileText className="mr-2 h-4 w-4" />
            文字起こし
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>音声ライブラリ</CardTitle>
              <CardDescription>アップロードされた音声ファイルを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">ファイル名</TableHead>
                      <TableHead>長さ</TableHead>
                      <TableHead>サイズ</TableHead>
                      <TableHead>アップロード日</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>タグ</TableHead>
                      <TableHead className="w-[100px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {audioFiles.map((file) => (
                      <TableRow
                        key={file.id}
                        className={selectedAudio === file.id ? "bg-muted/50" : ""}
                        onClick={() => selectAudio(file.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <FileAudio className="mr-2 h-4 w-4 text-muted-foreground" />
                            {file.name}
                          </div>
                        </TableCell>
                        <TableCell>{file.duration}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.date}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {file.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // 再生処理
                              }}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // 編集処理
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                // 削除処理
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedAudio && (
            <Card>
              <CardHeader>
                <CardTitle>音声プレーヤー</CardTitle>
                <CardDescription>
                  {audioFiles.find((file) => file.id === selectedAudio)?.name || "選択された音声ファイル"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {}}>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{formatTime(currentTime)}</span>
                      <span className="text-sm">
                        {audioFiles.find((file) => file.id === selectedAudio)?.duration || "00:00"}
                      </span>
                    </div>
                    <Slider
                      value={[currentTime]}
                      min={0}
                      max={100} // 実際のアプリでは音声の長さに合わせる
                      step={1}
                      onValueChange={handleSeek}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 80)}>
                      {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                    <Slider
                      className="flex-1"
                      value={[volume]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Select defaultValue="1">
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="速度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1.0x</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2.0x</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-muted-foreground">再生速度</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        ダウンロード
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        文字起こし
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 実際の音声プレーヤー（非表示） */}
                <audio
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  src="/sample-audio.mp3" // 実際のアプリでは選択した音声ファイルのURLを設定
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>音声分析</CardTitle>
              <CardDescription>音声ファイルの分析と洞察</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">感情分析</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">ポジティブ</span>
                            <span className="text-xs font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">ネガティブ</span>
                            <span className="text-xs font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">中立</span>
                            <span className="text-xs font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">話者識別</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">話者1（男性）</span>
                            <span className="text-xs font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs">話者2（女性）</span>
                            <span className="text-xs font-medium">55%</span>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">キーワード</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">プロジェクト (12)</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">予算 (8)</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">スケジュール (7)</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">リソース (5)</Badge>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">課題 (4)</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">最近の分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ファイル名</TableHead>
                          <TableHead>分析タイプ</TableHead>
                          <TableHead>結果</TableHead>
                          <TableHead>分析日</TableHead>
                          <TableHead className="w-[100px]">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentAnalyses.map((analysis) => (
                          <TableRow key={analysis.id}>
                            <TableCell className="font-medium">{analysis.name}</TableCell>
                            <TableCell>{analysis.type}</TableCell>
                            <TableCell>{analysis.result}</TableCell>
                            <TableCell>{analysis.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                  <BarChart2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                新しい分析を実行
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transcription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>文字起こし</CardTitle>
              <CardDescription>音声ファイルの文字起こしを管理します</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="ステータス" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="completed">完了</SelectItem>
                        <SelectItem value="in-progress">進行中</SelectItem>
                        <SelectItem value="not-started">未開始</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <ListFilter className="mr-2 h-4 w-4" />
                      フィルター
                    </Button>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    新規文字起こし
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">ファイル名</TableHead>
                        <TableHead>長さ</TableHead>
                        <TableHead>文字数</TableHead>
                        <TableHead>精度</TableHead>
                        <TableHead>作成日</TableHead>
                        <TableHead className="w-[100px]">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {audioFiles
                        .filter((file) => file.transcription)
                        .map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                {file.name.replace(/\.[^/.]+$/, ".txt")}
                              </div>
                            </TableCell>
                            <TableCell>{file.duration}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 5000) + 1000}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 20) + 80}%</TableCell>
                            <TableCell>{file.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>

                {selectedAudio && audioFiles.find((file) => file.id === selectedAudio)?.transcription && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">文字起こしプレビュー</CardTitle>
                      <CardDescription>
                        {audioFiles.find((file) => file.id === selectedAudio)?.name.replace(/\.[^/.]+$/, ".txt") ||
                          "選択されたファイル"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border p-4 h-[200px] overflow-y-auto">
                        <p className="text-sm">
                          [00:00:05] 話者1: こんにちは、本日のミーティングを始めたいと思います。
                        </p>
                        <p className="text-sm">
                          [00:00:10] 話者2:
                          はい、よろしくお願いします。今日は新しいプロジェクトについて話し合いましょう。
                        </p>
                        <p className="text-sm">
                          [00:00:18] 話者1:
                          そうですね。まずは予算について確認したいのですが、現在の見積もりはいくらになっていますか？
                        </p>
                        <p className="text-sm">
                          [00:00:25] 話者2: 現在の見積もりは約500万円です。ただし、これには予備費が含まれていません。
                        </p>
                        <p className="text-sm">
                          [00:00:35] 話者1: わかりました。では、予備費としていくら計上すべきでしょうか？
                        </p>
                        <p className="text-sm">
                          [00:00:42] 話者2:
                          通常は全体の10〜15%程度を見ておくと良いでしょう。この場合、50〜75万円程度になります。
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="auto-timestamps" />
                        <Label htmlFor="auto-timestamps">タイムスタンプ表示</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          編集
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          ダウンロード
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>音声処理状況</CardTitle>
            <CardDescription>アップロードされた音声ファイルの処理状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">処理済み</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">処理済</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">処理中</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">未処理</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              すべて処理
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>音声分析統計</CardTitle>
            <CardDescription>音声ファイルの分析統計情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">総音声時間</span>
                <span className="text-sm font-medium">1時間45分</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">平均音声長</span>
                <span className="text-sm font-medium">21分</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">文字起こし総文字数</span>
                <span className="text-sm font-medium">12,450文字</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">平均文字起こし精度</span>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BarChart2 className="mr-2 h-4 w-4" />
              詳細レポート
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
