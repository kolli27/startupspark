import { useState } from 'react';
import { BusinessIdea } from '@/lib/ai/types';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

interface UseIdeaSharingReturn {
  isSharing: boolean;
  shareIdea: (idea: BusinessIdea) => Promise<void>;
  generateShareableLink: (idea: BusinessIdea) => Promise<string>;
  exportToPDF: (idea: BusinessIdea) => Promise<Blob>;
  error: Error | null;
}

export function useIdeaSharing(userId: string): UseIdeaSharingReturn {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const formatIdeaForSharing = (idea: BusinessIdea): string => {
    return `
Business Idea: ${idea.name}

Description:
${idea.description}

Target Market:
${idea.targetMarket}

Required Skills:
${idea.skills}

Initial Investment:
${idea.investment}

First Steps:
${idea.steps}

Success Metrics:
${idea.metrics}

Market Validation:
${idea.validation}
    `.trim();
  };

  const shareViaNavigator = async (options: ShareOptions) => {
    if (typeof navigator.share !== 'function') {
      throw new Error('Web Share API not supported');
    }
    await navigator.share(options);
  };

  const generateShareableLink = async (idea: BusinessIdea): Promise<string> => {
    // This would typically involve creating a shareable link through your backend
    const baseUrl = window.location.origin;
    const shareableId = btoa(JSON.stringify({ ideaId: idea.name, userId }));
    return `${baseUrl}/shared-ideas/${shareableId}`;
  };

  const exportToPDF = async (idea: BusinessIdea): Promise<Blob> => {
    try {
      // This is a placeholder for PDF generation
      // In a real implementation, you'd use a library like pdfmake or jsPDF
      const content = formatIdeaForSharing(idea);
      return new Blob([content], { type: 'application/pdf' });
    } catch (err) {
      throw new Error('Failed to generate PDF');
    }
  };

  const shareIdea = async (idea: BusinessIdea) => {
    setIsSharing(true);
    setError(null);

    try {
      // Try native sharing first
      if (typeof navigator.share === 'function') {
        const shareableLink = await generateShareableLink(idea);
        await shareViaNavigator({
          title: idea.name,
          text: idea.description,
          url: shareableLink
        });
        return;
      }

      // Fallback to clipboard
      const shareableLink = await generateShareableLink(idea);
      await navigator.clipboard.writeText(shareableLink);
      
      // You might want to show a toast notification here
      console.log('Link copied to clipboard');

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to share idea'));
      console.error('Error sharing idea:', err);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isSharing,
    shareIdea,
    generateShareableLink,
    exportToPDF,
    error
  };
}

// Helper function to check if sharing is supported
export function isSharingSupported(): boolean {
  return typeof navigator.share === 'function';
}

// Helper function to check if the Web Share API supports files
export function isFilesSharingSupported(): boolean {
  return typeof navigator.canShare === 'function' && navigator.canShare({ files: [] });
}
