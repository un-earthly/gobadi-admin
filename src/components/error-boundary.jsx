'use client'

import { Component, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'



class ErrorBoundary extends Component{
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
                        <p className="mb-4">We're sorry for the inconvenience. Please try again later.</p>
                        <Button onClick={() => this.setState({ hasError: false })}>
                            Try Again
                        </Button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export function ErrorBoundaryWrapper({ children }) {
    useEffect(() => {
        window.onerror = (message, source, lineno, colno, error) => {
            console.error('Global error:', { message, source, lineno, colno, error })
        }

        return () => {
            window.onerror = null
        }
    }, [])

    return <ErrorBoundary>{children}</ErrorBoundary>
}