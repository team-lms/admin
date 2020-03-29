import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Users, UserCheck, Calendar
} from 'react-feather';
import './SideNav.scss';

const SideNav = () => (
  <nav className="col-md-2 d-none d-md-block sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link d-flex align-items-center" activeClassName="active" to="/dashboard">
            <Home size={ 16 } />
            <span className="ml-1">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link d-flex align-items-center" activeClassName="active" to="/employee/list">
            <Users size={ 16 } />
            <span className="ml-1">Employees</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link d-flex align-items-center" activeClassName="active" to="/supervisors">
            <UserCheck size={ 16 } />
            <span className="ml-1">Supervisors</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link d-flex align-items-center" activeClassName="active" to="/holidays">
            <Calendar size={ 16 } />
            <span className="ml-1">Holidays</span>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default SideNav;
