import { useDispatch, useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import addTaskIcon from "../../assets/images/addTaskIcon.svg"
import Search from "../Search";
import Tree from "../TreeLikeStructure/Tree";
import {
    ADD_SUB_TASK, ADD_TASK,
    EDIT_TASK, FOUND_TASK, MOVE_TASK, REMOVE_TASK,
    SET_PROJECT_TASK_ID,
    TOGGLE_EDITABLE_TASK_MODAL,
    TOGGLE_MODAL_AND_SET_PARENT_TASK_ID,
    TOGGLE_TASK_CONFIRM,
    TOGGLE_TASK_MODAL,
} from "../../redux/actions/types";
import TaskModal from "../Modal";
import Confirm from "../Confirm";
import React, { useCallback } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import idGenerator from "../../helpers/idGenerator";
import ProjectTasksTree from "./ProjectTasksTree";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);
    const isTaskModalOpen = useSelector(state => state.taskReducer.isTaskModalOpen);
    const isSubtaskModalOpen = useSelector(state => state.taskReducer.isSubtaskModalOpen);
    const tasks = useSelector(state => state.taskReducer.tasks);
    const isOpenTaskConfirm = useSelector(state => state.taskReducer.isOpenTaskConfirm);
    const editableTaskData = useSelector(state => state.taskReducer.editableTaskData);
    const isEditTaskModalOpen = useSelector(state => state.taskReducer.isEditTaskModalOpen);

    const moveTask = useCallback((dragIndex, hoverIndex) => {
        const dragTask = tasks[dragIndex];
        const movedTasks = update(tasks, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragTask],
            ],
        });
        dispatch({ type: MOVE_TASK, movedTasks });
    }, [tasks, dispatch]);

    const [{ isOver }, dropFoundTask] = useDrop(() => ({
        accept: FOUND_TASK,
        drop(item) {
            const updateChildrenIds = (childrenData, childId) => {
                const newData = childrenData.map((value) => {
                    const { children } = value;
                    const newValue = { ...value, id: idGenerator(), parentId: childId };

                    if (children) {
                        newValue.children = updateChildrenIds(children, newValue.id);
                    }
                    return newValue;
                });
                return newData;
            };

            const taskData = { ...item.task };
            taskData.id = idGenerator();

            if (taskData.children.length !== 0) {
                taskData.children = taskData.children.map(child => {
                    return {
                        ...child,
                        id: idGenerator(),
                        parentId: taskData.id
                    }
                });
            }

            taskData.children.map(child => {
                child.children = updateChildrenIds(child.children, child.id);
                return child.children;
            });

            const taskId = taskData.id;
            const projectId = projectDetail.id;

            dispatch({ type: SET_PROJECT_TASK_ID, payload: { taskId, projectId } });
            dispatch({ type: ADD_TASK, taskData });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    }));

    const getStyle = (backgroundColor, boxShadow) => {
        return {
            backgroundColor,
            boxShadow
        };
    };

    let backgroundColor = '';
    let boxShadow = '';

    if (isOver) {
        backgroundColor = 'rgba(0,0,0,0.1)';
        boxShadow = '0px 0px 15px 2px rgba(0,0,0,0.2)';
    }

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

    const taskTree = tasks.map((parentTask, index) => {
        for (let i = 0; i < projectDetail.tasks.length; i++) {
            if (parentTask.id === projectDetail.tasks[i]) {
                return <Tree
                    moveTask={ moveTask }
                    index={ index }
                    id={ parentTask.id }
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

    const taskList = tasks.map((task, index) => {
        for (let i = 0; i < projectDetail.tasks.length; i++) {
            if (projectDetail.tasks[i] === task.id) {
                return <ProjectTasksTree
                    key={ task.id }
                    parentTask={ task }
                    moveTask={ moveTask }
                    index={ index }
                    id={ task.id }
                />
            }
        }
        return null;
    });

    return (
        <div className={ style["project-detail"] }>
            <Container fluid>
                <div className={ style["banner"] }>
                    <h2>{ projectDetail && projectDetail.name }</h2>
                    <p>{ projectDetail && projectDetail.summary }</p>
                    <div className={ style["add-task-row"] }
                         onClick={ handleToggleTaskModal }
                    >
                        <div className={ style["add-task-content"] }>
                            <span className="mr-1">Add Task</span>
                            <img src={ addTaskIcon }
                                 alt="Add task"
                                 className={ style["add-task-icon"] }
                            />
                        </div>
                    </div>
                </div>
                <Row>
                    <Col
                        md={ 3 }
                        className={ `${ style["tasks-col"] } ${ style["left-panel"] } ${ style["panels"] }` }
                    >
                        { taskList }
                    </Col>
                    <Col
                        md={ 6 }
                        className={ `${ style["tasks-details"] } ${ style["tasks-col"] }` }
                        ref={ dropFoundTask }
                    >
                        <div style={ getStyle(backgroundColor, boxShadow) }>
                            { taskTree }
                        </div>
                    </Col>
                    <Col
                        md={ 3 }
                        className={ `${ style["tasks-col"] } ${ style["right-panel"] } ${ style["panels"] }` }
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