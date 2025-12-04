import { Card } from 'react-bootstrap';

function CategorySelector({ categories, selectedCategoryId, onSelect, filterType }) {
  // Lọc categories theo type (income/expense)
  const filteredCategories = categories.filter((cat) => cat.type === filterType);

  return (
    <div>
      <label className="form-label fw-bold">Chọn danh mục</label>
      <div className="d-flex flex-wrap gap-2">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`category-card ${selectedCategoryId === category.id ? 'selected' : ''}`}
            style={{
              cursor: 'pointer',
              border: selectedCategoryId === category.id ? `3px solid ${category.color}` : '2px solid #ddd',
              minWidth: '100px',
              textAlign: 'center',
              transition: 'all 0.2s',
            }}
          >
            <Card.Body className="p-2">
              <div style={{ fontSize: '2rem' }}>{category.icon}</div>
              <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>{category.name}</div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
