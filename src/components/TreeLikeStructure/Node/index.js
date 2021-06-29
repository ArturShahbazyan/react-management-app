import dragIcon from "../../../assets/images/dragIcon.svg";
import arrowIcon from "../../../assets/images/arrowIcon.svg";
import checkCircleIcon from "../../../assets/images/checkCircleIcon.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import React, { useState } from "react";
// import { ADD_NODE } from "../../../redux/actions/types";
import "./Node.css";

const Node = ({ nodes, parentTask }) => {
    const [isCollapsed, setCollapse] = useState(true);

    const handleSetCollapse = () => {
        setCollapse(!isCollapsed);
    };

    // const addNode = (id) => {
    //     dispatch({ type: ADD_NODE, id });
    // };

    let arrowClassName = 'tree-node-arrow';
    let containerClassName = 'tree-node-children';
    if (!isCollapsed) {
        arrowClassName += ' tree-node-arrow-collapsed';
    } else {
        containerClassName += ' tree-node-children-collapsed';
    }

    return (
        <div className="tree-node">
            <div className="tree-node-content mb-2 py-2 d-flex justify-content-between">
                <img src={ dragIcon } alt="Drag"/>
                <div className={ arrowClassName } onClick={ handleSetCollapse }>
                    { nodes.length === 0 ? <div className="emptiness"></div> :
                        <img src={ arrowIcon } alt="Arrow"/> }
                </div>
                <a data-id={ parentTask.id } href="#">
                    { parentTask.name }
                </a>
                <span>
                  <img src={ checkCircleIcon } alt="Check circle"/>
                </span>
                <span className="plus-row">
                    <img src={ plusIcon } alt="Plus"/>
                </span>
            </div>
            <div className={ containerClassName }>
                { nodes }
            </div>
        </div>
    )
};

export default Node;