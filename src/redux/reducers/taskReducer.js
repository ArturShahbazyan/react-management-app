import {
    TOGGLE_SUBTASK_MODAL_AND_SET_SUBTASK_ID,
    TOGGLE_TASK_MODAL
} from "../actions/types";

const initialState = {
    isTaskModalOpen: false,
    isSubtaskModalOpen: false,
    subtaskId: ""
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
                subtaskId:action.subtaskId
            };
        default :
            return state;
    }
};

export default taskReducer;