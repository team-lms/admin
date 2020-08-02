import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  OverlayTrigger, Popover, Modal
} from 'react-bootstrap';
import { UserPlus, ChevronUp, ChevronDown } from 'react-feather';
import moment from 'moment';
import { Teams, Supervisor } from '../../../api/service';
import Header from '../../header/header';
import action from '../../../assets/img/Setting-2.png';
import DeleteUser from '../../shared/delete-user/DeleteUser';
import Pagination from '../../shared/pagination/pagination';

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [filters, setFilters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortBy: 'createdAt'
  });
  const [show, setShow] = useState(false);
  const [teamForm, setTeamForm] = useState({
    submitted: false,
    errors: null
  });
  const [teamCount, setTeamCount] = useState(null);
  const [teamDetails, setTeamDetails] = useState({
    teamName: '',
    supervisor: '',
    status: 'Active'
  });
  const [selectedTeam, setSelectedTeam] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const handleClose = () => setShow(false);
  const [supervisors, setSupervisors] = useState([]);
  const [title, setTitle] = useState(null);
  const [buttonName, setButtonName] = useState(null);
  /**
   * Get Team List API
   */
  const getTeamList = useCallback(async () => {
    const result = await Teams.getTeamList(filters);
    if (result.data.success) {
      setTeamCount(result.data.data.count);
      setTeams(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  }, [filters]);

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
    setTitle('Create Team');
    setButtonName('Create');
    getSupervisorList();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTeamForm(() => ({
      ...teamForm,
      submitted: true
    }));
    if (!teamForm.errors) {
      let result = null;
      if (title === 'Edit Team') {
        result = await Teams.editATeam(teamDetails);
      } else {
        result = await Teams.createTeam(teamDetails);
      }
      if (result.data.success) {
        setTeamDetails({
          teamName: '',
          supervisor: '',
          status: 'Active'
        });
        handleClose();
        toast.success(result.data.message);
        getTeamList();
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
  }, [getTeamList]);

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

  /**
   * Find supervisor of the team
   */
  const getSupervisor = (team) => {
    const supervisor = team.users.find((user) => user.role === 'Supervisor');
    return supervisor ? ({
      supervisor: `${supervisor.firstName || ''}  ${
        supervisor.middleName || ''} ${supervisor.lastName || ''}`,
      id: supervisor.id
    }) : '';
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
    getTeamList();
  };

  /**
   * Edit a Team
   */
  const onEdit = (team) => {
    setShow(true);
    setTitle('Edit Team');
    setButtonName('Update');
    setTeamDetails(() => ({
      ...teamDetails,
      ...team,
      supervisor: getSupervisor(team).id
    }));
    getSupervisorList();
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
      <div className="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Teams" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary mr-2" onClick={ addTeamModal }>
            <span>Add</span>
            <UserPlus size={ 13 } />
          </button>
          {/* <button type="button" className="btn btn-sm btn-outline-secondary">
          Filters</button> */}
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('teamName') }
                  onKeyPress={ () => changeSortBy('teamName') }
                >
                  Team Name
                  {
                    showSortIcon('teamName')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('count') }
                  onKeyPress={ () => changeSortBy('count') }
                >
                  Team Size
                  {
                    showSortIcon('count')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">
                <button
                  type="button"
                  className="button_click"
                  onClick={ () => changeSortBy('name') }
                  onKeyPress={ () => changeSortBy('name') }
                >
                  Supervisor Name
                  {
                    showSortIcon('supervisor')
                    && (filters.sortType === 'ASC' ? <ChevronUp size={ 13 } /> : <ChevronDown size={ 13 } />)
                  }
                </button>
              </th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              teams.map((team, index) => (
                <tr key={ team.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      { team.teamName }
                    </span>
                    <small className="text-muted">
                      (Since
                      { ' ' }
                      { moment(team.createdAt).format('Do MMM YYYY') }
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      { team.users
                        && (
                          <span className="d-block">
                            { team.users.length }
                          </span>
                        ) }
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        { getSupervisor(team).supervisor }
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
                              <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ () => onEdit(team) }>Edit</button>
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
      <div className="d-flex align-items-center justify-content-center">
        {
            teamCount
            && (
              <Pagination
                totalPage={ Math.ceil(teamCount / filters.limit) }
                activePage={ filters.offset ? (filters.offset / filters.limit + 1) : 1 }
                paginate={ paginate }
              />
            )
          }
      </div>
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
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
                  { supervisors.map((supervisor) => (
                    <option value={ supervisor.id }>
                      { supervisor.firstName }
                      { ' ' }
                      { supervisor.middleName }
                      { ' ' }
                      { supervisor.lastName }
                    </option>
                  )) }
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
            { buttonName }
          </button>
        </Modal.Footer>
      </Modal>
      { showDelete
        && (
          <DeleteUser
            title="Delete Team"
            user={ selectedTeam }
            handleClose={ handleCloseDelete }
            deleteUser={ deleteTeam }
          />
        ) }
    </>
  );
};

export default TeamList;
