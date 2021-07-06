import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import "../TreeLikeStructure/Node/Node.css";

const TaskItem = ({ task }) => {
    const handleOnDragStart = (e, task) => {
        e.dataTransfer.setData("task", JSON.stringify(task));
    };

    return (
        <div
            className="tree-node"
            draggable={ true }
            onDragStart={ e => handleOnDragStart(e, task) }
        >
            <div
                className="tree-node-content mb-2"
                onDragStart={ e => e.preventDefault() }
            >
                <Row className="p-2">
                    <Col md={ 1 }>
                        <img src={ dragIcon } alt="Drag"/>
                    </Col>
                    <Col md={ 9 }>
                        <Link to="#">
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

export default TaskItem;