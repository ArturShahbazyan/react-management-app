import { useDispatch, useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import addTaskIcon from "../../assets/images/addTaskIcon.svg"
import Search from "../Search";
import Tree from "../TreeLikeStructure/Tree";
import React from "react";
import {
    ADD_SUB_TASK, ADD_TASK,
    SET_PROJECT_TASK_ID,
    TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID,
    TOGGLE_TASK_MODAL,
} from "../../redux/actions/types";
import TaskModal from "../Modal";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);
    const isTaskModalOpen = useSelector(state => state.taskReducer.isTaskModalOpen);
    const isSubtaskModalOpen = useSelector(state => state.taskReducer.isSubtaskModalOpen);
    const subtaskId = useSelector(state => state.taskReducer.subtaskId);
    const task = useSelector(state => state.taskReducer.task);

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

    const taskTree = task.map(parentTask => {
        return projectDetail.task.map(projectTaskId => {
            if (parentTask.id === projectTaskId) {
                return <Tree
                    key={ parentTask.id }
                    parentTask={ parentTask }
                    handleToggleSubtaskModalAndGetSubtaskId={ handleToggleSubtaskModalAndGetSubtaskId }
                />;
            }
        });
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
                    onHide={ isTaskModalOpen ? handleToggleTaskModal : handleToggleSubtaskModalAndGetSubtaskId }
                    show={ isTaskModalOpen || isSubtaskModalOpen }
                    sendData={ isTaskModalOpen ? receiveTaskData : receiveSubtaskData }
                    isTaskModalOpen={ isTaskModalOpen }
                    isSubtaskModalOpen={ isSubtaskModalOpen }
                />
            }
        </div>
    )
};

export default ProjectDetail;
