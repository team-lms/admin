import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm">
        Employees
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link className="dropdown-item" to="/dashboard">Employees</Link>
        <Link className="dropdown-item" to="/supervisor/list">Supervisors</Link>
        <Link className="dropdown-item" to="/humanresource/list">Human Resource Managers</Link>
      </Dropdown.Menu>
    </Dropdown>
  </>
);
export default Header;
