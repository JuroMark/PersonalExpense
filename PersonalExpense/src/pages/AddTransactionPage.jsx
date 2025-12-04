import { Container, Row, Col } from 'react-bootstrap';
import TransactionForm from '../components/TransactionForm';

function AddTransactionPage({ formData, handleChange, handleSubmit }) {
  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="mb-4">Thêm giao dịch mới</h2>
          <TransactionForm
            formData={formData}
            editingId={null}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancelEdit={() => {}}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AddTransactionPage;
