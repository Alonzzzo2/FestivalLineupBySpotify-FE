import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col min-h-screen bg-gray-900">
          <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
            <div className="bg-red-900 p-8 rounded-lg text-center max-w-md">
              <h2 className="text-2xl font-bold text-white mb-4">Oops!</h2>
              <p className="text-red-200">
                Something went wrong. Please refresh the page and try again.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
