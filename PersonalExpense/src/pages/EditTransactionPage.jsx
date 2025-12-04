import { Container, Row, Col } from 'react-bootstrap';
import TransactionForm from '../components/TransactionForm';

function EditTransactionPage({ formData, editingId, handleChange, handleSubmit, handleCancelEdit }) {
  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="mb-4">Chỉnh sửa giao dịch</h2>
          <TransactionForm
            formData={formData}
            editingId={editingId}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancelEdit={handleCancelEdit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditTransactionPage;
