import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import { Link } from "react-router-dom";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import React from "react";
import { useDispatch } from "react-redux";
import { SET_TASK_DETAIL } from "../../redux/actions/types";

const ProjectTaskList = ({ task }) => {
    const dispatch = useDispatch();

    const handleSetTaskDetail = () => dispatch({
        type: SET_TASK_DETAIL, payload: { ...task }
    });

    return (
        <div className="tree-node">
            <div className="tree-node-content mb-2">
                <Row className="p-2">
                    <Col md={ 1 }>
                        <img src={ dragIcon } alt="Drag"/>
                    </Col>
                    <Col md={ 9 }>
                        <Link to={ `/project/task/${ task.id }` } onClick={ handleSetTaskDetail }>
                            { task.name }
                        </Link>
                    </Col>
                    <Col md={ 1 }>
                        <div>
                            <img src={ checkCircleIcon } alt="Check circle"/>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProjectTaskList;