import Node from "../Node";
import React from "react";

const Tree = ({ parentTask }) => {
    let nodes = null;
    if (parentTask.children) {
        nodes = parentTask.children.map((parentTask) => {
            return <Tree key={ parentTask.id } parentTask={ parentTask }/>;
        });
    }

    if (nodes) {
        return (
            <Node nodes={ nodes } parentTask={ parentTask }/>
        );
    } else {
        return (
            <div className="tree-node">
            </div>
        );
    }
};

export default Tree;