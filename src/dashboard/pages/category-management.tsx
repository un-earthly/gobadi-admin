import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import DashboardLayout from '@/layout/default'
import api from '@/lib/api'

export default function CategoryManagement() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [isEditingCategory, setIsEditingCategory] = useState(false)
    const [isManagingSubCategories, setIsManagingSubCategories] = useState(false)
    const [newCategoryTitle, setNewCategoryTitle] = useState('')
    const [newCategoryImage, setNewCategoryImage] = useState(null)
    const [newSubCategoryTitle, setNewSubCategoryTitle] = useState('')
    const [editingSubCategory, setEditingSubCategory] = useState(null)
    const [editSubCategoryTitle, setEditSubCategoryTitle] = useState('')
    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories')
            setCategories(response.data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                params: {
                    key: '8df99c2ddfe4a2510f423bacf6e99ac2'
                }
            })
            console.log('Image uploaded successfully:', response.data.data.display_url)
            return response.data.data.display_url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const handleAddCategory = async () => {
        try {
            let imageUrl = ''
            if (newCategoryImage) {
                imageUrl = await uploadImage(newCategoryImage)
            }
            await api.post('/categories', { title: newCategoryTitle, icon: imageUrl })
            fetchCategories()
            setIsAddingCategory(false)
            setNewCategoryTitle('')
            setNewCategoryImage(null)
        } catch (error) {
            console.error('Error adding category:', error)
        }
    }

    const handleEditCategory = async () => {
        if (!selectedCategory) return
        try {
            let imageUrl = selectedCategory.image
            if (newCategoryImage) {
                imageUrl = await uploadImage(newCategoryImage)
            }
            await api.put(`/categories/${selectedCategory._id}`, {
                title: newCategoryTitle,
                image: imageUrl,
            })
            fetchCategories()
            setIsEditingCategory(false)
            setNewCategoryTitle('')
            setNewCategoryImage(null)
        } catch (error) {
            console.error('Error editing category:', error)
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            await api.delete(`/categories/${id}`)
            fetchCategories()
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    const handleAddSubCategory = async () => {
        if (!selectedCategory) return
        try {
            await api.post(`/categories/${selectedCategory._id}/subcategories`, { title: newSubCategoryTitle })
            fetchCategories()
            setNewSubCategoryTitle('')
        } catch (error) {
            console.error('Error adding subcategory:', error)
        }
    }

    const handleDeleteSubCategory = async (subCategoryId) => {
        if (!selectedCategory) return
        try {
            await api.delete(`/categories/${selectedCategory._id}/subcategories/${subCategoryId}`)
            fetchCategories()
        } catch (error) {
            console.error('Error deleting subcategory:', error)
        }
    }
    const handleEditSubCategory = async () => {
        if (!selectedCategory || !editingSubCategory) return
        try {
            await api.put(`/categories/${selectedCategory._id}/subcategories/${editingSubCategory._id}`, {
                title: editSubCategoryTitle
            })
            fetchCategories()
            setEditingSubCategory(null)
            setEditSubCategoryTitle('')
        } catch (error) {
            console.error('Error editing subcategory:', error)
        }
    }
    return (
        <DashboardLayout>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Category Management</h1>
                    <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                        <DialogTrigger asChild>
                            <Button>Add New Category</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Category</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setNewCategoryImage(e.target.files?.[0] || null)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={newCategoryTitle}
                                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <Button onClick={handleAddCategory}>Add Category</Button>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Subcategories</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>
                                    <img src={category.icon} alt={category.title} className="w-8 h-8" />
                                </TableCell>
                                <TableCell>{category.title}</TableCell>
                                <TableCell>{category.subCategories.length}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Dialog open={isEditingCategory && selectedCategory?._id === category._id} onOpenChange={(open) => {
                                            setIsEditingCategory(open)
                                            if (open) {
                                                setSelectedCategory(category)
                                                setNewCategoryTitle(category.title)
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="edit-image" className="text-right">
                                                            Image
                                                        </Label>
                                                        <Input
                                                            id="edit-image"
                                                            type="file"
                                                            onChange={(e) => setNewCategoryImage(e.target.files?.[0] || null)}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="edit-title" className="text-right">
                                                            Title
                                                        </Label>
                                                        <Input
                                                            id="edit-title"
                                                            value={newCategoryTitle}
                                                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <Button onClick={handleEditCategory}>Update Category</Button>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category._id)}>
                                            Delete
                                        </Button>
                                        <Dialog open={isManagingSubCategories && selectedCategory?._id === category._id} onOpenChange={(open) => {
                                            setIsManagingSubCategories(open)
                                            if (open) {
                                                setSelectedCategory(category)
                                            }
                                        }}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">Manage Subcategories</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-lg">
                                                <DialogHeader>
                                                    <DialogTitle>Manage Subcategories for {category.title}</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold mb-2">Existing Subcategories</h3>
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Title</TableHead>
                                                                    <TableHead>Actions</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {category.subCategories.map((subCategory) => (
                                                                    <TableRow key={subCategory._id}>
                                                                        <TableCell>{subCategory.title}</TableCell>
                                                                        <TableCell>
                                                                            <div className="flex space-x-2">
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    onClick={() => {
                                                                                        setEditingSubCategory(subCategory)
                                                                                        setEditSubCategoryTitle(subCategory.title)
                                                                                    }}
                                                                                >
                                                                                    Edit
                                                                                </Button>
                                                                                <Button
                                                                                    variant="destructive"
                                                                                    size="sm"
                                                                                    onClick={() => handleDeleteSubCategory(subCategory._id)}
                                                                                >
                                                                                    Delete
                                                                                </Button>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                    <div className="flex flex-col items-start gap-4 mt-4">
                                                        <Label htmlFor="subcategory-title">
                                                            {editingSubCategory ? 'Edit Subcategory' : 'New Subcategory'}
                                                        </Label>
                                                        <Input
                                                            id="subcategory-title"
                                                            value={editingSubCategory ? editSubCategoryTitle : newSubCategoryTitle}
                                                            onChange={(e) => editingSubCategory
                                                                ? setEditSubCategoryTitle(e.target.value)
                                                                : setNewSubCategoryTitle(e.target.value)
                                                            }
                                                            className="w-full"
                                                        />
                                                        <Button
                                                            onClick={editingSubCategory ? handleEditSubCategory : handleAddSubCategory}
                                                            className="w-full"
                                                        >
                                                            {editingSubCategory ? 'Update Subcategory' : 'Add Subcategory'}
                                                        </Button>
                                                        {editingSubCategory && (
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setEditingSubCategory(null)
                                                                    setEditSubCategoryTitle('')
                                                                }}
                                                                className="w-full"
                                                            >
                                                                Cancel Edit
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    )
}