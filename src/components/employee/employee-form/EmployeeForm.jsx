import React, { useState, useEffect } from 'react';
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
        <div className="p-3 rounded">
          <h4>Personal Information</h4>
          <div className="form-row">
            {/* <div className="col-6"> */}
            {/* <div className="form-row"> */}

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
                <label htmlFor="lastNameField">Middle Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="lastNameField"
                  name="lastName"
                  placeholder="Middle name"
                  value={ employeeDetails.lastName }
                  onChange={ handleChange }
                />
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="emailField">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="emailField"
                  name="email"
                  placeholder="Last Name"
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
                { (employeeForm.submitted && employeeForm.errors && employeeForm.errors.phoneNumber)
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
                <label htmlFor="whatsappNumberField">Date Of Birth</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Date of Birth"
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
                <label htmlFor="whatsappNumberField">Address</label>
                <input
                  className="form-control"
                  type="text"
                  id="whatsappNumberField"
                  name="whatsappNumber"
                  placeholder="Address"
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
                <label htmlFor="whatsappNumberField">Select Sex</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>

                </select>
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
                <label htmlFor="maritalStatus">Marital Status</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="maritalStatus">Nationality</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select Nationality</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
            </div>
          </div>
          <h4>Job Details</h4>
          <div className="form-row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="firstNameField">Designation</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select a Designation</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="firstNameField">Team</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select A Team</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="firstNameField">Hired On</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>


            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="firstNameField">Job Type</label>
                <select
                  className="custom-select"
                  type="text"
                  id="designationField"
                  name="designation"
                  value={ employeeDetails.status }
                  onChange={ handleChange }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>


            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
