import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getTransactions, deleteTransaction, addTransaction, updateTransaction } from './services/transactionService';
import { formatCurrency } from './utils/currencyValidate';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import ChartPage from './pages/ChartPage';

function AppContent() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [editingId, setEditingId] = useState(null);

  // 1. STATE QUẢN LÝ FORM
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Mặc định là ngày hôm nay (YYYY-MM-DD)
    type: 'expense', // Mặc định là Chi tiêu
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

  //Function handle form change and submit
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

    // Logical to add or update transaction
    if (editingId) {
      // Case edit existing transaction
      await updateTransaction(editingId, {
        ...formData,
        amount: Number(formData.amount),
      });
      setEditingId(null); // Exit edit mode after editing
      alert('Cập nhật thành công!');
    } else {
      // Case add new transaction
      await addTransaction({
        ...formData,
        amount: Number(formData.amount),
        id: String(Date.now()),
      });
      alert('Thêm thành công!');
    }
    // -----------------------

    // Reset form
    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    });

    fetchData();
    navigate('/'); // Redirect về trang chủ
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
    setEditingId(transaction.id); // Lưu ID đang sửa
    setFormData({
      // Data from transaction to form
      title: transaction.title,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    });
    navigate('/edit'); // Chuyển đến trang edit
  };

  const handleCancelEdit = () => {
    setEditingId(null); // Exit edit mode
    setFormData({
      // Reset form data
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    });
    navigate('/'); // Quay về trang chủ
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              transactions={transactions}
              summary={summary}
              formatCurrency={formatCurrency}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path='/add'
          element={<AddTransactionPage formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />}
        />
        <Route
          path='/edit'
          element={
            <EditTransactionPage
              formData={formData}
              editingId={editingId}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancelEdit={handleCancelEdit}
            />
          }
        />
        <Route path='/charts' element={<ChartPage transactions={transactions} summary={summary} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
