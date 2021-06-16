import { Modal, Button } from 'react-bootstrap';
import React from 'react';

class Confirm extends React.Component {

    render(){

        const {
            onHide,
            onRemoveProject,
            show
        } = this.props;

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
        )
    }
}

export default Confirm;