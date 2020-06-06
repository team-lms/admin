import React from 'react';
import axios from 'axios';
import './assets/scss/theme.scss';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import SideNav from './components/side-nav/SideNav';
import Dashboard from './components/dashboard/Dashboard';
import EmployeeList from './components/employee/employee-list/EmployeeList';
import UserForm from './components/shared/user-form/UserForm';
import SupervisorList from './components/supervisor/supervisor-list/supervisor-list';
import HumanResourceList from './components/human-resource-manager/human-resource-listing/human-resource-listing';
import TeamList from './components/team/team-list/team-list';
import ProfileForm from './components/Profile/ProfileForm';

axios.interceptors.request.use((config) => {
  if (config.url !== 'https://restcountries.eu/rest/v2/all?fields=name;callingCodes;demonym') {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = 'Bearer + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wiaWRcIjoxLFwiZW1haWxcIjpcImFkbWluQGxtcy5jb21cIixcInJvbGVcIjpcIkFkbWluXCIsXCJwaG9uZU51bWJlclwiOlwiODA3NTQzODkyM1wiLFwiZmlyc3ROYW1lXCI6XCJBZG1pblwiLFwibGFzdE5hbWVcIjpudWxsfSIsImlhdCI6MTU5MTM3NzU0NCwiZXhwIjoxNTkxNDYzOTQ0fQ.oDBs33IOqnjlo1tuiY3_Vhp4aw0mr6GqcMm015QTEDY';
  }
  return config;
}, (error) => Promise.reject(error));

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 d-none d-md-block p-0">
              <SideNav />
            </div>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 p-0">
              <Navbar />
              <div className="px-3">
                <Switch>
                  <Redirect exact from="/" to="/dashboard" />
                  <Route exact path="/dashboard" component={ Dashboard } />
                  <Route exact path="/employee/create" component={ UserForm } />
                  <Route path="/employee/list" component={ EmployeeList } />
                  <Route path="/supervisor/list" component={ SupervisorList } />
                  <Route path="/humanresource/list" component={ HumanResourceList } />
                  <Route path="/team/list" component={ TeamList } />
                  <Route path="/profile" component={ ProfileForm } />
                  <Route exact path="/humanresource/create" component={ UserForm } />
                  <Route exact path="/supervisor/create" component={ UserForm } />
                </Switch>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
