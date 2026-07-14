import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State {
  error: Error | null
}

/**
 * Catches render-time errors so a crash surfaces as a themed message instead of
 * a blank page.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Portfolio crashed:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="font-display text-4xl text-lumiere-rose">Something broke</p>
          <p className="max-w-lg font-mono text-xs text-lumiere-ash/80">
            {this.state.error.message}
          </p>
          <a
            href="/"
            className="focus-gilt mt-2 rounded-full border border-gilt/30 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-gilt transition hover:bg-gilt/10"
          >
            Return to menu
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
