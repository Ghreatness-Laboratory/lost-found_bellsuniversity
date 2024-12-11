import React, { Component, ReactNode } from "react";

// Define types for props and state
interface ErrorBoundaryProps {
  children: ReactNode; // ReactNode covers any valid JSX or child component
}

interface ErrorBoundaryState {
  hasError: boolean; // Tracks whether an error has occurred
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging or error reporting services
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] my-10 max-w-[1280px] mx-4 sm:mx-8 xl:mx-auto px-4 sm:px-8 lg:px-10 bg-red-50 text-red-500 rounded-lg shadow-sm text-center">
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="text-lg mt-2">
            Something went wrong
          </p>
          <p className="text-base mt-1">Please try again later</p>
          <button
            className="mt-4 py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    // Render child components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
