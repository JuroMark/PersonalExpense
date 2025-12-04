import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function TransactionChart({ income, expense }) {
  const data = [
    { name: 'Thu nhập', value: income, color: '#198754' },
    { name: 'Chi tiêu', value: expense, color: '#dc3545' },
  ];

  const COLORS = ['#198754', '#dc3545'];

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className="fw-bold">
        📊 Biểu đồ thu chi
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}

export default TransactionChart;
