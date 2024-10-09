"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LandingPageSettings() {
    const [headerImage, setHeaderImage] = useState(null)

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setHeaderImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Landing Page Settings</h1>
            <Tabs defaultValue="general">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="header">Header</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="cta">Call to Action</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Configure general landing page settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="page-title">Page Title</Label>
                                <Input id="page-title" placeholder="Enter page title" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="meta-description">Meta Description</Label>
                                <Textarea id="meta-description" placeholder="Enter meta description" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="indexing" />
                                <Label htmlFor="indexing">Allow search engine indexing</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="header">
                    <Card>
                        <CardHeader>
                            <CardTitle>Header Settings</CardTitle>
                            <CardDescription>Customize the header of your landing page</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="header-title">Header Title</Label>
                                <Input id="header-title" placeholder="Enter header title" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="header-subtitle">Header Subtitle</Label>
                                <Input id="header-subtitle" placeholder="Enter header subtitle" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="header-image">Header Background Image</Label>
                                <Input id="header-image" type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                            {headerImage && (
                                <div className="mt-4">
                                    <img src={headerImage} alt="Header Background Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="content">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Settings</CardTitle>
                            <CardDescription>Manage the main content of your landing page</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="main-heading">Main Heading</Label>
                                <Input id="main-heading" placeholder="Enter main heading" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="main-content">Main Content</Label>
                                <Textarea id="main-content" placeholder="Enter main content" rows={5} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="feature-list">Feature List</Label>
                                <Textarea id="feature-list" placeholder="Enter features (one per line)" rows={5} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="cta">
                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action Settings</CardTitle>
                            <CardDescription>Configure the call to action section</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cta-text">CTA Button Text</Label>
                                <Input id="cta-text" placeholder="Enter CTA button text" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta-url">CTA Button URL</Label>
                                <Input id="cta-url" placeholder="Enter CTA button URL" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cta-style">CTA Button Style</Label>
                                <Select>
                                    <SelectTrigger id="cta-style">
                                        <SelectValue placeholder="Select button style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="primary">Primary</SelectItem>
                                        <SelectItem value="secondary">Secondary</SelectItem>
                                        <SelectItem value="outline">Outline</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <div className="mt-6">
                <Button>Save Settings</Button>
            </div>
        </div>
    )
}