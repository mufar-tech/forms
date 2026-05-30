"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const forms = [
  {
    id: "1",
    name: "Customer Feedback Form",
    description: "Collect feedback from customers about our services",
    status: "active",
    responses: 156,
    views: 892,
    createdAt: "2024-01-15",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Employee Satisfaction Survey",
    description: "Annual employee satisfaction survey",
    status: "active",
    responses: 89,
    views: 120,
    createdAt: "2024-01-10",
    lastUpdated: "5 hours ago",
  },
  {
    id: "3",
    name: "Event Registration Form",
    description: "Registration form for upcoming tech conference",
    status: "active",
    responses: 234,
    views: 567,
    createdAt: "2024-01-08",
    lastUpdated: "1 day ago",
  },
  {
    id: "4",
    name: "Lead Generation Form",
    description: "Capture leads from marketing campaigns",
    status: "draft",
    responses: 0,
    views: 0,
    createdAt: "2024-01-05",
    lastUpdated: "2 days ago",
  },
  {
    id: "5",
    name: "Job Application Form",
    description: "Application form for software engineer position",
    status: "closed",
    responses: 45,
    views: 234,
    createdAt: "2024-01-01",
    lastUpdated: "3 days ago",
  },
  {
    id: "6",
    name: "Vendor Registration",
    description: "Vendor onboarding registration form",
    status: "active",
    responses: 23,
    views: 89,
    createdAt: "2023-12-28",
    lastUpdated: "4 days ago",
  },
]

export default function FormsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || form.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Forms</h1>
          <p className="text-muted-foreground">Manage and organize all your forms</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/forms/new">
            <Icons.add className="mr-2 h-4 w-4" />
            Create Form
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search forms..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
          <TabsList className="h-9">
            <TabsTrigger value="grid" className="px-3">
              <Icons.layers className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="px-3">
              <Icons.menu className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Forms Grid/List */}
      {filteredForms.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Icons.forms className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No forms found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {search || filter !== "all"
                ? "Try adjusting your search or filter"
                : "Create your first form to get started"}
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/forms/new">
                <Icons.add className="mr-2 h-4 w-4" />
                Create Form
              </Link>
            </Button>
          </div>
        </Card>
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredForms.map((form) => (
            <Card key={form.id} className="group transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.forms className="h-5 w-5 text-primary" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <Icons.more className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}`}>
                          <Icons.edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.view className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.external className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icons.archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Icons.delete className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={`/dashboard/forms/${form.id}`} className="block mt-4">
                  <h3 className="font-semibold line-clamp-1">{form.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {form.description}
                  </p>
                </Link>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icons.responses className="h-4 w-4" />
                    {form.responses}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.view className="h-4 w-4" />
                    {form.views}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge
                    variant={
                      form.status === "active"
                        ? "default"
                        : form.status === "draft"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {form.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{form.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y">
            {filteredForms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.forms className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Link href={`/dashboard/forms/${form.id}`} className="font-medium hover:underline">
                      {form.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icons.responses className="h-4 w-4" />
                      {form.responses}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icons.view className="h-4 w-4" />
                      {form.views}
                    </div>
                  </div>
                  <Badge
                    variant={
                      form.status === "active"
                        ? "default"
                        : form.status === "draft"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {form.status}
                  </Badge>
                  <span className="hidden text-sm text-muted-foreground lg:block w-24">
                    {form.lastUpdated}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.more className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/forms/${form.id}`}>
                          <Icons.edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.view className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Icons.delete className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
