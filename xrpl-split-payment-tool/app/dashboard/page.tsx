"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Plus, History, Copy, LogOut } from "lucide-react"
import Link from "next/link"

// Mock data
const mockWallet = {
  address: "rEXAMPLE123XYZaBcDeFgHiJkLmNoPqRs",
  balance: "322.21 XRP",
  usdValue: "$125.43",
}

const mockRecentSplits = [
  {
    id: 1,
    date: "Jan 10, 2024",
    total: "100 XRP",
    participants: 4,
    status: "completed",
    statusLabel: "Completed",
  },
  {
    id: 2,
    date: "Jan 8, 2024",
    total: "250 XRP",
    participants: 3,
    status: "completed",
    statusLabel: "Completed",
  },
  {
    id: 3,
    date: "Jan 5, 2024",
    total: "75 XRP",
    participants: 2,
    status: "completed",
    statusLabel: "Completed",
  },
  {
    id: 4,
    date: "Jan 2, 2024",
    total: "500 XRP",
    participants: 5,
    status: "completed",
    statusLabel: "Completed",
  },
]

export default function Dashboard() {
  const [copiedAddress, setCopiedAddress] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(mockWallet.address)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const handleDisconnect = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            <span className="text-xl font-semibold">SplitPay</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDisconnect}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Wallet Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 mb-12">
          <div className="p-8 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
              <div className="flex items-center gap-3">
                <code className="text-sm bg-muted/50 px-3 py-2 rounded font-mono text-foreground flex-1 truncate">
                  {mockWallet.address}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="gap-2 text-xs bg-transparent"
                >
                  <Copy className="w-3 h-3" />
                  {copiedAddress ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">XRP Balance</p>
                <p className="text-3xl font-bold text-primary">{mockWallet.balance}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">USD Value</p>
                <p className="text-3xl font-bold text-foreground">{mockWallet.usdValue}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Link href="/create-split">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 gap-2">
              <Plus className="w-5 h-5" />
              New Split
            </Button>
          </Link>
          <Link href="/history">
            <Button variant="outline" className="w-full h-12 gap-2 border-border hover:bg-muted bg-transparent">
              <History className="w-5 h-5" />
              View History
            </Button>
          </Link>
        </div>

        {/* Recent Splits Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Recent Splits</h2>
            <p className="text-muted-foreground">Your last payment splits</p>
          </div>

          <div className="space-y-3">
            {mockRecentSplits.map((split) => (
              <Link key={split.id} href={`/history`}>
                <div className="border border-border rounded-lg p-6 hover:border-primary/30 hover:bg-muted/20 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">{split.total}</p>
                      <p className="text-sm text-muted-foreground">
                        {split.date} • {split.participants} Participants
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400">
                        {split.statusLabel}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
