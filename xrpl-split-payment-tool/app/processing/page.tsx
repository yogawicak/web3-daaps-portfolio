"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

type TransactionStatus = "pending" | "success" | "failed"

type Transaction = {
  id: string
  recipient: string
  amount: string
  status: TransactionStatus
  hash: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    recipient: "Alice (rABCDEF...)",
    amount: "25 XRP",
    status: "pending",
    hash: "E3FE6EA3D48F0C2B5C8F1A2B3C4D5E6F",
  },
  {
    id: "2",
    recipient: "Bob (rGHIJKL...)",
    amount: "25 XRP",
    status: "pending",
    hash: "D4AFECA3D48F0C2B5C8F1A2B3C4D5E6F",
  },
  {
    id: "3",
    recipient: "Charlie (rMNOPQR...)",
    amount: "25 XRP",
    status: "pending",
    hash: "C5BGFCB3D48F0C2B5C8F1A2B3C4D5E6F",
  },
  {
    id: "4",
    recipient: "Diana (rSTUVWX...)",
    amount: "25 XRP",
    status: "pending",
    hash: "B6CGHDC3D48F0C2B5C8F1A2B3C4D5E6F",
  },
]

export default function Processing() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [allComplete, setAllComplete] = useState(false)

  useEffect(() => {
    // Simulate transaction processing
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const updated = prev.map((tx) => {
          if (tx.status === "pending") {
            // 70% success, 30% could fail (but we'll do all success for MVP)
            return { ...tx, status: "success" }
          }
          return tx
        })

        // Check if all are complete
        if (updated.every((tx) => tx.status !== "pending")) {
          setAllComplete(true)
          clearInterval(interval)
        }

        return updated
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-primary animate-spin" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-destructive" />
    }
  }

  const completedCount = transactions.filter((tx) => tx.status !== "pending").length

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {allComplete ? "Payments Sent Successfully!" : "Processing Payments"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {allComplete
              ? "All payments have been processed"
              : `Processing ${completedCount} of ${transactions.length} transactions`}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {completedCount} / {transactions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(completedCount / transactions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Transactions List */}
        <Card className="p-8 mb-8 space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">{getStatusIcon(tx.status)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{tx.recipient}</p>
                  <code className="text-xs text-muted-foreground">{tx.hash}</code>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{tx.amount}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {tx.status === "pending" && "Pending"}
                  {tx.status === "success" && "Completed"}
                  {tx.status === "failed" && "Failed"}
                </p>
              </div>
            </div>
          ))}
        </Card>

        {/* Action Buttons */}
        {allComplete && (
          <div className="flex flex-col gap-3">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/create-split" className="w-full">
              <Button variant="outline" className="w-full h-12 border-border bg-transparent">
                Create Another Split
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
