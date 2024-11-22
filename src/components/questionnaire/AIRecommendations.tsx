"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { SaveRecommendationButton } from "./SaveRecommendationButton"
import { useIdeaGeneration, useSubscription } from "@/lib/hooks/useSubscription"
import { SubscriptionManager } from "@/components/payment/SubscriptionManager"
import type { Database } from "@/types/database"
import type { RecommendationType } from "@/lib/recommendations/service"

type QuestionnaireResponse = Database["public"]["Tables"]["questionnaire_responses"]["Row"]

interface AIRecommendationsProps {
  response: QuestionnaireResponse
  userId: string
}

interface ContentSection {
  title: string
  content: string
}

function parseContent(content: string | null): ContentSection[] {
  if (!content) return []
  
  const sections: ContentSection[] = []
  let currentTitle = ""
  let currentContent: string[] = []

  content.split('\n').forEach(line => {
    if (line.match(/^\d\./)) {
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join('\n')
        })
      }
      currentTitle = line.replace(/^\d\.\s*/, '')
      currentContent = []
    } else if (line.trim()) {
      currentContent.push(line)
    }
  })

  if (currentTitle && currentContent.length > 0) {
    sections.push({
      title: currentTitle,
      content: currentContent.join('\n')
    })
  }

  return sections
}

export function AIRecommendations({ response, userId }: AIRecommendationsProps) {
  const [businessIdeas, setBusinessIdeas] = useState<string | null>(null)
  const [followUpQuestions, setFollowUpQuestions] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string | null>(null)
  const [marketInsights, setMarketInsights] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<RecommendationType>('business_idea')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{
    message: string;
    code?: string;
    retryAfter?: number;
  } | null>(null)
  const [streamingContent, setStreamingContent] = useState<string>('')

  const { generateIdea, canGenerateIdea, ideasRemaining } = useIdeaGeneration()
  const { isFeatureEnabled, subscription } = useSubscription()

  const generateContent = async (type: RecommendationType, useStreaming: boolean = false) => {
    setLoading(true)
    setError(null)
    setStreamingContent('')

    try {
      if (useStreaming) {
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stream: true }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to generate content')
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error('Failed to initialize stream')

        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          setStreamingContent(prev => prev + chunk)
        }

        // Update the appropriate state based on type
        switch (type) {
          case 'business_idea':
            setBusinessIdeas(streamingContent)
            break
          case 'follow_up':
            setFollowUpQuestions(streamingContent)
            break
          case 'suggestion':
            setSuggestions(streamingContent)
            break
          case 'insight':
            setMarketInsights(streamingContent)
            break
        }
      } else {
        const response = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stream: false }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw {
            message: error.message || 'Failed to generate content',
            code: error.code,
            retryAfter: error.retryAfter
          }
        }

        const data = await response.json()
        
        switch (type) {
          case 'business_idea':
            setBusinessIdeas(data.data.businessIdeas)
            break
          case 'follow_up':
            setFollowUpQuestions(data.data.followUpQuestions)
            break
          case 'suggestion':
            setSuggestions(data.data.actionableSuggestions)
            break
          case 'insight':
            setMarketInsights(data.data.marketInsights)
            break
        }
      }
    } catch (err: any) {
      setError({
        message: err.message || "Failed to generate recommendations",
        code: err.code,
        retryAfter: err.retryAfter
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateContent(activeTab)
  }, [activeTab])

  const getActiveContent = () => {
    if (streamingContent) return streamingContent
    
    switch (activeTab) {
      case 'business_idea':
        return businessIdeas
      case 'follow_up':
        return followUpQuestions
      case 'suggestion':
        return suggestions
      case 'insight':
        return marketInsights
      default:
        return null
    }
  }

  const isPremiumFeature = (tab: RecommendationType): boolean => {
    switch (tab) {
      case 'business_idea':
        return false
      case 'follow_up':
        return !isFeatureEnabled('followUpQuestions')
      case 'suggestion':
        return !isFeatureEnabled('actionableSuggestions')
      case 'insight':
        return !isFeatureEnabled('marketInsights')
    }
  }

  const sections = parseContent(getActiveContent())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'business_idea' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('business_idea')}
          >
            Business Ideas {!canGenerateIdea && `(${ideasRemaining} left)`}
          </Button>
          <Button
            variant={activeTab === 'follow_up' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('follow_up')}
          >
            Follow-up Questions {isPremiumFeature('follow_up') && '⭐'}
          </Button>
          <Button
            variant={activeTab === 'suggestion' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('suggestion')}
          >
            Action Steps {isPremiumFeature('suggestion') && '⭐'}
          </Button>
          <Button
            variant={activeTab === 'insight' ? 'gradient' : 'outline'}
            onClick={() => setActiveTab('insight')}
          >
            Market Insights {isPremiumFeature('insight') && '⭐'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{error.message}</p>
              {error.code === 'RATE_LIMIT' && error.retryAfter && (
                <p className="text-sm">Please try again in {error.retryAfter} seconds</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateContent(activeTab)}
              className="ml-4"
            >
              Retry
            </Button>
          </div>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {streamingContent ? 'Generating...' : 'Analyzing your profile...'}
              </p>
            </div>
          </div>
        ) : isPremiumFeature(activeTab) ? (
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <h3 className="text-xl font-semibold">Premium Feature</h3>
            <p className="text-gray-600 text-center max-w-md">
              Upgrade to premium to access {activeTab.replace('_', ' ')} recommendations
              and unlock all premium features.
            </p>
            <SubscriptionManager userId={userId} />
          </div>
        ) : !canGenerateIdea && activeTab === 'business_idea' ? (
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <h3 className="text-xl font-semibold">Generation Limit Reached</h3>
            <p className="text-gray-600 text-center max-w-md">
              You've reached your idea generation limit for this month.
              Upgrade to premium to generate more ideas.
            </p>
            <SubscriptionManager userId={userId} />
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <SaveRecommendationButton
                    userId={userId}
                    type={activeTab}
                    content={section.content}
                  />
                </div>
                <div className="prose max-w-none">
                  {section.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
