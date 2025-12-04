import { Card, Table, Button, Badge } from 'react-bootstrap';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  return (
    <Card className='shadow-sm'>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <span className='fw-bold'>Lịch sử giao dịch ({transactions.length})</span>
      </Card.Header>
      <Table hover responsive className='align-middle mb-0'>
        <thead className='table-light'>
          <tr>
            <th>Ngày</th>
            <th>Nội dung</th>
            <th className='text-end'>Số tiền</th>
            <th className='text-center'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan='4' className='text-center py-4 text-muted'>
                Không tìm thấy giao dịch nào
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>
                  <span className='fw-medium'>{t.title}</span> <br />
                  <Badge bg={t.type === 'income' ? 'success' : 'secondary'} pill>
                    {t.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
                  </Badge>
                </td>
                <td className={`text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </td>
                <td className='text-center'>
                  <Button variant='light' className='text-primary btn-sm border-0 me-2' onClick={() => onEdit(t)}>
                    <i className='bi bi-pencil-square'></i>
                  </Button>
                  <Button variant='light' className='text-danger btn-sm border-0' onClick={() => onDelete(t.id)}>
                    <i className='bi bi-trash-fill'></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default TransactionList;
