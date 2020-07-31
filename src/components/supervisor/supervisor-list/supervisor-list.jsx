import React, { useState, useEffect, useCallback } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserPlus } from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import action from '../../../assets/img/Setting-2.png';
import Header from '../../header/header';
import { Supervisor } from '../../../api/service';
import DeleteUser from '../../shared/delete-user/DeleteUser';


const SupervisorList = ({ history }) => {
  const [supervisors, setSupervisor] = useState([]);
  const [filters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortField: 'createdAt'
  });
  const [selectedSupervisor, setSelectedSupervisor] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getSupervisorList = useCallback(async () => {
    const result = await Supervisor.getSupervisorList(filters);
    if (result.data.success) {
      setSupervisor(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  }, [filters]);

  useEffect(() => {
    getSupervisorList();
  }, [getSupervisorList]);

  /**
   * Delete Pop Up
   */
  const onDelete = (supervisor) => {
    setShow(true);
    const supervisorToBeDeleted = supervisor;
    supervisorToBeDeleted.name = `${supervisor.firstName} ${supervisor.middleName} ${supervisor.lastName}`;
    setSelectedSupervisor(supervisorToBeDeleted);
    getSupervisorList();
  };

  /**
   * Delete Supervisor
   */
  const deleteSupervisor = async (supervisor) => {
    const result = await Supervisor.deleteASupervisor(supervisor.id);
    if (result.data) {
      setShow(false);
      if (result.data.success) {
        toast.success(result.data.message);
        getSupervisorList();
      } else {
        toast.error(result.message);
      }
    }
  };

  /**
 * On Edit
 */
  const onEdit = (supervisor) => {
    window.localStorage.setItem('currentUser', JSON.stringify({ ...supervisor }));
    history.push(`/supervisor/id:${supervisor.id}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Supervisors" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/supervisor/create">
            <button type="button" className="btn btn-sm btn-primary mr-2">
              Add
              <UserPlus size={ 13 } />
            </button>
          </Link>

          {/* <button type="button" className="btn btn-sm btn-outline-secondary">
          Filters</button> */}
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">Basic Details</th>
              <th className="border-top-0 border-bottom-0">Contact Details</th>
              <th className="border-top-0 border-bottom-0">Team Details</th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              supervisors.map((supervisor, index) => (
                <tr key={ supervisor.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      {supervisor.firstName || ''}
                      {' '}
                      {supervisor.middleName || ''}
                      {' '}
                      {supervisor.lastName || ''}
                    </span>
                    <small className="text-muted">
                      (Since
                      { ' ' }
                      { moment(supervisor.createdAt).format('Do MMM YYYY') }
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        { supervisor.email }
                      </span>
                      <small className="text-muted">{ supervisor.phoneNumber }</small>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        { supervisor.team
                          && supervisor.team.teamName }
                      </span>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={ (
                        <Popover id={ `popover-positioned-${supervisor.id}` }>
                          <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                            <div className="list-group list-group-flush rounded">
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ () => onEdit(supervisor) }>Edit</button>
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ (event) => onDelete(supervisor, event.target) }>Delete</button>
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
      { show
        && (
          <DeleteUser
            title="Delete Supervisor"
            user={ selectedSupervisor }
            handleClose={ handleClose }
            deleteUser={ deleteSupervisor }
          />
        ) }
    </>
  );
};

SupervisorList.defaultProps = {
  history: null
};

SupervisorList.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape({
    push: PropTypes.func
  }))
};

export default SupervisorList;
