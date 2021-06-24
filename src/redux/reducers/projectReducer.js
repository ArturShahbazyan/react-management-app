import idGenerator from "../../helpers/idGenerator";
import {
    ADD_PROJECT,
    CLOSE_CONFIRM_MODAL,
    EDIT_PROJECT,
    REMOVE_SINGLE_PROJECT,
    SET_ADD_PROJECT_FIELDS,
    SET_EDITABLE_PROJECT,
    SET_PROJECT_DETAIL,
    SET_REMOVABLE_PROJECT_ID,
} from "../actions/types";

const initialState = {
    isAddProject: false,
    editableProject: null,
    removableProjectId: "",
    isOpenConfirm: false,
    projectDetail: null,
    projects: [
        {
            id: idGenerator(),
            projectName: 'Project 1',
            projectSummary: 'Business project 1',
            date: new Date(),
        },
        {
            id: idGenerator(),
            projectName: 'Project 2',
            projectSummary: 'Business project 2',
            date: new Date(),
        },
        {
            id: idGenerator(),
            projectName: 'Project 3',
            projectSummary: 'Business project 3',
            date: new Date(),
        },
    ],
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADD_PROJECT_FIELDS:
            return {
                ...state,
                isAddProject: true,
                editableProject: null
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
        case REMOVE_SINGLE_PROJECT:
            const projects = state.projects.filter((project) =>
                project.id !== state.removableProjectId)
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
        default :
            return state;
    }
};

export default projectReducer;