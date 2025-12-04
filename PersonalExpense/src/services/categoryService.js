import axios from 'axios';

const API_URL = 'http://localhost:3001/categories';

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error);
    return null;
  }
};
