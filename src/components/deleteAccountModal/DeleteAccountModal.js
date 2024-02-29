import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = ({ isOpen, onClose, darkMode, user }) => {
    const navigate = useNavigate();
    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`/api/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                console.log('User deleted successfully');
                localStorage.removeItem('token');
                navigate('/');
            }

        } catch (error) {
            console.error('Error deleting user', error);
        }
    }
    return (
        <Modal className={`${darkMode ? 'darkmode-' : ''}modal`} show={isOpen} onHide={onClose} centered>
            <Modal.Header className={`${darkMode ? 'darkmode-' : ''}modalTitle`}>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${darkMode ? 'darkmode-' : ''}modalBody`}>
                <p>Deleting your account is irreversible. All your data will be permanently removed. Are you sure you want to proceed?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAccountModal;
