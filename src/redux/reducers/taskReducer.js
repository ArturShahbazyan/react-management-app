import {
    ADD_SUB_TASK,
    ADD_TASK,
    EDIT_TASK,
    MOVE_TASK,
    REMOVE_TASK,
    SET_TASK_DETAIL,
    TOGGLE_EDITABLE_TASK_MODAL,
    TOGGLE_MODAL_AND_SET_PARENT_TASK_ID,
    TOGGLE_TASK_CONFIRM,
    TOGGLE_TASK_MODAL,
} from "../actions/types";
import findNode from "../../helpers/findNode";

const initialState = {
    isTaskModalOpen: false,
    isSubtaskModalOpen: false,
    parentTaskId: "",
    removableTaskId: "",
    removableTaskParentId: "",
    isOpenTaskConfirm: false,
    isEditTaskModalOpen: false,
    editableTaskData: null,
    taskDetail: null,
    tasks: [
        {
            id: 1,
            parentId: "",
            name: "Task1",
            description: "description",
            children: [],
            creationDate: new Date(),
            assignee: "John",
            estimatedTime: "09:00",
            status: "in progress",
            workedTime: "10:00",
        },
        {
            id: 2,
            parentId: "",
            name: "Task2",
            description: "description",
            children: [],
            creationDate: new Date(),
            assignee: "John",
            estimatedTime: "10:00",
            status: "in progress",
            workedTime: "20:00",
        },
        {
            id: 3,
            parentId: "",
            name: "Task3",
            description: "description",
            children: [],
            creationDate: new Date(),
            assignee: "John",
            estimatedTime: "12:00",
            status: "in progress",
            workedTime: "20:00",
        },
    ],
};

const taskReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_TASK_MODAL:
            return {
                ...state,
                isTaskModalOpen: !state.isTaskModalOpen,
            };

        case TOGGLE_MODAL_AND_SET_PARENT_TASK_ID:
            return {
                ...state,
                isSubtaskModalOpen: !state.isSubtaskModalOpen,
                parentTaskId: action.parentTaskId
            };

        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.taskData],
            };
        }

        case ADD_SUB_TASK: {

            const parent = findNode(state.tasks, state.parentTaskId);
            const subtaskData = { ...action.subtaskData };
            subtaskData.parentId = state.parentTaskId;
            const subtaskAddedTask = parent.children.push(subtaskData);

            const newTask = state.tasks.map((task) => {
                if (task.id !== subtaskAddedTask.id) return task;
                return { ...subtaskAddedTask };
            });

            return {
                ...state,
                tasks: newTask,
            };
        }

        case TOGGLE_TASK_CONFIRM: {
            return {
                ...state,
                isOpenTaskConfirm: !state.isOpenTaskConfirm,
                removableTaskId: action.payload.removableTaskId,
                removableTaskParentId: action.payload.removableTaskParentId,
            };
        }

        case REMOVE_TASK: {

            let tasks = state.tasks;

            if (!state.removableTaskParentId) {
                tasks = tasks.filter(task => task.id !== state.removableTaskId);
            } else {
                const parent = findNode(tasks, state.removableTaskParentId);
                const filteredSubtasks = parent.children.filter(task => task.id !== state.removableTaskId);
                parent.children = filteredSubtasks;
            }

            return {
                ...state,
                tasks,
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

            let newTasks = [...state.tasks];

            if (!action.taskData.parentId) {
                newTasks = newTasks.map((task) => {
                    if (task.id !== action.taskData.id) return task;

                    return { ...action.taskData };
                });
            } else {
                const parent = findNode(newTasks, action.taskData.parentId);
                const changedSubTasks = parent.children.map((child) => {
                    if (child.id !== action.taskData.id) return child;

                    return { ...action.taskData };
                });
                parent.children = changedSubTasks;
            }

            return {
                ...state,
                tasks: newTasks,
                isEditTaskModalOpen: !state.isEditTaskModalOpen,
            };
        }

        case MOVE_TASK: {
            return {
                ...state,
                tasks: action.movedTasks,
            };
        }

        case SET_TASK_DETAIL:
            return {
                ...state,
                taskDetail: action.payload,
            };

        default:
            return state;
    }
};

export default taskReducer;
