import React, { useState, useEffect } from 'react';
import { User, UserCheck, Users } from 'react-feather';
import RolePanel from './role-panel/RolePanel';

const Dashboard = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [humanResource, setHumanResource] = useState([]);
  const [employees, setEmployees] = useState([]);

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
  }, []);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-3">
          <div className="d-flex flex-column text-center">
            <div className="card border-0 shadow rounded-lg">
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
            <div className="card-body">
              Chart goes here
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
      />
      <RolePanel
        Icon={ UserCheck }
        title="Human Resource"
        description="Manage human resource team"
        peoples={ humanResource }
        remainingPeoplesCount={ 14 }
      />
      <RolePanel
        Icon={ Users }
        title="Employee"
        description="Manage employees of the organization"
        peoples={ employees }
        remainingPeoplesCount={ 40 }
      />
    </div>
  );
};
export default Dashboard;
