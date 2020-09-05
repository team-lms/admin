import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { setProfile } from './store/actions/profile';
import { LoginUser } from './api/service';

import Navbar from './components/navbar/Navbar';
import SideNav from './components/side-nav/SideNav';
import Dashboard from './components/dashboard/Dashboard';
import EmployeeList from './components/employee/employee-list/EmployeeList';
import EmployeeForm from './components/employee/employee-form/EmployeeForm';

import SupervisorList from './components/supervisor/supervisor-list/supervisor-list';
import SupervisorForm from './components/supervisor/supervisor-form/SupervisorForm';

import HumanResourceList from './components/human-resource-manager/human-resource-listing/human-resource-listing';
import HumanResourceForm from './components/human-resource-manager/human-resource-form/HumanResourceForm';

import TeamList from './components/team/team-list/team-list';
import ProfileForm from './components/profile/ProfileForm';

axios.interceptors.request.use((config) => {
  if (config.url !== 'https://restcountries.eu/rest/v2/all?fields=name;callingCodes;demonym') {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = 'Bearer + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wiaWRcIjoxLFwiZW1haWxcIjpcImFkbWluQGxtcy5jb21cIixcInJvbGVcIjpcIkFkbWluXCIsXCJwaG9uZU51bWJlclwiOlwiODA3NTQzODkyM1wiLFwiZmlyc3ROYW1lXCI6XCJBZG1pblwiLFwibGFzdE5hbWVcIjpudWxsfSIsImlhdCI6MTU5OTI4NjA4NSwiZXhwIjoxNTk5MzcyNDg1fQ.Wc7UnTR6SlQiVZhi49TO_iH6fVfKirlyIujNmFn2T4c';
  }
  return config;
}, (error) => Promise.reject(error));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserProfile = async () => {
      const result = await LoginUser.getProfile();
      dispatch(setProfile(result.data.data));
    };
    getUserProfile();
  }, []);
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
                  <Route exact path="/employee/id:id" component={ EmployeeForm } />
                  <Route exact path="/employee/create" component={ EmployeeForm } />
                  <Route exact path="/employee/list" component={ EmployeeList } />
                  <Route exact path="/supervisor/id:id" component={ SupervisorForm } />
                  <Route exact path="/supervisor/create" component={ SupervisorForm } />
                  <Route path="/supervisor/list" component={ SupervisorList } />
                  <Route exact path="/humanresource/id:id" component={ HumanResourceForm } />
                  <Route path="/humanresource/list" component={ HumanResourceList } />
                  <Route path="/team/list" component={ TeamList } />
                  <Route path="/profile" component={ ProfileForm } />
                  <Route exact path="/humanresource/create" component={ HumanResourceForm } />
                  <Route path="/team/list" component={ TeamList } />
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
