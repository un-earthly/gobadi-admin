import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DashboardLayout from '@/layout/default'

export default function BugReporting() {
    const [bugs, setBugs] = useState([])
    const [newBug, setNewBug] = useState({
        title: '',
        status: 'Open',
        priority: 'Medium',
        reporter: ''
    })
    const [editingBug, setEditingBug] = useState(null)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    useEffect(() => {
        const storedBugs = localStorage.getItem('bugs')
        if (storedBugs) {
            setBugs(JSON.parse(storedBugs))
        }
    }, [])

    useEffect(() => {
        // Get previous bugs from localStorage
        const storedBugs = JSON.parse(localStorage.getItem('bugs')) || [];

        // Combine previous bugs with new bugs
        const updatedBugs = [...storedBugs, ...bugs];

        // Remove duplicates (optional, if bug entries might repeat)
        const uniqueBugs = Array.from(new Set(updatedBugs.map(bug => JSON.stringify(bug))))
            .map(bug => JSON.parse(bug));

        // Store the updated bugs list in localStorage
        localStorage.setItem('bugs', JSON.stringify(uniqueBugs));
    }, [bugs]);
    const addBug = () => {
        const id = bugs.length > 0 ? Math.max(...bugs.map(bug => bug.id)) + 1 : 1
        setBugs([...bugs, { id, ...newBug }])
        setNewBug({ title: '', status: 'Open', priority: 'Medium', reporter: '' })
        setIsAddDialogOpen(false)
    }

    const updateBug = () => {
        if (editingBug) {
            setBugs(bugs.map(bug => bug.id === editingBug.id ? editingBug : bug))
            setEditingBug(null)
            setIsEditDialogOpen(false)
        }
    }

    const deleteBug = (id) => {
        setBugs(bugs.filter(bug => bug.id !== id))
    }

    return (
        <DashboardLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Bug Reporting</h1>
                <Button onClick={() => setIsAddDialogOpen(true)} className="mb-4">Add New Bug</Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Reporter</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bugs.map((bug) => (
                            <TableRow key={bug.id}>
                                <TableCell>{bug.title}</TableCell>
                                <TableCell>
                                    <Badge variant={bug.status === "Open" ? "destructive" : bug.status === "In Progress" ? "default" : "secondary"}>{bug.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={bug.priority === "High" ? "destructive" : bug.priority === "Medium" ? "default" : "secondary"}>{bug.priority}</Badge>
                                </TableCell>
                                <TableCell>{bug.reporter}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => {
                                        setEditingBug(bug)
                                        setIsEditDialogOpen(true)
                                    }}>Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => deleteBug(bug.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Bug</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Bug Title"
                                value={newBug.title}
                                onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                            />
                            <Select
                                value={newBug.status}
                                onValueChange={(value) => setNewBug({ ...newBug, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={newBug.priority}
                                onValueChange={(value) => setNewBug({ ...newBug, priority: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Reporter"
                                value={newBug.reporter}
                                onChange={(e) => setNewBug({ ...newBug, reporter: e.target.value })}
                            />
                        </div>
                        <Button onClick={addBug}>Add Bug</Button>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Bug</DialogTitle>
                        </DialogHeader>
                        {editingBug && (
                            <div className="grid gap-4 py-4">
                                <Input
                                    placeholder="Bug Title"
                                    value={editingBug.title}
                                    onChange={(e) => setEditingBug({ ...editingBug, title: e.target.value })}
                                />
                                <Select
                                    value={editingBug.status}
                                    onValueChange={(value) => setEditingBug({ ...editingBug, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Open">Open</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={editingBug.priority}
                                    onValueChange={(value) => setEditingBug({ ...editingBug, priority: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Reporter"
                                    value={editingBug.reporter}
                                    onChange={(e) => setEditingBug({ ...editingBug, reporter: e.target.value })}
                                />
                            </div>
                        )}
                        <Button onClick={updateBug}>Update Bug</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}