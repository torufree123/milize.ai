"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  Download,
  Share2,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Plus,
  Settings,
  Play,
  Pause,
  RotateCcw,
  GitBranch,
  History,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Building,
  DollarSign,
  Shield,
  Network,
  FileText,
  Eye,
  ArrowRight,
  Workflow,
  Layers,
  Code,
  Save,
  Copy,
  Activity,
} from "lucide-react"

// ノードタイプの定義
const nodeTypes = {
  investment: {
    macro: [
      { id: "global-indicators", name: "Global Leading Indicators", icon: Globe, color: "bg-blue-500" },
      { id: "policy-rates", name: "政策金利シナリオ", icon: TrendingUp, color: "bg-blue-600" },
      { id: "economic-cycle", name: "景気サイクル分析", icon: BarChart3, color: "bg-blue-400" },
    ],
    sector: [
      { id: "sector-score", name: "Sector Score", icon: Building, color: "bg-green-500" },
      { id: "supply-chain", name: "サプライチェーン分析", icon: Network, color: "bg-green-600" },
      { id: "industry-trends", name: "業界トレンド", icon: LineChart, color: "bg-green-400" },
    ],
    company: [
      { id: "fundamental", name: "財務ファンダメンタル", icon: FileText, color: "bg-purple-500" },
      { id: "earnings-sentiment", name: "Earnings Call Sentiment", icon: MessageSquare, color: "bg-purple-600" },
      { id: "buyback-analysis", name: "自社株買い分析", icon: DollarSign, color: "bg-purple-400" },
    ],
    factor: [
      { id: "style-factor", name: "スタイル因子", icon: Target, color: "bg-orange-500" },
      { id: "black-litterman", name: "ブラック-リッターマン", icon: PieChart, color: "bg-orange-600" },
      { id: "risk-model", name: "リスクモデル", icon: Shield, color: "bg-orange-400" },
    ],
    esg: [
      { id: "patent-analysis", name: "パテント分析", icon: Lightbulb, color: "bg-teal-500" },
      { id: "sdg-screening", name: "SDGスクリーニング", icon: Eye, color: "bg-teal-600" },
      { id: "esg-score", name: "ESGスコア", icon: Star, color: "bg-teal-400" },
    ],
    portfolio: [
      { id: "optimization", name: "ポートフォリオ最適化", icon: Zap, color: "bg-red-500" },
      { id: "scenario-var", name: "シナリオVaR", icon: AlertTriangle, color: "bg-red-600" },
      { id: "trade-path", name: "トレードパス生成", icon: ArrowRight, color: "bg-red-400" },
    ],
  },
  credit: {
    financial: [
      { id: "financial-analysis", name: "三表解析", icon: FileText, color: "bg-blue-500" },
      { id: "debt-capacity", name: "債務返済能力", icon: DollarSign, color: "bg-blue-600" },
      { id: "cash-flow", name: "キャッシュフロー分析", icon: TrendingUp, color: "bg-blue-400" },
    ],
    alternative: [
      { id: "web-traffic", name: "Webトラフィック分析", icon: Globe, color: "bg-green-500" },
      { id: "employee-sentiment", name: "従業員評判分析", icon: Users, color: "bg-green-600" },
      { id: "competitor-analysis", name: "競合比較スコア", icon: BarChart3, color: "bg-green-400" },
    ],
    network: [
      { id: "director-network", name: "取締役ネットワーク", icon: Network, color: "bg-purple-500" },
      { id: "social-influence", name: "SNS影響力分析", icon: MessageSquare, color: "bg-purple-600" },
      { id: "relationship-graph", name: "関係性グラフ", icon: Workflow, color: "bg-purple-400" },
    ],
    technology: [
      { id: "patent-portfolio", name: "特許ポートフォリオ", icon: Lightbulb, color: "bg-orange-500" },
      { id: "research-collaboration", name: "研究協力分析", icon: Users, color: "bg-orange-600" },
      { id: "tech-competitiveness", name: "技術競争力", icon: Target, color: "bg-orange-400" },
    ],
    esg: [
      { id: "labor-risk", name: "労働リスク分析", icon: Shield, color: "bg-teal-500" },
      { id: "supplier-concentration", name: "サプライヤ集中度", icon: PieChart, color: "bg-teal-600" },
      { id: "reputation-risk", name: "レピュテーションリスク", icon: Eye, color: "bg-teal-400" },
    ],
    scoring: [
      { id: "ai-scoring", name: "AI統合スコア", icon: Brain, color: "bg-red-500" },
      { id: "explainable-ai", name: "説明可能AI", icon: Code, color: "bg-red-600" },
      { id: "monitoring", name: "リアルタイム監視", icon: Activity, color: "bg-red-400" },
    ],
  },
}

// テンプレートワークフロー
const workflowTemplates = {
  investment: [
    {
      id: "top-down-bottom-up",
      name: "Top-Down → Bottom-Up",
      description: "マクロ分析から個別銘柄選定まで",
      nodes: ["global-indicators", "sector-score", "fundamental", "optimization"],
    },
    {
      id: "theme-driven",
      name: "テーマ起点分析",
      description: "SDGテーマから投資機会を発掘",
      nodes: ["sdg-screening", "global-indicators", "patent-analysis", "optimization"],
    },
    {
      id: "factor-first",
      name: "ファクター先行",
      description: "クオンツファクターで候補を絞り込み",
      nodes: ["style-factor", "risk-model", "sector-score", "optimization"],
    },
  ],
  credit: [
    {
      id: "traditional-credit",
      name: "伝統的信用分析",
      description: "財務分析中心のクレジット評価",
      nodes: ["financial-analysis", "debt-capacity", "cash-flow", "ai-scoring"],
    },
    {
      id: "alternative-first",
      name: "オルタナティブ先行",
      description: "非財務データでトライアージ",
      nodes: ["web-traffic", "employee-sentiment", "financial-analysis", "ai-scoring"],
    },
    {
      id: "comprehensive",
      name: "包括的分析",
      description: "全方位的なクレジット評価",
      nodes: ["financial-analysis", "web-traffic", "director-network", "patent-portfolio", "labor-risk", "ai-scoring"],
    },
  ],
}

export default function DeepResearchPage() {
  const [selectedDomain, setSelectedDomain] = React.useState<"investment" | "credit">("investment")
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("")
  const [workflowNodes, setWorkflowNodes] = React.useState<string[]>([])
  const [isExecuting, setIsExecuting] = React.useState(false)
  const [executionProgress, setExecutionProgress] = React.useState(0)
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null)
  const [workflowName, setWorkflowName] = React.useState("")
  const [showVersions, setShowVersions] = React.useState(false)

  const handleTemplateSelect = (templateId: string) => {
    const template = workflowTemplates[selectedDomain].find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setWorkflowNodes(template.nodes)
      setWorkflowName(template.name)
    }
  }

  const handleExecuteWorkflow = () => {
    setIsExecuting(true)
    setExecutionProgress(0)

    const interval = setInterval(() => {
      setExecutionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExecuting(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const addNodeToWorkflow = (nodeId: string) => {
    if (!workflowNodes.includes(nodeId)) {
      setWorkflowNodes([...workflowNodes, nodeId])
    }
  }

  const removeNodeFromWorkflow = (nodeId: string) => {
    setWorkflowNodes(workflowNodes.filter((id) => id !== nodeId))
  }

  const moveNode = (fromIndex: number, toIndex: number) => {
    const newNodes = [...workflowNodes]
    const [movedNode] = newNodes.splice(fromIndex, 1)
    newNodes.splice(toIndex, 0, movedNode)
    setWorkflowNodes(newNodes)
  }

  const getNodeInfo = (nodeId: string) => {
    for (const category of Object.values(nodeTypes[selectedDomain])) {
      const node = category.find((n) => n.id === nodeId)
      if (node) return node
    }
    return null
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deep Research</h1>
          <p className="text-muted-foreground">可変式ワークフローによる高度な分析システム</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowVersions(!showVersions)}>
            <GitBranch className="h-4 w-4 mr-2" />
            バージョン管理
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            共有
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            エクスポート
          </Button>
        </div>
      </div>

      {/* ドメイン選択 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            分析ドメイン選択
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={`cursor-pointer transition-all ${selectedDomain === "investment" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedDomain("investment")}
            >
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold">運用（投資）系</h3>
                <p className="text-sm text-muted-foreground">ポートフォリオ構築・投資分析</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer transition-all ${selectedDomain === "credit" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedDomain("credit")}
            >
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold">融資（クレジット）系</h3>
                <p className="text-sm text-muted-foreground">信用リスク評価・融資審査</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ノードライブラリ */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                ノードライブラリ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(nodeTypes[selectedDomain]).map(([category, nodes]) => (
                <div key={category}>
                  <h4 className="font-medium mb-2 capitalize">{category}</h4>
                  <div className="space-y-2">
                    {nodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent"
                        onClick={() => addNodeToWorkflow(node.id)}
                      >
                        <div className={`p-1 rounded ${node.color}`}>
                          <node.icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs">{node.name}</span>
                        <Plus className="h-3 w-3 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* テンプレート */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                テンプレート
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflowTemplates[selectedDomain].map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded cursor-pointer hover:bg-accent ${
                    selectedTemplate === template.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ワークフローキャンバス */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                ワークフローキャンバス
              </CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="ワークフロー名"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="max-w-xs"
                />
                <Button size="sm" variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px] border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                {workflowNodes.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Workflow className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>ノードをドラッグ&ドロップしてワークフローを構築</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workflowNodes.map((nodeId, index) => {
                      const nodeInfo = getNodeInfo(nodeId)
                      if (!nodeInfo) return null

                      return (
                        <div key={`${nodeId}-${index}`} className="flex items-center gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <div className={`p-2 rounded ${nodeInfo.color}`}>
                              <nodeInfo.icon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{nodeInfo.name}</h4>
                              <p className="text-xs text-muted-foreground">ステップ {index + 1}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setSelectedNode(nodeId)}>
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => removeNodeFromWorkflow(nodeId)}>
                              <AlertTriangle className="h-3 w-3" />
                            </Button>
                          </div>
                          {index < workflowNodes.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {workflowNodes.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <Button onClick={handleExecuteWorkflow} disabled={isExecuting}>
                    {isExecuting ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        実行中...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        ワークフロー実行
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    リセット
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    複製
                  </Button>
                </div>
              )}

              {isExecuting && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">実行進行状況</span>
                  </div>
                  <Progress value={executionProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 実行結果 */}
          {executionProgress === 100 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  実行結果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">成功ノード</h4>
                      <p className="text-2xl font-bold text-green-600">{workflowNodes.length}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800">実行時間</h4>
                      <p className="text-2xl font-bold text-blue-600">2.3s</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">統合スコア</h4>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="flex-1" />
                      <span className="font-bold">85/100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 設定・履歴パネル */}
        <div className="lg:col-span-1 space-y-4">
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  ノード設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">パラメータ調整</label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">閾値</span>
                      <Input type="number" defaultValue="0.5" className="w-20 h-8" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">重み</span>
                      <Input type="number" defaultValue="1.0" className="w-20 h-8" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">自動実行</span>
                  <Switch />
                </div>
                <Button size="sm" className="w-full">
                  設定を保存
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                実行履歴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 border rounded text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">投資分析 v1.2</span>
                    <Badge variant="secondary">成功</Badge>
                  </div>
                  <p className="text-muted-foreground">2時間前</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">クレジット評価 v2.1</span>
                    <Badge variant="secondary">成功</Badge>
                  </div>
                  <p className="text-muted-foreground">1日前</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ESG分析 v1.0</span>
                    <Badge variant="destructive">エラー</Badge>
                  </div>
                  <p className="text-muted-foreground">3日前</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {showVersions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  バージョン比較
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="ベースバージョン" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1.0">v1.0 - 初期版</SelectItem>
                      <SelectItem value="v1.1">v1.1 - ESG追加</SelectItem>
                      <SelectItem value="v1.2">v1.2 - 最新版</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="比較バージョン" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1.0">v1.0 - 初期版</SelectItem>
                      <SelectItem value="v1.1">v1.1 - ESG追加</SelectItem>
                      <SelectItem value="v1.2">v1.2 - 最新版</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    差分を表示
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
