import dragIcon from "../../../assets/images/dragIcon.svg";
import arrowIcon from "../../../assets/images/arrowIcon.svg";
import checkCircleIcon from "../../../assets/images/checkCircleIcon.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import "./Node.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Node = ({
                  nodes,
                  parentTask,
                  handleToggleSubtaskModalAndGetSubtaskId,
                  toggleTaskConfirmAndSendId,
                  toggleEditModalAndSendEditableData,
              }) => {
    const [isCollapsed, setCollapse] = useState(true);

    const handleSetCollapse = () => {
        setCollapse(!isCollapsed);
    };

    const toggleModalAndSendId = () => {
        handleToggleSubtaskModalAndGetSubtaskId(parentTask.id);
    };

    const handleToggleTaskConfirmAndSendId = () => {
        const removableTaskId = parentTask.id;
        toggleTaskConfirmAndSendId(removableTaskId);
    };

    const handleToggleEditModalAndSendEditableData = () => {
        toggleEditModalAndSendEditableData(parentTask);
    };

    let arrowClassName = 'tree-node-arrow';
    let containerClassName = 'tree-node-children';

    if (!isCollapsed) {
        arrowClassName += ' tree-node-arrow-collapsed';
    } else {
        containerClassName += ' tree-node-children-collapsed';
    }

    return (
        <div className="tree-node">
            <div className="tree-node-content mb-2">
                <Row className="p-2">
                    <Col md={ 1 }>
                        <img src={ dragIcon } alt="Drag"/>
                    </Col>
                    <Col md={ 1 }>
                        <div className={ arrowClassName } onClick={ handleSetCollapse }>
                            { nodes.length === 0 ? <div className="emptiness"></div> :
                                <img src={ arrowIcon } alt="Arrow"/> }
                        </div>
                    </Col>
                    <Col md={ 6 }>
                        <Link to="#">
                            { parentTask.name }
                        </Link>
                    </Col>
                    <Col md={ 1 }>
                        <div>
                            <img src={ checkCircleIcon } alt="Check circle"/>
                        </div>
                    </Col>
                    <Col xs={ 12 } md={ 2 }>
                        <FontAwesomeIcon
                            icon={ faTrash }
                            className="fa-trash-task"
                            onClick={ handleToggleTaskConfirmAndSendId }
                        />
                        <FontAwesomeIcon
                            icon={ faEdit }
                            className="fa-edit-task"
                            onClick={ handleToggleEditModalAndSendEditableData }
                        />
                    </Col>
                    <Col xs={ 12 } md={ 1 }>
                        <div className="plus-row" onClick={ toggleModalAndSendId }>
                            <img src={ plusIcon } alt="Plus"/>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={ containerClassName }>
                { nodes }
            </div>
        </div>
    );
};

export default Node;