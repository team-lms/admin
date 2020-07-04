import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserForm from '../../shared/user-form/UserForm';
import { Employee } from '../../../api/service';


const EmployeeForm = ({ match }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  /**
   * Select the functionality
   */
  useEffect(() => {
    setTitle(() => ((match.params && match.params.id) ? 'Edit Employee' : 'New employee'));
  }, []);

  /**
  * Handling Submit Button
  */
  const handleSubmit = async (employeeDetails) => {
    let result = null;
    if (employeeDetails.id) {
      result = await Employee.editAEmployee(employeeDetails);
    } else {
      result = await Employee.createAEmployee(employeeDetails);
    }
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
        title={ title }
        cancelLink="/employee/list"
        handleSubmitForm={ handleSubmit }
      />
    </>
  );
};

EmployeeForm.defaultProps = {
  match: null
};

EmployeeForm.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    }))
  }))
};

export default EmployeeForm;
