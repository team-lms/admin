import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DeleteUser = ({ user, handleClose, deleteUser }) => (
  <Modal show>
    <Modal.Header handleClose>
      <Modal.Title>Delete Employee</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete
      {' '}
      {user.name}
      {' '}
      ?
    </Modal.Body>
    <Modal.Footer>
      <button type="button" className="btn btn-secondary" onClick={ handleClose }>
        Close
      </button>
      <button type="submit" className="btn btn-primary" onClick={ () => deleteUser(user) }>
        Delete
      </button>
    </Modal.Footer>
  </Modal>
);
DeleteUser.defaultProps = {
  handleClose: null
};
DeleteUser.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    lastName: PropTypes.string
  })).isRequired,
  handleClose: PropTypes.func,
  deleteUser: PropTypes.func.isRequired

};
export default DeleteUser;
