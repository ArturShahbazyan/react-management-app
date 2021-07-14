import dragIcon from "../../../assets/images/dragIcon.svg";
import arrowIcon from "../../../assets/images/arrowIcon.svg";
import checkCircleIcon from "../../../assets/images/checkCircleIcon.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from "react";
import "./Node.css";
import { Col, Row, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag, useDrop } from "react-dnd";
import { SET_TASK_DETAIL, TASK } from "../../../redux/actions/types";
import { useDispatch } from "react-redux";

let Scroll = require('react-scroll');
let Element = Scroll.Element;

const Node = ({
                  moveTask,
                  index,
                  id,
                  nodes,
                  parentTask,
                  handleToggleModalAndGetParentId,
                  toggleTaskConfirmAndSendId,
                  toggleEditModalAndSendEditableData,
              }) => {
    const dispatch = useDispatch();
    const [isCollapsed, setCollapse] = useState(true);

    const ref = useRef(null);
    const [{ handlerId, }, drop] = useDrop({
        accept: TASK,
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

            moveTask(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: TASK,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const handleSetCollapse = () => {
        setCollapse(!isCollapsed);
    };

    const toggleModalAndSendId = () => {
        handleToggleModalAndGetParentId(parentTask.id);
    };

    const handleToggleTaskConfirmAndSendId = () => {
        const removableTaskId = parentTask.id;
        const removableTaskParentId = parentTask.parentId;
        toggleTaskConfirmAndSendId(removableTaskId, removableTaskParentId);
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

    const handleSetTaskDetail = () => dispatch({
        type: SET_TASK_DETAIL, payload: { ...parentTask }
    });

    return (
        <div
            className="tree-node"
            ref={ ref }
            style={ { opacity } }
            data-handler-id={ handlerId }
        >
            <Element name={parentTask.id}>
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
                        <Link to={ `/project/task/${ parentTask.id }` } onClick={ handleSetTaskDetail }>
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
                <hr/>
                <Row className="my-3 task-detail-row">
                    <Col md={ 4 }>
                        <div>{ parentTask.description }</div>
                    </Col>
                    <Col md={ 4 }>
                        <div>{ parentTask.creationDate.toISOString().slice(0, 10) }</div>
                    </Col>
                    <Col md={ 4 }>
                        <div>{ parentTask.assignee }</div>
                    </Col>
                </Row>
                <Row className="task-detail-row">
                    <Col md={ 4 }>
                        <div>{ parentTask.estimatedTime }</div>
                    </Col>
                    <Col md={ 4 }>
                        <div className="mb-2">{ parentTask.workedTime }</div>
                    </Col>
                    <Col md={ 4 }>
                        <div className="mb-2">{ parentTask.status }</div>
                    </Col>
                </Row>
            </div>
            <div className={ containerClassName }>
                { nodes }
            </div>
            </Element>
        </div>
    );
};

export default Node;