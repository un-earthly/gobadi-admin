import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import DashboardLayout from "@/layout/default"

export default function AppSettings() {
    const [splashImage, setSplashImage] = useState<any>(null)

    const handleImageUpload = (event:any) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSplashImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">App Settings</h1>
                <Tabs defaultValue="general">
                    <TabsList className="mb-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="splash">Splash Screen</TabsTrigger>
                        <TabsTrigger value="theme">Theme</TabsTrigger>
                        <TabsTrigger value="version">Version</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>Configure general app settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="app-name">App Name</Label>
                                    <Input id="app-name" placeholder="Enter app name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="app-description">App Description</Label>
                                    <Input id="app-description" placeholder="Enter app description" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="splash">
                        <Card>
                            <CardHeader>
                                <CardTitle>Splash Screen Settings</CardTitle>
                                <CardDescription>Configure the app splash screen</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="splash-image">Splash Screen Image</Label>
                                    <Input id="splash-image" type="file" accept="image/*" onChange={handleImageUpload} />
                                </div>
                                {splashImage && (
                                    <div className="mt-4">
                                        <img src={splashImage} alt="Splash Screen Preview" className="max-w-xs rounded-lg shadow-md" />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="splash-duration">Splash Screen Duration (ms)</Label>
                                    <Input id="splash-duration" type="number" placeholder="Enter duration in milliseconds" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="theme">
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme Settings</CardTitle>
                                <CardDescription>Configure the app theme</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary-color">Primary Color</Label>
                                    <Input id="primary-color" type="color" className="h-10 w-20" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="theme-mode">Theme Mode</Label>
                                    <Select>
                                        <SelectTrigger id="theme-mode">
                                            <SelectValue placeholder="Select theme mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="dark-mode" />
                                    <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="version">
                        <Card>
                            <CardHeader>
                                <CardTitle>Version Settings</CardTitle>
                                <CardDescription>Configure app version information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="app-version">App Version</Label>
                                    <Input id="app-version" placeholder="Enter app version (e.g., 1.0.0)" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="build-number">Build Number</Label>
                                    <Input id="build-number" placeholder="Enter build number" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="mt-6">
                    <Button>Save Settings</Button>
                </div>
            </div>
       </DashboardLayout>
    )
}