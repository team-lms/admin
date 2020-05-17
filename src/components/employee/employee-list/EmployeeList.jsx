import React, { useState, useEffect } from 'react';
import { UserPlus } from 'react-feather';
import { OverlayTrigger, Popover, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import action from '../../../assets/img/Setting-2.png';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm">
            Employees
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link className="dropdown-item" to="/dashboard">Employees</Link>
            <Link className="dropdown-item" to="/dashboard">Supervisors</Link>
            <Link className="dropdown-item" to="/dashboard">Human Resource Managers</Link>
          </Dropdown.Menu>
        </Dropdown>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary mr-2">
            <span>Add </span>
            <UserPlus size={ 13 } />
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">Filters</button>
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">Basic Details</th>
              <th className="border-top-0 border-bottom-0">Contact Details</th>
              <th className="border-top-0 border-bottom-0">Supervisor</th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee, index) => (
                <tr key={ employee.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      Brad Thomas
                    </span>
                    <small className="text-muted">
                      (Since
                      { ' ' }
                      { moment(employee.createdAt).format('Do MMM YYYY') }
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        rose.pelletier@example.com
                      </span>
                      <small className="text-muted">045-672-3124</small>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      Sally Pena
                    </span>
                    <small className="text-muted">(Technical Head)</small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={
                        (
                          <Popover id={ `popover-positioned-${employee.id}` }>
                            <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                              <div className="list-group list-group-flush rounded">
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/employee">Edit</Link>
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/">Delete</Link>
                              </div>
                            </Popover.Content>
                          </Popover>
                        )
                      }
                    >
                      <button type="button" className="btn  btn-sm py-0">
                        <img className="path" src={ action } alt="action icon" />
                      </button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
