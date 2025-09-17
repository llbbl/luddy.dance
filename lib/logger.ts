// Import the browser-specific export to avoid Node.js dependencies like Winston
import { log as loganBaseLog } from 'logan-logger/browser';

/**
 * Environment-based logging configuration
 *
 * Logging is enabled in:
 * - Development mode (NODE_ENV=development)
 * - Preview environments (Vercel preview deployments, localhost)
 * - When explicitly enabled (NEXT_PUBLIC_ENABLE_LOGGING=true)
 *
 * In production (NODE_ENV=production), logging is disabled by default
 * unless NEXT_PUBLIC_ENABLE_LOGGING=true is set.
 */

// Environment-based logging configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Enable logging in development, preview environments, or when explicitly enabled
const shouldEnableLogging =
  isDevelopment ||
  (typeof window !== 'undefined' && (
    window.location.hostname.includes('vercel.app') ||
    window.location.hostname.includes('localhost')
  )) ||
  process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';

// Force console fallback in preview/development environments
const isPreview = shouldEnableLogging && !isProduction;

// Safe wrapper to handle cases where log methods might be undefined
// In production, disable logging unless explicitly enabled
const safeLog = (shouldEnableLogging && loganBaseLog) || {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {}
};

// Type for metadata objects
type LogMetadata = Record<string, unknown>;

// Fallback to console logging in preview environments if logan-logger is silent
const fallbackLog = {
  debug: (message: string, meta?: LogMetadata) => {
    if (!shouldEnableLogging) return;
    if (isPreview) {
      console.debug('[DEBUG]', message, meta);
    } else {
      safeLog.debug(message, meta);
    }
  },
  info: (message: string, meta?: LogMetadata) => {
    if (!shouldEnableLogging) return;
    if (isPreview) {
      console.info('[INFO]', message, meta);
    } else {
      safeLog.info(message, meta);
    }
  },
  warn: (message: string, meta?: LogMetadata) => {
    if (!shouldEnableLogging) return;
    if (isPreview) {
      console.warn('[WARN]', message, meta);
    } else {
      safeLog.warn(message, meta);
    }
  },
  error: (message: string, meta?: LogMetadata) => {
    if (!shouldEnableLogging) return;
    if (isPreview) {
      console.error('[ERROR]', message, meta);
    } else {
      safeLog.error(message, meta);
    }
  }
};

// LoganLogger class for structured logging with context
export class LoganLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(message: string): string {
    return `[${this.context}] ${message}`;
  }

  debug(message: string, meta?: LogMetadata) {
    fallbackLog.debug(this.formatMessage(message), meta);
  }

  info(message: string, meta?: LogMetadata) {
    fallbackLog.info(this.formatMessage(message), meta);
  }

  warn(message: string, meta?: LogMetadata) {
    fallbackLog.warn(this.formatMessage(message), meta);
  }

  error(message: string, meta?: LogMetadata) {
    fallbackLog.error(this.formatMessage(message), meta);
  }
}

// Enhanced logging methods with context that extend Logan Logger
export const log = {
  // Basic logging methods from Logan Logger (with fallback for preview environments)
  debug: fallbackLog.debug,
  info: fallbackLog.info,
  warn: fallbackLog.warn,
  error: fallbackLog.error,
  // App lifecycle events
  appStart: (meta?: LogMetadata) => {
    fallbackLog.info('Application starting', { event: 'app_start', ...meta });
  },

  appReady: (meta?: LogMetadata) => {
    fallbackLog.info('Application ready', { event: 'app_ready', ...meta });
  },

  appError: (error: Error, meta?: LogMetadata) => {
    fallbackLog.error('Application error', { event: 'app_error', error: error.message, stack: error.stack, ...meta });
  },

  // Page navigation events
  pageLoad: (page: string, meta?: LogMetadata) => {
    fallbackLog.info('Page loaded', { event: 'page_load', page, ...meta });
  },

  // Component lifecycle events
  componentMount: (component: string, meta?: LogMetadata) => {
    fallbackLog.debug('Component mounted', { event: 'component_mount', component, ...meta });
  },

  componentUnmount: (component: string, meta?: LogMetadata) => {
    fallbackLog.debug('Component unmounted', { event: 'component_unmount', component, ...meta });
  },

  // Performance metrics
  performance: (metric: string, value: number, meta?: LogMetadata) => {
    fallbackLog.info('Performance metric', { event: 'performance', metric, value, ...meta });
  },

  // Web Vitals
  webVital: (name: string, value: number, rating: string, meta?: LogMetadata) => {
    fallbackLog.info('Web Vital metric', { event: 'web_vital', name, value, rating, ...meta });
  },
};

// Legacy exports for backward compatibility
export const logger = new LoganLogger('luddy-dance');
export const errorLogger = new LoganLogger('luddy-dance:error');
export const performanceLogger = new LoganLogger('luddy-dance:performance');

// Error reporting utility using logan-logger's appError method
export const reportError = (error: Error, context?: LogMetadata) => {
  const errorMeta = {
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location?.href : 'server',
  };

  log.appError(error, errorMeta);
};

// Performance tracking utility using logan-logger's performance method
export const trackPerformance = (metric: string, value: number, context?: LogMetadata) => {
  const perfMeta = {
    context,
    timestamp: new Date().toISOString(),
  };

  log.performance(metric, value, perfMeta);
};

// User context tracking using logan-logger's pageLoad method
export const setUserContext = (userId?: string, sessionId?: string, additionalContext?: LogMetadata) => {
  const contextMeta = {
    userId,
    sessionId,
    ...additionalContext,
    timestamp: new Date().toISOString(),
  };

  log.pageLoad('home', contextMeta);
};