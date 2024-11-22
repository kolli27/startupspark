import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const MODELS = {
  GPT4: 'gpt-4-1106-preview',
  GPT4_VISION: 'gpt-4-vision-preview',
} as const

export type ModelType = typeof MODELS[keyof typeof MODELS]
