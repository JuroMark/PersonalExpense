import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DailyIncomeExpenseChart({ transactions }) {
  // Group by date
  const dailyData = transactions.reduce((acc, t) => {
    if (!acc[t.date]) {
      acc[t.date] = { date: t.date, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      acc[t.date].income += Number(t.amount);
    } else {
      acc[t.date].expense += Number(t.amount);
    }
    return acc;
  }, {});

  const data = Object.values(dailyData)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-30); // Last 30 days

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Header className='fw-bold'>📊 Thu/Chi theo ngày (30 ngày gần nhất)</Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className='text-center text-muted py-5'>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' angle={-45} textAnchor='end' height={80} fontSize={11} />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
              <Legend />
              <Bar dataKey='income' fill='#198754' name='Thu nhập' stackId='a' />
              <Bar dataKey='expense' fill='#dc3545' name='Chi tiêu' stackId='a' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default DailyIncomeExpenseChart;
