import React from "react";
import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import "../TreeLikeStructure/Node/Node.css";
import { useDrag } from "react-dnd";
import { FOUND_TASK } from "../../redux/actions/types";
import "./TaskItem.css";

const TaskItem = ({ task, id, index, }) => {

    const [, drag] = useDrag(() => ({
        type: FOUND_TASK,
        item: { task, index, id, },
    }));

    return (
        <div
            className="tree-node search-tree-mode"
            ref={ drag }
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
                        <div className="text-primary">
                            { task.name }
                        </div>
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