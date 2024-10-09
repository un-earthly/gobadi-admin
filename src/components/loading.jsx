'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const loadingMessages = [
    "Initializing admin panel...",
    "Loading user data...",
    "Fetching recent activities...",
    "Preparing dashboard...",
    "Syncing notifications...",
    "Almost there..."
]

export default function LoadingMessages() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
                prevIndex < loadingMessages.length - 1 ? prevIndex + 1 : prevIndex
            )
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
                <div className="flex items-center justify-center mb-4">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                </div>
                <div className="h-8">
                    {loadingMessages.map((message, index) => (
                        <p
                            key={index}
                            className={`transition-opacity duration-500 ${index === currentMessageIndex ? 'opacity-100' : 'opacity-0 absolute'
                                }`}
                        >
                            {message}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}