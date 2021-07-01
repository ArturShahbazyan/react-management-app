import dragIcon from "../../../assets/images/dragIcon.svg";
import arrowIcon from "../../../assets/images/arrowIcon.svg";
import checkCircleIcon from "../../../assets/images/checkCircleIcon.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import React, { useState } from "react";
import "./Node.css";
import { Col, Row } from "react-bootstrap";

const Node = ({ nodes, parentTask, handleToggleSubtaskModalAndGetSubtaskId, }) => {
    const [isCollapsed, setCollapse] = useState(true);

    const handleSetCollapse = () => {
        setCollapse(!isCollapsed);
    };

    const toggleModalAndSendId = () => {
        handleToggleSubtaskModalAndGetSubtaskId(parentTask.id);
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
            <div className="tree-node-content mb-2 py-2">
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
                    <Col md={ 8 }>
                        <a data-id={ parentTask.id } href="#">
                            { parentTask.name }
                        </a>
                    </Col>
                    <Col md={ 1 }>
                        <div>
                            <img src={ checkCircleIcon } alt="Check circle"/>
                        </div>
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