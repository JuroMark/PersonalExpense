import { Container, Row, Col } from 'react-bootstrap';
import TransactionChart from '../components/TransactionChart';
import MonthlyChart from '../components/MonthlyChart';
import SummaryCards from '../components/SummaryCards';

function ChartPage({ transactions, summary }) {
  return (
    <Container>
      <h2 className='mb-4'>📊 Thống kê & Biểu đồ</h2>
      <Row>
        <Col md={12}>
          <SummaryCards income={summary.income} expense={summary.expense} />
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <TransactionChart income={summary.income} expense={summary.expense} />
        </Col>
        <Col md={6}>
          <MonthlyChart transactions={transactions} />
        </Col>
      </Row>
    </Container>
  );
}

export default ChartPage;
