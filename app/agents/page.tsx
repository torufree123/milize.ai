"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bot,
  Star,
  Search,
  Filter,
  ArrowRight,
  Building,
  Briefcase,
  Upload,
  FileUp,
  Check,
  AlertCircle,
  X,
  Loader2,
  FileCode,
  Code,
  RefreshCw,
} from "lucide-react"

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedJob, setSelectedJob] = useState("")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importPlatform, setImportPlatform] = useState("dify")
  const [importStep, setImportStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState<"idle" | "importing" | "success" | "error">("idle")
  const [importError, setImportError] = useState("")
  const [importedAgent, setImportedAgent] = useState<any>(null)

  const industries = [
    { value: "finance", label: "Finance (Banking, Securities, Insurance, Cards, Agencies)" },
    { value: "medical", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "common", label: "General" },
  ]

  const getJobsByIndustry = (industry: string) => {
    if (industry === "finance") {
      return [
        { value: "retail_sales", label: "Retail Sales" },
        { value: "corporate_sales", label: "Corporate Sales" },
        { value: "lending", label: "Lending" },
        { value: "general_affairs", label: "General Affairs" },
        { value: "ir", label: "Investor Relations" },
        { value: "market_operations", label: "Market Operations" },
        { value: "risk_management", label: "Risk Management" },
        { value: "planning", label: "Planning" },
        { value: "legal", label: "Legal" },
        { value: "dx", label: "Digital Transformation" },
      ]
    }
    return [
      { value: "general", label: "General Operations" },
      { value: "management", label: "Management" },
      { value: "planning", label: "Planning" },
      { value: "dx", label: "Digital Transformation" },
    ]
  }

  const agents = [
    {
      id: "1",
      name: "Retail Sales Support AI",
      description: "Agent that supports sales activities for individual customers",
      rating: 4.8,
      tags: ["Sales Support", "Customer Analysis", "Proposal Creation"],
      industry: "finance",
      job: "retail_sales",
      category: "Sales Support",
    },
    {
      id: "2",
      name: "Risk Analysis AI",
      description: "Agent that analyzes and evaluates financial risks",
      rating: 4.7,
      tags: ["Risk Analysis", "Data Analysis", "Reports"],
      industry: "finance",
      job: "risk_management",
      category: "Analysis",
    },
    {
      id: "3",
      name: "Legal Document Review AI",
      description: "Reviews contracts and legal documents with modification suggestions",
      rating: 4.6,
      tags: ["Legal", "Document Review", "Compliance"],
      industry: "common",
      job: "legal",
      category: "Document Processing",
    },
    {
      id: "4",
      name: "Medical Diagnosis Support AI",
      description: "Agent that supports medical diagnosis and case analysis",
      rating: 4.9,
      tags: ["Diagnosis Support", "Case Analysis", "Healthcare"],
      industry: "medical",
      job: "general",
      category: "Diagnosis Support",
    },
    {
      id: "5",
      name: "Educational Content Creation AI",
      description: "Creates and optimizes educational content",
      rating: 4.5,
      tags: ["Education", "Content Creation", "Learning Support"],
      industry: "education",
      job: "general",
      category: "Education Support",
    },
    {
      id: "6",
      name: "DX Strategy Planning AI",
      description: "Plans and supports implementation of digital transformation strategies",
      rating: 4.7,
      tags: ["DX", "Strategy Planning", "Digitalization"],
      industry: "common",
      job: "dx",
      category: "Strategy Planning",
    },
  ]

  // Add imported agent
  const allAgents = importedAgent ? [...agents, importedAgent] : agents

  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !selectedIndustry || agent.industry === selectedIndustry
    const matchesJob = !selectedJob || agent.job === selectedJob

    return matchesSearch && matchesIndustry && matchesJob
  })

  const getIndustryLabel = (value: string) => {
    return industries.find((industry) => industry.value === value)?.label || value
  }

  const getJobLabel = (value: string) => {
    const allJobs = [
      ...getJobsByIndustry("finance"),
      { value: "general", label: "General Operations" },
      { value: "management", label: "Management" },
    ]
    return allJobs.find((job) => job.value === value)?.label || value
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const resetImportDialog = () => {
    setImportStep(1)
    setSelectedFile(null)
    setImportProgress(0)
    setImportStatus("idle")
    setImportError("")
    setImportedAgent(null)
  }

  const closeImportDialog = () => {
    setIsImportDialogOpen(false)
    resetImportDialog()
  }

  const startImport = () => {
    setImportStep(2)
    setImportStatus("importing")
    setImportProgress(0)

    // Import process simulation
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Import completion simulation
    setTimeout(() => {
      clearInterval(interval)
      setImportProgress(100)

      if (Math.random() > 0.2) {
        // 80% success rate
        setImportStatus("success")

        // Set imported agent information
        const newAgent = {
          id: `imported-${Date.now()}`,
          name: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, "") : "Imported Agent",
          description: `Custom agent imported from ${importPlatform}`,
          rating: 0,
          tags: ["Import", importPlatform],
          industry: "common",
          job: "general",
          category: "Custom",
          imported: true,
          importSource: importPlatform,
        }

        setImportedAgent(newAgent)
      } else {
        setImportStatus("error")
        setImportError("An error occurred during import. Please check the file format.")
      }
    }, 3000)
  }

  const platformOptions = [
    { id: "dify", name: "Dify", description: "Import Dify agent from YML file", icon: FileCode },
    { id: "smithos", name: "SmithOS", description: "Connect agent created with SmithOS", icon: Bot },
    { id: "langchain", name: "LangChain", description: "Integrate agent built with LangChain", icon: Code },
    { id: "custom", name: "Custom", description: "Import custom agent definition", icon: RefreshCw },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Bot className="mr-2 h-4 w-4" />
              New Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            {importStep === 1 && (
              <>
                <DialogHeader>
                  <DialogTitle>Import New Agent</DialogTitle>
                  <DialogDescription>Import or connect agents created on external platforms.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <RadioGroup value={importPlatform} onValueChange={setImportPlatform} className="space-y-4">
                    {platformOptions.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                      >
                        <RadioGroupItem value={platform.id} id={platform.id} />
                        <Label htmlFor={platform.id} className="flex flex-1 items-center cursor-pointer">
                          <platform.icon className="mr-3 h-5 w-5" />
                          <div>
                            <div className="font-medium">{platform.name}</div>
                            <div className="text-sm text-muted-foreground">{platform.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {importPlatform === "dify" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="yml-file">Select YML File</Label>
                      <div className="grid w-full items-center gap-1.5">
                        <Label
                          htmlFor="yml-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">YML format only (max 10MB)</p>
                          </div>
                          <Input
                            id="yml-file"
                            type="file"
                            accept=".yml,.yaml"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                      </div>
                      {selectedFile && (
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center">
                            <FileUp className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[300px]">{selectedFile.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {importPlatform === "smithos" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="smithos-api-key">SmithOS API Key</Label>
                      <Input id="smithos-api-key" placeholder="sk-smithos-..." />
                      <Label htmlFor="smithos-agent-id">Agent ID</Label>
                      <Input id="smithos-agent-id" placeholder="agent_..." />
                    </div>
                  )}

                  {importPlatform === "langchain" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="langchain-url">LangChain Endpoint URL</Label>
                      <Input id="langchain-url" placeholder="https://..." />
                      <Label htmlFor="langchain-api-key">API Key (Optional)</Label>
                      <Input id="langchain-api-key" placeholder="..." />
                    </div>
                  )}

                  {importPlatform === "custom" && (
                    <div className="mt-4 space-y-4">
                      <Label htmlFor="custom-config">Agent Configuration (JSON)</Label>
                      <Textarea id="custom-config" placeholder="{}" className="min-h-[150px]" />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeImportDialog}>
                    Cancel
                  </Button>
                  <Button onClick={startImport} disabled={importPlatform === "dify" && !selectedFile}>
                    Start Import
                  </Button>
                </DialogFooter>
              </>
            )}

            {importStep === 2 && (
              <>
                <DialogHeader>
                  <DialogTitle>Agent Import</DialogTitle>
                  <DialogDescription>
                    {importStatus === "importing" && "Importing agent..."}
                    {importStatus === "success" && "Agent import completed successfully!"}
                    {importStatus === "error" && "Agent import failed"}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6 space-y-6">
                  {importStatus === "importing" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      </div>
                      <Progress value={importProgress} className="w-full" />
                      <p className="text-center text-sm text-muted-foreground">
                        {importPlatform === "dify" ? "Parsing YML file..." : "Processing agent configuration..."}
                      </p>
                    </div>
                  )}

                  {importStatus === "success" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="rounded-full bg-green-100 p-3">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="font-medium">Import Successful</h3>
                        <p className="text-sm text-muted-foreground">
                          Agent has been successfully imported and is now available.
                        </p>
                      </div>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{importedAgent?.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">{importedAgent?.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {importedAgent?.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {importStatus === "error" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="rounded-full bg-red-100 p-3">
                          <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                      </div>
                      <Alert variant="destructive">
                        <AlertDescription>{importError}</AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  {importStatus === "importing" ? (
                    <Button variant="outline" onClick={closeImportDialog}>
                      Cancel
                    </Button>
                  ) : importStatus === "success" ? (
                    <>
                      <Button variant="outline" onClick={closeImportDialog}>
                        Close
                      </Button>
                      <Button onClick={closeImportDialog}>Use Agent</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={closeImportDialog}>
                        Close
                      </Button>
                      <Button onClick={resetImportDialog}>Retry</Button>
                    </>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Search</CardTitle>
          <CardDescription>Search and filter agents by industry and job function</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Building className="mr-1 h-4 w-4" />
                Industry
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />
                Job Function
              </label>
              <Select value={selectedJob} onValueChange={setSelectedJob} disabled={!selectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {selectedIndustry &&
                    getJobsByIndustry(selectedIndustry).map((job) => (
                      <SelectItem key={job.value} value={job.value}>
                        {job.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Search className="mr-1 h-4 w-4" />
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Filter className="mr-1 h-4 w-4" />
                Filter
              </label>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {(selectedIndustry || selectedJob || searchQuery) && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedIndustry && (
                <Badge variant="secondary" className="gap-1">
                  {getIndustryLabel(selectedIndustry)}
                  <button onClick={() => setSelectedIndustry("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
              {selectedJob && (
                <Badge variant="secondary" className="gap-1">
                  {getJobLabel(selectedJob)}
                  <button onClick={() => setSelectedJob("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:bg-muted rounded-full">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{filteredAgents.length} agents found</div>
        <div className="flex items-center gap-2">
          <Select defaultValue="rating">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">By Rating</SelectItem>
              <SelectItem value="name">By Name</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {agent.rating > 0 ? (
                        <>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not rated</span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {agent.category}
                      </Badge>
                      {agent.imported && (
                        <Badge variant="secondary" className="text-xs">
                          Imported
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Industry: {getIndustryLabel(agent.industry)}</div>
                      <div className="text-xs text-muted-foreground">Job: {getJobLabel(agent.job)}</div>
                      {agent.importSource && (
                        <div className="text-xs text-muted-foreground">Source: {agent.importSource}</div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Try it out</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                        {agent.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{agent.rating}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not rated</span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {agent.category}
                        </Badge>
                        {agent.imported && (
                          <Badge variant="secondary" className="text-xs">
                            Imported
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{agent.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>Industry: {getIndustryLabel(agent.industry)}</span>
                        <span>Job: {getJobLabel(agent.job)}</span>
                        {agent.importSource && <span>Source: {agent.importSource}</span>}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button>
                        Try it out
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
