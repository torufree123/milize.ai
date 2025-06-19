"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  Eye,
  BookOpen,
  Video,
  MessageCircle,
  TrendingUp,
  Filter,
  Star,
  Users,
  Settings,
  FileText,
  HelpCircle,
  Zap,
} from "lucide-react"

const topQuestions = [
  {
    id: 1,
    rank: 1,
    question: "How do I create an AI agent?",
    answer:
      "To create an AI agent, follow these steps:\n1. Click the 'AI Agents' menu\n2. Press the 'New Agent' button\n3. Enter the agent name and description\n4. Select the AI model to use\n5. Set the prompt\n6. Click 'Save'",
    category: "Basic Operations",
    views: 1234,
    helpful: 89,
    notHelpful: 12,
  },
  {
    id: 2,
    rank: 2,
    question: "What are the file upload limits?",
    answer:
      "File uploads have the following limits:\n• Maximum file size: 100MB\n• Supported formats: PDF, CSV, Excel, Word, PowerPoint\n• Simultaneous uploads: Up to 10 files\n• Monthly upload limit: Varies by plan",
    category: "Basic Operations",
    views: 987,
    helpful: 76,
    notHelpful: 8,
  },
  {
    id: 3,
    rank: 3,
    question: "How do I save analysis results?",
    answer:
      "To save analysis results:\n1. After analysis is complete, click the 'Save' button\n2. Enter the analysis name\n3. Select a category (optional)\n4. Confirm 'Save'\n\nSaved analyses can be viewed from 'My Page'.",
    category: "Data Analysis",
    views: 856,
    helpful: 82,
    notHelpful: 6,
  },
  {
    id: 4,
    rank: 4,
    question: "How do I optimize prompts?",
    answer:
      "Tips for creating effective prompts:\n• Write specific and clear instructions\n• Specify the expected output format\n• Include examples\n• Provide step-by-step instructions\n• Specify constraints\n\nAlso, utilize the prompt library.",
    category: "AI Agents",
    views: 743,
    helpful: 91,
    notHelpful: 4,
  },
  {
    id: 5,
    rank: 5,
    question: "How does cost calculation work?",
    answer:
      "Costs are calculated based on the following factors:\n• AI model used\n• Number of tokens processed\n• Execution time\n• Features used\n\nDetails can be found in 'Usage & Monitoring'.",
    category: "Account",
    views: 692,
    helpful: 73,
    notHelpful: 11,
  },
  {
    id: 6,
    rank: 6,
    question: "How secure is the data?",
    answer:
      "Data security measures:\n• End-to-end encryption\n• SOC2 Type II compliance\n• GDPR compliance\n• Regular security audits\n• Access control and log management\n\nYour data is strictly protected.",
    category: "Account",
    views: 634,
    helpful: 88,
    notHelpful: 7,
  },
  {
    id: 7,
    question: "How do I set up API integration?",
    answer:
      "API integration setup:\n1. Open 'Settings' → 'API Settings'\n2. Click 'New API Connection'\n3. Select API type (Dify, LangChain, etc.)\n4. Enter authentication information\n5. Run a connection test\n6. Save settings",
    category: "AI Agents",
    views: 578,
    helpful: 79,
    notHelpful: 9,
  },
  {
    id: 8,
    rank: 8,
    question: "How do I troubleshoot errors?",
    answer:
      "Common troubleshooting methods:\n• Reload the page\n• Clear browser cache\n• Try a different browser\n• Check file format\n• Check internet connection\n\nContact support if the problem persists.",
    category: "Troubleshooting",
    views: 523,
    helpful: 65,
    notHelpful: 15,
  },
  {
    id: 9,
    rank: 9,
    question: "How do I use the team sharing feature?",
    answer:
      "Team sharing setup:\n1. Select the analysis you want to share\n2. Click the 'Share' button\n3. Enter the email address of the person you want to share with\n4. Set the permission level (View only/Editable)\n5. Confirm 'Share'",
    category: "Basic Operations",
    views: 467,
    helpful: 71,
    notHelpful: 8,
  },
  {
    id: 10,
    question: "How do I backup and restore data?",
    answer:
      "Data backup:\n• Automatic backup: Executed daily\n• Manual backup: 'Settings' → 'Data Management'\n• Export function: CSV, JSON format\n• Restore: Contact support team\n\nData is retained for 30 days.",
    category: "Account",
    views: 412,
    helpful: 68,
    notHelpful: 12,
  },
]

const categories = [
  { name: "All", count: 63, icon: HelpCircle },
  { name: "Basic Operations", count: 15, icon: Settings },
  { name: "AI Agents", count: 12, icon: Zap },
  { name: "Data Analysis", count: 18, icon: FileText },
  { name: "Account", count: 8, icon: Users },
  { name: "Troubleshooting", count: 10, icon: HelpCircle },
]

const guides = [
  {
    title: "Quick Start Guide",
    description: "Learn the basics of using AI Front System",
    icon: BookOpen,
    duration: "10 minutes",
    type: "Guide",
  },
  {
    title: "AI Agent Creation Tutorial",
    description: "How to create effective AI agents",
    icon: Video,
    duration: "15 minutes",
    type: "Video",
  },
  {
    title: "Data Analysis Best Practices",
    description: "Tips for improving analysis accuracy",
    icon: TrendingUp,
    duration: "20 minutes",
    type: "Guide",
  },
  {
    title: "Prompt Engineering",
    description: "How to create high-quality prompts",
    icon: Star,
    duration: "25 minutes",
    type: "Video",
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Popularity")

  const filteredQuestions = topQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "Popularity") return a.rank - b.rank
    if (sortBy === "Views") return b.views - a.views
    if (sortBy === "Rating") return b.helpful / (b.helpful + b.notHelpful) - a.helpful / (a.helpful + a.notHelpful)
    return 0
  })

  const handleVote = (questionId: number, isHelpful: boolean) => {
    // In a real implementation, you would call an API here to record the vote
    console.log(`Question ${questionId} voted as ${isHelpful ? "helpful" : "not helpful"}`)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">FAQ & Manual</h1>
        <p className="text-muted-foreground">Frequently asked questions and system usage guide</p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">63</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Questions This Month</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">Guides & Manuals</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Search & Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-4 w-4" />
                          <span>{category.name}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Popularity">Popularity</SelectItem>
                    <SelectItem value="Views">Views</SelectItem>
                    <SelectItem value="Rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* TOP10 Ranking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Top 10 Frequently Asked Questions</span>
              </CardTitle>
              <CardDescription>The ranking of the most viewed questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {sortedQuestions.map((question) => (
                  <AccordionItem key={question.id} value={`item-${question.id}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-3 w-full">
                        <Badge variant="outline" className="text-xs">
                          #{question.rank}
                        </Badge>
                        <span className="flex-1">{question.question}</span>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{question.views}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">{question.answer}</pre>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{question.category}</Badge>
                            <span className="text-sm text-muted-foreground">{question.views} views</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Was this answer helpful?</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(question.id, true)}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{question.helpful}</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVote(question.id, false)}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span>{question.notHelpful}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{guide.type}</Badge>
                        <span className="text-sm text-muted-foreground">Approx. {guide.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>If you have any unresolved issues, please feel free to contact us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Support Chat
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Contact Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Check the current service status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>API Service</span>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database</span>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>File Upload</span>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Detailed Status Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
