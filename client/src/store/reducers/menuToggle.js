import { TOGGLE_MENU } from '../actionTypes';

const initialState = {
    MenuVisible: false,
};

const menuToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                MenuVisible: !state.MenuVisible,
            };
        default:
            return state;
    }
};

export default menuToggleReducer;
