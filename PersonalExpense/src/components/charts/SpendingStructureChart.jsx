import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function SpendingStructureChart({ transactions, categories }) {
  // Group by categoryId for expenses only
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + Number(t.amount);
      return acc;
    }, {});

  // Convert to chart data with category info
  const data = Object.entries(expenseByCategory).map(([categoryId, amount]) => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      name: category?.name || 'Khác',
      value: amount,
      color: category?.color || '#999',
      icon: category?.icon || '📦',
    };
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central' fontSize={14} fontWeight='bold'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Header className='fw-bold'>📊 Cơ cấu chi tiêu</Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className='text-center text-muted py-5'>Chưa có dữ liệu chi tiêu</div>
        ) : (
          <ResponsiveContainer width='100%' height={350}>
            <PieChart>
              <Pie data={data} cx='50%' cy='50%' labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill='#8884d8' dataKey='value'>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
              <Legend
                formatter={(value, entry) => (
                  <span>
                    {entry.payload.icon} {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default SpendingStructureChart;
