"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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

const integrations = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Automatically sync form responses to Google Sheets",
    icon: "📊",
    connected: true,
    category: "Productivity",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notified in Slack when you receive new responses",
    icon: "💬",
    connected: true,
    category: "Communication",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps through Zapier automation",
    icon: "⚡",
    connected: false,
    category: "Automation",
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    description: "Export responses directly to Excel spreadsheets",
    icon: "📗",
    connected: false,
    category: "Productivity",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send email confirmations through Gmail",
    icon: "📧",
    connected: false,
    category: "Communication",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Send data to custom URLs when forms are submitted",
    icon: "🔗",
    connected: true,
    category: "Developer",
  },
  {
    id: "api",
    name: "API Access",
    description: "Full API access to forms, responses, and analytics",
    icon: "🔧",
    connected: true,
    category: "Developer",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync form submissions with HubSpot CRM",
    icon: "🧡",
    connected: false,
    category: "CRM",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Create leads in Salesforce from form responses",
    icon: "☁️",
    connected: false,
    category: "CRM",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Add subscribers to Mailchimp lists automatically",
    icon: "🐵",
    connected: false,
    category: "Marketing",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Create database entries in Notion from responses",
    icon: "📝",
    connected: false,
    category: "Productivity",
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Sync form data with Airtable bases",
    icon: "📋",
    connected: false,
    category: "Productivity",
  },
]

const categories = ["All", "Productivity", "Communication", "Automation", "Developer", "CRM", "Marketing"]

export default function IntegrationsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrations[0] | null>(null)

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(search.toLowerCase()) ||
      integration.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || integration.category === category
    return matchesSearch && matchesCategory
  })

  const connectedCount = integrations.filter((i) => i.connected).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and automate workflows</p>
        </div>
        <Badge variant="outline" className="w-fit">
          {connectedCount} of {integrations.length} connected
        </Badge>
      </div>

      {/* Connected Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Connected</CardTitle>
          <CardDescription>Active integrations in your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {integrations.filter((i) => i.connected).map((integration) => (
              <div
                key={integration.id}
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xl">
                  {integration.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{integration.name}</p>
                  <p className="text-xs text-green-600">Connected</p>
                </div>
                <Switch checked={true} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Integrations */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="flex-wrap h-auto gap-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative max-w-sm">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="group transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
                    {integration.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{integration.name}</h3>
                      {integration.connected && (
                        <Badge variant="secondary" className="text-xs text-green-600">
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {integration.description}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={integration.connected ? "outline" : "default"}
                        className="w-full"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        {integration.connected ? "Configure" : "Connect"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                            {integration.icon}
                          </div>
                          <div>
                            <DialogTitle>{integration.name}</DialogTitle>
                            <DialogDescription>{integration.description}</DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {integration.connected ? (
                          <>
                            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
                              <div className="flex items-center gap-2">
                                <Icons.success className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-600">Connected</span>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                This integration is active and working
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label>Connected Account</Label>
                              <Input value="user@example.com" disabled />
                            </div>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Connect your {integration.name} account to enable this integration.
                            </p>
                            <div className="space-y-2">
                              <Label>API Key (optional)</Label>
                              <Input placeholder="Enter API key..." />
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        {integration.connected ? (
                          <>
                            <Button variant="outline" className="text-destructive">
                              Disconnect
                            </Button>
                            <Button>Save Changes</Button>
                          </>
                        ) : (
                          <Button className="w-full">
                            Connect {integration.name}
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Icons.integrations className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No integrations found</h3>
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
