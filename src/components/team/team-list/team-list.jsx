import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  OverlayTrigger, Popover, Modal
} from 'react-bootstrap';
import { UserPlus } from 'react-feather';
import moment from 'moment';
import { Teams } from '../../../api/service';
import Header from '../../header/header';
import action from '../../../assets/img/Setting-2.png';

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
    status: ''
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /**
   * Get Team List
   */
  const getTeamList = async () => {
    const result = await Teams.getTeamList(filters);
    if (result.data.success) {
      setTeams(...teams, result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setTeamForm(() => ({
      ...teamForm,
      submitted: true
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeamDetails(() => ({
      ...teamDetails,
      [name]: value
    }));
  };

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Teams" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary mr-2" onClick={ handleShow }>
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
                      { moment(team.createdAt).format('Do MMM YYYY') }
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
                              <Link className="list-group-item list-group-item-action py-1 px-2" to="/">Delete</Link>
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
                  type="text"
                  className="form-control"
                  id="teamNameField"
                  placeholder="Team Name"
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
                  <option value="Siju">Siju</option>
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
    </>
  );
};


export default TeamList;
