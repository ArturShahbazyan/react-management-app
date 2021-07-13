import Node from "../Node";
import React from "react";

const Tree = ({
                  moveTask,
                  index,
                  id,
                  parentTask,
                  handleToggleModalAndGetParentId,
                  toggleTaskConfirmAndSendId,
                  toggleEditModalAndSendEditableData,
              }) => {
    let nodes = null;

    if (parentTask.children) {
        nodes = parentTask.children.map((parentTask) => {
            return <Tree
                moveTask={ moveTask }
                index={ index }
                id={ id }
                key={ parentTask.id }
                parentTask={ parentTask }
                handleToggleModalAndGetParentId={ handleToggleModalAndGetParentId }
                toggleTaskConfirmAndSendId={ toggleTaskConfirmAndSendId }
                toggleEditModalAndSendEditableData={ toggleEditModalAndSendEditableData }
            />;
        });
    }

    if (nodes) {
        return (
            <Node
                moveTask={ moveTask }
                index={ index }
                id={ id }
                nodes={ nodes }
                parentTask={ parentTask }
                handleToggleModalAndGetParentId={ handleToggleModalAndGetParentId }
                toggleTaskConfirmAndSendId={ toggleTaskConfirmAndSendId }
                toggleEditModalAndSendEditableData={ toggleEditModalAndSendEditableData }
            />
        );
    } else {
        return (
            <div className="tree-node">
            </div>
        );
    }
};

export default Tree;