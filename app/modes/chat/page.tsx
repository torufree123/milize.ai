"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "ai/react"
import { Bot, User, Send, Paperclip, Settings, FileCode, Database, Star, Save, Play, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function ChatMode() {
  const [selectedKnowledge, setSelectedKnowledge] = useState<string>("none")
  const [selectedPrompt, setSelectedPrompt] = useState<string>("")
  const [selectedRAG, setSelectedRAG] = useState<string>("none")
  const [temperature, setTemperature] = useState<number>(0.7)
  const [isSequentialMode, setIsSequentialMode] = useState(false)
  const [sequentialPrompts, setSequentialPrompts] = useState<string[]>(["", "", ""])
  const [isRunningSequential, setIsRunningSequential] = useState(false)
  const [currentSequentialStep, setCurrentSequentialStep] = useState(0)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [saveData, setSaveData] = useState({ name: "", rating: 5, tags: "" })
  const { toast } = useToast()

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  // サンプルプロンプトデータ
  const savedPrompts = [
    {
      id: "1",
      name: "顧客提案書作成支援",
      content: "あなたは経験豊富な金融営業担当者です。以下の顧客情報を基に、最適な金融商品の提案書を作成してください。",
      category: "営業支援",
    },
    {
      id: "2",
      name: "リスク分析レポート生成",
      content:
        "あなたは金融リスク管理の専門家です。以下のデータを分析し、包括的なリスク分析レポートを作成してください。",
      category: "分析",
    },
    {
      id: "3",
      name: "法務文書レビュー支援",
      content:
        "あなたは経験豊富な法務担当者です。以下の契約書を詳細にレビューし、法的リスクと改善点を指摘してください。",
      category: "法務",
    },
  ]

  // サンプルRAGデータ
  const ragSources = [
    { id: "company_docs", name: "会社資料", count: 245 },
    { id: "product_manual", name: "製品マニュアル", count: 156 },
    { id: "financial_reports", name: "財務レポート", count: 89 },
    { id: "customer_data", name: "顧客データ", count: 1024 },
  ]

  // 保存された結果
  const [savedResults, setSavedResults] = useState([
    {
      id: "1",
      name: "Q4売上分析レポート",
      prompt: "第4四半期の売上データを分析して...",
      result: "Q4の売上は前年同期比15%増加し...",
      rating: 8,
      createdAt: "2023/12/20",
      tags: ["売上分析", "Q4", "レポート"],
    },
    {
      id: "2",
      name: "新商品企画提案",
      prompt: "新しい金融商品のアイデアを...",
      result: "デジタル世代向けの投資アプリ...",
      rating: 9,
      createdAt: "2023/12/18",
      tags: ["商品企画", "デジタル", "投資"],
    },
  ])

  const handlePromptSelect = (promptId: string) => {
    const prompt = savedPrompts.find((p) => p.id === promptId)
    if (prompt) {
      handleInputChange({ target: { value: prompt.content } } as any)
      setSelectedPrompt(promptId)
    }
  }

  const handleSequentialRun = async () => {
    if (sequentialPrompts.every((p) => !p.trim())) {
      toast({
        title: "エラー",
        description: "少なくとも1つのプロンプトを入力してください。",
        variant: "destructive",
      })
      return
    }

    setIsRunningSequential(true)
    setCurrentSequentialStep(0)

    for (let i = 0; i < sequentialPrompts.length; i++) {
      if (sequentialPrompts[i].trim()) {
        setCurrentSequentialStep(i + 1)
        // ここで実際のAPI呼び出しを行う
        await new Promise((resolve) => setTimeout(resolve, 2000)) // シミュレーション
      }
    }

    setIsRunningSequential(false)
    setCurrentSequentialStep(0)

    toast({
      title: "連続実行完了",
      description: "3つのプロンプトの実行が完了しました。",
    })
  }

  const handleSaveResult = () => {
    if (!saveData.name.trim()) {
      toast({
        title: "エラー",
        description: "結果の名前を入力してください。",
        variant: "destructive",
      })
      return
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "assistant") {
      toast({
        title: "エラー",
        description: "保存する結果がありません。",
        variant: "destructive",
      })
      return
    }

    const newResult = {
      id: (savedResults.length + 1).toString(),
      name: saveData.name,
      prompt: messages[messages.length - 2]?.content || "",
      result: lastMessage.content,
      rating: saveData.rating,
      createdAt: new Date().toLocaleDateString("ja-JP"),
      tags: saveData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setSavedResults([newResult, ...savedResults])
    setSaveData({ name: "", rating: 5, tags: "" })
    setIsSaveDialogOpen(false)

    toast({
      title: "結果を保存しました",
      description: "チャット結果が保存されました。",
    })
  }

  const loadSavedResult = (result: any) => {
    // 結果を新しいメッセージとして追加
    const newMessages = [
      { id: "loaded-prompt", role: "user", content: result.prompt },
      { id: "loaded-result", role: "assistant", content: result.result },
    ]
    // ここで実際のメッセージ状態を更新する処理を実装
    toast({
      title: "結果を読み込みました",
      description: `「${result.name}」の結果を読み込みました。`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">チャットモード</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={isSequentialMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsSequentialMode(!isSequentialMode)}
          >
            <Play className="mr-2 h-4 w-4" />
            連続実行モード
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col h-[calc(100vh-12rem)]">
          {!isSequentialMode ? (
            // 通常のチャットモード
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AIチャット</CardTitle>
                    <CardDescription>AIエージェントとチャットを開始します</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedPrompt} onValueChange={handlePromptSelect}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="プロンプトを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedPrompts.map((prompt) => (
                          <SelectItem key={prompt.id} value={prompt.id}>
                            <div className="flex items-center gap-2">
                              <FileCode className="h-4 w-4" />
                              <span>{prompt.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center p-8">
                      <div>
                        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">AIチャットを開始</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          質問や指示を入力してAIエージェントとの会話を始めましょう
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === "user" ? (
                              <>
                                <span className="font-medium">あなた</span>
                                <User className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <Bot className="h-4 w-4" />
                                <span className="font-medium">AI</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          {message.role === "assistant" && (
                            <div className="mt-2 pt-2 border-t border-border/50">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsSaveDialogOpen(true)}
                                className="text-xs"
                              >
                                <Save className="mr-1 h-3 w-3" />
                                結果を保存
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                  <Button type="button" size="icon" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="メッセージを入力..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 min-h-10 resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e as any)
                      }
                    }}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || input.trim() === ""}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ) : (
            // 連続実行モード
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle>連続実行モード</CardTitle>
                <CardDescription>3つのプロンプトを順番に実行して簡単なエージェントを作成</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                {sequentialPrompts.map((prompt, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>プロンプト {index + 1}</Label>
                      {isRunningSequential && currentSequentialStep === index + 1 && (
                        <Badge variant="default" className="flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          実行中
                        </Badge>
                      )}
                      {isRunningSequential && currentSequentialStep > index + 1 && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          完了
                        </Badge>
                      )}
                    </div>
                    <Textarea
                      placeholder={`${index + 1}番目に実行するプロンプトを入力...`}
                      value={prompt}
                      onChange={(e) => {
                        const newPrompts = [...sequentialPrompts]
                        newPrompts[index] = e.target.value
                        setSequentialPrompts(newPrompts)
                      }}
                      className="min-h-20"
                      disabled={isRunningSequential}
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button onClick={handleSequentialRun} disabled={isRunningSequential} className="w-full">
                  {isRunningSequential ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      実行中... ({currentSequentialStep}/3)
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      連続実行開始
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RAG設定</CardTitle>
              <CardDescription>AIが参照するナレッジを選択</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedRAG} onValueChange={setSelectedRAG}>
                  <SelectTrigger>
                    <SelectValue placeholder="RAGソースを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">なし</SelectItem>
                    {ragSources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <span>{source.name}</span>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {source.count}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedRAG !== "none" && (
                  <div className="text-sm text-muted-foreground">選択されたRAGソースの情報がAIの回答に活用されます</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>モデル設定</CardTitle>
              <CardDescription>AIモデルのパラメータを調整</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">モデル</span>
                  <span className="text-sm font-medium">GPT-4</span>
                </div>
                <Select defaultValue="gpt4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="llama">Llama 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temperature</span>
                  <span className="text-sm font-medium">{temperature}</span>
                </div>
                <Slider
                  value={[temperature]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>精確</span>
                  <span>創造的</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">最大トークン</span>
                  <span className="text-sm font-medium">4000</span>
                </div>
                <Slider defaultValue={[4000]} min={1000} max={8000} step={1000} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>保存されたプロンプト</CardTitle>
              <CardDescription>よく使うプロンプトを選択</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recent">最近使用</TabsTrigger>
                  <TabsTrigger value="favorites">お気に入り</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="mt-4 space-y-2">
                  {savedPrompts.slice(0, 3).map((prompt) => (
                    <Button
                      key={prompt.id}
                      variant="ghost"
                      className="w-full justify-start text-sm h-auto p-3"
                      onClick={() => handlePromptSelect(prompt.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{prompt.name}</div>
                        <div className="text-xs text-muted-foreground">{prompt.category}</div>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
                <TabsContent value="favorites" className="mt-4 space-y-2">
                  <div className="text-center text-sm text-muted-foreground py-4">
                    お気に入りのプロンプトはありません
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>保存された結果</CardTitle>
              <CardDescription>過去の結果を再利用</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedResults.slice(0, 3).map((result) => (
                  <div key={result.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{result.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{result.rating}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{result.createdAt}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => loadSavedResult(result)}
                    >
                      結果を読み込み
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 結果保存ダイアログ */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>チャット結果を保存</DialogTitle>
            <DialogDescription>結果に名前を付けて保存し、後で再利用できます</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>結果の名前 *</Label>
              <Input
                placeholder="結果の名前を入力"
                value={saveData.name}
                onChange={(e) => setSaveData({ ...saveData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>評価 (1-10)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[saveData.rating]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setSaveData({ ...saveData, rating: value[0] })}
                  className="flex-1"
                />
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{saveData.rating}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>タグ (カンマ区切り)</Label>
              <Input
                placeholder="タグを入力 (例: 分析,レポート,Q4)"
                value={saveData.tags}
                onChange={(e) => setSaveData({ ...saveData, tags: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSaveResult}>
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
