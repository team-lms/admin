import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteUser = () => (
  <Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>
);
export default DeleteUser;
