import React from 'react';
import UserForm from '../../shared/user-form/UserForm';

const EmployeeForm = () => {
  const handleSubmit = (employeeDetails) => {
    console.log(employeeDetails);
  };
  return (
    <>
      <UserForm
        title="Employee"
        cancelLink="/employee/list"
        handleTest={ handleSubmit }
      />

    </>
  );
};

export default EmployeeForm;
