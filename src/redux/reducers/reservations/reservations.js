import {
    ADD_RESERVATION,
    REMOVE_RESERVATION,
    RECEIVE_RESERVATIONS,
} from '../../constants/action-types';

const initialState = {
    reservations: { date: {} },
};

const reservationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESERVATION: {
            const reservations = {};
            return {
                reservations,
            };
        }

        case REMOVE_RESERVATION: {
            const reservations = {};
            return {
                reservations,
            };
        }
        case RECEIVE_RESERVATIONS: {
            return {
                reservations: action.reservations,
            };
        }
        default:
            return state;
    }
};

export default reservationsReducer;