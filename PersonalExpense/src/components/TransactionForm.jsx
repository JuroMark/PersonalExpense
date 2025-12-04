import { Card, Form, Button } from 'react-bootstrap';
import { BiPencil, BiPlusCircle, BiCheckCircle, BiXCircle } from 'react-icons/bi';

const TransactionForm = ({
  // Adding default values to avoid uncontrolled to controlled input warning
  formData = {
    title: '',
    amount: '',
    date: '',
    type: 'expense',
  },
  handleChange = () => {},
  handleSubmit = (e) => e.preventDefault(),
  editingId = null,
  handleCancelEdit = () => {},
}) => {
  // Ensure data is always a valid object (in case the prop passed is null)
  const safeData = formData || { title: '', amount: '', date: '', type: 'expense' };

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Header className={`fw-bold text-white ${editingId ? 'bg-warning' : 'bg-primary'}`}>
        {editingId ? (
          <>
            <BiPencil className='me-2' />
            Cập nhật giao dịch
          </>
        ) : (
          <>
            <BiPlusCircle className='me-2' />
            Thêm giao dịch
          </>
        )}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Chọn Loại (Thu/Chi) */}
          <Form.Group className='mb-3'>
            <Form.Label>Loại giao dịch</Form.Label>
            <div className='d-flex gap-3'>
              <Form.Check
                type='radio'
                label='Chi tiêu'
                name='type'
                value='expense'
                checked={safeData.type === 'expense'}
                onChange={handleChange}
                className='text-danger fw-bold'
              />
              <Form.Check
                type='radio'
                label='Thu nhập'
                name='type'
                value='income'
                checked={safeData.type === 'income'}
                onChange={handleChange}
                className='text-success fw-bold'
              />
            </div>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Ngày tháng</Form.Label>
            <Form.Control type='date' name='date' value={safeData.date} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              type='text'
              placeholder='VD: Ăn sáng...'
              name='title'
              value={safeData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Số tiền</Form.Label>
            <Form.Control
              type='number'
              placeholder='0'
              name='amount'
              value={safeData.amount}
              onChange={handleChange}
              required
              min='1000'
            />
          </Form.Group>

          <div className='d-grid gap-2'>
            <Button variant={editingId ? 'warning' : 'primary'} type='submit'>
              {editingId ? (
                <>
                  <BiCheckCircle className='me-2' />
                  Lưu thay đổi
                </>
              ) : (
                <>
                  <BiPlusCircle className='me-2' />
                  Thêm mới
                </>
              )}
            </Button>

            {editingId && (
              <Button variant='secondary' onClick={handleCancelEdit}>
                <BiXCircle className='me-2' />
                Hủy bỏ
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TransactionForm;
