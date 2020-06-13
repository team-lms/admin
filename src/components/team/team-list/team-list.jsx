import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  OverlayTrigger, Popover, Modal
} from 'react-bootstrap';
import { UserPlus } from 'react-feather';
import moment from 'moment';
import { Teams, Supervisor } from '../../../api/service';
import Header from '../../header/header';
import action from '../../../assets/img/Setting-2.png';
import DeleteUser from '../../shared/delete-user/DeleteUser';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [filters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortField: 'createdAt'
  });
  const [show, setShow] = useState(false);
  const [teamForm, setTeamForm] = useState({
    submitted: false,
    errors: null
  });
  const [teamDetails, setTeamDetails] = useState({
    teamName: '',
    supervisorName: '',
    status: 'Active'
  });
  const [selectedTeam, setSelectedTeam] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleClose = () => setShow(false);
  const [supervisors, setSupervisors] = useState([]);
  /**
   * Get Team List API
   */
  const getTeamList = async () => {
    const result = await Teams.getTeamList(filters);
    if (result.data.success) {
      setTeams(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  };

  /**
   * Supervisor List
   */
  const getSupervisorList = async () => {
    const result = await Supervisor.getSupervisorList(filters);
    if (result.data.success) {
      setSupervisors(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  };

  /**
   * Add Team Pop
   */

  const addTeamModal = () => {
    setShow(true);
    getSupervisorList();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setTeamForm(() => ({
      ...teamForm,
      submitted: true
    }));
    if (!teamForm.errors) {
      const result = await Teams.createTeam(teamDetails);
      if (result.data.success) {
        handleClose();
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamDetails(() => ({
      ...teamDetails,
      [name]: value
    }));
  };

  /**
   * Calling Team List
   */

  useEffect(() => {
    getTeamList();
  }, []);

  /**
   * Delete Pop Up
   */
  const onDelete = (team) => {
    setShowDelete(true);
    const teamToBeDeleted = team;
    teamToBeDeleted.name = team.teamName;
    setSelectedTeam(teamToBeDeleted);
  };

  /**
   * Delete Team
  */
  const deleteTeam = async (team) => {
    const result = await Teams.deleteATeam(team.id);
    if (result.data) {
      setShowDelete(false);
      if (result.data.success) {
        toast.success(result.data.message);
        getTeamList();
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Teams" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary mr-2" onClick={ addTeamModal }>
            <span>Add</span>
            <UserPlus size={ 13 } />
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">Filters</button>
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">Team Name</th>
              <th className="border-top-0 border-bottom-0">Team Size</th>
              <th className="border-top-0 border-bottom-0">Supervisor Name</th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              teams.map((team, index) => (
                <tr key={ team.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      {team.teamName}
                    </span>
                    <small className="text-muted">
                      (Since
                      {' '}
                      {moment(team.createdAt).format('Do MMM YYYY')}
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      {team.teamAssociations
                        && (
                          <span className="d-block">
                            {team.teamAssociations.length}
                          </span>
                        )}
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        Siju Samson
                      </span>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={ (
                        <Popover id={ `popover-positioned-${team.id}` }>
                          <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                            <div className="list-group list-group-flush rounded">
                              <Link className="list-group-item list-group-item-action py-1 px-2" to="/employee">Edit</Link>
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ (event) => onDelete(team, event.target) }>Delete</button>
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
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row">
              <label htmlFor="teamNameField" className="col-sm-2 col-form-label">Team</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="text"
                  id="teamNameField"
                  placeholder="Team Name"
                  name="teamName"
                  value={ teamDetails.teamName }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="supervisorField" className="col-sm-2 col-form-label">Supervisor</label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  type="text"
                  id="supervisorField"
                  name="supervisor"
                  value={ teamDetails.supervisor }
                  onChange={ handleChange }
                >
                  <option value="">Select Supervisor</option>
                  {supervisors.map((supervisor, index) => (
                    <option value={ supervisor.id }>
                      {supervisor.firstName}
                      {' '}
                      {supervisor.middleName}
                      {' '}
                      {supervisor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="statusField" className="col-sm-2 col-form-label">Status</label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  type="text"
                  id="statusField"
                  name="status"
                  value={ teamDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>

                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-sm btn-primary" onClick={ handleSubmit }>
            Create
          </button>
        </Modal.Footer>
      </Modal>
      {showDelete
        && (
          <DeleteUser
            title="Delete Team"
            user={ selectedTeam }
            handleClose={ handleCloseDelete }
            deleteUser={ deleteTeam }
          />
        )}
    </>
  );
};


export default TeamList;
