"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Building, Plus, Edit, Trash2, Shield, Settings } from "lucide-react"

export default function AdminPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      role: "システム",
      department: "IT部",
      status: "アクティブ",
    },
    { id: 2, name: "佐藤花子", email: "sato@example.com", role: "管理", department: "営業部", status: "アクティブ" },
    {
      id: 3,
      name: "鈴木一郎",
      email: "suzuki@example.com",
      role: "ノーマル",
      department: "営業部",
      status: "アクティブ",
    },
    {
      id: 4,
      name: "高橋美咲",
      email: "takahashi@example.com",
      role: "ノーマル",
      department: "マーケティング部",
      status: "非アクティブ",
    },
  ])

  const [departments, setDepartments] = useState([
    { id: 1, name: "IT部", parentId: null, userCount: 5 },
    { id: 2, name: "営業部", parentId: null, userCount: 12 },
    { id: 3, name: "マーケティング部", parentId: null, userCount: 8 },
    { id: 4, name: "人事部", parentId: null, userCount: 4 },
    { id: 5, name: "財務部", parentId: null, userCount: 6 },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "ノーマル",
    department: "",
  })

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    parentId: null,
  })

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "システム":
        return <Badge variant="destructive">{role}</Badge>
      case "管理":
        return <Badge variant="default">{role}</Badge>
      case "ノーマル":
        return <Badge variant="outline">{role}</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "アクティブ":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            アクティブ
          </Badge>
        )
      case "非アクティブ":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            非アクティブ
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: "アクティブ",
    }
    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "ノーマル", department: "" })
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleAddDepartment = () => {
    const department = {
      id: departments.length + 1,
      ...newDepartment,
      userCount: 0,
    }
    setDepartments([...departments, department])
    setNewDepartment({ name: "", parentId: null })
  }

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">管理機能</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">総ユーザー数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              アクティブ: {users.filter((u) => u.status === "アクティブ").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">部署数</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">組織全体</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">管理者数</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "管理" || u.role === "システム").length}
            </div>
            <p className="text-xs text-muted-foreground">システム・管理権限</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            ユーザー管理
          </TabsTrigger>
          <TabsTrigger value="departments">
            <Building className="mr-2 h-4 w-4" />
            組織・部署管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>ユーザー管理</CardTitle>
                  <CardDescription>システムユーザーの追加・編集・削除を行います</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      ユーザー追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新しいユーザーを追加</DialogTitle>
                      <DialogDescription>新しいユーザーの情報を入力してください</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">名前</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="ユーザー名を入力"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">権限</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ノーマル">ノーマル</SelectItem>
                            <SelectItem value="管理">管理</SelectItem>
                            <SelectItem value="システム">システム</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">部署</Label>
                        <Select
                          value={newUser.department}
                          onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="部署を選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.name}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddUser}>追加</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>メールアドレス</TableHead>
                    <TableHead>権限</TableHead>
                    <TableHead>部署</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>組織・部署管理</CardTitle>
                  <CardDescription>組織構造と部署の管理を行います</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      部署追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新しい部署を追加</DialogTitle>
                      <DialogDescription>新しい部署の情報を入力してください</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dept-name">部署名</Label>
                        <Input
                          id="dept-name"
                          value={newDepartment.name}
                          onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                          placeholder="部署名を入力"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-dept">親部署</Label>
                        <Select
                          onValueChange={(value) =>
                            setNewDepartment({
                              ...newDepartment,
                              parentId: value === "none" ? null : Number.parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="親部署を選択（任意）" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">なし（トップレベル）</SelectItem>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id.toString()}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddDepartment}>追加</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>部署名</TableHead>
                    <TableHead>ユーザー数</TableHead>
                    <TableHead>階層</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.userCount}人</TableCell>
                      <TableCell>{dept.parentId ? "サブ部署" : "トップレベル"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDepartment(dept.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
