import {
    ADD_SUB_TASK,
    ADD_TASK,
    TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID,
    TOGGLE_TASK_MODAL
} from "../actions/types";
import findNode from "../../helpers/findNode";

const initialState = {
    isTaskModalOpen: false,
    isSubtaskModalOpen: false,
    subtaskId: "",
    task: [],
};

const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_TASK_MODAL:
            return {
                ...state,
                isTaskModalOpen: !state.isTaskModalOpen,
            };

        case TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID:
            return {
                ...state,
                isSubtaskModalOpen: !state.isSubtaskModalOpen,
                subtaskId: action.subtaskId
            };

        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.taskData],
            };

        case ADD_SUB_TASK: {
            const parent = findNode(state.task, state.subtaskId);
            const subtaskAddedTask = parent.children.push(action.subtaskData);

            const newTask = state.task.map((task) => {
                if (task.id !== subtaskAddedTask.id) return task;
                return { ...subtaskAddedTask };
            });

            return {
                ...state,
                task: [...state.task, newTask],
            };
        }

        default:
            return state;
    }
};

export default taskReducer;
