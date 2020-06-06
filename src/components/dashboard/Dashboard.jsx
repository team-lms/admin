import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  UserCheck,
  Users,
  Check,
  X
} from 'react-feather';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import RolePanel from './role-panel/RolePanel';
import DashboardChart from './dashboard-chart/DashboardChart';
import LeavePanelBg from '../../assets/img/leave_panel_bg.png';

const Dashboard = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [humanResource, setHumanResource] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showShouldPanel, setShowShouldPanel] = useState(false);

  useEffect(() => {
    setSupervisors([{
      name: 'Joanne Castillo',
      profilePicture: 'https://randomuser.me/api/portraits/women/71.jpg'
    }, {
      name: 'Judd Simmons',
      profilePicture: 'https://randomuser.me/api/portraits/men/31.jpg'
    }, {
      name: 'Olivia Henderson',
      profilePicture: 'https://randomuser.me/api/portraits/women/80.jpg'
    }, {
      name: 'Kevin Burke',
      profilePicture: 'https://randomuser.me/api/portraits/men/31.jpg'
    }, {
      name: 'Gilbert Chapman',
      profilePicture: 'https://randomuser.me/api/portraits/men/64.jpg'
    }]);

    setHumanResource([{
      name: 'Howard Moreno',
      profilePicture: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, {
      name: 'Judd Simmons',
      profilePicture: 'https://randomuser.me/api/portraits/men/31.jpg'
    }, {
      name: 'Olivia Henderson',
      profilePicture: 'https://randomuser.me/api/portraits/women/80.jpg'
    }]);

    setEmployees([{
      name: 'Howard Moreno',
      profilePicture: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, {
      name: 'Sophia Freeman',
      profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg'
    }, {
      name: 'Terry Lewis',
      profilePicture: 'https://randomuser.me/api/portraits/women/92.jpg'
    }, {
      name: 'Becky Brooks',
      profilePicture: 'https://randomuser.me/api/portraits/women/62.jpg'
    }, {
      name: 'Bertha Bryant',
      profilePicture: 'https://randomuser.me/api/portraits/women/23.jpg'
    }]);
    setTeams([{
      name: 'Howard Moreno',
      profilePicture: 'https://randomuser.me/api/portraits/men/67.jpg'
    }, {
      name: 'Sophia Freeman',
      profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg'
    }, {
      name: 'Terry Lewis',
      profilePicture: 'https://randomuser.me/api/portraits/women/92.jpg'
    }, {
      name: 'Becky Brooks',
      profilePicture: 'https://randomuser.me/api/portraits/women/62.jpg'
    }, {
      name: 'Bertha Bryant',
      profilePicture: 'https://randomuser.me/api/portraits/women/23.jpg'
    }]);
  }, []);

  const handleLeaveShowKeyPress = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setShowShouldPanel(!showShouldPanel);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-3">
          <div className="d-flex flex-column text-center">
            <div
              className={ `card border-0 shadow rounded-lg leaves-toggle ${showShouldPanel ? 'active' : ''}` }
              role="button"
              tabIndex="0"
              onKeyPress={ handleLeaveShowKeyPress }
              onClick={ () => setShowShouldPanel(!showShouldPanel) }
            >
              <div className="card-body">
                <p className="lead mb-0">Pending Approvals</p>
                <div className="d-inline-flex align-items-start">
                  <p className="display-4 mb-0">12</p>
                  <span className="badge badge-primary mt-3">New</span>
                </div>
              </div>
            </div>
            <div className="card rounded-lg bg-light mt-4">
              <div className="card-body">
                <p className="lead mb-0">Upcoming Holiday</p>
                <div className="d-inline-flex align-items-start">
                  <p className="display-4 mb-0">01</p>
                  <p className="mt-2 lead">May</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="card rounded-lg h-100 bg-light">
            <div className="card-body p-0">
              { showShouldPanel && (
                <div className="d-flex flex-column justify-content-between h-100">
                  <OverlayTrigger
                    overlay={ (
                      <Tooltip id="seeMoreLeaves">
                        See more leaves
                      </Tooltip>
                    ) }
                  >
                    <Link to="/" className="btn btn-secondary btn-sm py-0 position-absolute see-more left">See more</Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={ (
                      <Tooltip id="closeLeavePanel">
                        Close leave panel
                      </Tooltip>
                    ) }
                  >
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm py-0 position-absolute see-more right"
                      onClick={ () => setShowShouldPanel(false) }
                    >
                      <X size={ 13 } />
                    </button>
                  </OverlayTrigger>
                  <img src={ LeavePanelBg } className="img-fluid" alt="Leave panel background" />
                  <div className="col d-flex flex-column justify-content-center">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="h2 font-weight-bold text-primary">20-24</span>
                        <p className="lead">April 2020</p>
                      </div>
                      <div className="col border-left border-2">
                        <span className="h2">Claude Watkins</span>
                        <p className="lead">Planned Leave</p>
                      </div>
                      <div className="col-auto">
                        <div className="btn-group" role="group" aria-label="Leave Actions">
                          <button type="button" className="btn btn-outline-success">
                            <Check size={ 16 } />
                            Approve
                          </button>
                          <button type="button" className="btn btn-outline-danger">
                            <X size={ 16 } />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) }
              <div className={ `row h-100 align-items-center ${showShouldPanel ? 'd-none' : ''}` }>
                <div className="col-7 align-self-stretch">
                  <div className="border-bottom h-100">
                    <DashboardChart />
                  </div>
                </div>
                <div className="col-5 text-center">
                  <div className="d-inline-block text-left">
                    <p className="lead mb-0">People working today</p>
                    <div className="d-inline-flex align-items-start">
                      <p className="display-4 font-weight-bold mb-0">134</p>
                      <button type="button" className="btn btn-sm btn-secondary py-0 mt-3 ml-2">See more</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RolePanel
        Icon={ User }
        title="Supervisor"
        description="Manage supervisor for each team"
        peoples={ supervisors }
        remainingPeoplesCount={ 20 }
        route="/supervisor/list"
      />
      <RolePanel
        Icon={ UserCheck }
        title="Human Resource"
        description="Manage human resource team"
        peoples={ humanResource }
        remainingPeoplesCount={ 14 }
        route="/humanresource/list"
      />
      <RolePanel
        Icon={ Users }
        title="Employee"
        description="Manage employees of the organization"
        peoples={ employees }
        remainingPeoplesCount={ 40 }
        route="/employee/list"
      />
      <RolePanel
        Icon={ Users }
        title="Teams"
        description="Manage teams of the organization"
        peoples={ teams }
        remainingPeoplesCount={ 15 }
        route="/team/list"
      />
    </div>
  );
};
export default Dashboard;
