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
import { Upload, Download, Settings, Edit, Wand2, BarChart3, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { CardFooter } from "@/components/ui/card"

export default function TableModePage() {
  const [selectedDataSource, setSelectedDataSource] = useState("manual")
  const [tablePrompt, setTablePrompt] = useState("")
  const [columnCount, setColumnCount] = useState("5")
  const [rowCount, setRowCount] = useState("10")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const dataSources = [
    { value: "manual", label: "Manual Input", description: "Create table manually" },
    { value: "csv", label: "CSV Upload", description: "Upload CSV file" },
    { value: "database", label: "Database", description: "Connect to database" },
    { value: "api", label: "API", description: "Fetch from API" },
    { value: "ai", label: "AI Generation", description: "Generate with AI" },
  ]

  const sampleData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      department: "Engineering",
      position: "Senior Developer",
      salary: "$95,000",
      joinDate: "2022-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      department: "Marketing",
      position: "Marketing Manager",
      salary: "$78,000",
      joinDate: "2021-08-22",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@example.com",
      department: "Sales",
      position: "Sales Representative",
      salary: "$65,000",
      joinDate: "2023-01-10",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      department: "HR",
      position: "HR Specialist",
      salary: "$58,000",
      joinDate: "2022-11-05",
      status: "Inactive",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      department: "Engineering",
      position: "Junior Developer",
      salary: "$72,000",
      joinDate: "2023-06-01",
      status: "Active",
    },
  ]

  const columns = [
    { key: "name", label: "Name", type: "text", sortable: true },
    { key: "email", label: "Email", type: "email", sortable: true },
    { key: "department", label: "Department", type: "select", sortable: true },
    { key: "position", label: "Position", type: "text", sortable: true },
    { key: "salary", label: "Salary", type: "currency", sortable: true },
    { key: "joinDate", label: "Join Date", type: "date", sortable: true },
    { key: "status", label: "Status", type: "badge", sortable: true },
  ]

  const handleGenerate = async () => {
    if (!tablePrompt.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate table generation
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleRowSelect = (rowId: number) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]))
  }

  const handleSelectAll = () => {
    if (selectedRows.length === sampleData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(sampleData.map((row) => row.id))
    }
  }

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
  }

  const filteredData = sampleData.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Table Generator</h1>
          <p className="text-muted-foreground">Create and manage data tables with AI assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
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
          <TabsTrigger value="analyze">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analyze
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Creation Settings */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Table Settings</CardTitle>
                  <CardDescription>Configure your table parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Source</Label>
                    <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            <div>
                              <div className="font-medium">{source.label}</div>
                              <div className="text-xs text-muted-foreground">{source.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDataSource === "ai" && (
                    <>
                      <div className="space-y-2">
                        <Label>Table Description</Label>
                        <Textarea
                          placeholder="Describe the table you want to create..."
                          value={tablePrompt}
                          onChange={(e) => setTablePrompt(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Columns</Label>
                          <Select value={columnCount} onValueChange={setColumnCount}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 columns</SelectItem>
                              <SelectItem value="5">5 columns</SelectItem>
                              <SelectItem value="8">8 columns</SelectItem>
                              <SelectItem value="10">10 columns</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Rows</Label>
                          <Select value={rowCount} onValueChange={setRowCount}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 rows</SelectItem>
                              <SelectItem value="25">25 rows</SelectItem>
                              <SelectItem value="50">50 rows</SelectItem>
                              <SelectItem value="100">100 rows</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedDataSource === "csv" && (
                    <div className="space-y-2">
                      <Label>Upload CSV File</Label>
                      <Input type="file" accept=".csv" />
                    </div>
                  )}

                  {selectedDataSource === "database" && (
                    <div className="space-y-2">
                      <Label>Database Connection</Label>
                      {/* Add database connection settings here */}
                    </div>
                  )}

                  <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Table
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
            </div>

            {/* Table Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Table Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Select</TableHead>
                          {columns.map((column) => (
                            <TableHead key={column.key}>{column.label}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleRowSelect(row.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.position}</TableCell>
                            <TableCell>{row.salary}</TableCell>
                            <TableCell>{row.joinDate}</TableCell>
                            <TableCell>{getStatusBadge(row.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Add Row
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete Selected
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Table Editing</CardTitle>
              <CardDescription>Edit and enhance your data tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Table editing features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Table Analysis</CardTitle>
              <CardDescription>Analyze your data tables with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Table analysis features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
