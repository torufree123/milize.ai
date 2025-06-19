"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Newspaper,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Building2,
  Globe,
  FileText,
  MessageSquare,
  BarChart3,
  Star,
  Download,
  Play,
  Settings,
} from "lucide-react"

const aiSystems = [
  {
    id: "news-analysis",
    name: "News Analysis",
    description: "Comprehensively analyzes news about companies and industries to extract important information",
    icon: Newspaper,
    color: "bg-blue-500",
  },
  {
    id: "market-analysis",
    name: "Market Analysis",
    description: "Analyzes market trends and competitive landscape to identify business opportunities",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    id: "risk-analysis",
    name: "Risk Analysis",
    description: "Evaluates corporate risk factors and identifies potential problems",
    icon: AlertTriangle,
    color: "bg-orange-500",
  },
  {
    id: "investment-analysis",
    name: "Investment Analysis",
    description: "Supports investment decisions based on financial data and market information",
    icon: DollarSign,
    color: "bg-purple-500",
  },
]

const countries = [
  { value: "japan", label: "Japan" },
  { value: "usa", label: "USA" },
  { value: "china", label: "China" },
  { value: "europe", label: "Europe" },
  { value: "global", label: "Global" },
]

const industries = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "finance", label: "Finance" },
  { value: "it-telecom", label: "IT & Telecom" },
  { value: "retail", label: "Retail" },
  { value: "healthcare", label: "Healthcare" },
  { value: "energy", label: "Energy" },
  { value: "real-estate", label: "Real Estate" },
  { value: "transportation", label: "Transportation & Logistics" },
]

const sectors = {
  manufacturing: ["Automobiles", "Electronics", "Chemicals", "Steel", "Machinery"],
  finance: ["Banking", "Securities", "Insurance", "Leasing", "Fintech"],
  "it-telecom": ["Software", "Hardware", "Telecom", "Internet", "AI & IoT"],
  retail: ["Department Stores", "Supermarkets", "Convenience Stores", "E-commerce", "Apparel"],
  healthcare: ["Pharmaceuticals", "Medical Devices", "Hospitals", "Biotech", "Healthtech"],
  energy: ["Oil & Gas", "Electricity", "Renewable Energy", "Nuclear", "Energy Storage"],
}

const informationSources = [
  { id: "news", label: "News", icon: Newspaper },
  { id: "press", label: "Press Releases", icon: FileText },
  { id: "website", label: "Website", icon: Globe },
  { id: "sns", label: "SNS", icon: MessageSquare },
  { id: "securities", label: "Securities Reports", icon: BarChart3 },
  { id: "integrated", label: "Integrated Reports", icon: Building2 },
]

const periods = [
  { value: "1week", label: "Last 1 Week" },
  { value: "1month", label: "Last 1 Month" },
  { value: "3months", label: "Last 3 Months" },
  { value: "1year", label: "Last 1 Year" },
  { value: "custom", label: "Custom Period" },
]

export default function AISystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
  const [analysisConfig, setAnalysisConfig] = useState({
    country: "",
    industry: "",
    sector: "",
    company: "",
    sources: [] as string[],
    period: "",
    customStartDate: "",
    customEndDate: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId)
    setAnalysisResults(null)
  }

  const handleSourceToggle = (sourceId: string) => {
    setAnalysisConfig((prev) => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter((s) => s !== sourceId)
        : [...prev.sources, sourceId],
    }))
  }

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulated analysis process
    const steps = [
      "Connecting to data sources...",
      "Collecting information...",
      "Analyzing text...",
      "Extracting keywords...",
      "Evaluating importance...",
      "Summarizing results...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnalysisProgress((i + 1) * (100 / steps.length))
    }

    // Sample analysis results
    setAnalysisResults({
      summary:
        "15 important news items were found for the selected company in the past month. Overall, a positive trend is observed, with many reports of new product announcements and improved performance.",
      keywords: [
        { word: "New Product", importance: 95, sentiment: "positive" },
        { word: "Improved Performance", importance: 88, sentiment: "positive" },
        { word: "Market Expansion", importance: 82, sentiment: "positive" },
        { word: "Investment", importance: 75, sentiment: "neutral" },
        { word: "Competition", importance: 68, sentiment: "negative" },
      ],
      people: [
        { name: "Taro Tanaka", role: "CEO", mentions: 8 },
        { name: "Hanako Sato", role: "CFO", mentions: 5 },
        { name: "Jiro Yamada", role: "Executive Officer", mentions: 3 },
      ],
      categories: {
        positive: 60,
        neutral: 25,
        negative: 15,
      },
      importance: {
        high: 40,
        medium: 35,
        low: 25,
      },
      financialAnalysis:
        selectedSystem === "news-analysis" && analysisConfig.sources.includes("securities")
          ? {
              revenue: { value: "$12.5B", change: "+12.5%" },
              profit: { value: "$1.8B", change: "+8.3%" },
              roe: { value: "15.2%", rating: "Excellent" },
              roa: { value: "8.7%", rating: "Good" },
              scores: {
                profitability: 85,
                safety: 78,
                growth: 92,
                efficiency: 81,
              },
            }
          : null,
    })

    setIsAnalyzing(false)
  }

  const selectedSystemData = aiSystems.find((s) => s.id === selectedSystem)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Systems</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensively analyze corporate and market information with advanced AI analysis systems
          </p>
        </div>
      </div>

      {!selectedSystem ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiSystems.map((system) => {
            const IconComponent = system.icon
            return (
              <Card
                key={system.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSystemSelect(system.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 ${system.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{system.name}</CardTitle>
                  <CardDescription className="text-sm">{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Select</Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedSystem(null)}>
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              {selectedSystemData && (
                <>
                  <div
                    className={`w-10 h-10 ${selectedSystemData.color} rounded-full flex items-center justify-center`}
                  >
                    <selectedSystemData.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedSystemData.name}</h2>
                    <p className="text-muted-foreground">{selectedSystemData.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <Tabs defaultValue="config" className="space-y-6">
            <TabsList>
              <TabsTrigger value="config">Analysis Settings</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResults}>
                Analysis Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Analysis Condition Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country/Region</Label>
                      <Select
                        value={analysisConfig.country}
                        onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={analysisConfig.industry}
                        onValueChange={(value) =>
                          setAnalysisConfig((prev) => ({ ...prev, industry: value, sector: "" }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Select
                        value={analysisConfig.sector}
                        onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, sector: value }))}
                        disabled={!analysisConfig.industry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {analysisConfig.industry &&
                            sectors[analysisConfig.industry as keyof typeof sectors]?.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Enter company name"
                        value={analysisConfig.company}
                        onChange={(e) => setAnalysisConfig((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Information Sources</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {informationSources.map((source) => {
                        const IconComponent = source.icon
                        return (
                          <div key={source.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={source.id}
                              checked={analysisConfig.sources.includes(source.id)}
                              onCheckedChange={() => handleSourceToggle(source.id)}
                            />
                            <Label htmlFor={source.id} className="flex items-center gap-2 cursor-pointer">
                              <IconComponent className="h-4 w-4" />
                              {source.label}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label>Analysis Period</Label>
                    <Select
                      value={analysisConfig.period}
                      onValueChange={(value) => setAnalysisConfig((prev) => ({ ...prev, period: value }))}
                    >
                      <SelectTrigger className="w-full md:w-64">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        {periods.map((period) => (
                          <SelectItem key={period.value} value={period.value}>
                            {period.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {analysisConfig.period === "custom" && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input
                            id="start-date"
                            type="date"
                            value={analysisConfig.customStartDate}
                            onChange={(e) =>
                              setAnalysisConfig((prev) => ({ ...prev, customStartDate: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input
                            id="end-date"
                            type="date"
                            value={analysisConfig.customEndDate}
                            onChange={(e) => setAnalysisConfig((prev) => ({ ...prev, customEndDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={startAnalysis}
                      disabled={isAnalyzing || !analysisConfig.company || analysisConfig.sources.length === 0}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analysis Progress</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <Progress value={analysisProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {analysisResults && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Analysis Results Summary</span>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{analysisResults.summary}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Keyword Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResults.keywords.map((keyword: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{keyword.word}</span>
                              <Badge
                                variant={
                                  keyword.sentiment === "positive"
                                    ? "default"
                                    : keyword.sentiment === "negative"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {keyword.sentiment === "positive"
                                  ? "Positive"
                                  : keyword.sentiment === "negative"
                                    ? "Negative"
                                    : "Neutral"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={keyword.importance} className="w-20" />
                              <span className="text-sm text-muted-foreground">{keyword.importance}%</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>People Mentioned</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {analysisResults.people.map((person: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{person.name}</div>
                              <div className="text-sm text-muted-foreground">{person.role}</div>
                            </div>
                            <Badge variant="outline">{person.mentions} Mentions</Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Information Classification</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Positive</span>
                            <span>{analysisResults.categories.positive}%</span>
                          </div>
                          <Progress value={analysisResults.categories.positive} className="bg-green-100" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Neutral</span>
                            <span>{analysisResults.categories.neutral}%</span>
                          </div>
                          <Progress value={analysisResults.categories.neutral} className="bg-gray-100" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Negative</span>
                            <span>{analysisResults.categories.negative}%</span>
                          </div>
                          <Progress value={analysisResults.categories.negative} className="bg-red-100" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Importance Evaluation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              High Importance
                            </span>
                            <span>{analysisResults.importance.high}%</span>
                          </div>
                          <Progress value={analysisResults.importance.high} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Medium Importance</span>
                            <span>{analysisResults.importance.medium}%</span>
                          </div>
                          <Progress value={analysisResults.importance.medium} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Low Importance</span>
                            <span>{analysisResults.importance.low}%</span>
                          </div>
                          <Progress value={analysisResults.importance.low} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                {analysisResults.financialAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Analysis & Overall Evaluation</CardTitle>
                      <CardDescription>Financial analysis results based on securities reports</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analysisResults.financialAnalysis.revenue.value}</div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                          <Badge variant="default" className="mt-1">
                            {analysisResults.financialAnalysis.revenue.change}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analysisResults.financialAnalysis.profit.value}</div>
                          <div className="text-sm text-muted-foreground">Net Profit</div>
                          <Badge variant="default" className="mt-1">
                            {analysisResults.financialAnalysis.profit.change}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analysisResults.financialAnalysis.roe.value}</div>
                          <div className="text-sm text-muted-foreground">ROE</div>
                          <Badge variant="default" className="mt-1">
                            {analysisResults.financialAnalysis.roe.rating}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analysisResults.financialAnalysis.roa.value}</div>
                          <div className="text-sm text-muted-foreground">ROA</div>
                          <Badge variant="default" className="mt-1">
                            {analysisResults.financialAnalysis.roa.rating}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-semibold">Evaluation Axis Scores</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Profitability</span>
                              <span>{analysisResults.financialAnalysis.scores.profitability} points</span>
                            </div>
                            <Progress value={analysisResults.financialAnalysis.scores.profitability} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Safety</span>
                              <span>{analysisResults.financialAnalysis.scores.safety} points</span>
                            </div>
                            <Progress value={analysisResults.financialAnalysis.scores.safety} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Growth</span>
                              <span>{analysisResults.financialAnalysis.scores.growth} points</span>
                            </div>
                            <Progress value={analysisResults.financialAnalysis.scores.growth} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Efficiency</span>
                              <span>{analysisResults.financialAnalysis.scores.efficiency} points</span>
                            </div>
                            <Progress value={analysisResults.financialAnalysis.scores.efficiency} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
