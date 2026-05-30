"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const templates = [
  {
    id: "1",
    name: "Contact Form",
    description: "Simple contact form with name, email, and message fields",
    category: "Basic",
    fields: 4,
    uses: 1234,
    icon: Icons.message,
    popular: true,
  },
  {
    id: "2",
    name: "Lead Generation",
    description: "Capture leads with company info and interest fields",
    category: "Marketing",
    fields: 6,
    uses: 987,
    icon: Icons.target,
    popular: true,
  },
  {
    id: "3",
    name: "Employee Registration",
    description: "Onboard new employees with personal and job information",
    category: "HR",
    fields: 12,
    uses: 756,
    icon: Icons.building,
    popular: false,
  },
  {
    id: "4",
    name: "Customer Feedback",
    description: "Gather customer feedback with rating and comments",
    category: "Feedback",
    fields: 5,
    uses: 1567,
    icon: Icons.heart,
    popular: true,
  },
  {
    id: "5",
    name: "Event Registration",
    description: "Event signup with attendee details and preferences",
    category: "Events",
    fields: 8,
    uses: 892,
    icon: Icons.date,
    popular: true,
  },
  {
    id: "6",
    name: "Job Application",
    description: "Comprehensive job application with resume upload",
    category: "HR",
    fields: 10,
    uses: 654,
    icon: Icons.briefcase,
    popular: false,
  },
  {
    id: "7",
    name: "Survey",
    description: "Multi-question survey with various field types",
    category: "Research",
    fields: 15,
    uses: 543,
    icon: Icons.clipboard,
    popular: false,
  },
  {
    id: "8",
    name: "Vendor Registration",
    description: "Onboard vendors with business and contact details",
    category: "Business",
    fields: 14,
    uses: 321,
    icon: Icons.building,
    popular: false,
  },
  {
    id: "9",
    name: "Newsletter Signup",
    description: "Simple email subscription form",
    category: "Marketing",
    fields: 2,
    uses: 2345,
    icon: Icons.email,
    popular: true,
  },
  {
    id: "10",
    name: "Support Request",
    description: "Customer support ticket submission form",
    category: "Support",
    fields: 6,
    uses: 876,
    icon: Icons.help,
    popular: false,
  },
  {
    id: "11",
    name: "Course Registration",
    description: "Educational course enrollment form",
    category: "Education",
    fields: 9,
    uses: 432,
    icon: Icons.graduation,
    popular: false,
  },
  {
    id: "12",
    name: "Product Order",
    description: "Simple product ordering with shipping details",
    category: "E-commerce",
    fields: 11,
    uses: 567,
    icon: Icons.fileCheck,
    popular: false,
  },
]

const categories = ["All", "Basic", "Marketing", "HR", "Feedback", "Events", "Research", "Business", "Support", "Education", "E-commerce"]

export default function TemplatesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || template.category === category
    return matchesSearch && matchesCategory
  })

  const popularTemplates = templates.filter(t => t.popular)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Start with a pre-built template and customize it</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/forms/new">
            <Icons.add className="mr-2 h-4 w-4" />
            Start from Scratch
          </Link>
        </Button>
      </div>

      {/* Popular Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Templates</CardTitle>
          <CardDescription>Most used templates by our community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {popularTemplates.slice(0, 5).map((template) => {
              const Icon = template.icon
              return (
                <Link
                  key={template.id}
                  href={`/dashboard/forms/new?template=${template.id}`}
                  className="group flex flex-col items-center gap-3 rounded-lg border p-4 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.uses.toLocaleString()} uses</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Templates */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="flex-wrap h-auto gap-1">
              {categories.slice(0, 6).map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative max-w-sm">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.id} className="group transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        {template.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icons.layers className="h-3 w-3" />
                          {template.fields} fields
                        </span>
                        <span className="flex items-center gap-1">
                          <Icons.user className="h-3 w-3" />
                          {template.uses.toLocaleString()} uses
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icons.view className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/dashboard/forms/new?template=${template.id}`}>
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Icons.templates className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
