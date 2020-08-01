import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ number }) => (
  <Pagination.Item key={ number } active={ number }>
    <h1>111</h1>
    { number }
  </Pagination.Item>
);

export default PaginationComponent;
