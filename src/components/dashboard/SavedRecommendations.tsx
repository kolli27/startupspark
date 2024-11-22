"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { recommendationsService, RecommendationType } from "@/lib/recommendations/service"

interface SavedRecommendation {
  id: string
  recommendation_type: string
  content: string
  notes: string | null
  is_favorite: boolean
  created_at: string
}

interface SavedRecommendationsProps {
  userId: string
}

export function SavedRecommendations({ userId }: SavedRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SavedRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<RecommendationType | 'all'>('all')

  useEffect(() => {
    loadRecommendations()
  }, [userId])

  const loadRecommendations = async () => {
    try {
      const data = await recommendationsService.getUserRecommendations(userId)
      setRecommendations(data)
    } catch (err) {
      setError("Failed to load recommendations")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      await recommendationsService.toggleFavorite(id, !isFavorite)
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === id ? { ...rec, is_favorite: !isFavorite } : rec
        )
      )
    } catch (err) {
      console.error("Failed to update favorite status:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await recommendationsService.deleteRecommendation(id)
      setRecommendations(prev => prev.filter(rec => rec.id !== id))
    } catch (err) {
      console.error("Failed to delete recommendation:", err)
    }
  }

  const filteredRecommendations = recommendations.filter(rec => 
    activeType === 'all' || rec.recommendation_type === activeType
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant={activeType === 'all' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('all')}
        >
          All
        </Button>
        <Button
          variant={activeType === 'business_idea' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('business_idea')}
        >
          Business Ideas
        </Button>
        <Button
          variant={activeType === 'follow_up' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('follow_up')}
        >
          Follow-up Questions
        </Button>
        <Button
          variant={activeType === 'suggestion' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('suggestion')}
        >
          Action Steps
        </Button>
        <Button
          variant={activeType === 'insight' ? 'gradient' : 'outline'}
          onClick={() => setActiveType('insight')}
        >
          Market Insights
        </Button>
      </div>

      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No saved recommendations yet.</p>
          <Button
            variant="gradient"
            onClick={() => window.location.href = '/questionnaire'}
            className="mt-4"
          >
            Take Questionnaire
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <div key={rec.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    {rec.recommendation_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    Saved on {formatDate(rec.created_at)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFavorite(rec.id, rec.is_favorite)}
                  >
                    {rec.is_favorite ? '★' : '☆'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(rec.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="prose max-w-none">
                {rec.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              {rec.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{rec.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
