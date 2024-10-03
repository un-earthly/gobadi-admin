"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LandingPageManagement() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Landing Page Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Landing Page</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Page Title</label>
                            <Input type="text" id="title" name="title" className="mt-1" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <Textarea id="description" name="description" rows={3} className="mt-1" />
                        </div>
                        <div>
                            <label htmlFor="cta" className="block text-sm font-medium text-gray-700">Call to Action</label>
                            <Input type="text" id="cta" name="cta" className="mt-1" />
                        </div>
                        <Button type="submit">Update Landing Page</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}