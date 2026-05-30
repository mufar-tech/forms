import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Forms",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Icons.forms,
  },
  {
    title: "Total Responses",
    value: "1,284",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Icons.responses,
  },
  {
    title: "Active Forms",
    value: "18",
    change: "+2",
    changeType: "positive" as const,
    icon: Icons.activity,
  },
  {
    title: "Conversion Rate",
    value: "24.8%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: Icons.target,
  },
]

const recentForms = [
  { id: 1, name: "Customer Feedback", responses: 156, status: "active", lastUpdated: "2 hours ago" },
  { id: 2, name: "Employee Survey", responses: 89, status: "active", lastUpdated: "5 hours ago" },
  { id: 3, name: "Event Registration", responses: 234, status: "active", lastUpdated: "1 day ago" },
  { id: 4, name: "Lead Generation", responses: 67, status: "draft", lastUpdated: "2 days ago" },
  { id: 5, name: "Job Application", responses: 45, status: "closed", lastUpdated: "3 days ago" },
]

const recentActivity = [
  { id: 1, action: "New response", form: "Customer Feedback", time: "2 minutes ago", icon: Icons.responses },
  { id: 2, action: "Form published", form: "Event Registration", time: "1 hour ago", icon: Icons.success },
  { id: 3, action: "New response", form: "Employee Survey", time: "3 hours ago", icon: Icons.responses },
  { id: 4, action: "Form edited", form: "Lead Generation", time: "5 hours ago", icon: Icons.edit },
  { id: 5, action: "Team member added", form: "All forms", time: "1 day ago", icon: Icons.userPlus },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your forms.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Icons.download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/forms/new">
              <Icons.add className="mr-2 h-4 w-4" />
              Create Form
            </Link>
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
                  from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Forms */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Forms</CardTitle>
              <CardDescription>Your recently updated forms</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/forms">
                View all
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentForms.map((form) => (
                <div
                  key={form.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icons.forms className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{form.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {form.responses} responses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
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
                    <span className="hidden text-sm text-muted-foreground md:block">
                      {form.lastUpdated}
                    </span>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/forms/${form.id}`}>
                        <Icons.arrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.form}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/dashboard/forms/new">
                <Icons.add className="h-6 w-6 text-primary" />
                <span>Create New Form</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/dashboard/templates">
                <Icons.templates className="h-6 w-6 text-primary" />
                <span>Browse Templates</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/dashboard/responses">
                <Icons.responses className="h-6 w-6 text-primary" />
                <span>View Responses</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4" asChild>
              <Link href="/dashboard/team">
                <Icons.team className="h-6 w-6 text-primary" />
                <span>Invite Team</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
