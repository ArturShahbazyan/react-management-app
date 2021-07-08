import Node from "../Node";
import React from "react";

const Tree = ({
                  parentTask,
                  handleToggleModalAndGetParentId,
                  toggleTaskConfirmAndSendId,
                  toggleEditModalAndSendEditableData,
              }) => {
    let nodes = null;

    if (parentTask.children) {
        nodes = parentTask.children.map((parentTask) => {
            return <Tree
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