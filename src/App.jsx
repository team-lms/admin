import React from 'react';
import './assets/scss/theme.scss';
import './App.scss';
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
import EmployeeForm from './components/employee/employee-form/EmployeeForm';
import SupervisorList from './components/supervisor/supervisor-list/supervisor-list';


function App() {
  return (
    <div className="App">
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
                  <Route exact path="/employee" component={ EmployeeForm } />
                  <Route path="/employee/list" component={ EmployeeList } />
                  <Route path="/supervisor/list" component={ SupervisorList } />
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
