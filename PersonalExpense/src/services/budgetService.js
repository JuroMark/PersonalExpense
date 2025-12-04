import axios from 'axios';

const API_URL = 'http://localhost:3001/budgets';

export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy ngân sách:', error);
    return [];
  }
};

export const getBudgetByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}?categoryId=${categoryId}`);
    return response.data[0] || null;
  } catch (error) {
    console.error('Lỗi khi lấy ngân sách:', error);
    return null;
  }
};

export const addBudget = async (newBudget) => {
  try {
    const response = await axios.post(API_URL, newBudget);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm ngân sách:', error);
    throw error;
  }
};

export const updateBudget = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật ngân sách:', error);
    throw error;
  }
};
