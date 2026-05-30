"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample form data
const formData = {
  id: "1",
  name: "Customer Feedback Form",
  description: "Collect feedback from customers about our services",
  status: "active",
  responses: 156,
  views: 892,
  conversionRate: 17.5,
  fields: [
    { id: "1", type: "text", label: "Full Name", placeholder: "Enter your name", required: true },
    { id: "2", type: "email", label: "Email Address", placeholder: "name@example.com", required: true },
    { id: "3", type: "dropdown", label: "How did you hear about us?", placeholder: "Select an option", required: false },
    { id: "4", type: "rating", label: "Overall Satisfaction", required: true },
    { id: "5", type: "textarea", label: "Additional Comments", placeholder: "Share your thoughts...", required: false },
  ],
}

export default function FormDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("builder")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/forms">
              <Icons.arrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{formData.name}</h1>
              <Badge variant={formData.status === "active" ? "default" : "secondary"}>
                {formData.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{formData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Icons.view className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Icons.external className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Icons.more className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icons.copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Icons.delete className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <Icons.check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{formData.views}</p>
              </div>
              <Icons.view className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Responses</p>
                <p className="text-2xl font-bold">{formData.responses}</p>
              </div>
              <Icons.responses className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{formData.conversionRate}%</p>
              </div>
              <Icons.target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fields</p>
                <p className="text-2xl font-bold">{formData.fields.length}</p>
              </div>
              <Icons.layers className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
              <CardDescription>Edit your form fields and structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{field.label}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {field.type} {field.required && "• Required"}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icons.grip className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => router.push(`/dashboard/forms/${params.id}/edit`)}>
                  <Icons.add className="mr-2 h-4 w-4" />
                  Add Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Responses</CardTitle>
                <CardDescription>View and manage form submissions</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icons.download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/responses">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Icons.user className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">user{i}@example.com</p>
                        <p className="text-sm text-muted-foreground">Submitted {i} hour{i > 1 ? "s" : ""} ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                      <Icons.arrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Form Details</CardTitle>
                <CardDescription>Basic information about your form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Form Title</Label>
                  <Input defaultValue={formData.name} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea defaultValue={formData.description} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={formData.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Settings</CardTitle>
                <CardDescription>Configure how submissions are handled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Submission Limit</p>
                    <p className="text-sm text-muted-foreground">Limit the number of responses</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Close on Date</p>
                    <p className="text-sm text-muted-foreground">Auto-close form on specific date</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Protection</p>
                    <p className="text-sm text-muted-foreground">Require password to access</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Success Message</Label>
                  <Textarea placeholder="Thank you for your submission!" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Send form data to your favorite tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: "Google Sheets", connected: true },
                  { name: "Slack", connected: true },
                  { name: "Zapier", connected: false },
                  { name: "Webhook", connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Icons.zap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {integration.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={integration.connected} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
