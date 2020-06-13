import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../../shared/user-form/UserForm';
import { Supervisor } from '../../../api/service';

const SupervisorForm = () => {
  const history = useHistory();

  const handleSubmit = async (supervisorDetails) => {
    const result = await Supervisor.createASupervisor(supervisorDetails);
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
        title="Supervisor"
        cancelLink="/supervisor/list"
        handleTest={ handleSubmit }
      />
    </>
  );
};
export default SupervisorForm;
