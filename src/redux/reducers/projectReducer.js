import idGenerator from "../../helpers/idGenerator";

import {
    ADD_PROJECT, ADD_SUB_TASK, ADD_TASK,
    CLOSE_CONFIRM_MODAL,
    EDIT_PROJECT,
    REMOVE_PROJECT,
    SET_ADD_PROJECT,
    SET_EDITABLE_PROJECT,
    SET_PROJECT_DETAIL,
    SET_REMOVABLE_PROJECT_ID,
} from "../actions/types";
import getParent from "../../helpers/getParent";

const initialState = {
    isAddProject: false,
    editableProject: null,
    removableProjectId: "",
    isOpenConfirm: false,
    projectDetail: null,
    projects: [
        {
            id: idGenerator(),
            name: 'Project 1',
            summary: 'Business project 1',
            date: new Date(),
            task: [
                {
                    id: 1, name: 'ParentTask1', parent: null, children: [
                        { id: 2, parent: { id: 1 }, name: 'subtask1', children: [] },
                        {
                            id: 3, parent: { id: 1 }, name: 'subtask2', children: [
                                { id: 4, parent: { id: 3 }, name: 'task', children: [] }
                            ]
                        },
                        { id: 5, parent: { id: 1 }, name: 'subtask3', children: [] },
                        { id: 6, parent: { id: 1 }, name: 'subtask4', children: [] }
                    ]
                },
                {
                    id: 7, name: 'ParentTask2', parent: null, children: []
                }
            ],
        },
        {
            id: idGenerator(),
            name: 'Project 2',
            summary: 'Business project 2',
            date: new Date(),
            task: [],
        },
        {
            id: idGenerator(),
            name: 'Project 3',
            summary: 'Business project 3',
            date: new Date(),
            task: [],
        },
    ],
};

const projectReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_ADD_PROJECT:
            return {
                ...state,
                isAddProject: true,
                editableProject: null,
            };

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload,],
                isAddProject: !state.isAddProject,
            };

        case SET_REMOVABLE_PROJECT_ID:
            return {
                ...state,
                removableProjectId: action.id,
                isOpenConfirm: !state.isOpenConfirm,
                isAddProject: false,
                editableProject: null,
            };

        case REMOVE_PROJECT:
            const projects = state.projects.filter((project) =>
                project.id !== state.removableProjectId);
            return {
                ...state,
                projects,
                isOpenConfirm: !state.isOpenConfirm,
                removableProjectId: "",
            };

        case CLOSE_CONFIRM_MODAL:
            return {
                ...state,
                isOpenConfirm: !state.isOpenConfirm,
            };

        case SET_EDITABLE_PROJECT:
            return {
                ...state,
                editableProject: action.editableProject,
            };

        case EDIT_PROJECT:
            const newProjects = state.projects.map((project) => {
                if (project.id !== action.projectData.id) return project;

                return { ...action.projectData };
            });

            return {
                ...state,
                projects: newProjects,
                isAddProject: false,
                editableProject: null,
            };

        case SET_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: action.payload,
            };

        case ADD_TASK: {
            const project = [...state.projects].find((project) => {
                return project.id === action.payload.projectId;
            });

            const taskAddedProject = project.task.push(action.payload.taskData);
            const projects = state.projects.map((project) => {
                if (project.id !== taskAddedProject.id) return project;
                return { ...taskAddedProject };
            });

            return {
                ...state,
                projects,
            };
        }

        case ADD_SUB_TASK: {

            const project = [...state.projects].find((project) => {
                return project.id === action.payload.projectId;
            });

            const projectTask = project.task;
            const parent = getParent(projectTask, action.payload.subtaskId);
            const subtaskAddedProject = parent.children.push(action.payload.subtaskData);

            const projects = state.projects.map((project) => {
                if (project.id !== subtaskAddedProject.id) return project;
                return { ...subtaskAddedProject };
            });

            return {
                ...state,
                projects,
            };
        }

        default :
            return state;
    }
};

export default projectReducer;