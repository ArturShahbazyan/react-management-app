import { Form, Button, Modal, Col } from 'react-bootstrap';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import style from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import idGenerator from "../../helpers/idGenerator";

const TaskModal = ({ show, onHide, sendData, isTaskModalOpen, isSubtaskModalOpen }) => {
    const [taskState, setTaskState] = useState({
        id: idGenerator(),
        parent: null,
        name: "",
        description: "",
        children: [],
    });

    const handleChangeTaskData = (e) => {
        const { name, value } = e.target;

        setTaskState({
            ...taskState,
            [name]: value
        });
    };

    useEffect(() => {
        if (!isTaskModalOpen || !isSubtaskModalOpen) {
            setTaskState({
                id: idGenerator(),
                parent: null,
                name: "",
                description: "",
                children: [],
            });
        }
    }, [isTaskModalOpen, isSubtaskModalOpen]);

    const handleSendTaskData = (e) => {
        if (e.type === 'keypress' && e.key !== 'Enter') return;
        if (!taskState.name || !taskState.description) return;

        sendData(taskState);

        setTaskState({
            id: idGenerator(),
            parent: null,
            name: "",
            description: "",
            children: [],
        });
    };

    return (
        <Modal show={ show } onHide={ onHide }>
            <Modal.Header closeButton className="d-flex align-items-center">
                <Modal.Title>{ isTaskModalOpen ? "Create Task" : "Create Subtask" }</Modal.Title>
                <FontAwesomeIcon
                    icon={ faTasks }
                    className={ style['fa-tasks'] }
                />
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicTaskName">
                    <Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                        value={ taskState.name }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskDescription">
                    <Form.Control
                        as="textarea"
                        rows={ 4 }
                        placeholder="description"
                        className="my-2"
                        style={ { resize: 'none' } }
                        name="description"
                        value={ taskState.description }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Row>
                    <Col className="d-flex justify-content-center my-3">
                        <Button variant="secondary"
                                className="mr-3"
                                onClick={ onHide }
                        >
                            Cancel
                        </Button>
                        <Button variant="info"
                                onClick={ handleSendTaskData }
                                disabled={ !(taskState.name && taskState.description) }
                        >
                            { isTaskModalOpen ? "Add Task" : "Add SubTask" }
                        </Button>
                    </Col>
                </Form.Row>
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;