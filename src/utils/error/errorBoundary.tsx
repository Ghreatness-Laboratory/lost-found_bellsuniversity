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
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-4xl font-bold text-red-500">
            Something Went Wrong
          </h1>
          <p className="text-gray-600">
            We&apos;re sorry for the inconvenience. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
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
