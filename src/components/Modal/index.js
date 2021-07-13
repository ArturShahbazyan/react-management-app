import { Form, Button, Modal, Col } from 'react-bootstrap';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import idGenerator from "../../helpers/idGenerator";

const TaskModal = ({
                       show,
                       onHide,
                       sendData,
                       isTaskModalOpen,
                       isSubtaskModalOpen,
                       editableTaskData,
                   }) => {
    const [taskState, setTaskState] = useState({
        id: idGenerator(),
        parentId: "",
        name: "",
        description: "",
        children: [],
        creationDate: new Date(),
        assignee: "",
        estimatedTime: "",
        status: "",
        workedTime: "",
    });

    useEffect(() => {
        if (editableTaskData) {
            setTaskState({
                ...editableTaskData,
            });
        }
    }, [editableTaskData]);

    useEffect(() => {
        if (!isTaskModalOpen || !isSubtaskModalOpen) {
            setTaskState({
                id: idGenerator(),
                parentId: "",
                name: "",
                description: "",
                creationDate: new Date(),
                assignee: "",
                estimatedTime: "",
                status: "",
                workedTime: "",
                children: [],
            });
        }
    }, [isTaskModalOpen, isSubtaskModalOpen]);

    const handleChangeTaskData = (e) => {
        const { name, value } = e.target;

        setTaskState({
            ...taskState,
            [name]: value
        });
    };

    const handleChangeDate = (date) => {
        setTaskState({
            ...taskState,
            creationDate: date,
        });
    };

    const handleSendTaskData = (e) => {
        if (e.type === 'keypress' && e.key !== 'Enter') return;

        sendData(taskState);

        setTaskState({
            id: idGenerator(),
            parentId: "",
            name: "",
            description: "",
            creationDate: new Date(),
            assignee: "",
            estimatedTime: "",
            status: "",
            workedTime: "",
            children: [],
        });
    };

    return (
        <Modal show={ show } onHide={ onHide }>
            <Modal.Header closeButton className="d-flex align-items-center">
                <Modal.Title>
                    {
                        isTaskModalOpen ?
                            "Create Task" :
                            editableTaskData ?
                                "Edit Task" : "Create Subtask"
                    }
                </Modal.Title>
                <FontAwesomeIcon
                    icon={ faTasks }
                    className={ style['fa-tasks'] }
                />
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicTaskName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                        value={ taskState.name }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskAssignee">
                    <Form.Label>Assignee</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="assignee"
                        name="assignee"
                        value={ taskState.assignee }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={ 2 }
                        placeholder="description"
                        style={ { resize: 'none' } }
                        name="description"
                        value={ taskState.description }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskDescription">
                    <Form.Label className="d-block">Date</Form.Label>
                    <DatePicker
                        selected={ taskState.creationDate }
                        onChange={ (date) => handleChangeDate(date) }
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskEstimatedTime">
                    <Form.Label>Estimated Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="estimatedTime"
                        value={ taskState.estimatedTime }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTaskWorkedTime">
                    <Form.Label>Worked Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="workedTime"
                        value={ taskState.workedTime }
                        onChange={ handleChangeTaskData }
                        onKeyPress={ handleSendTaskData }
                    />
                </Form.Group>
                <Form.Group controlId="formGridState">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select"
                                  name="status"
                                  onChange={ handleChangeTaskData }
                                  onKeyPress={ handleSendTaskData }
                                  value={ taskState.status }
                    >
                        <option value="in progress">in progress</option>
                        <option value="to do">to do</option>
                        <option value="done">done</option>
                    </Form.Control>
                </Form.Group>
                <Form.Row>
                    <Col className="d-flex justify-content-center my-3">
                        <Button variant="secondary"
                                className="mr-3"
                                onClick={ () => onHide() }
                        >
                            Cancel
                        </Button>
                        <Button variant="info"
                                onClick={ handleSendTaskData }
                        >
                            {
                                isTaskModalOpen ?
                                    "Add Task" :
                                    editableTaskData ?
                                        "Edit Task" : "Add SubTask"
                            }
                        </Button>
                    </Col>
                </Form.Row>
            </Modal.Body>
        </Modal>
    );
};

export default TaskModal;