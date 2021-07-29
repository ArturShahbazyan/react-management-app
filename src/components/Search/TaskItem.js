import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import "../TreeLikeStructure/Node/Node.css";
import { useDrag, useDrop } from "react-dnd";
import { FOUND_TASK } from "../../redux/actions/types";
import "./TaskItem.css";

const TaskItem = ({ task, id, index, moveFoundTask }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: FOUND_TASK,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveFoundTask(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: FOUND_TASK,
        item: () => {
            return { id, index, task };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0.2 : 1;

    drag(drop(ref));

    return (
        <div
            className="tree-node search-tree-mode"
            ref={ ref }
            style={ { opacity } }
        >
            <div
                className="tree-node-content mb-2"
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