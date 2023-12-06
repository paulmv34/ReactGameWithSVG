import { Component } from 'react'
import { ErrorBoundaryProps, ErrorBoundaryState } from './types'
import FallbackUI from './components/FallbackUI/FallbackUI'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by ErrorBoundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />
    }

    return this.props.children
  }
}
