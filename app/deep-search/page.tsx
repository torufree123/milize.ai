"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
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
} from "lucide-react"

export default function DeepSearchPage() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const steps = [
    { id: "plan", name: "Analysis Plan", icon: Brain },
    { id: "search", name: "Web Search", icon: Search },
    { id: "ideas", name: "Idea Generation", icon: Lightbulb },
    { id: "critique", name: "Critical Evaluation", icon: AlertTriangle },
    { id: "finalize", name: "Finalization", icon: CheckCircle },
  ]

  const experts = [
    {
      name: "Data Tanaka",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Statistical Analysis, Machine Learning",
      score: 4.8,
    },
    {
      name: "Business Sato",
      role: "Business Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Market Analysis, Strategy Planning",
      score: 4.9,
    },
    {
      name: "Tech Yamada",
      role: "Technical Architect",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "System Design, Technology Evaluation",
      score: 4.7,
    },
  ]

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    // Simulation: Execute each step sequentially
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return prev
        }
        return prev + 1
      })
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deep Search</h1>
          <p className="text-muted-foreground">In-depth analysis and insights from multiple experts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analysis Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`p-2 rounded-full ${
                      index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-center">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={steps[currentStep]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {steps.map((step, index) => (
                <TabsTrigger key={step.id} value={step.id} disabled={index > currentStep} className="text-xs">
                  {step.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="plan" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Plan</CardTitle>
                  <CardDescription>Enter the topic and purpose of the analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Analysis Query</label>
                    <Input
                      placeholder="Ex: Growth forecast for the electric vehicle market over the next 5 years"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Purpose of Analysis</label>
                    <Textarea placeholder="Describe the purpose of the analysis, expected outcomes, and how it will be used" />
                  </div>
                  <Button onClick={handleStartAnalysis} disabled={!query || isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Web Search Results</CardTitle>
                  <CardDescription>Collecting relevant information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-medium">Search Result {i}</h4>
                            <p className="text-sm text-muted-foreground">Relevant information found...</p>
                          </div>
                          <Badge variant="secondary">Relevance: {95 - i * 5}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ideas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Idea Generation by Experts</CardTitle>
                  <CardDescription>Three experts propose ideas from multiple perspectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experts.map((expert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={expert.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{expert.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{expert.name}</h4>
                              <Badge variant="outline">{expert.role}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{expert.score}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm">
                                From the perspective of a {expert.role}, I have conducted a detailed analysis of {query}
                                . I propose the following key insights and ideas...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="critique" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Evaluation and Audit</CardTitle>
                  <CardDescription>Verification and identification of improvements for proposed ideas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-medium text-red-800">Potential Risks</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Market volatility, technical constraints, competitor trends, etc...
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-medium text-yellow-800">Improvement Proposals</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        More detailed data collection, additional validation experiments, consultations with
                        stakeholders...
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-medium text-blue-800">Audit Opinion</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Overall, a reasonably valid analysis, but additional consideration is needed in the following
                        areas...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finalize" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Final Integrated Idea</CardTitle>
                  <CardDescription>Final integration and refinement by experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">Integrated Idea</h4>
                      <p className="text-sm text-green-700 mt-2">
                        After discussion and critical evaluation by three experts, the following integrated idea has
                        been completed...
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Implementation Plan</h5>
                        <p className="text-sm text-muted-foreground mt-1">A phased implementation approach...</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium">Expected Effects</h5>
                        <p className="text-sm text-muted-foreground mt-1">Quantitative and qualitative effects...</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Expert Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {experts.map((expert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={expert.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{expert.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{expert.name}</p>
                      <p className="text-xs text-muted-foreground">{expert.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{expert.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Analysis History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">AI Market Analysis</p>
                  <p className="text-muted-foreground">2 hours ago</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">Competitor Analysis Report</p>
                  <p className="text-muted-foreground">1 day ago</p>
                </div>
                <div className="p-2 border rounded text-xs">
                  <p className="font-medium">Technology Trend Survey</p>
                  <p className="text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
