import React from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    ErrorBoundaryState
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error Boundary Caught:", error, errorInfo);
        this.setState({ error, errorInfo });

    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-screen flex flex-col items-center justify-center text-center p-6">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">
                        Something went wrong.
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Please try refreshing or return to the dashboard.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
