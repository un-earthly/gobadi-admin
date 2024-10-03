'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#4CAF50',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#E57373',
                        secondary: '#fff',
                    },
                },
            }}
        />
    )
}