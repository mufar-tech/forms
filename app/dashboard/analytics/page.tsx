"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const stats = [
  { title: "Total Views", value: "12,456", change: "+15.2%", changeType: "positive" as const, icon: Icons.view },
  { title: "Total Submissions", value: "1,847", change: "+8.7%", changeType: "positive" as const, icon: Icons.responses },
  { title: "Conversion Rate", value: "14.8%", change: "-2.1%", changeType: "negative" as const, icon: Icons.target },
  { title: "Avg. Completion Time", value: "2m 34s", change: "-12s", changeType: "positive" as const, icon: Icons.time },
]

const topForms = [
  { name: "Customer Feedback", views: 3456, submissions: 567, rate: 16.4 },
  { name: "Event Registration", views: 2890, submissions: 489, rate: 16.9 },
  { name: "Employee Survey", views: 2100, submissions: 312, rate: 14.9 },
  { name: "Lead Generation", views: 1876, submissions: 256, rate: 13.6 },
  { name: "Job Application", views: 1234, submissions: 178, rate: 14.4 },
]

const deviceData = [
  { device: "Desktop", percentage: 58, color: "bg-primary" },
  { device: "Mobile", percentage: 35, color: "bg-secondary" },
  { device: "Tablet", percentage: 7, color: "bg-muted-foreground" },
]

const trafficSources = [
  { source: "Direct", visits: 4521, percentage: 36 },
  { source: "Organic Search", visits: 3245, percentage: 26 },
  { source: "Social Media", visits: 2134, percentage: 17 },
  { source: "Email", visits: 1567, percentage: 13 },
  { source: "Referral", visits: 989, percentage: 8 },
]

const geoData = [
  { country: "United States", submissions: 623, percentage: 34 },
  { country: "United Kingdom", submissions: 312, percentage: 17 },
  { country: "Germany", submissions: 234, percentage: 13 },
  { country: "Canada", submissions: 189, percentage: 10 },
  { country: "Australia", submissions: 156, percentage: 8 },
  { country: "Other", submissions: 333, percentage: 18 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track performance across all your forms</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Icons.download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submission Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Trends</CardTitle>
            <CardDescription>Daily submissions over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end gap-2">
              {[40, 65, 45, 80, 55, 70, 90, 75, 85, 60, 95, 70, 50, 80].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
            <CardDescription>Breakdown by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative h-48 w-48">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  {deviceData.reduce(
                    (acc, device, i) => {
                      const circumference = 2 * Math.PI * 40
                      const strokeDasharray = (device.percentage / 100) * circumference
                      const strokeDashoffset = -acc.offset
                      acc.elements.push(
                        <circle
                          key={device.device}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          strokeWidth="12"
                          className={device.color.replace("bg-", "stroke-")}
                          strokeDasharray={`${strokeDasharray} ${circumference}`}
                          strokeDashoffset={strokeDashoffset}
                        />
                      )
                      acc.offset += strokeDasharray
                      return acc
                    },
                    { elements: [] as JSX.Element[], offset: 0 }
                  ).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">12.4K</span>
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              {deviceData.map((device) => (
                <div key={device.device} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${device.color}`} />
                  <span className="text-sm">
                    {device.device} ({device.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Forms */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Forms</CardTitle>
            <CardDescription>Forms with highest conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topForms.map((form, i) => (
                <div key={form.name} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{form.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{form.views.toLocaleString()} views</span>
                      <span>{form.submissions} submissions</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{form.rate}%</p>
                    <p className="text-xs text-muted-foreground">conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{source.source}</span>
                    <span className="text-muted-foreground">{source.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Submissions by country</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {geoData.map((geo) => (
              <div key={geo.country} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Icons.globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{geo.country}</p>
                    <p className="text-sm text-muted-foreground">{geo.submissions} submissions</p>
                  </div>
                </div>
                <span className="text-lg font-bold">{geo.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
