import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './EditAccountModal.css';

const EditAccountModal = ({ isOpen, onClose, user, onSave, darkMode }) => {
  const [name, setName] = useState(user.name);
  const [imagePreview, setImagePreview] = useState(null); 

  // Effect to reset state when the user prop changes (e.g., when the modal opens)
  useEffect(() => {
    setName(user.name);
    setImagePreview(null);
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const notChanged = () => {
    return name === user.name && imagePreview === null;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (notChanged()) {
      return;
    }
    // Initialize the formData object with the name
    const formData = {
      name: name,
    };

    if (imagePreview) {
      formData.image = imagePreview;
    }
    try {
      const respone = await fetch(`/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (respone.ok) {
        console.log('User updated successfully');
        const updatedUser = { ...user, ...formData };
        onSave(updatedUser);
        onClose();
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal className={`${darkMode ? 'darkmode-' : ''}modal`} show={isOpen} onHide={onClose} centered>
      <Modal.Header className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className={`${darkMode ? 'darkmode-' : ''}modalBody`}>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" defaultValue={user.name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUserImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '50%', marginTop: '10px' }} />}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAccountModal;
