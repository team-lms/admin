import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PaginationComponent = ({ totalPage, activePage, paginate }) => (
  <Pagination>
    <Pagination.First onClick={ (e) => paginate(e, 1) } />
    <Pagination.Prev onClick={ (e) => paginate(e, activePage - 1) } />
    { [...Array(totalPage).keys()].map((pageIndex) => {
      const pageNumber = pageIndex + 1;
      return (
        <Pagination.Item
          active={ pageNumber === activePage }
          onClick={ (e) => paginate(e, pageNumber) }
        >
          { pageNumber }
        </Pagination.Item>
      );
    }) }
    <Pagination.Next onClick={ (e) => paginate(e, activePage + 1) } />
    <Pagination.Last onClick={ (e) => paginate(e, totalPage) } />
  </Pagination>
);

PaginationComponent.propTypes = {
  totalPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default PaginationComponent;
