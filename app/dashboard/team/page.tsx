"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    joinedAt: "Jan 15, 2024",
    avatar: null,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "active",
    joinedAt: "Jan 18, 2024",
    avatar: null,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Viewer",
    status: "active",
    joinedAt: "Jan 20, 2024",
    avatar: null,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Editor",
    status: "pending",
    joinedAt: "Pending",
    avatar: null,
  },
]

const activityLogs = [
  { id: "1", user: "John Doe", action: "Created form", target: "Customer Feedback", time: "2 hours ago" },
  { id: "2", user: "Jane Smith", action: "Edited form", target: "Event Registration", time: "3 hours ago" },
  { id: "3", user: "Mike Johnson", action: "Viewed responses", target: "Employee Survey", time: "5 hours ago" },
  { id: "4", user: "John Doe", action: "Invited member", target: "sarah.wilson@example.com", time: "1 day ago" },
  { id: "5", user: "Jane Smith", action: "Exported data", target: "Lead Generation", time: "2 days ago" },
]

const roles = [
  { value: "admin", label: "Admin", description: "Full access to all features" },
  { value: "editor", label: "Editor", description: "Can create and edit forms" },
  { value: "viewer", label: "Viewer", description: "Can only view forms and responses" },
]

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("editor")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your team members and permissions</p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.userPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setInviteOpen(false)}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Invites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {teamMembers.filter((m) => m.role === "Admin").length}
            </div>
            <p className="text-sm text-muted-foreground">Admins</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>People who have access to your workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.role === "Admin" ? "default" : "secondary"}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={member.status === "active" ? "outline" : "secondary"}
                          className={member.status === "active" ? "text-green-600 border-green-600/30" : ""}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{member.joinedAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icons.more className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Icons.edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Icons.send className="mr-2 h-4 w-4" />
                              Resend Invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Icons.delete className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.value}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icons.shield className="h-5 w-5 text-primary" />
                    {role.label}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.check className={`h-4 w-4 ${role.value !== "viewer" ? "text-green-500" : "text-muted-foreground"}`} />
                      <span className={role.value === "viewer" ? "text-muted-foreground line-through" : ""}>
                        Create & edit forms
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.check className="h-4 w-4 text-green-500" />
                      View forms & responses
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.check className={`h-4 w-4 ${role.value !== "viewer" ? "text-green-500" : "text-muted-foreground"}`} />
                      <span className={role.value === "viewer" ? "text-muted-foreground line-through" : ""}>
                        Export data
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.check className={`h-4 w-4 ${role.value === "admin" ? "text-green-500" : "text-muted-foreground"}`} />
                      <span className={role.value !== "admin" ? "text-muted-foreground line-through" : ""}>
                        Manage team members
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.check className={`h-4 w-4 ${role.value === "admin" ? "text-green-500" : "text-muted-foreground"}`} />
                      <span className={role.value !== "admin" ? "text-muted-foreground line-through" : ""}>
                        Billing & settings
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions by team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {log.user.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{log.user}</span>{" "}
                        <span className="text-muted-foreground">{log.action}</span>{" "}
                        <span className="font-medium">{log.target}</span>
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
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
