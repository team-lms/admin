import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { Dropdown } from 'react-bootstrap';
import { Bell, Search } from 'react-feather';

const Navbar = () => (
  <div className="border-bottom border-light pb-3">
    <nav className="navbar navbar-light navbar-expand-lg">
      <span className="d-inline-flex flex-column">
        <span className="h1 font-weight-light">
          Hello Brad
        </span>
        <span className="font-weight-light text-muted lead role-text">Admin</span>
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item text-nowrap mr-4">
          <Link className="nav-link border border-primary rounded py-1" to="/" title="Get help">Help</Link>
        </li>
        <li className="nav-item dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="user-dropdown rounded-circle p-0" title="Brad Thomas">
              <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Brad Thomas" className="rounded-circle" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link className="dropdown-item" to="/dashboard">Logout</Link>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
    <div className="container-fluid">
      <div className="btn-toolbar justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" className="btn btn-link text-secondary">
            <Search size={ 20 } />
          </button>
          <button type="button" className="btn btn-link text-secondary">
            <Bell size={ 20 } />
          </button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button type="button" className="btn btn-primary">Apply For a Leave</button>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
