import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validate as Validator } from 'validate.js';

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

  useEffect(() => {
    const validationResult = Validator.validate(employeeDetails, {
      firstName: { presence: { allowEmpty: false } },
      email: { presence: { allowEmpty: false }, email: true },
      phoneNumber: { presence: { allowEmpty: false }, length: { is: 10 } },
      whatsappNumber: { length: { is: 10 } },
      designation: { presence: { allowEmpty: false } },
      status: { presence: { allowEmpty: false } }
    });

    if (typeof employeeDetails !== 'undefined') {
      if (employeeDetails.whatsappNumber.length === 0) {
        delete validationResult.whatsappNumber;
      }
    }

    setEmployeeForm((prev) => ({
      ...prev,
      errors: validationResult || null
    }));
  }, [employeeDetails]);

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
                    { (employeeForm.submitted && employeeForm.errors
                      && employeeForm.errors.firstName)
                      && (
                        <span className="text-danger">{ employeeForm.errors.firstName[0] }</span>
                      ) }
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
                { (employeeForm.submitted && employeeForm.errors && employeeForm.errors.email)
                  && (employeeForm.errors.email[0]
                    ? (<span className="text-danger">{ employeeForm.errors.email[0] }</span>)
                    : (<span className="text-danger">{ employeeForm.errors.email[1] }</span>)
                  ) }
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
                { (employeeForm.submitted && employeeForm.errors && employeeForm.errors.phoneNumber)
                  && (employeeForm.errors.phoneNumber[0]
                    ? (<span className="text-danger">{ employeeForm.errors.phoneNumber[0] }</span>)
                    : (<span className="text-danger">{ employeeForm.errors.phoneNumber[1] }</span>)
                  ) }
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
                { (employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.whatsappNumber)
                  && (
                    <span className="text-danger">
                      { employeeForm.errors.whatsappNumber[0] }
                    </span>
                  ) }

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
                { (employeeForm.submitted && employeeForm.errors && employeeForm.errors.designation)
                  && (<span className="text-danger">{ employeeForm.errors.designation[0] }</span>) }
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
                { (employeeForm.submitted && employeeForm.errors && employeeForm.errors.status)
                  && (<span className="text-danger">{ employeeForm.errors.status[0] }</span>) }
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
