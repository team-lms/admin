import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import UserForm from '../../shared/user-form/UserForm';
import { Supervisor } from '../../../api/service';

const SupervisorForm = ({ match }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');

  /**
   * Select the functionality
   */
  useEffect(() => {
    setTitle(() => ((match.params && match.params.id) ? 'Edit Supervisor' : 'New Supervisor'));
  }, []);

  const handleSubmit = async (supervisorDetails) => {
    let result = null;
    if (supervisorDetails.id) {
      result = await Supervisor.editASupervisor(supervisorDetails);
    } else {
      result = await Supervisor.createASupervisor(supervisorDetails);
    }
    if (result.data.success) {
      history.push('/supervisor/list');
      toast.success(result.data.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <UserForm
        title={ title }
        cancelLink="/supervisor/list"
        handleSubmitForm={ handleSubmit }
      />
    </>
  );
};

SupervisorForm.defaultProps = {
  match: null
};

SupervisorForm.propTypes = {
  match: PropTypes.objectOf()
};
export default SupervisorForm;
