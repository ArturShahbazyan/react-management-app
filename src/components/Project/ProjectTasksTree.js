import { Col, Collapse, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import React, { useRef, useState } from "react";
import arrowIcon from "../../assets/images/arrowIcon.svg";
import style from "./projectTasksTree.module.css";
import { useDrag, useDrop } from "react-dnd";
import { PROJECT_TASKS } from "../../redux/actions/types";

let Scroll = require('react-scroll');
let Link = Scroll.Link;

const ProjectTasksTree = ({ parentTask, moveTask, index, id }) => {
    const [isCollapsed, setCollapse] = useState(true);
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: PROJECT_TASKS,
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
        type: PROJECT_TASKS,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    let nodes = null;

    const handleSetCollapse = (e) => {
        e.stopPropagation();
        setCollapse(!isCollapsed);
    };

    let arrowClassName = 'tree-node-arrow';
    let containerClassName = 'tree-node-children';

    if (!isCollapsed) {
        arrowClassName += ' tree-node-arrow-collapsed';
    } else {
        containerClassName += ' tree-node-children-collapsed';
    }

    if (parentTask.children) {
        nodes = parentTask.children.map((parentTask, index) => {
            return <ProjectTasksTree
                key={ parentTask.id }
                parentTask={ parentTask }
                moveTask={ moveTask }
                index={ index }
                id={ parentTask.id }
            />;
        });
    }

    if (nodes) {
        return (
            <div className="tree-node">
                <Link
                    to={ parentTask.id.toString() }
                    offset={ -215 }
                    spy={ true }
                    smooth={ true }
                    duration={ 500 }
                    className={ style["scroll-link"] }
                >
                    <div
                        className="tree-node-content mb-2"
                        style={ { opacity } }
                        ref={ ref }
                    >
                        <Row className="p-2">
                            <Col md={ 1 }>
                                <img src={ dragIcon } alt="Drag"/>
                            </Col>
                            <Col md={ 1 }>
                                <div
                                    className={ arrowClassName }
                                    onClick={ handleSetCollapse }
                                >
                                    { nodes.length === 0 ? <div className="emptiness"></div> :
                                        <img src={ arrowIcon } alt="Arrow"/> }
                                </div>
                            </Col>
                            <Col md={ 7 } className="text-primary">
                                { parentTask.name }
                            </Col>
                            <Col md={ 1 }>
                                <div>
                                    <img src={ checkCircleIcon } alt="Check circle"/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Link>
                <Collapse in={ !isCollapsed } timeout={ 200 }>
                    <div className={ containerClassName }>
                        { nodes }
                    </div>
                </Collapse>
            </div>
        );
    } else {
        return (
            <div className="tree-node">
            </div>
        );
    }
};

export default ProjectTasksTree;