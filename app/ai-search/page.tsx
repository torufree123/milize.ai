"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Globe,
  Database,
  FileText,
  Download,
  Copy,
  Settings,
  Loader2,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [searchSource, setSearchSource] = useState("web")
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [generatedReport, setGeneratedReport] = useState("")
  const { toast } = useToast()

  const models = [
    { value: "gpt-4", label: "GPT-4", provider: "OpenAI" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI" },
    { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic" },
    { value: "gemini-pro", label: "Gemini Pro", provider: "Google" },
  ]

  const knowledgeSources = [
    { value: "documents", label: "Documents", count: 1248 },
    { value: "database", label: "Database", count: 567 },
    { value: "prompts", label: "Prompts", count: 89 },
  ]

  // Frequently searched content
  const frequentSearches = [
    { id: 1, query: "Latest trends in financial policy", count: 15 },
    { id: 2, query: "ESG investment evaluation criteria", count: 12 },
    { id: 3, query: "Digital currency regulations", count: 10 },
    { id: 4, query: "Market risk analysis methods", count: 8 },
    { id: 5, query: "Automated financial product evaluation", count: 7 },
  ]

  // Popular search content
  const popularSearches = [
    { id: 1, query: "AI-driven market prediction", count: 245, trend: "up" },
    { id: 2, query: "Sustainable finance", count: 189, trend: "up" },
    { id: 3, query: "Quantum computing and finance", count: 156, trend: "stable" },
    { id: 4, query: "Applications of blockchain technology", count: 132, trend: "down" },
    { id: 5, query: "Latest trends in regulatory technology", count: 118, trend: "up" },
  ]

  // Search target setting options
  const searchTargets = [
    { value: "all", label: "All" },
    { value: "news", label: "News" },
    { value: "academic", label: "Academic Papers" },
    { value: "financial", label: "Financial Data" },
    { value: "regulatory", label: "Regulatory Information" },
    { value: "custom", label: "Custom Settings" },
  ]

  // Sample search results
  const sampleResults = [
    {
      id: 1,
      title: "Current Status and Future Prospects of Japanese Financial Policy",
      url: "https://example.com/article1",
      snippet:
        "The Bank of Japan decided to continue its current monetary easing policy at the Monetary Policy Meeting...",
      source: "Nikkei",
      depth: 1,
      relevance: 0.95,
    },
    {
      id: 2,
      title: "Trends in ESG Investment and Impact on Companies",
      url: "https://example.com/article2",
      snippet:
        "As ESG investment rapidly expands, companies are required to focus on management that emphasizes environmental, social, and governance factors...",
      source: "Financial Services Agency Report",
      depth: 2,
      relevance: 0.89,
    },
    {
      id: 3,
      title: "Technical Challenges and Solutions for Digital Currencies",
      url: "https://example.com/article3",
      snippet: "There are numerous technical challenges in implementing a central bank digital currency (CBDC)...",
      source: "Technical Report",
      depth: 3,
      relevance: 0.82,
    },
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setSearchProgress(0)
    setSearchResults([])
    setGeneratedReport("")

    // Simulation of the search process
    const steps = [
      "Analyzing search query...",
      "Performing web search...",
      "Collecting search results...",
      "Performing deep scraping...",
      "Extracting relevant information...",
      "Analyzing with AI model...",
      "Generating report...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSearchProgress(((i + 1) / steps.length) * 100)

      if (i === 2) {
        // Display search results
        setSearchResults(sampleResults)
      }
    }

    // Report generation
    const report = `# AI Search Report: ${searchQuery}

## Overview
This report analyzes information collected from over 10 web sources regarding the search query "${searchQuery}".

## Key Findings

### 1. Current Analysis
- Japan's monetary policy remains accommodative
- ESG investment is rapidly gaining importance in corporate management
- Technical challenges of digital currencies are attracting attention

### 2. Market Trends
- High attention to policy changes in financial markets
- Investor interest in ESG continues to increase
- Research and development of central bank digital currencies are progressing

### 3. Future Prospects
- Potential for active discussion on normalizing monetary policy
- Expected progress in developing ESG investment frameworks
- Accelerated technological development for practical digital currencies

## Detailed Analysis

### Trends in Financial Policy
The Bank of Japan's Monetary Policy Meeting decided to continue the current large-scale monetary easing policy. This is a measure to support achieving the inflation target and sustainable economic growth.

### Expansion of ESG Investment
ESG investment is expanding globally, and in Japan, corporate efforts toward ESG management are becoming increasingly important. Investors are making investment decisions that emphasize environmental, social, and governance factors, not just financial indicators.

### Technical Challenges of Digital Currencies
The implementation of a central bank digital currency (CBDC) faces technical challenges such as privacy protection, security, and scalability. Research and development are underway to address these challenges.

## Conclusion
The results of the investigation on ${searchQuery} reveal that the financial industry is in a period of significant transformation. Important movements are seen in policy, investment, and technology, and future trends require close attention.

---
*This report was generated using ${selectedModel}.*
*Search Execution Date: ${new Date().toLocaleString("en-US")}*`

    setGeneratedReport(report)
    setIsSearching(false)

    toast({
      title: "Search Complete",
      description: "AI report has been generated.",
    })
  }

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generatedReport)
    toast({
      title: "Copied",
      description: "Report copied to clipboard.",
    })
  }

  const handleDownloadReport = () => {
    const blob = new Blob([generatedReport], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-search-report-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download Started",
      description: "Report file download started.",
    })
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Search</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Search Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Settings</CardTitle>
              <CardDescription>Select AI model and search source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Query</Label>
                <Textarea
                  placeholder="Enter what you want to search for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{model.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{model.provider}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Search Source</Label>
                <Select value={searchSource} onValueChange={setSearchSource}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Web Search
                      </div>
                    </SelectItem>
                    <SelectItem value="knowledge">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Knowledge Base
                      </div>
                    </SelectItem>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Web + Knowledge
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(searchSource === "web" || searchSource === "both") && (
                <div className="space-y-2">
                  <Label>Search Target Settings</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {searchTargets.map((target) => (
                        <SelectItem key={target.value} value={target.value}>
                          {target.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(searchSource === "knowledge" || searchSource === "both") && (
                <div className="space-y-2">
                  <Label>Knowledge Source</Label>
                  <div className="space-y-2">
                    {knowledgeSources.map((source) => (
                      <div key={source.value} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">{source.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {source.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleSearch} disabled={isSearching} className="w-full">
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Start Search
                  </>
                )}
              </Button>

              {isSearching && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(searchProgress)}%</span>
                  </div>
                  <Progress value={searchProgress} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Frequently Searched Content */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Frequently Searched Content</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {frequentSearches.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleQuickSearch(item.query)}
                >
                  <span className="text-sm">{item.query}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.count} times
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Show All
              </Button>
            </CardFooter>
          </Card>

          {/* Popular Search Content */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Popular Search Content</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularSearches.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleQuickSearch(item.query)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.query}</span>
                    {item.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {item.trend === "down" && <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Show All
              </Button>
            </CardFooter>
          </Card>

          {searchSource === "web" || searchSource === "both" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Web Search Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Number of Search Results</span>
                  <span>10+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Scraping Depth</span>
                  <span>10 layers</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Language Filter</span>
                  <span>Japanese, English</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Filter className="mr-2 h-3 w-3" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Result Display Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="report">
            <TabsList>
              <TabsTrigger value="report">AI Report</TabsTrigger>
              <TabsTrigger value="sources">Search Results</TabsTrigger>
            </TabsList>

            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Report</CardTitle>
                      <CardDescription>Report created by AI analyzing search results</CardDescription>
                    </div>
                    {generatedReport && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopyReport}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedReport ? (
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm">{generatedReport}</pre>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="mx-auto h-12 w-12 mb-4" />
                      <p>Run a search to generate an AI report</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources">
              <Card>
                <CardHeader>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>Collected sources and relevance</CardDescription>
                </CardHeader>
                <CardContent>
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <div key={result.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-lg">{result.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">Depth {result.depth}</Badge>
                              <Badge variant="outline">Relevance {(result.relevance * 100).toFixed(0)}%</Badge>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{result.snippet}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Source: {result.source}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="mx-auto h-12 w-12 mb-4" />
                      <p>Search results will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
