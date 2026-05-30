"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

const responses = [
  {
    id: "1",
    formName: "Customer Feedback Form",
    email: "john.doe@example.com",
    name: "John Doe",
    submittedAt: "2024-01-20 14:32",
    status: "new",
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      rating: 5,
      feedback: "Excellent service! Very satisfied with the product quality.",
    },
  },
  {
    id: "2",
    formName: "Customer Feedback Form",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    submittedAt: "2024-01-20 12:15",
    status: "read",
    data: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      rating: 4,
      feedback: "Good experience overall, but shipping could be faster.",
    },
  },
  {
    id: "3",
    formName: "Event Registration",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    submittedAt: "2024-01-20 09:45",
    status: "new",
    data: {
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      company: "Tech Corp",
      attendees: 3,
    },
  },
  {
    id: "4",
    formName: "Employee Survey",
    email: "sarah.wilson@example.com",
    name: "Sarah Wilson",
    submittedAt: "2024-01-19 16:20",
    status: "read",
    data: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      department: "Engineering",
      satisfaction: 4,
    },
  },
  {
    id: "5",
    formName: "Lead Generation",
    email: "david.brown@example.com",
    name: "David Brown",
    submittedAt: "2024-01-19 11:30",
    status: "archived",
    data: {
      name: "David Brown",
      email: "david.brown@example.com",
      company: "Startup Inc",
      interest: "Enterprise Plan",
    },
  },
]

export default function ResponsesPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selectedResponses, setSelectedResponses] = useState<string[]>([])
  const [viewingResponse, setViewingResponse] = useState<(typeof responses)[0] | null>(null)

  const filteredResponses = responses.filter((response) => {
    const matchesSearch =
      response.name.toLowerCase().includes(search.toLowerCase()) ||
      response.email.toLowerCase().includes(search.toLowerCase()) ||
      response.formName.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || response.status === filter
    return matchesSearch && matchesFilter
  })

  const toggleSelectAll = () => {
    if (selectedResponses.length === filteredResponses.length) {
      setSelectedResponses([])
    } else {
      setSelectedResponses(filteredResponses.map((r) => r.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedResponses((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Responses</h1>
          <p className="text-muted-foreground">View and manage all form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Icons.download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{responses.length}</div>
            <p className="text-sm text-muted-foreground">Total Responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {responses.filter((r) => r.status === "new").length}
            </div>
            <p className="text-sm text-muted-foreground">New Responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search responses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedResponses.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedResponses.length} selected
                </span>
                <Button variant="outline" size="sm">
                  Mark as Read
                </Button>
                <Button variant="outline" size="sm">
                  Archive
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedResponses.length === filteredResponses.length && filteredResponses.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Respondent</TableHead>
                  <TableHead>Form</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Icons.responses className="h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">No responses found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResponses.map((response) => (
                    <TableRow key={response.id} className="cursor-pointer" onClick={() => setViewingResponse(response)}>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedResponses.includes(response.id)}
                          onCheckedChange={() => toggleSelect(response.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-xs font-medium text-primary">
                              {response.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{response.name}</p>
                            <p className="text-sm text-muted-foreground">{response.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{response.formName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            response.status === "new"
                              ? "default"
                              : response.status === "read"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {response.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {response.submittedAt}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icons.more className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewingResponse(response)}>
                              <Icons.view className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Icons.archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Icons.delete className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Response Detail Modal */}
      <Dialog open={!!viewingResponse} onOpenChange={() => setViewingResponse(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Response Details</DialogTitle>
            <DialogDescription>
              Submitted on {viewingResponse?.submittedAt}
            </DialogDescription>
          </DialogHeader>
          {viewingResponse && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-medium text-primary">
                      {viewingResponse.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{viewingResponse.name}</p>
                    <p className="text-sm text-muted-foreground">{viewingResponse.email}</p>
                  </div>
                  <Badge className="ml-auto">{viewingResponse.status}</Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Form: {viewingResponse.formName}</h4>
                  <div className="rounded-lg border divide-y">
                    {Object.entries(viewingResponse.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Icons.archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                  <Button variant="outline" className="flex-1 text-destructive hover:text-destructive">
                    <Icons.delete className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
