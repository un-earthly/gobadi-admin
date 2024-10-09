import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Ban, CheckCircle, Trash2 } from 'lucide-react'
import api from '@/lib/api'
import DashboardLayout from '@/layout/default'
interface User {
    _id: string
    name: string
    role: string
    district: string
    designation: string
    isOnline: boolean
    isBlocked: boolean
}
export default function AdminUserManagement() {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)
    const [totalUsers, setTotalUsers] = useState(0)

    useEffect(() => {
        fetchUsers()
    }, [currentPage, searchTerm])

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/user?page=${currentPage}&limit=${usersPerPage}&search=${searchTerm}`)
            setUsers(response.data)
            setTotalUsers(response.data.length)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const handleToggleBlock = async (userId: any, currentBlockStatus: any) => {
        try {
            await api.patch(`/user/${userId}/toggle-block`, { isBlocked: !currentBlockStatus })
            fetchUsers() // Refresh the user list
        } catch (error) {
            console.error('Error toggling user block status:', error)
        }
    }
    const handleDeleteUser = async (id: string) => {
        try {
            await api.delete(`/user/${id}`)
            fetchUsers()
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const totalPages = Math.ceil(totalUsers / usersPerPage)

    return (
        <DashboardLayout>
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
                            <TableHead>Designation</TableHead>
                            <TableHead>Online Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.district}</TableCell>
                                <TableCell>{user.designation}</TableCell>
                                <TableCell>{user.isOnline ? 'Online' : 'Offline'}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                                        size="icon"
                                        variant={user.isBlocked ? "outline" : "destructive"}
                                    >
                                        {user.isBlocked ?
                                            <CheckCircle size={18} /> :
                                            <Ban size={18} />
                                        }
                                    </Button>
                                    <Button size="icon" variant="destructive" onClick={() => handleDeleteUser(user._id)}><Trash2 height={24} width={24} /></Button>
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
            </div>
        </DashboardLayout>
    )
}