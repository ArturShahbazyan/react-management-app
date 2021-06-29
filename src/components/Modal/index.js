import { Form, Button, Modal } from 'react-bootstrap';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import style from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import idGenerator from "../../helpers/idGenerator";

const TaskModal = ({ show, onHide, sendTaskData }) => {
    const [taskState, setTaskState] = useState({
        id: idGenerator(),
        parent: null,
        name: "",
        description: "",
        children: []
    });

    const handleChangeTaskData = (e) => {
        const { name, value } = e.target;

        setTaskState({
            ...taskState,
            [name]: value
        });
    };

    const handleSendTaskData = () => {
        sendTaskData(taskState);
    };

    return (
        <Modal show={ show } onHide={ onHide }>
            <Modal.Header closeButton className="d-flex align-items-center">
                <Modal.Title>Create Task</Modal.Title>
                <FontAwesomeIcon
                    icon={ faTasks }
                    className={ style['fa-tasks'] }
                />
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    placeholder="title"
                    name="name"
                    value={ taskState.name }
                    onChange={ handleChangeTaskData }
                />
                <Form.Control
                    as="textarea"
                    rows={ 4 }
                    placeholder="description"
                    className="my-2"
                    style={ { resize: 'none' } }
                    name="description"
                    value={ taskState.description }
                    onChange={ handleChangeTaskData }
                />
            </Modal.Body>
            <div className="d-flex justify-content-center mb-3">
                <Button variant="secondary"
                        className="mr-3"
                        onClick={ onHide }
                >
                    Cancel
                </Button>
                <Button variant="info" onClick={ handleSendTaskData }>
                    Add Task
                </Button>
            </div>
        </Modal>
    )
};

export default TaskModal;