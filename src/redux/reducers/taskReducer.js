import { TOGGLE_TASK_MODAL } from "../actions/types";

const initialState = {
    isTaskModalOpen: false,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_TASK_MODAL:
            return {
                ...state,
                isTaskModalOpen: !state.isTaskModalOpen,
            };
        default :
            return state;
    }
};

export default taskReducer;