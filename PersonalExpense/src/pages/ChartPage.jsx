import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SummaryCards from '../components/SummaryCards';
import FilterBar from '../components/FilterBar';
import SpendingStructureChart from '../components/charts/SpendingStructureChart';
import DailyIncomeExpenseChart from '../components/charts/DailyIncomeExpenseChart';
import CashFlowTrendChart from '../components/charts/CashFlowTrendChart';
import TopExpenseCategoriesChart from '../components/charts/TopExpenseCategoriesChart';

function ChartPage({ transactions, categories, budgets, summary }) {
  const [filters, setFilters] = useState({ search: '', type: 'all' });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // Lọc transactions theo filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description?.toLowerCase().includes(filters.search.toLowerCase()) || false;
    const matchesType = filters.type === 'all' || transaction.type === filters.type;
    return matchesSearch && matchesType;
  });

  // Tính toán summary cho dữ liệu đã lọc
  const filteredSummary = {
    income: filteredTransactions
      .filter((item) => item.type === 'income')
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
    expense: filteredTransactions
      .filter((item) => item.type === 'expense')
      .reduce((acc, curr) => acc + Number(curr.amount), 0),
  };

  return (
    <Container>
      <h2 className='mb-4'>📊 Thống kê & Biểu đồ</h2>
      <FilterBar onFilterChange={handleFilterChange} />
      <Row>
        <Col md={12}>
          <SummaryCards income={filteredSummary.income} expense={filteredSummary.expense} />
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <SpendingStructureChart transactions={filteredTransactions} categories={categories} />
        </Col>
        <Col md={6}>
          <TopExpenseCategoriesChart transactions={filteredTransactions} categories={categories} />
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <DailyIncomeExpenseChart transactions={filteredTransactions} />
        </Col>
        <Col md={6}>
          <CashFlowTrendChart transactions={filteredTransactions} />
        </Col>
      </Row>
    </Container>
  );
}

export default ChartPage;
