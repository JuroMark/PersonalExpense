import { Card, Table, Badge, Button } from 'react-bootstrap';
import { BiEdit, BiTrash } from 'react-icons/bi';

function TransactionTable({ transactions, categories = [], formatCurrency, onEdit, onDelete }) {
  // Helper function to get category info
  const getCategoryInfo = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category || { name: 'Khác', icon: '📦', color: '#999' };
  };

  return (
    <Card className='shadow-sm'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <span>Lịch sử giao dịch ({transactions.length})</span>
      </Card.Header>
      <Table hover responsive className='align-middle mb-0'>
        <thead className='table-light'>
          <tr>
            <th>Ngày</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th className='text-end'>Số tiền</th>
            <th className='text-center'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan='5' className='text-center py-4 text-muted'>
                Chưa có giao dịch nào
              </td>
            </tr>
          ) : (
            transactions.map((t) => {
              const category = getCategoryInfo(t.categoryId);
              return (
                <tr key={t.id}>
                  <td style={{ fontSize: '0.9rem' }}>{t.date}</td>
                  <td>
                    <div className='d-flex align-items-center gap-2'>
                      <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{category.name}</div>
                        <Badge bg={t.type === 'income' ? 'success' : 'secondary'} pill style={{ fontSize: '0.7rem' }}>
                          {t.type === 'income' ? 'Thu' : 'Chi'}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className='text-muted' style={{ fontSize: '0.9rem' }}>
                      {t.description}
                    </span>
                  </td>
                  <td className={`text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                  </td>
                  <td className='text-center'>
                    {/* Nút Sửa */}
                    <Button variant='light' className='text-primary btn-sm border-0 me-2' onClick={() => onEdit(t)}>
                      <BiEdit />
                    </Button>

                    {/* Nút Xóa */}
                    <Button variant='light' className='text-danger btn-sm border-0' onClick={() => onDelete(t.id)}>
                      <BiTrash />
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default TransactionTable;
