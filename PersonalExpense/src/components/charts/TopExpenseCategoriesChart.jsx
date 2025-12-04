import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function TopExpenseCategoriesChart({ transactions, categories }) {
  // Group by categoryId for expenses
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + Number(t.amount);
      return acc;
    }, {});

  // Convert to array and sort by amount desc, take top 5
  const data = Object.entries(expenseByCategory)
    .map(([categoryId, amount]) => {
      const category = categories.find((c) => c.id === categoryId);
      return {
        name: category?.name || 'Khác',
        amount: amount,
        color: category?.color || '#999',
        icon: category?.icon || '📦',
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Header className='fw-bold'>🏆 Top 5 danh mục chi tiêu</Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className='text-center text-muted py-5'>Chưa có dữ liệu</div>
        ) : (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} layout='vertical'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis dataKey='name' type='category' width={150} />
              <Tooltip formatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
              <Bar dataKey='amount' name='Tổng chi'>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default TopExpenseCategoriesChart;
