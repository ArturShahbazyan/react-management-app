import { useDispatch, useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import addTaskIcon from "../../assets/images/addTaskIcon.svg"
import Search from "../Search";
import Tree from "../TreeLikeStructure/Tree";
import {
    ADD_DRAGGABLE_TASK_TO_TASKS,
    ADD_SUB_TASK, ADD_TASK,
    EDIT_TASK, REMOVE_TASK,
    SET_PROJECT_TASK_ID,
    TOGGLE_EDITABLE_TASK_MODAL,
    TOGGLE_MODAL_AND_SET_PARENT_TASK_ID,
    TOGGLE_TASK_CONFIRM,
    TOGGLE_TASK_MODAL,
} from "../../redux/actions/types";
import TaskModal from "../Modal";
import Confirm from "../Confirm";
import React from "react";
import ProjectTaskList from "./ProjectTaskList";
import idGenerator from "../../helpers/idGenerator";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);
    const isTaskModalOpen = useSelector(state => state.taskReducer.isTaskModalOpen);
    const isSubtaskModalOpen = useSelector(state => state.taskReducer.isSubtaskModalOpen);
    const tasks = useSelector(state => state.taskReducer.tasks);
    const isOpenTaskConfirm = useSelector(state => state.taskReducer.isOpenTaskConfirm);
    const editableTaskData = useSelector(state => state.taskReducer.editableTaskData);
    const isEditTaskModalOpen = useSelector(state => state.taskReducer.isEditTaskModalOpen);

    const handleToggleTaskModal = () => {
        dispatch({ type: TOGGLE_TASK_MODAL });
    };

    const handleToggleModalAndGetParentId = (parentTaskId) => {
        dispatch({ type: TOGGLE_MODAL_AND_SET_PARENT_TASK_ID, parentTaskId });
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
        dispatch({ type: TOGGLE_MODAL_AND_SET_PARENT_TASK_ID });
    };

    const toggleTaskConfirmAndSendId = (removableTaskId, removableTaskParentId) => {
        dispatch({ type: TOGGLE_TASK_CONFIRM, payload: { removableTaskId, removableTaskParentId } });
    };

    const removeTask = () => {
        dispatch({ type: REMOVE_TASK });
    };

    const toggleEditModalAndSendEditableData = (editableTaskData) => {
        dispatch({ type: TOGGLE_EDITABLE_TASK_MODAL, editableTaskData })
    };

    const editTask = (taskData) => {
        dispatch({ type: EDIT_TASK, taskData });
    };

    const handleOnDrop = (e) => {
        let task = JSON.parse(e.dataTransfer.getData("task"));
        task.id = idGenerator();
        const taskId = task.id
        const projectId = projectDetail.id;
        dispatch({ type: ADD_DRAGGABLE_TASK_TO_TASKS, task });
        dispatch({ type: SET_PROJECT_TASK_ID, payload: { taskId, projectId } });
    };

    const taskTree = tasks.map(parentTask => {
        for (let i = 0; i < projectDetail.tasks.length; i++) {
            if (parentTask.id === projectDetail.tasks[i]) {
                return <Tree
                    key={ parentTask.id }
                    parentTask={ parentTask }
                    handleToggleModalAndGetParentId={ handleToggleModalAndGetParentId }
                    toggleTaskConfirmAndSendId={ toggleTaskConfirmAndSendId }
                    toggleEditModalAndSendEditableData={ toggleEditModalAndSendEditableData }
                />;
            }
        }
        return null;
    });

    const taskList = tasks.map(task => {
        for (let i = 0; i < projectDetail.tasks.length; i++) {
            if (projectDetail.tasks[i] === task.id) {
                return <ProjectTaskList
                    key={ task.id }
                    name={ task.name }
                    description={ task.description }
                />
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
                    <Col
                        md={ 3 }
                        className={ style["tasks-col"] }
                    >
                        { taskList }
                    </Col>
                    <Col
                        onDrop={ handleOnDrop }
                        onDragOver={ e => (e.preventDefault()) }
                        md={ 6 }
                        className={ `${ style["tasks-details"] } ${ style["tasks-col"] }` }
                    >
                        { taskTree }
                    </Col>
                    <Col
                        md={ 3 }
                        className={ `${ style["tasks-col"] }` }
                    >
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
                                handleToggleModalAndGetParentId
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
    );
};

export default ProjectDetail;
