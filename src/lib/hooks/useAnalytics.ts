import { useCallback } from 'react';
import { trackEvent } from '@/lib/monitoring';

export const useAnalytics = () => {
  const track = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    trackEvent(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  }, []);

  // Predefined common events
  const trackPageView = useCallback((pageName: string, additionalProps = {}) => {
    track('page_view', { pageName, ...additionalProps });
  }, [track]);

  const trackButtonClick = useCallback((buttonName: string, additionalProps = {}) => {
    track('button_click', { buttonName, ...additionalProps });
  }, [track]);

  const trackFormSubmit = useCallback((formName: string, additionalProps = {}) => {
    track('form_submit', { formName, ...additionalProps });
  }, [track]);

  const trackError = useCallback((errorType: string, errorDetails: any) => {
    track('error_occurred', { errorType, errorDetails });
  }, [track]);

  const trackFeatureUsage = useCallback((featureName: string, additionalProps = {}) => {
    track('feature_used', { featureName, ...additionalProps });
  }, [track]);

  return {
    track,
    trackPageView,
    trackButtonClick,
    trackFormSubmit,
    trackError,
    trackFeatureUsage,
  };
};
