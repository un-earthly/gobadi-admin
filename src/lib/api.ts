import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gobadi-server.onrender.com/api',
});

export const getCategories = () => api.get('/categories');
export const getCategory = (id: string) => api.get(`/categories/${id}`);
export const createCategory = (data: any) => api.post('/categories', data);
export const updateCategory = (id: string, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

export const addSubCategory = (categoryId: string, data: any) => api.post(`/categories/${categoryId}/subcategories`, data);
export const updateSubCategory = (categoryId: string, subCategoryId: string, data: any) =>
    api.put(`/categories/${categoryId}/subcategories/${subCategoryId}`, data);
export const deleteSubCategory = (categoryId: string, subCategoryId: string) =>
    api.delete(`/categories/${categoryId}/subcategories/${subCategoryId}`);

export default api;