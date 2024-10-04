'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Pencil, Trash, Trash2 } from 'lucide-react'


const initialUsers = [
    {
        mobile: "01712345678",
        password: "$2a$10$somethinghashed",
        role: "consumer",
        name: "John Doe",
        age: 30,
        district: "Dhaka",
        avatar: "https://example.com/avatar1.jpg",
        nid: "1234567890123",
        designation: null,
        organization: null,
        experience: null,
        bio: "Animal enthusiast and farmer.",
        specialization: "Animal care",
        availableTime: "9:00 AM - 5:00 PM",
        cow: 5,
        hen: 20,
        fish: null,
        duck: 10,
        goat: 4,
        isOnline: true,
        fee: 500
    },
    {
        mobile: "01798765432",
        password: "$2a$10$somethinghashed",
        role: "provider",
        name: "Jane Smith",
        age: 45,
        district: "Chittagong",
        avatar: "https://example.com/avatar2.jpg",
        nid: "9876543210987",
        designation: "Veterinarian",
        organization: "FarmAid",
        experience: 15,
        bio: "Expert in livestock and veterinary services.",
        specialization: "Veterinary medicine",
        availableTime: "10:00 AM - 6:00 PM",
        cow: null,
        hen: null,
        fish: 300,
        duck: null,
        goat: null,
        isOnline: false,
        fee: 1000
    },
]

export default function Component() {
    const [users, setUsers] = useState(initialUsers)
    const [editingUser, setEditingUser] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm) ||
        user.district.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const handleEditUser = (user) => {
        setEditingUser({ ...user })
        setIsDialogOpen(true)
    }

    const handleUpdateUser = () => {
        if (editingUser) {
            setUsers(users.map(user => user.mobile === editingUser.mobile ? editingUser : user))
            setIsDialogOpen(false)
        }
    }

    const handleDeleteUser = (mobile) => {
        setUsers(users.filter(user => user.mobile !== mobile))
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
                <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>District</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Online Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentUsers.map((user) => (
                        <TableRow key={user.mobile}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.district}</TableCell>
                            <TableCell>{user.specialization}</TableCell>
                            <TableCell>{user.isOnline ? 'Online' : 'Offline'}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditUser(user)} className="mr-2"><Pencil height={24} width={24} /></Button>
                                <Button variant="destructive" onClick={() => handleDeleteUser(user.mobile)}><Trash2 height={24} width={24} />  </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    {editingUser && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Select
                                    value={editingUser.role}
                                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="consumer">Consumer</SelectItem>
                                        <SelectItem value="provider">Provider</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="district" className="text-right">
                                    District
                                </Label>
                                <Input
                                    id="district"
                                    value={editingUser.district}
                                    onChange={(e) => setEditingUser({ ...editingUser, district: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="specialization" className="text-right">
                                    Specialization
                                </Label>
                                <Input
                                    id="specialization"
                                    value={editingUser.specialization}
                                    onChange={(e) => setEditingUser({ ...editingUser, specialization: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="age" className="text-right">
                                    Age
                                </Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={editingUser.age}
                                    onChange={(e) => setEditingUser({ ...editingUser, age: parseInt(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fee" className="text-right">
                                    Fee
                                </Label>
                                <Input
                                    id="fee"
                                    type="number"
                                    value={editingUser.fee}
                                    onChange={(e) => setEditingUser({ ...editingUser, fee: parseInt(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="isOnline" className="text-right">
                                    Online Status
                                </Label>
                                <Checkbox
                                    id="isOnline"
                                    checked={editingUser.isOnline}
                                    onCheckedChange={(checked) => setEditingUser({ ...editingUser, isOnline: checked })}
                                />
                            </div>
                            <Button onClick={handleUpdateUser}>Update User</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}