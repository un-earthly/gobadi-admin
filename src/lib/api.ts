import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + '/api',
});

export const getCategories = () => api.get('/categories');
export const getCategory = (id:any) => api.get(`/categories/${id}`);
export const createCategory = (data: any) => api.post('/categories', data);
export const updateCategory = (id: any, data: any) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id: any) => api.delete(`/categories/${id}`);

export const addSubCategory = (categoryId: any, data: any) => api.post(`/categories/${categoryId}/subcategories`, data);
export const updateSubCategory = (categoryId: any, subCategoryId: any, data: any) =>
    api.put(`/categories/${categoryId}/subcategories/${subCategoryId}`, data);
export const deleteSubCategory = (categoryId: any, subCategoryId: any) =>
    api.delete(`/categories/${categoryId}/subcategories/${subCategoryId}`);

export default api;