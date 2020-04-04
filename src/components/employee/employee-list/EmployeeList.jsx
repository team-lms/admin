import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'react-feather';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Employee } from '../../services/http-services/http-service';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState([]);


  const getEmployeeList = async () => {
    const { count: totalCount, rows } = await Employee.getEmployeeList();
    setCount(totalCount);
    setEmployees(rows);
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Employees</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Download PDF</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Download CSV</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary">Filters</button>
        </div>
      </div>

      <div className="table-responsive border rounded-lg mb-3">
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
                  <td className="py-2">
                    <div className="d-flex align-items-center">
                      <img className="rounded-circle listing-profile-img border" src="https://randomuser.me/api/portraits/lego/3.jpg" alt="Rodney Gibson" />
                      <div className="ml-2">
                        <span className="d-inline-block line-height-sm">
                          {employee.firstName}
                          {' '}
                          {employee.lastName}
                          <br />
                          <small className="text-muted">
                            {moment(employee.createdAt).format('LL')}
                          </small>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="d-inline-block">
                      <span className="d-inline-block line-height-sm">
                        {employee.email}
                        <br />
                        <small className="text-muted">{employee.phoneNumber}</small>
                      </span>
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="d-inline-block line-height-sm">
                      Sally Pena
                      <br />
                      <small className="text-muted">(Technical Head)</small>
                    </span>
                  </td>
                  <td className="py-2">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      rootClose="false"
                      overlay={
                        (
                          <Popover id={ `popover-positioned-${employee.id}` }>
                            <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded-lg">
                              <div className="list-group list-group-flush">
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/employee">Edit</Link>
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/">Do more</Link>
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
