import {
    ADD_USER,
    REMOVE_USER
} from '../../constants/action-types';

export const addUser = (data) => ({
    type: ADD_USER,
    data,
});

const initialState = {
    auth: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            const auth = action.data;
            return {
                auth,
            };
        }

        case REMOVE_USER: {
            const auth = {};
            return {
                auth,
            };
        }
        default:
            return state;
    }
};

export default authReducer;