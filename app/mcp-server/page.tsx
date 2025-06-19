"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  MessageSquare,
  Shield,
  AlertTriangle,
  RefreshCw,
  Settings,
  BarChart,
  FileText,
  Code,
  Power,
  Zap,
  Brain,
  GitBranch,
  History,
  Layers,
} from "lucide-react"

export default function MCPServerPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [serverStatus, setServerStatus] = useState("running") // running, stopped, maintenance
  const [contextWindow, setContextWindow] = useState(128000)
  const [maxTokens, setMaxTokens] = useState(4096)
  const [streamingEnabled, setStreamingEnabled] = useState(true)
  const [toolsEnabled, setToolsEnabled] = useState(true)
  const [debugMode, setDebugMode] = useState(false)

  // サーバーステータスに基づいて色を決定
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "stopped":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // サーバーの起動/停止を切り替える
  const toggleServerStatus = () => {
    if (serverStatus === "running") {
      setServerStatus("stopped")
    } else {
      setServerStatus("running")
    }
  }

  // デバッグモードを切り替える
  const toggleDebugMode = () => {
    setDebugMode(!debugMode)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MCPサーバー設定</h1>
          <p className="text-muted-foreground">
            Model Context Protocol (MCP) - Claudeが開発したAIモデルとのインタラクションプロトコル
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(serverStatus)}`}></div>
            <span className="capitalize">
              {serverStatus === "running" ? "稼働中" : serverStatus === "stopped" ? "停止中" : "メンテナンス中"}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            設定
          </Button>
          <Button
            variant={serverStatus === "running" ? "destructive" : "default"}
            size="sm"
            onClick={toggleServerStatus}
          >
            <Power className="mr-2 h-4 w-4" />
            {serverStatus === "running" ? "停止" : "起動"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">概要</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">プロトコル設定</span>
          </TabsTrigger>
          <TabsTrigger value="models">
            <Brain className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">モデル連携</span>
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Zap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">ツール連携</span>
          </TabsTrigger>
          <TabsTrigger value="logs">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">ログ</span>
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">API設定</span>
          </TabsTrigger>
        </TabsList>

        {/* 概要タブ */}
        <TabsContent value="overview" className="space-y-4">
          {/* アラート */}
          {debugMode && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>デバッグモード有効</AlertTitle>
              <AlertDescription>
                現在MCPサーバーはデバッグモードで動作しています。詳細なログが記録されます。
              </AlertDescription>
            </Alert>
          )}

          {/* MCP概要 */}
          <Card>
            <CardHeader>
              <CardTitle>Model Context Protocol (MCP) 概要</CardTitle>
              <CardDescription>Claudeが開発したAIモデルとのインタラクションプロトコル</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Model Context Protocol
                (MCP)は、大規模言語モデル(LLM)とのインタラクションを効率化するためのプロトコルです。
                このプロトコルにより、コンテキスト管理、ツール使用、ストリーミングなどの高度な機能を標準化された方法で利用できます。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">拡張コンテキスト管理</h4>
                    <p className="text-sm text-muted-foreground">長いコンテキストウィンドウをサポート</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">ツール連携</h4>
                    <p className="text-sm text-muted-foreground">外部ツールとの標準化された連携</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitBranch className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">並列処理</h4>
                    <p className="text-sm text-muted-foreground">複数のタスクを効率的に処理</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">セキュリティ</h4>
                    <p className="text-sm text-muted-foreground">安全なデータ交換と認証</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 統計情報 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">リクエスト数</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground mt-1">過去24時間</p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均応答時間</CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2秒</div>
                <p className="text-xs text-muted-foreground mt-1">過去24時間</p>
                <Progress value={40} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ツール呼び出し</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-muted-foreground mt-1">過去24時間</p>
                <Progress value={28} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">エラー率</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.4%</div>
                <p className="text-xs text-muted-foreground mt-1">過去24時間</p>
                <Progress value={0.4} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* サーバー情報 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>MCPサーバー情報</CardTitle>
                <CardDescription>基本的なサーバー情報と設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">サーバーバージョン</Label>
                    <div className="font-medium">MCP v1.2.3</div>
                  </div>
                  <div>
                    <Label className="text-sm">環境</Label>
                    <div className="font-medium">本番環境</div>
                  </div>
                  <div>
                    <Label className="text-sm">エンドポイント</Label>
                    <div className="font-medium">https://api.example.com/mcp</div>
                  </div>
                  <div>
                    <Label className="text-sm">稼働時間</Label>
                    <div className="font-medium">14日 7時間 32分</div>
                  </div>
                  <div>
                    <Label className="text-sm">コンテキストウィンドウ</Label>
                    <div className="font-medium">128K トークン</div>
                  </div>
                  <div>
                    <Label className="text-sm">最大出力トークン</Label>
                    <div className="font-medium">4,096 トークン</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  情報を更新
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>クイック設定</CardTitle>
                <CardDescription>主要な設定のクイック切り替え</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>ストリーミングレスポンス</Label>
                    <div className="text-sm text-muted-foreground">トークン単位での段階的な応答</div>
                  </div>
                  <Switch checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>ツール連携</Label>
                    <div className="text-sm text-muted-foreground">外部ツールの使用を許可</div>
                  </div>
                  <Switch checked={toolsEnabled} onCheckedChange={setToolsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>デバッグモード</Label>
                    <div className="text-sm text-muted-foreground">詳細なログ記録を有効化</div>
                  </div>
                  <Switch checked={debugMode} onCheckedChange={toggleDebugMode} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  詳細設定
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* 連携モデル */}
          <Card>
            <CardHeader>
              <CardTitle>連携AIモデル</CardTitle>
              <CardDescription>現在MCPと連携しているAIモデル</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Claude 3 Opus",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "200K",
                      requests: "520/日",
                    },
                    {
                      name: "Claude 3 Sonnet",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "180K",
                      requests: "850/日",
                    },
                    {
                      name: "Claude 3 Haiku",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "150K",
                      requests: "1.2K/日",
                    },
                    {
                      name: "GPT-4o",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "128K",
                      requests: "780/日",
                    },
                    {
                      name: "Llama 3",
                      version: "v1.0",
                      status: "maintenance",
                      contextWindow: "128K",
                      requests: "0/日",
                    },
                  ].map((model, i) => (
                    <Card key={i} className="bg-muted/50">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{model.name}</CardTitle>
                          <Badge variant={model.status === "active" ? "default" : "secondary"} className="capitalize">
                            {model.status === "active" ? "稼働中" : "メンテナンス中"}
                          </Badge>
                        </div>
                        <CardDescription>バージョン: {model.version}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <Label className="text-xs">コンテキスト</Label>
                            <div>{model.contextWindow}</div>
                          </div>
                          <div>
                            <Label className="text-xs">リクエスト数</Label>
                            <div>{model.requests}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("models")}>
                <Brain className="mr-2 h-4 w-4" />
                モデル連携へ
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* プロトコル設定タブ */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>プロトコル設定</CardTitle>
              <CardDescription>MCPの基本的な設定を管理します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="endpoint">APIエンドポイント</Label>
                  <Input id="endpoint" defaultValue="https://api.example.com/mcp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">プロトコルバージョン</Label>
                  <Select defaultValue="1.2.3">
                    <SelectTrigger>
                      <SelectValue placeholder="バージョンを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0.0">1.0.0</SelectItem>
                      <SelectItem value="1.1.0">1.1.0</SelectItem>
                      <SelectItem value="1.2.3">1.2.3 (最新)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="context-window">コンテキストウィンドウ (トークン)</Label>
                  <Input id="context-window" defaultValue="128000" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">最大出力トークン</Label>
                  <Input id="max-tokens" defaultValue="4096" type="number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">デフォルトシステムプロンプト</Label>
                <Textarea
                  id="system-prompt"
                  rows={4}
                  defaultValue="あなたは有用なAIアシスタントです。ユーザーの質問に簡潔かつ正確に回答してください。"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API認証キー</Label>
                <Input id="api-key" type="password" defaultValue="sk_mcp_xxxxxxxxxxxxxxxxxxxx" />
              </div>

              <div className="space-y-2">
                <Label>応答温度</Label>
                <div className="flex items-center gap-4">
                  <Input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="flex-1" />
                  <span className="w-12 text-center">0.7</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">キャンセル</Button>
              <Button>変更を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>モデル連携</CardTitle>
              <CardDescription>MCPと連携するAIモデルの管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">モデル連携機能は準備中です</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ツール連携</CardTitle>
              <CardDescription>MCPで使用する外部ツールの設定</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">ツール連携機能は準備中です</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ログ管理</CardTitle>
              <CardDescription>MCPのリクエストとレスポンスのログ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">ログ管理機能は準備中です</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API設定</CardTitle>
              <CardDescription>MCP APIの設定と管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">API設定機能は準備中です</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
