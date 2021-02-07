import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  PieChart,
  User,
  Settings
} from 'react-feather';
import logo from "../../assets/img/logo.png";

const SideNav = () => (
  <nav className="sidebar-sticky sidebar bg-light">
    <Link className="d-block logo text-decoration-none py-4 ht-40 text-center" to="/">
      <img src={logo} className="img-fluid" alt="Dashboard-logo" />
    </Link>
    <ul className="nav flex-column">
      <li className="nav-item text-center">
        <NavLink
          className="nav-link d-inline-flex flex-column justify-content-center align-items-center rounded-lg"
          activeClassName="active shadow"
          to="/dashboard"
        >
          <PieChart size={32} />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li className="nav-item text-center mt-4">
        <NavLink
          className="nav-link d-inline-flex flex-column justify-content-center align-items-center rounded-lg"
          activeClassName="active shadow"
          to="/profile"
        >
          <User size={32} />
          <span>Profile</span>
        </NavLink>
      </li>
      <li className="nav-item text-center mt-4">
        <NavLink
          className="nav-link d-inline-flex flex-column justify-content-center align-items-center rounded-lg"
          activeClassName="active shadow"
          to="/settings"
        >
          <Settings size={32} />
          <span>Settings</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default SideNav;
