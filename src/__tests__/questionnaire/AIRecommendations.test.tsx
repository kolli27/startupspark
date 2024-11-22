import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AIRecommendations } from '@/components/questionnaire/AIRecommendations'

// Mock hooks
jest.mock('@/lib/hooks/useSubscription', () => ({
  useIdeaGeneration: () => ({
    generateIdea: jest.fn(async (fn) => fn()),
    canGenerateIdea: true,
    ideasRemaining: 5
  }),
  useSubscription: () => ({
    isFeatureEnabled: (feature: string) => feature === 'business_idea',
    subscription: null
  })
}))

// Mock AI service
jest.mock('@/lib/ai/service', () => ({
  aiService: {
    generateBusinessIdeas: jest.fn().mockResolvedValue(`
      1. Tech Education Platform
      Create an online platform that teaches programming through interactive projects.
      The growing demand for tech education makes this a promising venture.
      
      2. Sustainability Consulting
      Help businesses reduce their environmental impact and implement green practices.
      Growing awareness of climate change drives demand for sustainability experts.
      
      3. Digital Wellness App
      Develop an app that helps remote workers maintain work-life balance.
      The rise of remote work creates opportunities in digital wellness.
    `),
    generateFollowUpQuestions: jest.fn().mockResolvedValue(`
      1. Market Research Questions
      What specific age group would be your target audience?
      Have you researched your main competitors?
      
      2. Implementation Questions
      What initial resources would you need?
      How would you validate your business idea?
    `),
    generateActionableSuggestions: jest.fn().mockResolvedValue(`
      1. Initial Steps
      Create a basic business plan
      Research potential competitors
      Identify target market demographics
      
      2. Validation Steps
      Build a minimum viable product
      Gather feedback from potential customers
      Test pricing models
    `),
    generateMarketInsights: jest.fn().mockResolvedValue(`
      1. Market Size
      The global edtech market is expected to reach $342.9B by 2025
      Remote work solutions market growing at 17% CAGR
      
      2. Key Trends
      Increasing demand for microlearning
      Rise of subscription-based learning platforms
      Growing focus on mobile-first education
    `)
  }
}))

describe('AIRecommendations', () => {
  const mockResponse = {
    id: '123',
    user_id: 'user123',
    experience: 'Intermediate',
    interests: 'Technology, Education',
    commitment: 'Full-time',
    resources: 'Limited initial investment',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('generates and displays business ideas', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Initial state should show loading
    expect(screen.getByText(/generating personalized recommendations/i)).toBeInTheDocument()

    // Wait for ideas to be generated
    expect(await screen.findByText('Tech Education Platform')).toBeInTheDocument()
    expect(screen.getByText('Sustainability Consulting')).toBeInTheDocument()
    expect(screen.getByText('Digital Wellness App')).toBeInTheDocument()
  })

  it('handles premium features correctly', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Click on Market Insights tab (premium feature)
    await userEvent.click(screen.getByRole('button', { name: /market insights/i }))

    // Should show premium upgrade message
    expect(screen.getByText(/upgrade to premium/i)).toBeInTheDocument()
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()
  })

  it('shows remaining idea generations for free users', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    expect(screen.getByText(/5 left/)).toBeInTheDocument()
  })

  it('allows saving recommendations', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Wait for ideas to be generated
    await screen.findByText('Tech Education Platform')

    // Each recommendation should have a save button
    const saveButtons = screen.getAllByRole('button', { name: /save/i })
    expect(saveButtons.length).toBeGreaterThan(0)
  })

  it('handles error states gracefully', async () => {
    // Mock AI service to throw an error
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockAiService = require('@/lib/ai/service').aiService
    mockAiService.generateBusinessIdeas.mockRejectedValueOnce(new Error('Generation failed'))

    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Should show error message
    expect(await screen.findByText(/failed to generate recommendations/i)).toBeInTheDocument()

    // Should show retry button
    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()

    // Clicking retry should attempt generation again
    await userEvent.click(retryButton)
    expect(mockAiService.generateBusinessIdeas).toHaveBeenCalledTimes(2)
  })

  it('switches between recommendation types', async () => {
    render(<AIRecommendations response={mockResponse} userId="user123" />)

    // Wait for initial load
    await screen.findByText('Tech Education Platform')

    // Switch to Follow-up Questions tab
    await userEvent.click(screen.getByRole('button', { name: /follow-up questions/i }))
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()

    // Switch to Action Steps tab
    await userEvent.click(screen.getByRole('button', { name: /action steps/i }))
    expect(screen.getByText(/premium feature/i)).toBeInTheDocument()

    // Switch back to Business Ideas tab
    await userEvent.click(screen.getByRole('button', { name: /business ideas/i }))
    expect(screen.getByText('Tech Education Platform')).toBeInTheDocument()
  })
})
