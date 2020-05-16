import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
  <nav className="navbar navbar-light flex-md-nowrap py-0">
    <span className="h1 font-weight-light">Hello Brad</span>
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <Link className="nav-link" to="/">Sign out</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
