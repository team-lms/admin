import React from 'react';
import './assets/scss/bootstrap.scss';
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
import EmployeeList from './components/employee-list/EmployeeList';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <SideNav />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <Redirect exact from="/" to="/dashboard" />
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/employees" component={ EmployeeList } />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
