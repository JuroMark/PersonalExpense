import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onFilterChange }) => {
  return (
    <Row className='mb-3 g-2'>
      <Col md={8}>
        <Form.Control
          type='text'
          placeholder=' Tìm kiếm theo nội dung...'
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select onChange={(e) => onFilterChange('type', e.target.value)}>
          <option value='all'>Tất cả loại</option>
          <option value='income'>Khoản Thu (+)</option>
          <option value='expense'>Khoản Chi (-)</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;
