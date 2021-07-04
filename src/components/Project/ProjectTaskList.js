import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import { Link } from "react-router-dom";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import React from "react";

const  ProjectTaskList = ({name}) => {
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

export default ProjectTaskList;