import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_PUBLIC_BASE}/api`,
});

export const getCategories = () => api.get('/categories');
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const addSubCategory = (categoryId, data) => api.post(`/categories/${categoryId}/subcategories`, data);
export const updateSubCategory = (categoryId, subCategoryId, data) =>
    api.put(`/categories/${categoryId}/subcategories/${subCategoryId}`, data);
export const deleteSubCategory = (categoryId, subCategoryId) =>
    api.delete(`/categories/${categoryId}/subcategories/${subCategoryId}`);

export default api;