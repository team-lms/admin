import React, { useState, useEffect, useCallback } from 'react';
import { UserPlus, ChevronUp, ChevronDown } from 'react-feather';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import action from '../../../assets/img/Setting-2.png';
import Header from '../../header/header';
import { HumanResource } from '../../../api/service';
import DeleteUser from '../../shared/delete-user/DeleteUser';


const HumanResourceList = ({ history }) => {
  const [humanResources, setHumanResources] = useState([]);
  const [filters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortBy: 'createdAt'
  });
  const [selectedHumanResource, setSelectedHumanResource] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const getHumanResourceList = useCallback(async () => {
    const result = await HumanResource.getHumanResourceList(filters);
    if (result.data.success) {
      setHumanResources(result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  }, [filters]);

  useEffect(() => {
    getHumanResourceList();
  }, [getHumanResourceList]);

  /**
   * Delete Pop Up
   */
  const onDelete = (humanResource) => {
    setShow(true);
    const hrToBeDeleted = humanResource;
    hrToBeDeleted.name = `${humanResource.firstName} ${humanResource.middleName} ${humanResource.lastName}`;
    setSelectedHumanResource(hrToBeDeleted);
    getHumanResourceList();
  };

  /**
   * Delete Human Resource
   */
  const deleteHumanResource = async (humanResource) => {
    const result = await HumanResource.deleteAHumanResource(humanResource.id);
    if (result.data) {
      setShow(false);
      if (result.data.success) {
        toast.success(result.data.message);
        getHumanResourceList();
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
    getHumanResourceList();
  };

  /**
  * On Edit
  */
  const onEdit = (hr) => {
    window.localStorage.setItem('currentUser', JSON.stringify({ ...hr }));
    history.push(`/humanresource/id:${hr.id}`);
  };

  /**
   * Showing Icon for Sorting
   */

  const showSortIcon = (sortBy) => sortBy === filters.sortBy;

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Human Resource Managers" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/humanresource/create">
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
        <table className="table table-hover mb-0">
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
                  onClick={ () => changeSortBy('supervisor') }
                  onKeyPress={ () => changeSortBy('supervisor') }
                >
                  Supervisor
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
              humanResources.map((humanResource, index) => (
                <tr key={ humanResource.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      { humanResource.firstName }
                      { ' ' }
                      { humanResource.middleName }
                      { ' ' }
                      { humanResource.lastName }
                    </span>
                    <small className="text-muted">
                      (Since
                      { ' ' }
                      { moment(humanResource.createdAt).format('Do MMM YYYY') }
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        { humanResource.email }
                      </span>
                      <small className="text-muted">{ humanResource.phoneNumber }</small>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      { (humanResource.team
                        && humanResource.team.users.length > 0)
                        ? `${humanResource.team.users[0].firstName || ''}
                        ${humanResource.team.users[0].middleName || ''}
                        ${humanResource.team.users[0].lastName || ''}` : 'NA' }

                    </span>
                    <small className="text-muted">
                      { ' ' }
                      { (humanResource.teamAssociation
                        && humanResource.teamAssociation.team.users.length > 0)
                        && (humanResource.teamAssociation.team.users[0].designation.name) }
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={
                        (
                          <Popover id={ `popover-positioned-${humanResource.id}` }>
                            <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                              <div className="list-group list-group-flush rounded">
                                <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ () => onEdit(humanResource) }>Edit</button>
                                <button type="button" className="list-group-item btn  btn-sm py-1 px-2" onClick={ (event) => onDelete(humanResource, event.target) }>Delete</button>
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
      { show
        && (
          <DeleteUser
            title="Delete Hr"
            user={ selectedHumanResource }
            handleClose={ handleClose }
            deleteUser={ deleteHumanResource }
          />
        ) }
    </>
  );
};

HumanResourceList.defaultProps = {
  history: null
};

HumanResourceList.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape({
    push: PropTypes.func
  }))
};

export default HumanResourceList;
