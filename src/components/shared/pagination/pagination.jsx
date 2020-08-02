import React from 'react';
import PropTypes from 'prop-types';

const PaginationComponent = ({ totalPage, activePage, paginate }) => (

  <nav aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="First" onClick={ (e) => paginate(e, 1) }>
          <span aria-hidden="true">«</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous" onClick={ (e) => paginate(e, (activePage > 1) ? (activePage - 1) : 1) }>
          <span aria-hidden="true">‹</span>
        </a>
      </li>
      { [...Array(totalPage).keys()].map((pageIndex) => {
        const pageNumber = pageIndex + 1;
        return (
          <li className={ `page-item ${pageNumber === activePage ? 'active' : ''}` }>
            <a className="page-link" href="#" onClick={ (e) => paginate(e, pageNumber) }>
              { pageNumber }
            </a>
          </li>
        );
      }) }
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next" onClick={ (e) => paginate(e, (activePage < totalPage) ? (activePage + 1) : totalPage) }>
          <span aria-hidden="true">›</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Last" onClick={ (e) => paginate(e, totalPage) }>
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  </nav>
);

PaginationComponent.propTypes = {
  totalPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default PaginationComponent;
