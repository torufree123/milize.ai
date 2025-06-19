"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Presentation,
  FileText,
  Download,
  Share2,
  Play,
  Settings,
  Edit,
  Eye,
  Wand2,
  Palette,
  Layout,
  BarChart3,
} from "lucide-react"

export default function PresentationModePage() {
  const [selectedTemplate, setSelectedTemplate] = useState("business")
  const [presentationTitle, setPresentationTitle] = useState("")
  const [presentationTopic, setPresentationTopic] = useState("")
  const [slideCount, setSlideCount] = useState("10")
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const templates = [
    { value: "business", label: "Business", description: "Professional business presentation" },
    { value: "academic", label: "Academic", description: "Academic research presentation" },
    { value: "creative", label: "Creative", description: "Creative and artistic design" },
    { value: "minimal", label: "Minimal", description: "Clean and simple design" },
    { value: "modern", label: "Modern", description: "Modern and trendy design" },
  ]

  const sampleSlides = [
    {
      id: 1,
      title: "Title Slide",
      content: "Presentation Title\nSubtitle\nPresenter Name",
      type: "title",
      thumbnail: "/placeholder.svg?height=120&width=160&text=Title+Slide",
    },
    {
      id: 2,
      title: "Agenda",
      content:
        "• Introduction\n• Problem Statement\n• Solution Overview\n• Implementation Plan\n• Results\n• Conclusion",
      type: "bullet",
      thumbnail: "/placeholder.svg?height=120&width=160&text=Agenda",
    },
    {
      id: 3,
      title: "Problem Statement",
      content: "Current challenges in the market\n• Challenge 1\n• Challenge 2\n• Challenge 3",
      type: "bullet",
      thumbnail: "/placeholder.svg?height=120&width=160&text=Problem",
    },
    {
      id: 4,
      title: "Solution Overview",
      content: "Our proposed solution addresses these challenges through innovative approaches",
      type: "content",
      thumbnail: "/placeholder.svg?height=120&width=160&text=Solution",
    },
    {
      id: 5,
      title: "Market Analysis",
      content: "Chart showing market trends and opportunities",
      type: "chart",
      thumbnail: "/placeholder.svg?height=120&width=160&text=Chart",
    },
  ]

  const handleGenerate = async () => {
    if (!presentationTitle.trim() || !presentationTopic.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate presentation generation
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSlideNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    } else if (direction === "next" && currentSlide < sampleSlides.length) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const currentSlideData = sampleSlides[currentSlide - 1]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Presentation Generator</h1>
          <p className="text-muted-foreground">Create professional presentations with AI assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">
            <Wand2 className="mr-2 h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Creation Settings */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Presentation Settings</CardTitle>
                  <CardDescription>Configure your presentation parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Presentation Title</Label>
                    <Input
                      placeholder="Enter presentation title..."
                      value={presentationTitle}
                      onChange={(e) => setPresentationTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Topic/Theme</Label>
                    <Textarea
                      placeholder="Describe the main topic or theme..."
                      value={presentationTopic}
                      onChange={(e) => setPresentationTopic(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.value} value={template.value}>
                            <div>
                              <div className="font-medium">{template.label}</div>
                              <div className="text-xs text-muted-foreground">{template.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Slides</Label>
                    <Select value={slideCount} onValueChange={setSlideCount}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 slides</SelectItem>
                        <SelectItem value="10">10 slides</SelectItem>
                        <SelectItem value="15">15 slides</SelectItem>
                        <SelectItem value="20">20 slides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Presentation Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!presentationTitle.trim() || !presentationTopic.trim() || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Presentation className="mr-2 h-4 w-4 animate-pulse" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Presentation
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generation Progress</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm font-medium capitalize">{selectedTemplate} Template</p>
                      <p className="text-xs text-muted-foreground">
                        {templates.find((t) => t.value === selectedTemplate)?.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Input */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Guidelines</CardTitle>
                  <CardDescription>Provide additional details for better presentation generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Key Points to Cover</Label>
                    <Textarea placeholder="• Point 1&#10;• Point 2&#10;• Point 3" className="min-h-[100px]" />
                  </div>

                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Input placeholder="e.g., Business executives, Students, General public" />
                  </div>

                  <div className="space-y-2">
                    <Label>Presentation Duration</Label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      placeholder="Any specific requirements, data to include, or style preferences..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Start Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      {
                        title: "Business Proposal",
                        icon: FileText,
                        description: "Create a business proposal presentation",
                      },
                      { title: "Product Launch", icon: Presentation, description: "Present a new product or service" },
                      { title: "Market Analysis", icon: BarChart3, description: "Analyze market trends and data" },
                      { title: "Project Update", icon: Layout, description: "Update on project progress" },
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 justify-start"
                        onClick={() => {
                          setPresentationTitle(option.title)
                          setPresentationTopic(option.description)
                        }}
                      >
                        <option.icon className="mr-3 h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{option.title}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Slide Editing</CardTitle>
              <CardDescription>Edit and customize your presentation slides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Slide editing features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Presentation Preview</CardTitle>
                  <CardDescription>Preview your presentation in full-screen mode</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Slide 1 of {sampleSlides.length}</Badge>
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Start Slideshow
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-white border rounded-lg p-8 shadow-sm">
                <div className="h-full flex flex-col justify-center">
                  <h1 className="text-4xl font-bold text-center mb-8">Title Slide</h1>
                  <div className="text-center">
                    <pre className="whitespace-pre-wrap text-lg">Presentation Content</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
