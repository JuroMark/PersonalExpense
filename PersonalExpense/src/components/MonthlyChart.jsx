import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MonthlyChart({ transactions }) {
  // Nhóm giao dịch theo tháng
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = transaction.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      acc[month].income += Number(transaction.amount);
    } else {
      acc[month].expense += Number(transaction.amount);
    }
    return acc;
  }, {});

  // Chuyển đổi thành mảng và sắp xếp
  const data = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className="fw-bold">
        📈 Biểu đồ thu chi theo tháng
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
            <Legend />
            <Bar dataKey="income" fill="#198754" name="Thu nhập" />
            <Bar dataKey="expense" fill="#dc3545" name="Chi tiêu" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default MonthlyChart;
