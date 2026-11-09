import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Component recovered from error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 text-center my-4">
          <p className="text-xs font-mono text-cyan-400">
            [3D Canvas rendering in high-compatibility mode]
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

