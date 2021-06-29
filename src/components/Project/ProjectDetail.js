import { useDispatch, useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import addTaskIcon from "../../assets/images/addTaskIcon.svg"
import Search from "../Search";
import Tree from "../TreeLikeStructure/Tree";
import React from "react";
import { ADD_TASK, TOGGLE_TASK_MODAL } from "../../redux/actions/types";
import TaskModal from "../Modal";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);
    const isTaskModalOpen = useSelector(state => state.taskReducer.isTaskModalOpen);

    const handleToggleTaskModal = () => {
        dispatch({ type: TOGGLE_TASK_MODAL });
    };

    const receiveTaskData = (taskData) => {
        const projectId = projectDetail.id;
        dispatch({ type: ADD_TASK, payload: { taskData, projectId } });
        dispatch({ type: TOGGLE_TASK_MODAL });
    };

    const taskTree = projectDetail.task.map( parentTask => {
        return <Tree key={ parentTask.id } parentTask={ parentTask } />;
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
                isTaskModalOpen && <TaskModal
                    onHide={ handleToggleTaskModal }
                    show={ isTaskModalOpen } sendTaskData={ receiveTaskData }
                />
            }
        </div>
    )
};

export default ProjectDetail;
