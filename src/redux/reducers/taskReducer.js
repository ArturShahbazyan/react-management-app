import {
    ADD_SUB_TASK,
    ADD_TASK,
    EDIT_TASK,
    REMOVE_TASK, TOGGLE_EDITABLE_TASK_MODAL,
    TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID,
    TOGGLE_TASK_CONFIRM,
    TOGGLE_TASK_MODAL,
} from "../actions/types";
import findNode from "../../helpers/findNode";

const initialState = {
    isTaskModalOpen: false,
    isSubtaskModalOpen: false,
    subtaskId: "",
    removableTaskId: "",
    isOpenTaskConfirm: false,
    isEditTaskModalOpen: false,
    editableTaskData: null,
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

        case ADD_TASK: {
            return {
                ...state,
                task: [...state.task, action.taskData],
            };
        }

        case ADD_SUB_TASK: {
            const parent = findNode(state.task, state.subtaskId);
            const subtaskAddedTask = parent.children.push(action.subtaskData);

            const newTask = state.task.map((task) => {
                if (task.id !== subtaskAddedTask.id) return task;
                return { ...subtaskAddedTask };
            });

            return {
                ...state,
                task: newTask,
            };
        }

        case TOGGLE_TASK_CONFIRM: {
            return {
                ...state,
                isOpenTaskConfirm: !state.isOpenTaskConfirm,
                removableTaskId: action.removableTaskId,
            };
        }

        case REMOVE_TASK: {
            const task = state.task.filter(task => task.id !== state.removableTaskId);

            return {
                ...state,
                task,
                isOpenTaskConfirm: !state.isOpenTaskConfirm,
                removableTaskId: "",
            };
        }

        case TOGGLE_EDITABLE_TASK_MODAL: {
            return {
                ...state,
                isEditTaskModalOpen: !state.isEditTaskModalOpen,
                editableTaskData: action.editableTaskData
            };
        }

        case EDIT_TASK: {
            const newTask = state.task.map((task) => {
                if (task.id !== action.taskData.id) return task;

                return { ...action.taskData };
            });

            return {
                ...state,
                task: newTask,
                isEditTaskModalOpen: !state.isEditTaskModalOpen,
            };
        }

        default:
            return state;
    }
};

export default taskReducer;
