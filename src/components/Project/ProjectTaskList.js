import { Col, Row } from "react-bootstrap";
import dragIcon from "../../assets/images/dragIcon.svg";
import checkCircleIcon from "../../assets/images/checkCircleIcon.svg";
import React from "react";
import style from "./projectTaskList.module.css"

let Scroll = require('react-scroll');
let Link = Scroll.Link;

const ProjectTaskList = ({ task }) => {

    return (
        <div className="tree-node">
            <Link
                to={ task.id.toString() }
                offset={-215}
                spy={true}
                smooth={true}
                duration={500}
                className={style["scroll-link"]}
            >
                <div className="tree-node-content mb-2">
                    <Row className="p-2">
                        <Col md={ 1 }>
                            <img src={ dragIcon } alt="Drag"/>
                        </Col>
                        <Col md={ 9 }>
                            <span className="text-primary">{ task.name }</span>
                        </Col>
                        <Col md={ 1 }>
                            <div>
                                <img src={ checkCircleIcon } alt="Check circle"/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </div>
    );
};

export default ProjectTaskList;