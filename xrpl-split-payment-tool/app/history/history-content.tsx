"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ChevronDown, ExternalLink, Search } from "lucide-react"
import Link from "next/link"

type SplitDetail = {
  recipient: string
  amount: string
  address: string
  txHash: string
}

type Split = {
  id: string
  date: string
  timestamp: number
  total: string
  status: "completed" | "partial" | "failed"
  participants: number
  details: SplitDetail[]
}

const mockHistory: Split[] = [
  {
    id: "1",
    date: "Jan 10, 2024",
    timestamp: 1704816000,
    total: "100 XRP",
    status: "completed",
    participants: 4,
    details: [
      {
        recipient: "Alice",
        amount: "25 XRP",
        address: "rABC123XYZ...",
        txHash: "E3FE6EA3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Bob",
        amount: "25 XRP",
        address: "rDEF456ABC...",
        txHash: "F4GFGFB3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Charlie",
        amount: "25 XRP",
        address: "rGHI789DEF...",
        txHash: "C5GHGHC3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Diana",
        amount: "25 XRP",
        address: "rJKL012GHI...",
        txHash: "B6CHCHI3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
    ],
  },
  {
    id: "2",
    date: "Jan 8, 2024",
    timestamp: 1704643200,
    total: "250 XRP",
    status: "completed",
    participants: 3,
    details: [
      {
        recipient: "Emma",
        amount: "83.33 XRP",
        address: "rMNO345JKL...",
        txHash: "A7DJDJI3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Frank",
        amount: "83.33 XRP",
        address: "rPQR678MNO...",
        txHash: "Z8EKEK3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Grace",
        amount: "83.34 XRP",
        address: "rSTU901PQR...",
        txHash: "Y9FLFL3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
    ],
  },
  {
    id: "3",
    date: "Jan 5, 2024",
    timestamp: 1704470400,
    total: "75 XRP",
    status: "completed",
    participants: 2,
    details: [
      {
        recipient: "Henry",
        amount: "37.5 XRP",
        address: "rVWX234STU...",
        txHash: "X0GMGM3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Iris",
        amount: "37.5 XRP",
        address: "rYZA567VWX...",
        txHash: "W1HNHN3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
    ],
  },
  {
    id: "4",
    date: "Jan 2, 2024",
    timestamp: 1704297600,
    total: "500 XRP",
    status: "completed",
    participants: 5,
    details: [
      {
        recipient: "Jack",
        amount: "100 XRP",
        address: "rBCD890YZA...",
        txHash: "V2IOIO3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Karen",
        amount: "100 XRP",
        address: "rEFG123BCD...",
        txHash: "U3JPJP3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Leo",
        amount: "100 XRP",
        address: "rHIJ456EFG...",
        txHash: "T4KQKQ3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Maria",
        amount: "100 XRP",
        address: "rKLM789HIJ...",
        txHash: "S5LRLR3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
      {
        recipient: "Nathan",
        amount: "100 XRP",
        address: "rNOP012KLM...",
        txHash: "R6MSMS3D48F0C2B5C8F1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1",
      },
    ],
  },
]

export default function HistoryContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = mockHistory.filter(
    (split) =>
      split.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      split.total.includes(searchQuery) ||
      split.details.some((detail) => detail.recipient.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "partial":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
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
            <span className="text-lg font-semibold">Split History</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by date, amount, or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border bg-muted/20"
            />
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground">No splits found matching your search</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((split) => (
              <Card key={split.id} className="overflow-hidden border-border">
                {/* Main Row */}
                <button
                  onClick={() => setExpandedId(expandedId === split.id ? null : split.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{split.total}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(split.status)}`}>
                        {split.status.charAt(0).toUpperCase() + split.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {split.date} • {split.participants} Participants
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedId === split.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Details */}
                {expandedId === split.id && (
                  <div className="border-t border-border bg-muted/10 p-6 space-y-4">
                    {split.details.map((detail, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{detail.recipient}</p>
                            <code className="text-xs text-muted-foreground break-all">{detail.address}</code>
                          </div>
                          <p className="font-semibold text-right">{detail.amount}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <code className="text-muted-foreground break-all flex-1">{detail.txHash}</code>
                          <a
                            href={`https://testnet.xrpl.org/transactions/${detail.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 ml-2 flex-shrink-0 flex items-center gap-1"
                          >
                            View
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
