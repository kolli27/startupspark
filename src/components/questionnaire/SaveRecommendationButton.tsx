"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { recommendationsService, RecommendationType } from "@/lib/recommendations/service"

interface SaveRecommendationButtonProps {
  userId: string
  type: RecommendationType
  content: string
  onSave?: () => void
}

export function SaveRecommendationButton({ 
  userId, 
  type, 
  content,
  onSave 
}: SaveRecommendationButtonProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await recommendationsService.saveRecommendation(userId, type, content)
      setSaved(true)
      onSave?.()
    } catch (error) {
      console.error('Failed to save recommendation:', error)
    } finally {
      setSaving(false)
    }
  }

  if (saved) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="text-green-600 border-green-600"
        disabled
      >
        Saved ✓
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={saving}
    >
      {saving ? "Saving..." : "Save for Later"}
    </Button>
  )
}
