import React, { useState, useEffect, useCallback } from 'react';
import { UserPlus, ChevronUp, ChevronDown } from 'react-feather';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import action from '../../../assets/img/Setting-2.png';
import { Employee } from '../../../api/service';
import Header from '../../header/header';
import DeleteUser from '../../shared/delete-user/DeleteUser';
import Pagination from '../../shared/pagination/pagination';

const EmployeeList = ({ history }) => {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    limit: 10, offset: 0, sortType: 'DESC', sortBy: 'createdAt'
  });
  const [empCount, setEmpCount] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getEmployeeList = useCallback(async () => {
    const result = await Employee.getEmployeeList(filters);
    if (result.data.success) {
      setEmpCount(result.data.data.count);
      setEmployees(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  }, [filters]);

  useEffect(() => {
    getEmployeeList();
  }, [getEmployeeList]);

  /**
   * Delete Pop Up
   */
  const onDelete = (employee) => {
    setShow(true);
    const employeeToBeDeleted = employee;
    employeeToBeDeleted.name = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    setSelectedEmployee(employeeToBeDeleted);
    getEmployeeList();
  };

  /**
   * Delete API
   */
  const deleteEmployee = async (employee) => {
    const result = await Employee.deleteEmployee(employee.id);
    if (result.data) {
      setShow(false);
      if (result.data.success) {
        toast.success(result.data.message);
        getEmployeeList();
      } else {
        toast.error(result.message);
      }
    }
  };

  /**
   * Changing Sort Field
   */
  const changeSortBy = (sortBy) => {
    if (filters.sortBy === sortBy) {
      filters.sortType = filters.sortType === 'ASC' ? 'DESC' : 'ASC';
    } else {
      filters.sortBy = sortBy;
      filters.sortType = 'ASC';
    }
    getEmployeeList();
  };

  /**
   * On Edit
   */
  const onEdit = (employee) => {
    window.localStorage.setItem('currentUser', JSON.stringify({ ...employee }));
    history.push(`/employee/id:${employee.id}`);
  };

  /**
  * Showing Icon for Sorting
  */

  const showSortIcon = (sortBy) => sortBy === filters.sortBy;

  const paginate = (e, page) => {
    setFilters((prev) => ({
      ...prev,
      offset: (page - 1) * prev.limit
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Employees" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/employee/create">
            <button type="button" className="btn btn-sm btn-primary mr-2">
              <span>Add </span>
              <UserPlus size={ 13 } />
            </button>
          </Link>

          {/* <button type="button" className="btn btn-sm btn-outline-secondary">
          Filters</button> */}
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('name') }
                  onKeyPress={ () => changeSortBy('name') }
                >
                  Basic Details
                  {
                    showSortIcon('name')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('email') }
                  onKeyPress={ () => changeSortBy('email') }
                >
                  Contact Details
                  {
                    showSortIcon('email')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('supervisorName') }
                  onKeyPress={ () => changeSortBy('supervisorName') }
                >
                  Supervisor
                  {
                    showSortIcon('supervisorName')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee, index) => (
                <tr key={ employee.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      { employee.firstName }
                      { ' ' }
                      { employee.middleName }
                      { ' ' }
                      { employee.lastName }
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
                        { employee.email }
                      </span>
                      <small className="text-muted">{ employee.phoneNumber }</small>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      { (employee.team
                        && employee.team.users.length > 0)
                        ? `${employee.team.users[0].firstName || ''} ${employee.team.users[0].middleName || ''} ${employee.team.users[0].lastName || ''}` : 'NA' }
                    </span>
                    <small className="text-muted">
                      { (employee.teamAssociation && employee.teamAssociation.team.users.length > 0)
                        && (employee.teamAssociation.team.users[0].designation.name) }
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={ (
                        <Popover id={ `popover-positioned-${employee.id}` }>
                          <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                            <div className="list-group list-group-flush rounded">
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ () => onEdit(employee) }>Edit</button>
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ (event) => onDelete(employee, event.target) }>Delete</button>
                            </div>
                          </Popover.Content>
                        </Popover>
                      ) }
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
      <div className="d-flex align-items-center justify-content-center">
        { empCount && (
          <Pagination
            totalPage={ Math.ceil(empCount / filters.limit) }
            activePage={ filters.offset ? (filters.offset / filters.limit + 1) : 1 }
            paginate={ paginate }
          />
        ) }
      </div>
      { show
        && (
          <DeleteUser
            title="Delete Employee"
            user={ selectedEmployee }
            handleClose={ handleClose }
            deleteUser={ deleteEmployee }
          />
        ) }

    </>
  );
};

EmployeeList.defaultProps = {
  history: null
};

EmployeeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape({
    push: PropTypes.func
  }))
};

export default EmployeeList;
