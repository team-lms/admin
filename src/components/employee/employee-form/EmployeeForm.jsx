import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import UserForm from '../../shared/user-form/UserForm';
import { Employee } from '../../../api/service';

const EmployeeForm = () => {
  const history = useHistory();
  const handleSubmit = async (employeeDetails) => {
    const result = await Employee.createAEmployee(employeeDetails);
    if (result.data.success) {
      history.push('/employee/list');
      toast.success(result.data.message);
    } else {
      toast.error(result.message);
    }
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
