import axios from 'axios';

// URL to your json-server (default port 3001 as set up)
const API_URL = 'http://localhost:3001/transactions';

// Function to get all transactions from the mock API
export const getTransactions = async () => {
  try {
    // Sort date from newest to oldest
    const response = await axios.get(`${API_URL}?_sort=date&_order=desc`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
};

// Function to delete a transaction (Prepared for Delete button)
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const addTransaction = async (newTransaction) => {
  try {
    const response = await axios.post(API_URL, newTransaction);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm:', error);
  }
};

export const updateTransaction = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
    throw error;
  }
};
