import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions, deleteTransaction, addTransaction, updateTransaction } from './services/transactionService';
import { formatCurrency } from './utils/currencyValidate';

export function useTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
  });

  const fetchData = async () => {
    const data = await getTransactions();
    setTransactions(data);
    calculateSummary(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateSummary = (data) => {
    const income = data.filter((item) => item.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const expense = data.filter((item) => item.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
    setSummary({ income, expense });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount) {
      alert('Vui lòng nhập đủ thông tin!');
      return;
    }

    if (editingId) {
      await updateTransaction(editingId, {
        ...formData,
        amount: Number(formData.amount),
      });
      setEditingId(null);
      alert('Cập nhật thành công!');
    } else {
      await addTransaction({
        ...formData,
        amount: Number(formData.amount),
        id: String(Date.now()),
      });
      alert('Thêm thành công!');
    }

    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    });

    fetchData();
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa không?')) {
      try {
        await deleteTransaction(id);
        fetchData();
        alert('Xóa thành công!');
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        alert('Lỗi khi xóa giao dịch. Vui lòng thử lại!');
      }
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    });
    navigate('/edit');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    });
    navigate('/');
  };

  return {
    transactions,
    summary,
    formData,
    editingId,
    formatCurrency,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEditClick,
    handleCancelEdit,
  };
}
