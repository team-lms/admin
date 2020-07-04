import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import UserForm from '../../shared/user-form/UserForm';
import { HumanResource } from '../../../api/service';

const HumanResourceForm = ({ match }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');

  /**
  * Select the functionality
  */
  useEffect(() => {
    setTitle(() => ((match.params && match.params.id) ? 'Edit Employee' : 'New employee'));
  }, []);

  /**
   * Handling Submit button
   */
  const handleSubmit = async (hrDetails) => {
    let result = null;
    if (hrDetails.id) {
      result = await HumanResource.editAHumanResource(hrDetails);
    } else {
      result = await HumanResource.createAHumanResource(hrDetails);
    }
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
        title={ title }
        cancelLink="/humanresource/list"
        handleSubmitForm={ handleSubmit }
      />
    </>
  );
};
HumanResourceForm.defaultProps = {
  match: null
};

HumanResourceForm.propTypes = {
  match: PropTypes.objectOf()
};


export default HumanResourceForm;
