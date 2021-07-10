import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import "../TreeLikeStructure/Node/Node.css";
import { useDrag, useDrop } from "react-dnd";
import { FOUNDTASK } from "../../redux/actions/types";

const TaskItem = ({ task, id, index, moveFoundTask, }) => {
    const ref = useRef(null);
    const [{ handlerId, }, drop] = useDrop({
        accept: FOUNDTASK,
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
        type: FOUNDTASK,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (

        <div
            className="tree-node"
            ref={ ref }
            style={ { opacity } }
            data-handler-id={ handlerId }
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