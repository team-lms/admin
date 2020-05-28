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
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    address: '',
    sex: '',
    maritalStatus: '',
    nationality: '',
    designation: '',
    team: '',
    hiredOn: '',
    jobType: '',
    status: ''
  });

  useEffect(() => {
    const validationResult = Validator.validate(employeeDetails, {
      firstName: { presence: { allowEmpty: false } },
      phoneNumber: { presence: { allowEmpty: false }, length: { is: 10 } },
      whatsappNumber: { length: { is: 10 } },
      email: { presence: { allowEmpty: false }, email: true },
      dateOfBirth: { presence: { allowEmpty: false } },
      address: { presence: { allowEmpty: false } },
      sex: { presence: { allowEmpty: false } },
      maritalStatus: { presence: { allowEmpty: false } },
      nationality: { presence: { allowEmpty: false } },
      designation: { presence: { allowEmpty: false } },
      team: { presence: { allowEmpty: false } },
      hiredOn: { presence: { allowEmpty: false } },
      jobType: { presence: { allowEmpty: false } },
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
        <div className="p-3 rounded">
          <h4>Personal Information</h4>
          <div className="form-row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="firstNameField">First Name</label>
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
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="middleNameField">Middle Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="middleNameField"
                  name="middleName"
                  placeholder="Middle name"
                  value={ employeeDetails.middleName }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="lastNameField">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="lastNameField"
                  name="lastName"
                  placeholder="Last Name"
                  value={ employeeDetails.lastName }
                  onChange={ handleChange }
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="phoneNumberField">Phone Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="phoneNumberField"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={ employeeDetails.phoneNumber }
                  onChange={ handleChange }
                />
                { (employeeForm.submitted
                && employeeForm.errors
                && employeeForm.errors.phoneNumber)
                && (employeeForm.errors.phoneNumber[0]
                  ? (<span className="text-danger">{ employeeForm.errors.phoneNumber[0] }</span>)
                  : (<span className="text-danger">{ employeeForm.errors.phoneNumber[1] }</span>)
                ) }
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="whatsappNumberField">WhatsApp Number</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Whatsapp Number"
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
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="whatsappNumberField">Email</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Email Id"
                  value={ employeeDetails.email }
                  onChange={ handleChange }
                />
                { (employeeForm.submitted
                && employeeForm.errors
                && employeeForm.errors.email)
                && (employeeForm.errors.email[0]
                  ? (<span className="text-danger">{ employeeForm.errors.email[0] }</span>)
                  : (<span className="text-danger">{ employeeForm.errors.email[1] }</span>)
                ) }

              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="dateOfBirthField">Date Of Birth</label>
                <input
                  className="form-control"
                  type="text"
                  id="dateOfBirthField"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={ employeeDetails.dateOfBirth }
                  onChange={ handleChange }
                />
                { (employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.dateOfBirth)
                  && (
                    <span className="text-danger">
                      { employeeForm.errors.dateOfBirth[0] }
                    </span>
                  ) }

              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="addressField">Address</label>
                <input
                  className="form-control"
                  type="text"
                  id="addressField"
                  name="address"
                  placeholder="Address"
                  value={ employeeDetails.address }
                  onChange={ handleChange }
                />
                {(employeeForm.submitted
                && employeeForm.errors
                && employeeForm.errors.address)
                && (
                <span className="text-danger">
                  {employeeForm.errors.address[0]}
                </span>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="sexField">Select Sex</label>
                <select
                  className="custom-select"
                  type="text"
                  id="sexField"
                  name="sex"
                  value={ employeeDetails.sex }
                  onChange={ handleChange }
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {(employeeForm.submitted
                && employeeForm.errors
                && employeeForm.errors.sex)
                && (
                <span className="text-danger">
                  {employeeForm.errors.sex[0]}
                </span>
                ) }
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="maritalStatusField">Marital Status</label>
                <select
                  className="custom-select"
                  type="text"
                  id="maritalStatusField"
                  name="maritalStatus"
                  value={ employeeDetails.maritalStatus }
                  onChange={ handleChange }
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.maritalStatus)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.maritalStatus[0]}
                  </span>
                  )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="nationalityField">Nationality</label>
                <select
                  className="custom-select"
                  type="text"
                  id="nationalityField"
                  name="nationality"
                  value={ employeeDetails.nationality }
                  onChange={ handleChange }
                >
                  <option value="">Select Nationality</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.nationality)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.nationality[0]}
                  </span>
                  )}

              </div>
            </div>
          </div>
          <h4>Job Details</h4>
          <div className="form-row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="designationField">Designation</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.designation }
                  onChange={ handleChange }
                >
                  <option value="">Select a Designation</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.designation)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.designation[0]}
                  </span>
                  )}
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="teamField">Team</label>
                <select
                  className="custom-select"
                  type="text"
                  id="teamField"
                  name="team"
                  value={ employeeDetails.team }
                  onChange={ handleChange }
                >
                  <option value="">Select A Team</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.team)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.team[0]}
                  </span>
                  )}
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="hiredOnField">Hired On</label>
                <select
                  className="custom-select"
                  type="text"
                  id="hiredOnField"
                  name="hiredOn"
                  value={ employeeDetails.hiredOn }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.hiredOn)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.hiredOn[0]}
                  </span>
                  )}
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="jobTypeField">Job Type</label>
                <select
                  className="custom-select"
                  type="text"
                  id="jobTypeField"
                  name="jobType"
                  value={ employeeDetails.jobType }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Part Time</option>
                  <option value="Inactive">Full Time</option>
                </select>
                {(employeeForm.submitted
                  && employeeForm.errors
                  && employeeForm.errors.jobType)
                  && (
                  <span className="text-danger">
                    {employeeForm.errors.jobType[0]}
                  </span>
                  )}
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
