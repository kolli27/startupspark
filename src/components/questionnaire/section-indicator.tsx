'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionIndicatorProps {
  currentSection: string
  totalSections: number
  currentSectionIndex: number
}

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  currentSection,
  totalSections,
  currentSectionIndex
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Section {currentSectionIndex + 1} of {totalSections}
        </span>
        <span className="text-sm font-medium text-gray-800">
          {currentSection}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentSectionIndex + 1) / totalSections) * 100}%`
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

export default SectionIndicator
