'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TypingIndicatorProps {
  isVisible: boolean
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="flex items-center space-x-2 p-2">
      <motion.div
        className="h-2 w-2 rounded-full bg-gray-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-gray-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2
        }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-gray-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4
        }}
      />
      <span className="ml-2 text-sm text-gray-500">AI is thinking...</span>
    </div>
  )
}

export default TypingIndicator
