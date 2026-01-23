"use client"

import { Suspense } from "react"
import HistoryContent from "./history-content"

export default function History() {
  return (
    <Suspense fallback={null}>
      <HistoryContent />
    </Suspense>
  )
}
