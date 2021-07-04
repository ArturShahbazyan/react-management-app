import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import "../TreeLikeStructure/Node/Node.css";

const TaskItem = ({name}) => {
    return (
        <div className="tree-node">
            <div className="tree-node-content mb-2 py-2">
                <Row className="p-2">
                    <Col md={ 1 }>
                        <img src={ dragIcon } alt="Drag"/>
                    </Col>
                    <Col md={ 9 }>
                        <Link to="#">
                            { name }
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
    )
}

export default TaskItem;