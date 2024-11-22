import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionCard, { QuestionCardProps } from '@/components/questionnaire/QuestionCard'

// Mock form validation
jest.mock('@/lib/utils/form-validation', () => ({
  validateFormData: jest.fn((_, { answer }) => ({
    success: Boolean(answer && answer.length > 0),
    data: { answer },
    errors: !answer || answer.length === 0 ? { answer: ['Answer is required'] } : {}
  }))
}))

describe('QuestionCard', () => {
  const mockOnSubmit = jest.fn()
  const mockOnNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Text Question Type', () => {
    const textQuestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text',
      aiSuggestion: 'Think about activities that make you lose track of time.',
      followUpQuestion: 'What specifically excites you about these activities?'
    }

    it('renders text input with correct question', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByText(textQuestion.text)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Share your thoughts...')).toBeInTheDocument()
    })

    it('shows validation error for empty submission', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      const submitButton = screen.getByRole('button', { name: /next question/i })
      await userEvent.click(submitButton)

      expect(await screen.findByText('Answer is required')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('submits valid text answer', async () => {
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      const input = screen.getByPlaceholderText('Share your thoughts...')
      await userEvent.type(input, 'I love coding and building things')
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith('I love coding and building things')
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Yes/No Question Type', () => {
    const yesNoQuestion: QuestionCardProps['question'] = {
      id: '2',
      text: 'Would you prefer your business to align with your personal passions?',
      type: 'yes-no',
      aiSuggestion: 'Consider how combining passion with business could affect your motivation.'
    }

    it('renders yes/no options', async () => {
      render(
        <QuestionCard
          question={yesNoQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument()
    })

    it('submits selected yes/no answer', async () => {
      render(
        <QuestionCard
          question={yesNoQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: /yes/i }))
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith(true)
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Scale Question Type', () => {
    const scaleQuestion: QuestionCardProps['question'] = {
      id: '3',
      text: 'How would you rate your comfort level with technology?',
      type: 'scale',
      aiSuggestion: '1 = Beginner, 5 = Expert'
    }

    it('renders scale options 1-5', async () => {
      render(
        <QuestionCard
          question={scaleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      ;[1, 2, 3, 4, 5].forEach(value => {
        expect(screen.getByRole('button', { name: value.toString() })).toBeInTheDocument()
      })
    })

    it('submits selected scale value', async () => {
      render(
        <QuestionCard
          question={scaleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: '4' }))
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(mockOnSubmit).toHaveBeenCalledWith(4)
      expect(mockOnNext).toHaveBeenCalled()
    })
  })

  describe('Multiple Choice Question Type', () => {
    const multipleQuestion: QuestionCardProps['question'] = {
      id: '4',
      text: 'Which skills would you like to leverage?',
      type: 'multiple',
      options: ['Technical', 'Design', 'Marketing', 'Writing']
    }

    it('renders all options with checkboxes', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      // Ensure options exist before testing
      if (multipleQuestion.options) {
        multipleQuestion.options.forEach(option => {
          expect(screen.getByLabelText(option)).toBeInTheDocument()
        })
      }
    })

    it('submits multiple selected options', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      // Ensure options exist before testing
      if (multipleQuestion.options) {
        await userEvent.click(screen.getByLabelText('Technical'))
        await userEvent.click(screen.getByLabelText('Marketing'))
        await userEvent.click(screen.getByRole('button', { name: /next question/i }))

        expect(mockOnSubmit).toHaveBeenCalledWith(['Technical', 'Marketing'])
        expect(mockOnNext).toHaveBeenCalled()
      }
    })

    it('shows validation error for no selection', async () => {
      render(
        <QuestionCard
          question={multipleQuestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(await screen.findByText('At least one option must be selected')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('AI Suggestions', () => {
    const questionWithSuggestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text',
      aiSuggestion: 'Think about activities that make you lose track of time.'
    }

    it('displays AI suggestion when provided', async () => {
      render(
        <QuestionCard
          question={questionWithSuggestion}
          onSubmit={mockOnSubmit}
          onNext={mockOnNext}
        />
      )

      expect(screen.getByText(/AI Suggestion:/)).toBeInTheDocument()
      // Ensure aiSuggestion exists before testing
      if (questionWithSuggestion.aiSuggestion) {
        expect(screen.getByText(questionWithSuggestion.aiSuggestion)).toBeInTheDocument()
      }
    })
  })

  describe('Error Handling', () => {
    const textQuestion: QuestionCardProps['question'] = {
      id: '1',
      text: 'What activities are you passionate about?',
      type: 'text'
    }

    it('handles submission errors gracefully', async () => {
      const mockErrorSubmit = jest.fn().mockRejectedValue(new Error('Submission failed'))
      
      render(
        <QuestionCard
          question={textQuestion}
          onSubmit={mockErrorSubmit}
          onNext={mockOnNext}
        />
      )

      const input = screen.getByPlaceholderText('Share your thoughts...')
      await userEvent.type(input, 'Test answer')
      await userEvent.click(screen.getByRole('button', { name: /next question/i }))

      expect(await screen.findByText('Failed to submit answer. Please try again.')).toBeInTheDocument()
    })
  })
})
