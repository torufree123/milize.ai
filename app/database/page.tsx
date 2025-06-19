"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  TrendingUp,
  Leaf,
  Megaphone,
  Newspaper,
  BarChart3,
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Settings,
  Calendar,
  Building,
} from "lucide-react"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")

  // Database categories
  const categories = [
    { id: "securities_reports", name: "Securities Reports", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "integrated_reports", name: "Integrated Reports", icon: TrendingUp, color: "bg-green-100 text-green-800" },
    { id: "esg_reports", name: "ESG Reports", icon: Leaf, color: "bg-emerald-100 text-emerald-800" },
    { id: "press_releases", name: "Press Releases", icon: Megaphone, color: "bg-purple-100 text-purple-800" },
    { id: "market_news", name: "Market News", icon: TrendingUp, color: "bg-orange-100 text-orange-800" },
    { id: "general_news", name: "General News", icon: Newspaper, color: "bg-gray-100 text-gray-800" },
    { id: "market_data", name: "Market Data", icon: BarChart3, color: "bg-red-100 text-red-800" },
  ]

  // Sample data
  const databaseItems = [
    {
      id: 1,
      title: "Toyota Motor Corporation Securities Report for FY2023",
      category: "securities_reports",
      company: "Toyota Motor Corporation",
      date: "2023/06/30",
      size: "15.2 MB",
      status: "Processed",
      downloads: 245,
    },
    {
      id: 2,
      title: "SoftBank Group Integrated Report 2023",
      category: "integrated_reports",
      company: "SoftBank Group",
      date: "2023/07/15",
      size: "8.7 MB",
      status: "Processed",
      downloads: 189,
    },
    {
      id: 3,
      title: "Mitsubishi UFJ Financial Group ESG Report 2023",
      category: "esg_reports",
      company: "Mitsubishi UFJ Financial Group",
      date: "2023/08/01",
      size: "12.4 MB",
      status: "Processing",
      downloads: 156,
    },
    {
      id: 4,
      title: "Bank of Japan: Results of Monetary Policy Meeting",
      category: "press_releases",
      company: "Bank of Japan",
      date: "2023/12/19",
      size: "2.1 MB",
      status: "Processed",
      downloads: 892,
    },
    {
      id: 5,
      title: "TOPIX Monthly Report December 2023",
      category: "market_data",
      company: "Tokyo Stock Exchange",
      date: "2023/12/29",
      size: "5.8 MB",
      status: "Processed",
      downloads: 334,
    },
    {
      id: 6,
      title: "Nikkei Stock Average Hits Year-to-Date High",
      category: "market_news",
      company: "Nikkei",
      date: "2023/12/28",
      size: "1.2 MB",
      status: "Processed",
      downloads: 567,
    },
  ]

  const companies = [
    "Toyota Motor Corporation",
    "SoftBank Group",
    "Mitsubishi UFJ Financial Group",
    "Bank of Japan",
    "Tokyo Stock Exchange",
    "Nikkei",
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
      case "Error":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0]
  }

  const filteredItems = databaseItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesCompany = !selectedCompany || item.company === selectedCompany

    return matchesSearch && matchesCategory && matchesCompany
  })

  const getCategoryStats = () => {
    return categories.map((category) => ({
      ...category,
      count: databaseItems.filter((item) => item.category === category.id).length,
      processed: databaseItems.filter((item) => item.category === category.id && item.status === "Processed").length,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Database</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Batch Import
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

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        {getCategoryStats().map((category) => (
          <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <category.icon className="h-5 w-5 text-muted-foreground" />
                <Badge className={category.color}>{category.count}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  Processed: {category.processed}/{category.count}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Search and filter documents in the database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Keyword Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company name..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Company/Organization</Label>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_companies">All</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Database List</CardTitle>
              <CardDescription>{filteredItems.length} documents found</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Document</DialogTitle>
                  <DialogDescription>Add a new document to the database</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input placeholder="Document title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company/Organization</Label>
                      <Input placeholder="Company or organization name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Publication Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Document description (optional)" />
                  </div>
                  <div className="space-y-2">
                    <Label>File</Label>
                    <Input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Company/Organization</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const categoryInfo = getCategoryInfo(item.category)
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="truncate" title={item.title}>
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <categoryInfo.icon className="h-4 w-4" />
                            <span className="text-sm">{categoryInfo.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{item.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.size}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.downloads}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" title="Preview">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="cards" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const categoryInfo = getCategoryInfo(item.category)
                  return (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <categoryInfo.icon className="h-5 w-5" />
                            <Badge className={categoryInfo.color}>{categoryInfo.name}</Badge>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{item.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Size: {item.size}</span>
                          <span>Downloads: {item.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            Preview
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
