import { Component, type ReactNode, type ErrorInfo } from 'react';
import { reportError } from '@/lib/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Report error with context
    reportError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: 'ErrorBoundary',
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F59E0B] to-[#F472B6]">
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Oops! Something went wrong</h2>
              <p className="text-white/80 mb-6">
                The Luddy dance encountered an unexpected error. Please refresh the page to try again.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors border border-white/30"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}