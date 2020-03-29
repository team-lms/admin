import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeForm = () => {
  const [employeeForm, setEmployeeForm] = useState({
    submitted: false,
    errors: null
  });
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    designation: '',
    status: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmployeeForm(() => ({
      ...employeeForm,
      submitted: true
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeDetails(() => ({
      ...employeeDetails,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log();
  }, [employeeDetails]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">New Employee</h1>
      </div>

      <form onSubmit={ handleSubmit }>
        <div className="p-3 border rounded">
          <div className="form-row">
            <div className="col-6">
              <div className="form-row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="firstNameField">Name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="firstNameField"
                      name="firstName"
                      placeholder="First name"
                      value={ employeeDetails.firstName }
                      onChange={ handleChange }
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="lastNameField">Last name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="lastNameField"
                      name="lastName"
                      placeholder="Last name"
                      value={ employeeDetails.lastName }
                      onChange={ handleChange }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <input
                  className="form-control"
                  type="text"
                  id="emailField"
                  name="email"
                  placeholder="example@domain.com"
                  value={ employeeDetails.email }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="phoneNumberField">Phone Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="phoneNumberField"
                  name="phoneNumber"
                  placeholder="0000000000"
                  value={ employeeDetails.phoneNumber }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="whatsappNumberField">WhatsApp Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="0000000000"
                  value={ employeeDetails.whatsappNumber }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="designationField">Designation</label>
                <input
                  className="form-control"
                  type="text"
                  id="designationField"
                  name="designation"
                  placeholder="Software Developer"
                  value={ employeeDetails.designation }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="statusField">Status</label>
                <select
                  className="custom-select"
                  type="text"
                  id="statusField"
                  name="status"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-12 text-right">
              <button type="submit" className="btn btn-primary mr-2">Create</button>
              <Link type="submit" className="btn btn-secondary" to="/employee/list">Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
