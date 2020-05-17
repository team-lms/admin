import React, { useState, useEffect } from 'react';
import { MoreHorizontal, UserPlus } from 'react-feather';
import { OverlayTrigger, Popover, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm text-white">
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

      <div className="table-responsive border mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0">Basic Details</th>
              <th className="border-top-0">Contact Details</th>
              <th className="border-top-0">Supervisor</th>
              <th className="border-top-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee) => (
                <tr key={ employee.id }>
                  <td>
                    <div className="d-flex align-items-center">
                      <img className="rounded-circle listing-profile-img border" src="https://randomuser.me/api/portraits/lego/3.jpg" alt="Rodney Gibson" />
                      <div className="ml-2">
                        <span className="d-inline-block line-height-sm">
                          Brad Thomas
                          <br />
                          <small className="text-muted">
                            (
                            <span>Since </span>
                            { moment(employee.createdAt).format('Do MMM YYYY') }
                            )
                          </small>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="d-inline-block">
                      <span className="d-block">
                        rose.pelletier@example.com
                      </span>
                      <small className="text-muted">045-672-3124</small>
                    </span>
                  </td>
                  <td>
                    <span className="d-inline-block line-height-sm">
                      Sally Pena
                      <br />
                      <small className="text-muted">(Technical Head)</small>
                    </span>
                  </td>
                  <td>
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
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
                      <button type="button" className="btn btn-outline-secondary btn-sm py-0">
                        <MoreHorizontal size={ 14 } />
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
