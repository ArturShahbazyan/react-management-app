import { useDispatch, useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import addTaskIcon from "../../assets/images/addTaskIcon.svg"
import Search from "../Search";
import Tree from "../TreeLikeStructure/Tree";
import {
    ADD_SUB_TASK, ADD_TASK,
    EDIT_TASK, REMOVE_TASK,
    SET_PROJECT_TASK_ID,
    TOGGLE_EDITABLE_TASK_MODAL,
    TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID,
    TOGGLE_TASK_CONFIRM,
    TOGGLE_TASK_MODAL,
} from "../../redux/actions/types";
import TaskModal from "../Modal";
import Confirm from "../Confirm";
import React from "react";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);
    const isTaskModalOpen = useSelector(state => state.taskReducer.isTaskModalOpen);
    const isSubtaskModalOpen = useSelector(state => state.taskReducer.isSubtaskModalOpen);
    const task = useSelector(state => state.taskReducer.task);
    const isOpenTaskConfirm = useSelector(state => state.taskReducer.isOpenTaskConfirm);
    const editableTaskData = useSelector(state => state.taskReducer.editableTaskData);
    const isEditTaskModalOpen = useSelector(state => state.taskReducer.isEditTaskModalOpen);

    const handleToggleTaskModal = () => {
        dispatch({ type: TOGGLE_TASK_MODAL });
    };

    const handleToggleSubtaskModalAndGetSubtaskId = (subtaskId) => {
        dispatch({ type: TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID, subtaskId });
    };

    const receiveTaskData = (taskData) => {
        const projectId = projectDetail.id;
        const taskId = taskData.id;
        dispatch({ type: ADD_TASK, taskData });
        dispatch({ type: SET_PROJECT_TASK_ID, payload: { taskId, projectId } });
        dispatch({ type: TOGGLE_TASK_MODAL });
    };

    const receiveSubtaskData = (subtaskData) => {
        dispatch({ type: ADD_SUB_TASK, subtaskData });
        dispatch({ type: TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID });
    };

    const toggleTaskConfirmAndSendId = (removableTaskId) => {
        dispatch({ type: TOGGLE_TASK_CONFIRM, removableTaskId });
    };

    const removeTask = () => {
        dispatch({ type: REMOVE_TASK });
    };

    const toggleEditModalAndSendEditableData = (editableTaskData) => {
        dispatch({ type: TOGGLE_EDITABLE_TASK_MODAL, editableTaskData })
    }

    const editTask = (taskData) => {
        dispatch({ type: EDIT_TASK, taskData });
    }

    let taskTree = task.map(parentTask => {
        for (let i = 0; i < projectDetail.task.length; i++) {
            if (parentTask.id === projectDetail.task[i]) {
                return <Tree
                    key={ parentTask.id }
                    parentTask={ parentTask }
                    handleToggleSubtaskModalAndGetSubtaskId={ handleToggleSubtaskModalAndGetSubtaskId }
                    toggleTaskConfirmAndSendId={ toggleTaskConfirmAndSendId }
                    toggleEditModalAndSendEditableData={ toggleEditModalAndSendEditableData }
                />;
            }
        }
        return null;
    });

    return (
        <div className={ style["project-detail"] }>
            <Container fluid>
                <h2>{ projectDetail && projectDetail.name }</h2>
                <p>{ projectDetail && projectDetail.summary }</p>
                <Row className={ style["add-task-row"] } onClick={ handleToggleTaskModal }>
                    <div className={ style["add-task-content"] }>
                        <span className="mr-1">Add Task</span>
                        <img src={ addTaskIcon } alt="Add task" className={ style["add-task-icon"] }/>
                    </div>
                </Row>
                <hr/>
                <Row className="mt-5">
                    <Col md={ 3 } className={ style["tasks-col"] }>
                    </Col>
                    <Col md={ 6 } className={ `${ style["tasks-details"] } ${ style["tasks-col"] }` }>
                        { taskTree }
                    </Col>
                    <Col md={ 3 } className={ `${ style["tasks-col"] }` }>
                        <Search/>
                    </Col>
                </Row>
            </Container>
            {
                <TaskModal
                    onHide={
                        isTaskModalOpen ?
                            handleToggleTaskModal :
                            isEditTaskModalOpen ?
                                toggleEditModalAndSendEditableData :
                                handleToggleSubtaskModalAndGetSubtaskId
                    }
                    show={ isTaskModalOpen || isSubtaskModalOpen || isEditTaskModalOpen }
                    sendData={ isTaskModalOpen ?
                        receiveTaskData :
                        isEditTaskModalOpen ?
                            editTask : receiveSubtaskData
                    }
                    isTaskModalOpen={ isTaskModalOpen }
                    isSubtaskModalOpen={ isSubtaskModalOpen }
                    editableTaskData={ editableTaskData }
                />
            }
            {
                <Confirm
                    show={ isOpenTaskConfirm }
                    onHide={ toggleTaskConfirmAndSendId }
                    isOpenTaskConfirm={ isOpenTaskConfirm }
                    onRemoveTask={ removeTask }
                />
            }
        </div>
    )
};

export default ProjectDetail;
