import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ selectedPage }) => {
  Header.propTypes = {
    selectedPage: PropTypes.string.isRequired
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm">
          {selectedPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link className="dropdown-item" to="/employee/list">Employees</Link>
          <Link className="dropdown-item" to="/supervisor/list">Supervisors</Link>
          <Link className="dropdown-item" to="/humanresource/list">Human Resource Managers</Link>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default Header;
