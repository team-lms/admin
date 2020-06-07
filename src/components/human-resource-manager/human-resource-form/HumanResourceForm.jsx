import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../../shared/user-form/UserForm';
import { HumanResource } from '../../../api/service';


const HumanResourceForm = () => {
  const history = useHistory();

  const handleSubmit = async (historyDetails) => {
    const result = await HumanResource.createAHumanResource(historyDetails);
    if (result.data.success) {
      history.push('/humanresource/list');
      toast.success(result.data.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <UserForm
        title="Human Resource"
        cancelLink="/humanresource/list"
        handleTest={ handleSubmit }
      />
    </>
  );
};

export default HumanResourceForm;
