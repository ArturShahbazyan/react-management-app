import {
    ADD_PROJECT,
    CLOSE_CONFIRM_MODAL,
    EDIT_PROJECT,
    REMOVE_PROJECT,
    SET_ADD_PROJECT,
    SET_EDITABLE_PROJECT,
    SET_PROJECT_DETAIL, SET_PROJECT_TASK_ID,
    SET_REMOVABLE_PROJECT_ID,
} from "../actions/types";
import { initialProjectState } from "./initialState/initialProjectState";

const projectReducer = (state = initialProjectState, action) => {

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

        case SET_PROJECT_TASK_ID: {

            const project = [...state.projects].find((project) => {
                return project.id === action.payload.projectId;
            });

            const taskAddedProject = project.tasks.push(action.payload.taskId);
            const projects = state.projects.map((project) => {
                if (project.id !== taskAddedProject.id) return project;
                return { ...taskAddedProject };
            });

            return {
                ...state,
                projects,
            };
        }

        default:
            return state;
    }
};

export default projectReducer;