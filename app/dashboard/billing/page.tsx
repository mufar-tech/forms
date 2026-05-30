"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals just getting started",
    features: [
      "3 forms",
      "100 responses/month",
      "Basic analytics",
      "Email support",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For professionals and small teams",
    features: [
      "Unlimited forms",
      "10,000 responses/month",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
      "API access",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "per month",
    description: "For growing businesses",
    features: [
      "Everything in Pro",
      "50,000 responses/month",
      "Team collaboration",
      "Advanced integrations",
      "Custom workflows",
      "Dedicated support",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large organizations",
    features: [
      "Everything in Business",
      "Unlimited responses",
      "SSO & SAML",
      "SLA guarantee",
      "Custom development",
      "Dedicated account manager",
    ],
    current: false,
  },
]

const invoices = [
  { id: "INV-001", date: "Jan 1, 2024", amount: "$29.00", status: "paid" },
  { id: "INV-002", date: "Dec 1, 2023", amount: "$29.00", status: "paid" },
  { id: "INV-003", date: "Nov 1, 2023", amount: "$29.00", status: "paid" },
  { id: "INV-004", date: "Oct 1, 2023", amount: "$29.00", status: "paid" },
  { id: "INV-005", date: "Sep 1, 2023", amount: "$29.00", status: "paid" },
]

const usage = {
  forms: { used: 18, limit: "Unlimited" },
  responses: { used: 4521, limit: 10000 },
  storage: { used: 2.4, limit: 10 },
  teamMembers: { used: 4, limit: 10 },
}

export default function BillingPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <Badge>Pro Plan</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Responses used</span>
                <span>{usage.responses.used.toLocaleString()} / {usage.responses.limit.toLocaleString()}</span>
              </div>
              <Progress value={(usage.responses.used / usage.responses.limit) * 100} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Storage used</span>
                <span>{usage.storage.used} GB / {usage.storage.limit} GB</span>
              </div>
              <Progress value={(usage.storage.used / usage.storage.limit) * 100} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Team members</span>
                <span>{usage.teamMembers.used} / {usage.teamMembers.limit}</span>
              </div>
              <Progress value={(usage.teamMembers.used / usage.teamMembers.limit) * 100} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icons.arrowUpRight className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Choose a Plan</DialogTitle>
                <DialogDescription>
                  Select the plan that best fits your needs
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 md:grid-cols-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative ${plan.current ? "border-primary" : ""} ${plan.popular ? "ring-2 ring-primary" : ""}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                        Popular
                      </Badge>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-xs text-muted-foreground">/{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs">
                            <Icons.check className="h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={plan.current ? "outline" : "default"}
                        size="sm"
                        className="w-full"
                        disabled={plan.current}
                      >
                        {plan.current ? "Current Plan" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">Cancel Subscription</Button>
        </CardFooter>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-14 items-center justify-center rounded bg-muted">
                <span className="text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-green-600">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icons.download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Icons.shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                All payments are processed securely through Stripe. Your payment information is encrypted and never stored on our servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
