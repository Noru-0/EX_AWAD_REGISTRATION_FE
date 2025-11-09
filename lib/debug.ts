/**
 * Debug utility for controlled logging
 * Only logs when debug mode is enabled in environment
 */

const isDebugEnabled = process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true';
const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';

export const debugLog = {
  log: (...args: any[]) => {
    if (isDebugEnabled && isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDebugEnabled && isDevelopment) {
      console.warn('[DEBUG]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors, but with prefix in debug mode
    if (isDebugEnabled) {
      console.error('[DEBUG]', ...args);
    } else {
      console.error(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDebugEnabled && isDevelopment) {
      console.info('[DEBUG]', ...args);
    }
  }
};

// Suppress specific console warnings in development
if (typeof window !== 'undefined' && isDevelopment) {
  // Suppress Vercel Analytics debug logs
  const originalLog = console.log;
  console.log = (...args) => {
    const message = args.join(' ');
    if (
      message.includes('[Vercel Web Analytics]') ||
      message.includes('[Fast Refresh]') ||
      message.includes('HMR') ||
      message.includes('hydration')
    ) {
      return; // Suppress these logs
    }
    originalLog.apply(console, args);
  };
}