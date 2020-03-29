import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
  <nav className="navbar navbar-light fixed-top bg-white flex-md-nowrap py-0 border-bottom">
    <Link className="navbar-brand logo text-primary text-decoration-none py-0" to="/">LMS</Link>
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap">
        <Link className="nav-link" to="/">Sign out</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
