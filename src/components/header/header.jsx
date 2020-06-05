import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ selectedPage }) => (
  <>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm">
        {selectedPage}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link className="dropdown-item" to="/employee/list">Employees</Link>
        <Link className="dropdown-item" to="/supervisor/list">Supervisors</Link>
        <Link className="dropdown-item" to="/humanresource/list">Human Resource Managers</Link>
        <Link className="dropdown-item" to="/team/list">Teams</Link>
      </Dropdown.Menu>
    </Dropdown>
  </>
);
Header.propTypes = {
  selectedPage: PropTypes.string.isRequired
};
export default Header;
