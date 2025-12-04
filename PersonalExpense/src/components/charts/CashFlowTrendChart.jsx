import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CashFlowTrendChart({ transactions }) {
  // Calculate cumulative sum over time
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let cumulative = 0;
  const data = sortedTransactions.map((t) => {
    const amount = t.type === 'income' ? Number(t.amount) : -Number(t.amount);
    cumulative += amount;
    return {
      date: t.date,
      balance: cumulative,
    };
  });

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Header className='fw-bold'>📈 Xu hướng dòng tiền tích lũy</Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className='text-center text-muted py-5'>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer width='100%' height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' angle={-45} textAnchor='end' height={80} fontSize={11} />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
              <Legend />
              <Line type='monotone' dataKey='balance' stroke='#8884d8' strokeWidth={2} name='Số dư tích lũy' dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default CashFlowTrendChart;
