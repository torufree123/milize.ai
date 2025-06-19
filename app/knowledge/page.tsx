"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Database, Upload, Trash2, Edit, Eye, Search, Plus, Settings } from "lucide-react"

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data
  const documents = [
    { id: 1, name: "Product Manual.pdf", type: "PDF", size: "2.4 MB", date: "2023/06/01", status: "Processed" },
    { id: 2, name: "Financial Report.xlsx", type: "Excel", size: "1.8 MB", date: "2023/05/15", status: "Processed" },
    { id: 3, name: "Customer Data.csv", type: "CSV", size: "3.2 MB", date: "2023/05/10", status: "Processed" },
    {
      id: 4,
      name: "Presentation Materials.pptx",
      type: "PowerPoint",
      size: "5.1 MB",
      date: "2023/06/05",
      status: "Processing",
    },
    { id: 5, name: "Meeting Minutes.docx", type: "Word", size: "1.2 MB", date: "2023/06/08", status: "Pending" },
  ]

  const databases = [
    { id: 1, name: "Customer Database", type: "MySQL", tables: 12, records: "15,000+", lastSync: "2023/06/10" },
    { id: 2, name: "Product Catalog", type: "PostgreSQL", tables: 8, records: "5,200+", lastSync: "2023/06/08" },
    { id: 3, name: "Sales History", type: "SQLite", tables: 5, records: "32,000+", lastSync: "2023/06/05" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Processed
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Knowledge Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <Database className="mr-2 h-4 w-4" />
            Connect
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Sources</CardTitle>
          <CardDescription>Manage the knowledge sources that AI references</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="databases">
                <Database className="mr-2 h-4 w-4" />
                Databases
              </TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="databases" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Tables</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow key={db.id}>
                        <TableCell className="font-medium">{db.name}</TableCell>
                        <TableCell>{db.type}</TableCell>
                        <TableCell>{db.tables}</TableCell>
                        <TableCell>{db.records}</TableCell>
                        <TableCell>{db.lastSync}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Database
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Processing</CardTitle>
            <CardDescription>Document processing status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Processed</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">Processing</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Process All
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge Usage</CardTitle>
            <CardDescription>AI knowledge reference status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Most Referenced Document</span>
                <span className="text-sm font-medium">Product Manual.pdf</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Most Referenced Database</span>
                <span className="text-sm font-medium">Customer Database</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">References This Month</span>
                <span className="text-sm font-medium">248</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Month-over-Month Change</span>
                <span className="text-sm font-medium text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
