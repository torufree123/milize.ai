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

  // Determine color based on server status
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

  // Toggle server status between running and stopped
  const toggleServerStatus = () => {
    if (serverStatus === "running") {
      setServerStatus("stopped")
    } else {
      setServerStatus("running")
    }
  }

  // Toggle debug mode
  const toggleDebugMode = () => {
    setDebugMode(!debugMode)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MCP Server Settings</h1>
          <p className="text-muted-foreground">
            Model Context Protocol (MCP) - Interaction protocol with AI models developed by Claude
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(serverStatus)}`}></div>
            <span className="capitalize">
              {serverStatus === "running" ? "Running" : serverStatus === "stopped" ? "Stopped" : "Maintenance"}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant={serverStatus === "running" ? "destructive" : "default"}
            size="sm"
            onClick={toggleServerStatus}
          >
            <Power className="mr-2 h-4 w-4" />
            {serverStatus === "running" ? "Stop" : "Start"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="overview">
            <BarChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Protocol Settings</span>
          </TabsTrigger>
          <TabsTrigger value="models">
            <Brain className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Model Integration</span>
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Zap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Tool Integration</span>
          </TabsTrigger>
          <TabsTrigger value="logs">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logs</span>
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">API Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Alerts */}
          {debugMode && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Debug Mode Enabled</AlertTitle>
              <AlertDescription>
                The MCP server is currently running in debug mode. Detailed logs will be recorded.
              </AlertDescription>
            </Alert>
          )}

          {/* MCP Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Model Context Protocol (MCP) Overview</CardTitle>
              <CardDescription>Interaction protocol with AI models developed by Claude</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Model Context Protocol (MCP) is a protocol for streamlining interactions with large language models
                (LLMs). This protocol allows advanced features such as context management, tool usage, and streaming to
                be used in a standardized way.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Extended Context Management</h4>
                    <p className="text-sm text-muted-foreground">Supports long context windows</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Tool Integration</h4>
                    <p className="text-sm text-muted-foreground">Standardized integration with external tools</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitBranch className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Parallel Processing</h4>
                    <p className="text-sm text-muted-foreground">Efficiently processes multiple tasks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Security</h4>
                    <p className="text-sm text-muted-foreground">Secure data exchange and authentication</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Requests</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground mt-1">Past 24 hours</p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 seconds</div>
                <p className="text-xs text-muted-foreground mt-1">Past 24 hours</p>
                <Progress value={40} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tool Invocations</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-muted-foreground mt-1">Past 24 hours</p>
                <Progress value={28} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.4%</div>
                <p className="text-xs text-muted-foreground mt-1">Past 24 hours</p>
                <Progress value={0.4} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Server Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>MCP Server Information</CardTitle>
                <CardDescription>Basic server information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Server Version</Label>
                    <div className="font-medium">MCP v1.2.3</div>
                  </div>
                  <div>
                    <Label className="text-sm">Environment</Label>
                    <div className="font-medium">Production</div>
                  </div>
                  <div>
                    <Label className="text-sm">Endpoint</Label>
                    <div className="font-medium">https://api.example.com/mcp</div>
                  </div>
                  <div>
                    <Label className="text-sm">Uptime</Label>
                    <div className="font-medium">14 days 7 hours 32 minutes</div>
                  </div>
                  <div>
                    <Label className="text-sm">Context Window</Label>
                    <div className="font-medium">128K Tokens</div>
                  </div>
                  <div>
                    <Label className="text-sm">Max Output Tokens</Label>
                    <div className="font-medium">4,096 Tokens</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Information
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Settings</CardTitle>
                <CardDescription>Quick toggle for key settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Streaming Responses</Label>
                    <div className="text-sm text-muted-foreground">Gradual responses in token units</div>
                  </div>
                  <Switch checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Tool Integration</Label>
                    <div className="text-sm text-muted-foreground">Allow the use of external tools</div>
                  </div>
                  <Switch checked={toolsEnabled} onCheckedChange={setToolsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <div className="text-sm text-muted-foreground">Enable detailed logging</div>
                  </div>
                  <Switch checked={debugMode} onCheckedChange={toggleDebugMode} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Advanced Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Integrated Models */}
          <Card>
            <CardHeader>
              <CardTitle>Integrated AI Models</CardTitle>
              <CardDescription>AI models currently integrated with MCP</CardDescription>
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
                      requests: "520/day",
                    },
                    {
                      name: "Claude 3 Sonnet",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "180K",
                      requests: "850/day",
                    },
                    {
                      name: "Claude 3 Haiku",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "150K",
                      requests: "1.2K/day",
                    },
                    {
                      name: "GPT-4o",
                      version: "v1.0",
                      status: "active",
                      contextWindow: "128K",
                      requests: "780/day",
                    },
                    {
                      name: "Llama 3",
                      version: "v1.0",
                      status: "maintenance",
                      contextWindow: "128K",
                      requests: "0/day",
                    },
                  ].map((model, i) => (
                    <Card key={i} className="bg-muted/50">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{model.name}</CardTitle>
                          <Badge variant={model.status === "active" ? "default" : "secondary"} className="capitalize">
                            {model.status === "active" ? "Active" : "Maintenance"}
                          </Badge>
                        </div>
                        <CardDescription>Version: {model.version}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <Label className="text-xs">Context</Label>
                            <div>{model.contextWindow}</div>
                          </div>
                          <div>
                            <Label className="text-xs">Requests</Label>
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
                Model Integration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Protocol Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Settings</CardTitle>
              <CardDescription>Manage basic MCP settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint</Label>
                  <Input id="endpoint" defaultValue="https://api.example.com/mcp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Protocol Version</Label>
                  <Select defaultValue="1.2.3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0.0">1.0.0</SelectItem>
                      <SelectItem value="1.1.0">1.1.0</SelectItem>
                      <SelectItem value="1.2.3">1.2.3 (Latest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="context-window">Context Window (Tokens)</Label>
                  <Input id="context-window" defaultValue="128000" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Output Tokens</Label>
                  <Input id="max-tokens" defaultValue="4096" type="number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">Default System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  rows={4}
                  defaultValue="You are a helpful AI assistant. Answer user questions concisely and accurately."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Authentication Key</Label>
                <Input id="api-key" type="password" defaultValue="sk_mcp_xxxxxxxxxxxxxxxxxxxx" />
              </div>

              <div className="space-y-2">
                <Label>Response Temperature</Label>
                <div className="flex items-center gap-4">
                  <Input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="flex-1" />
                  <span className="w-12 text-center">0.7</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Integration</CardTitle>
              <CardDescription>Manage AI models integrated with MCP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Model integration feature is under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tool Integration</CardTitle>
              <CardDescription>Settings for external tools used by MCP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tool integration feature is under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Management</CardTitle>
              <CardDescription>MCP request and response logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Log management feature is under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>MCP API settings and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">API settings feature is under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
