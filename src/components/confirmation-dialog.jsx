'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ConfirmationDialog({
    title,
    description,
    onConfirm,
    onCancel,
    isOpen,
    setIsOpen
}) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { setIsOpen(false); onCancel(); }}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => { setIsOpen(false); onConfirm(); }}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}