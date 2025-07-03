"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  Plus,
  Copy,
  Save,
  RotateCcw,
  TrendingUp,
  Building2,
  DollarSign,
  BarChart3,
  Leaf,
  Shield,
  Network,
  Brain,
  Zap,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  Database,
  Layers,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

// ノードタイプの定義
const INVESTMENT_NODES = {
  macro: {
    name: "Macro Analysis",
    icon: TrendingUp,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    nodes: [
      { id: "global-indicators", name: "Global Leading Indicators", description: "経済指標の先行分析" },
      { id: "policy-rates", name: "Policy Rate Scenarios", description: "政策金利シナリオ分析" },
      { id: "inflation-trends", name: "Inflation Trends", description: "インフレーション動向" },
    ],
  },
  sector: {
    name: "Sector Analysis",
    icon: Building2,
    color: "bg-green-50 border-green-200 text-green-700",
    nodes: [
      { id: "sector-score", name: "Top-Down Sector Score", description: "セクター相対評価" },
      { id: "supply-chain", name: "Supply Chain Stress", description: "サプライチェーン分析" },
      { id: "industry-cycle", name: "Industry Cycle", description: "業界サイクル分析" },
    ],
  },
  company: {
    name: "Company Analysis",
    icon: DollarSign,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    nodes: [
      { id: "fundamentals", name: "Financial Fundamentals", description: "財務ファンダメンタル" },
      { id: "earnings-sentiment", name: "Earnings Call Sentiment", description: "決算説明会センチメント" },
      { id: "buyback-analysis", name: "Share Buyback Analysis", description: "自社株買い分析" },
    ],
  },
  factor: {
    name: "Factor Analysis",
    icon: BarChart3,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    nodes: [
      { id: "style-factors", name: "Style Factor Exposure", description: "スタイル因子エクスポージャ" },
      { id: "black-litterman", name: "Black-Litterman", description: "ブラック・リッターマン" },
      { id: "risk-parity", name: "Risk Parity", description: "リスクパリティ" },
    ],
  },
  esg: {
    name: "ESG & Themes",
    icon: Leaf,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    nodes: [
      { id: "patent-heat", name: "Patent Heat Analysis", description: "特許熱度分析" },
      { id: "sdg-screening", name: "SDG Negative Screening", description: "SDGネガティブスクリーニング" },
      { id: "carbon-footprint", name: "Carbon Footprint", description: "カーボンフットプリント" },
    ],
  },
  portfolio: {
    name: "Portfolio Construction",
    icon: Shield,
    color: "bg-red-50 border-red-200 text-red-700",
    nodes: [
      { id: "optimization", name: "Portfolio Optimization", description: "ポートフォリオ最適化" },
      { id: "scenario-var", name: "Scenario VaR", description: "シナリオVaR" },
      { id: "trade-path", name: "Trade Path Generation", description: "トレードパス生成" },
    ],
  },
}

const CREDIT_NODES = {
  financial: {
    name: "Financial Analysis",
    icon: DollarSign,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    nodes: [
      { id: "three-statements", name: "Three Statement Analysis", description: "三表解析" },
      { id: "debt-capacity", name: "Debt Repayment Capacity", description: "債務返済能力" },
      { id: "cash-flow", name: "Cash Flow Analysis", description: "キャッシュフロー分析" },
    ],
  },
  alternative: {
    name: "Alternative Data",
    icon: Database,
    color: "bg-green-50 border-green-200 text-green-700",
    nodes: [
      { id: "web-traffic", name: "Web Traffic Trends", description: "Webトラフィック推移" },
      { id: "employee-reviews", name: "Employee Reviews", description: "従業員評判分析" },
      { id: "competitor-analysis", name: "Competitor Comparison", description: "競合比較スコア" },
    ],
  },
  network: {
    name: "Network Analysis",
    icon: Network,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    nodes: [
      { id: "director-network", name: "Director Cross-Holdings", description: "取締役クロスホールディング" },
      { id: "social-influence", name: "Social Media Influence", description: "SNS影響力分析" },
      { id: "business-relations", name: "Business Relations", description: "取引関係分析" },
    ],
  },
  technology: {
    name: "Technology & IP",
    icon: Brain,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    nodes: [
      { id: "patent-portfolio", name: "Patent Portfolio", description: "特許ポートフォリオ" },
      { id: "research-collaboration", name: "Research Collaboration", description: "研究協力ネットワーク" },
      { id: "innovation-index", name: "Innovation Index", description: "イノベーション指数" },
    ],
  },
  esg_credit: {
    name: "ESG & Supply Chain",
    icon: Leaf,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    nodes: [
      { id: "labor-risk", name: "Forced Labor Risk", description: "強制労働リスク" },
      { id: "supplier-concentration", name: "Supplier Concentration", description: "サプライヤ集中度" },
      { id: "environmental-compliance", name: "Environmental Compliance", description: "環境コンプライアンス" },
    ],
  },
  scoring: {
    name: "AI Scoring",
    icon: Zap,
    color: "bg-red-50 border-red-200 text-red-700",
    nodes: [
      { id: "explainable-ai", name: "Explainable AI Score", description: "説明可能AIスコア" },
      { id: "anomaly-detection", name: "Anomaly Detection", description: "異常検知" },
      { id: "real-time-monitoring", name: "Real-time Monitoring", description: "リアルタイムモニタリング" },
    ],
  },
}

const WORKFLOW_TEMPLATES = {
  investment: [
    {
      id: "top-down-bottom-up",
      name: "Top-Down → Bottom-Up",
      description: "マクロ分析から個別銘柄選択への伝統的アプローチ",
      steps: ["macro", "sector", "company", "factor", "portfolio"],
    },
    {
      id: "theme-driven",
      name: "Theme-Driven Research",
      description: "ESGテーマから投資機会を発掘するアプローチ",
      steps: ["esg", "macro", "sector", "company", "portfolio"],
    },
    {
      id: "factor-first",
      name: "Factor-First Approach",
      description: "クオンツファクターで候補を絞り込むアプローチ",
      steps: ["factor", "macro", "sector", "company", "portfolio"],
    },
  ],
  credit: [
    {
      id: "traditional-credit",
      name: "Traditional Credit Analysis",
      description: "財務分析を中心とした伝統的信用分析",
      steps: ["financial", "network", "scoring"],
    },
    {
      id: "alternative-first",
      name: "Alternative Data First",
      description: "オルタナティブデータでトライアージするアプローチ",
      steps: ["alternative", "financial", "technology", "scoring"],
    },
    {
      id: "comprehensive-esg",
      name: "Comprehensive ESG Credit",
      description: "ESG要素を重視した包括的信用分析",
      steps: ["financial", "alternative", "esg_credit", "network", "scoring"],
    },
  ],
}

export default function DeepResearchPage() {
  const [selectedDomain, setSelectedDomain] = useState<"investment" | "credit">("investment")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [workflowNodes, setWorkflowNodes] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionProgress, setExecutionProgress] = useState(0)
  const [executionResults, setExecutionResults] = useState<any[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const currentNodes = selectedDomain === "investment" ? INVESTMENT_NODES : CREDIT_NODES
  const currentTemplates = WORKFLOW_TEMPLATES[selectedDomain]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = currentTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setWorkflowNodes(template.steps)
    }
  }

  const addNodeToWorkflow = (nodeId: string) => {
    if (!workflowNodes.includes(nodeId)) {
      setWorkflowNodes([...workflowNodes, nodeId])
    }
  }

  const removeNodeFromWorkflow = (nodeId: string) => {
    setWorkflowNodes(workflowNodes.filter((id) => id !== nodeId))
  }

  const executeWorkflow = async () => {
    setIsExecuting(true)
    setExecutionProgress(0)
    setExecutionResults([])

    for (let i = 0; i < workflowNodes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setExecutionProgress(((i + 1) / workflowNodes.length) * 100)

      setExecutionResults((prev) => [
        ...prev,
        {
          nodeId: workflowNodes[i],
          status: Math.random() > 0.1 ? "success" : "warning",
          score: Math.random() * 100,
          executionTime: Math.random() * 5000 + 1000,
        },
      ])
    }

    setIsExecuting(false)
  }

  const getNodeInfo = (nodeId: string) => {
    for (const category of Object.values(currentNodes)) {
      const node = category.nodes.find((n) => n.id === nodeId)
      if (node) return { ...node, category: category.name, color: category.color }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Deep Research</h1>
              <p className="text-sm text-gray-600 mt-1">可変式ワークフローによる高度な分析システム</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                <GitBranch className="h-4 w-4 mr-2" />
                Version 1.2.3
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                <Save className="h-4 w-4 mr-2" />
                Save Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Node Library */}
          <div className="col-span-3">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Node Library</CardTitle>
                <CardDescription>分析モジュールを選択してワークフローに追加</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Domain Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Analysis Domain</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedDomain === "investment" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDomain("investment")}
                      className="rounded-lg text-xs"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Investment
                    </Button>
                    <Button
                      variant={selectedDomain === "credit" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDomain("credit")}
                      className="rounded-lg text-xs"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Credit
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Node Categories */}
                <div className="space-y-2">
                  {Object.entries(currentNodes).map(([categoryId, category]) => (
                    <div key={categoryId} className="space-y-1">
                      <button
                        onClick={() => toggleCategory(categoryId)}
                        className="flex items-center justify-between w-full p-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        </div>
                        {expandedCategories.includes(categoryId) ? (
                          <ChevronDown className="h-3 w-3 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-gray-400" />
                        )}
                      </button>

                      {expandedCategories.includes(categoryId) && (
                        <div className="ml-6 space-y-1">
                          {category.nodes.map((node) => (
                            <button
                              key={node.id}
                              onClick={() => addNodeToWorkflow(node.id)}
                              className="flex items-center justify-between w-full p-2 text-left rounded-md hover:bg-gray-50 transition-colors group"
                            >
                              <div>
                                <div className="text-xs font-medium text-gray-700">{node.name}</div>
                                <div className="text-xs text-gray-500">{node.description}</div>
                              </div>
                              <Plus className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Workflow Templates */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Workflow Templates</CardTitle>
                <CardDescription>事前定義されたワークフローテンプレートから開始</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {currentTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedTemplate === template.id
                          ? "border-blue-200 bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900 mb-1">{template.name}</div>
                      <div className="text-xs text-gray-600 mb-3">{template.description}</div>
                      <div className="flex flex-wrap gap-1">
                        {template.steps.slice(0, 3).map((step, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                            {currentNodes[step as keyof typeof currentNodes]?.name || step}
                          </Badge>
                        ))}
                        {template.steps.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{template.steps.length - 3}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workflow Canvas */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">Workflow Canvas</CardTitle>
                    <CardDescription>ドラッグ&ドロップでワークフローを構築</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={executeWorkflow}
                      disabled={workflowNodes.length === 0 || isExecuting}
                      size="sm"
                      className="rounded-full"
                    >
                      {isExecuting ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Executing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Execute Workflow
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setWorkflowNodes([])} className="rounded-full">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {workflowNodes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Layers className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">ワークフローを構築</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      左側のノードライブラリからモジュールを選択するか、
                      <br />
                      上記のテンプレートから開始してください
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Execution Progress */}
                    {isExecuting && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">実行中...</span>
                          <span className="text-sm text-blue-700">{Math.round(executionProgress)}%</span>
                        </div>
                        <Progress value={executionProgress} className="h-2" />
                      </div>
                    )}

                    {/* Workflow Nodes */}
                    <div className="flex flex-wrap gap-3">
                      {workflowNodes.map((nodeId, index) => {
                        const nodeInfo = getNodeInfo(nodeId)
                        const result = executionResults.find((r) => r.nodeId === nodeId)

                        return (
                          <div key={nodeId} className="flex items-center gap-2">
                            <div
                              className={`relative p-4 rounded-xl border-2 transition-all ${
                                result?.status === "success"
                                  ? "border-green-200 bg-green-50"
                                  : result?.status === "warning"
                                    ? "border-yellow-200 bg-yellow-50"
                                    : result?.status === "error"
                                      ? "border-red-200 bg-red-50"
                                      : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <button
                                onClick={() => removeNodeFromWorkflow(nodeId)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              >
                                ×
                              </button>

                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${nodeInfo?.color || "bg-gray-100"}`}
                                >
                                  {result?.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                  {result?.status === "warning" && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                                  {result?.status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
                                  {!result && <span className="text-sm font-medium">{index + 1}</span>}
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-gray-900">{nodeInfo?.name || nodeId}</div>
                                  <div className="text-xs text-gray-600">{nodeInfo?.category}</div>
                                  {result && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Score: {result.score.toFixed(1)} | {(result.executionTime / 1000).toFixed(1)}s
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {index < workflowNodes.length - 1 && <ArrowRight className="h-4 w-4 text-gray-400" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* Execution Results Summary */}
                    {executionResults.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-sm text-gray-900 mb-3">実行結果サマリー</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {executionResults.filter((r) => r.status === "success").length}
                            </div>
                            <div className="text-xs text-gray-600">成功</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {executionResults.filter((r) => r.status === "warning").length}
                            </div>
                            <div className="text-xs text-gray-600">警告</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {executionResults.length > 0
                                ? (
                                    executionResults.reduce((sum, r) => sum + r.score, 0) / executionResults.length
                                  ).toFixed(1)
                                : "0"}
                            </div>
                            <div className="text-xs text-gray-600">平均スコア</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {executionResults.length > 0
                                ? (executionResults.reduce((sum, r) => sum + r.executionTime, 0) / 1000).toFixed(1)
                                : "0"}
                              s
                            </div>
                            <div className="text-xs text-gray-600">実行時間</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Research History */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Research History</CardTitle>
                <CardDescription>過去の研究実行履歴とバージョン管理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      id: "research-001",
                      name: "ESG-focused Tech Portfolio Analysis",
                      domain: "Investment",
                      version: "v2.1",
                      timestamp: "2024年1月15日 14:30",
                      status: "completed",
                      score: 87.5,
                      nodes: 6,
                    },
                    {
                      id: "research-002",
                      name: "Alternative Data Credit Assessment",
                      domain: "Credit",
                      version: "v1.3",
                      timestamp: "2024年1月14日 09:15",
                      status: "completed",
                      score: 92.1,
                      nodes: 5,
                    },
                    {
                      id: "research-003",
                      name: "Macro-driven Sector Rotation",
                      domain: "Investment",
                      version: "v1.0",
                      timestamp: "2024年1月13日 16:45",
                      status: "warning",
                      score: 74.3,
                      nodes: 4,
                    },
                  ].map((research) => (
                    <div
                      key={research.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            research.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : research.status === "warning"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {research.status === "completed" && <CheckCircle2 className="h-5 w-5" />}
                          {research.status === "warning" && <AlertCircle className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{research.name}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {research.domain}
                            </Badge>
                            <span>{research.version}</span>
                            <span>•</span>
                            <span>{research.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">Score: {research.score}</div>
                          <div className="text-xs text-gray-600">{research.nodes} nodes</div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                          <Copy className="h-3 w-3 mr-1" />
                          Clone
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
