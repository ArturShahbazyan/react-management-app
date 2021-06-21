import { Modal, Button } from 'react-bootstrap';
import React from 'react';

const Confirm = ({ onHide, onRemoveProject, show, }) => {
    return (
        <Modal show={ show } onHide={ onHide }>
            <Modal.Header closeButton>Are you sure ?</Modal.Header>
            <div className="p-3 d-flex justify-content-end">
                <Button variant="secondary" onClick={ onHide }>
                    Close
                </Button>
                <Button
                    variant="info"
                    className="ml-2"
                    onClick={ onRemoveProject }>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default Confirm;