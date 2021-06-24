import { TOGGLE_SIDEBAR } from "../actions/types";

const initialState = {
    isSidebarOpen: false,
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen,
            };
        default :
            return state;
    }
};

export default sidebarReducer;