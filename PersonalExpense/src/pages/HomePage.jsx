import { Container, Row, Col } from 'react-bootstrap';
import SummaryCards from '../components/SummaryCards';
import TransactionTable from '../components/TransactionTable';
import TransactionChart from '../components/TransactionChart';
import MonthlyChart from '../components/MonthlyChart';

function HomePage({ transactions, summary, formatCurrency, onEdit, onDelete }) {
  return (
    <Container>
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
      <Row>
        <Col md={12}>
          <TransactionTable
            transactions={transactions}
            formatCurrency={formatCurrency}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
