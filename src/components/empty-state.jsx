import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({ title, description, actionLabel, onAction }) {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
            <FolderOpen className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    )
}