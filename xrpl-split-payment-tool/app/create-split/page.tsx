"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

type Participant = {
  id: string
  address: string
  nickname: string
}

export default function CreateSplit() {
  const [step, setStep] = useState(1)
  const [totalAmount, setTotalAmount] = useState("")
  const [participantCount, setParticipantCount] = useState("")
  const [participants, setParticipants] = useState<Participant[]>([])

  const perPersonAmount =
    totalAmount && participantCount
      ? (Number.parseFloat(totalAmount) / Number.parseInt(participantCount)).toFixed(2)
      : "0.00"

  // Step 1: Initialize participants list
  const handleInitializeParticipants = () => {
    if (!totalAmount || !participantCount) return

    const newParticipants = Array.from({ length: Number.parseInt(participantCount) }, (_, i) => ({
      id: `participant-${i}`,
      address: "",
      nickname: `Participant ${i + 1}`,
    }))
    setParticipants(newParticipants)
    setStep(2)
  }

  // Step 2: Update participant
  const handleUpdateParticipant = (id: string, field: "address" | "nickname", value: string) => {
    setParticipants(participants.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  // Step 2: Add participant
  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: `participant-${Date.now()}`,
        address: "",
        nickname: `Participant ${participants.length + 1}`,
      },
    ])
  }

  // Step 2: Remove participant
  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id))
  }

  // Step 3: Review and proceed
  const handleProceedToReview = () => {
    if (participants.every((p) => p.address.trim())) {
      setStep(3)
    }
  }

  const handleSendPayments = () => {
    // Simulate navigation to processing screen
    window.location.href = "/processing"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">Create Split</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 mx-2 transition ${step > stepNum ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {step === 1 && "Enter Split Details"}
              {step === 2 && "Add Participants"}
              {step === 3 && "Review Split"}
            </h2>
            <p className="text-muted-foreground">
              {step === 1 && "Set the total amount and number of participants"}
              {step === 2 && "Add XRPL addresses for each participant"}
              {step === 3 && "Review your split and confirm"}
            </p>
          </div>
        </div>

        {/* Step 1: Enter Details */}
        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Total Amount (XRP)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 100"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="mt-2 text-lg px-4 py-3 border-border"
                  step="0.01"
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Number of Participants</Label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={participantCount}
                  onChange={(e) => setParticipantCount(e.target.value)}
                  className="mt-2 text-lg px-4 py-3 border-border"
                  min="2"
                />
              </div>
            </div>

            {/* Summary */}
            {totalAmount && participantCount && (
              <div className="bg-muted/30 rounded-lg p-6 space-y-2 border border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-semibold">{totalAmount} XRP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-semibold">{participantCount}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-semibold">Per Person</span>
                  <span className="text-lg font-bold text-primary">{perPersonAmount} XRP</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleInitializeParticipants}
              disabled={!totalAmount || !participantCount}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
            >
              Continue
            </Button>
          </Card>
        )}

        {/* Step 2: Add Participants */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              {participants.map((participant) => (
                <Card key={participant.id} className="p-4 border-border">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold">{participant.nickname}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveParticipant(participant.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">XRPL Address</Label>
                      <Input
                        placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        value={participant.address}
                        onChange={(e) => handleUpdateParticipant(participant.id, "address", e.target.value)}
                        className="font-mono text-sm border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Nickname (Optional)</Label>
                      <Input
                        placeholder="e.g., Alice"
                        value={participant.nickname}
                        onChange={(e) => handleUpdateParticipant(participant.id, "nickname", e.target.value)}
                        className="border-border"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleAddParticipant}
              variant="outline"
              className="w-full h-12 gap-2 border-border bg-transparent"
            >
              <Plus className="w-4 h-4" />
              Add Participant
            </Button>

            <div className="flex gap-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12 border-border">
                Back
              </Button>
              <Button
                onClick={handleProceedToReview}
                disabled={!participants.every((p) => p.address.trim())}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-primary">{totalAmount} XRP</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Participants</p>
                  <p className="text-3xl font-bold text-foreground">{participants.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Per Person</p>
                  <p className="text-3xl font-bold text-foreground">{perPersonAmount} XRP</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-3">
                  Transaction Fee (Estimated)
                </p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="font-semibold">0.00001 XRP</span>
                </div>
              </div>
            </Card>

            {/* Participants Summary */}
            <div>
              <h3 className="font-semibold mb-4">Recipients</h3>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{participant.nickname}</p>
                      <code className="text-xs text-muted-foreground break-all">{participant.address}</code>
                    </div>
                    <p className="font-semibold">{perPersonAmount} XRP</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-12 border-border">
                Back
              </Button>
              <Button
                onClick={handleSendPayments}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              >
                Send Payments
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
