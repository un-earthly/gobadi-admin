"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2, TrendingUp, Users, DollarSign, BarChart } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from '@/layout/default'

export default function SalesMarketingManagement() {
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: "Summer Pet Care",
            type: "banner",
            content: "Keep your pets cool this summer! 20% off on all cooling products.",
            image: "/placeholder.svg?height=100&width=300",
            startDate: new Date(2023, 5, 1),
            endDate: new Date(2023, 7, 31),
            isActive: true,
        },
        {
            id: 2,
            name: "Vaccination Drive",
            type: "popup",
            content: "Ensure your pet's health! Get vaccinations at a discounted rate this month.",
            image: "/placeholder.svg?height=200&width=200",
            startDate: new Date(2023, 6, 1),
            endDate: new Date(2023, 6, 31),
            isActive: false,
        },
    ])

    const [newCampaign, setNewCampaign] = useState({
        name: "",
        type: "banner",
        content: "",
        image: "",
        startDate: new Date(),
        endDate: new Date(),
        isActive: false,
    })

    const [editingCampaign, setEditingCampaign] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddCampaign = () => {
        setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }])
        setNewCampaign({
            name: "",
            type: "banner",
            content: "",
            image: "",
            startDate: new Date(),
            endDate: new Date(),
            isActive: false,
        })
        setIsDialogOpen(false)
    }

    const handleUpdateCampaign = () => {
        if (editingCampaign) {
            setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? editingCampaign : c))
            setEditingCampaign(null)
            setIsDialogOpen(false)
        }
    }

    const handleDeleteCampaign = (id) => {
        setCampaigns(campaigns.filter(campaign => campaign.id !== id))
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (isEditing && editingCampaign) {
                    setEditingCampaign({ ...editingCampaign, image: reader.result })
                } else {
                    setNewCampaign({ ...newCampaign, image: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Sales and Marketing Management</h1>

                <Tabs defaultValue="campaigns">
                    <TabsList className="mb-4">
                        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="campaigns">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Campaigns</h2>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" /> Add Campaign
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Add New Campaign'}</DialogTitle>
                                        <DialogDescription>
                                            {editingCampaign ? 'Edit the details of your campaign here.' : 'Enter the details for the new campaign here.'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={editingCampaign ? editingCampaign.name : newCampaign.name}
                                                onChange={(e) => editingCampaign ? setEditingCampaign({ ...editingCampaign, name: e.target.value }) : setNewCampaign({ ...newCampaign, name: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="type" className="text-right">
                                                Type
                                            </Label>
                                            <Select
                                                value={editingCampaign ? editingCampaign.type : newCampaign.type}
                                                onValueChange={(value) => editingCampaign ? setEditingCampaign({ ...editingCampaign, type: value }) : setNewCampaign({ ...newCampaign, type: value })}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select campaign type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="banner">Banner</SelectItem>
                                                    <SelectItem value="popup">Popup</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="content" className="text-right">
                                                Content
                                            </Label>
                                            <Textarea
                                                id="content"
                                                value={editingCampaign ? editingCampaign.content : newCampaign.content}
                                                onChange={(e) => editingCampaign ? setEditingCampaign({ ...editingCampaign, content: e.target.value }) : setNewCampaign({ ...newCampaign, content: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="image" className="text-right">
                                                Image
                                            </Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, !!editingCampaign)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="startDate" className="text-right">
                                                Start Date
                                            </Label>
                                            <Input
                                                id="startDate"
                                                type="date"
                                                value={editingCampaign ? format(editingCampaign.startDate, 'yyyy-MM-dd') : format(newCampaign.startDate, 'yyyy-MM-dd')}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value)
                                                    editingCampaign ? setEditingCampaign({ ...editingCampaign, startDate: date }) : setNewCampaign({ ...newCampaign, startDate: date })
                                                }}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="endDate" className="text-right">
                                                End Date
                                            </Label>
                                            <Input
                                                id="endDate"
                                                type="date"
                                                value={editingCampaign ? format(editingCampaign.endDate, 'yyyy-MM-dd') : format(newCampaign.endDate, 'yyyy-MM-dd')}
                                                onChange={(e) => {
                                                    const date = new Date(e.target.value)
                                                    editingCampaign ? setEditingCampaign({ ...editingCampaign, endDate: date }) : setNewCampaign({ ...newCampaign, endDate: date })
                                                }}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="isActive" className="text-right">
                                                Active
                                            </Label>
                                            <Switch
                                                id="isActive"
                                                checked={editingCampaign ? editingCampaign.isActive : newCampaign.isActive}
                                                onCheckedChange={(checked) => editingCampaign ? setEditingCampaign({ ...editingCampaign, isActive: checked }) : setNewCampaign({ ...newCampaign, isActive: checked })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={editingCampaign ? handleUpdateCampaign : handleAddCampaign}>
                                            {editingCampaign ? 'Update Campaign' : 'Add Campaign'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {campaigns.map((campaign) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell>{campaign.name}</TableCell>
                                        <TableCell>{campaign.type}</TableCell>
                                        <TableCell>{campaign.content.substring(0, 50)}...</TableCell>
                                        <TableCell>
                                            <img src={campaign.image} alt={campaign.name} className="w-16 h-16 object-cover" />
                                        </TableCell>
                                        <TableCell>{format(campaign.startDate, 'PP')}</TableCell>
                                        <TableCell>{format(campaign.endDate, 'PP')}</TableCell>
                                        <TableCell>{campaign.isActive ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="icon" onClick={() => {
                                                    setEditingCampaign(campaign)
                                                    setIsDialogOpen(true)
                                                }}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="destructive" size="icon" onClick={() => handleDeleteCampaign(campaign.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Revenue
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Active Campaigns
                                        </CardTitle>
                                        <BarChart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12</div>
                                        <p className="text-xs text-muted-foreground">
                                            +3 since last week
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            New Clients
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+573</div>
                                        <p className="text-xs text-muted-foreground">
                                            +201 since last month
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Engagement Rate
                                        </CardTitle>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+18.39%</div>
                                        <p className="text-xs text-muted-foreground">
                                            +4.3% from last week
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Campaign Performance</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="space-y-8">
                                        {campaigns.map((campaign) => (
                                            <div className="flex items-center" key={campaign.id}>
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none">{campaign.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                                                    </p>
                                                </div>
                                                <div className="ml-auto font-medium">
                                                    {Math.floor(Math.random() * 100)}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}