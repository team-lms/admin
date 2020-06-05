import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
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

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Teams" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary mr-2">
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
    </>
  );
};


export default TeamList;
