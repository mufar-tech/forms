"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  async function resendCode() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="mb-8">
        <Logo />
      </div>

      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icons.send className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            {"We've sent a 6-digit code to your email. Enter it below to verify your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
              Verify email
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {"Didn't receive the code?"}
            </p>
            <Button
              variant="link"
              className="h-auto p-0 text-primary"
              onClick={resendCode}
              disabled={isLoading}
            >
              Resend code
            </Button>
          </div>

          <Button asChild variant="ghost" className="w-full">
            <Link href="/auth/login">
              <Icons.arrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
