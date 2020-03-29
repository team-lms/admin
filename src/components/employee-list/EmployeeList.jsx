import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'react-feather';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees([...Array(20).keys()].map((key) => ({ id: key })));
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
                          Rodney Gibson
                          <br />
                          <small className="text-muted">(Since 19th Aug 2019)</small>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="d-inline-block">
                      <span className="d-inline-block line-height-sm">
                        rodney.gibson@example.com
                        <br />
                        <small className="text-muted">(551)-070-6119</small>
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
                      overlay={
                        (
                          <Popover id={ `popover-positioned-${employee.id}` }>
                            <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                              <div className="list-group list-group-flush">
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/">Edit</Link>
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
