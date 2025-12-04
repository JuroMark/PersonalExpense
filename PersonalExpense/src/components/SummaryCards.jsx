import { Row, Col, Card } from 'react-bootstrap';
import { formatCurrency } from '../utils/currencyValidate';

const SummaryCards = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <Row className='mb-3 text-center'>
      <Col>
        <Card className='text-white bg-success h-100 shadow-sm'>
          <Card.Body>
            <Card.Title className='fs-6'>Thu Nhập</Card.Title>
            <h3>{formatCurrency(income)}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='text-white bg-danger h-100 shadow-sm'>
          <Card.Body>
            <Card.Title className='fs-6'>Chi Tiêu</Card.Title>
            <h3>{formatCurrency(expense)}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='text-white bg-info h-100 shadow-sm'>
          <Card.Body>
            <Card.Title className='fs-6'>Số Dư</Card.Title>
            <h3>{formatCurrency(balance)}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
