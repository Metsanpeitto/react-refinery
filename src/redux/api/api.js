import {
  ADD_RESERVATION,
  REMOVE_RESERVATION,
  RECEIVE_RESERVATIONS,
  ADD_USER
} from '../constants/action-types';

export const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

export const getReservations = (reservation) => (dispatch) => {
  dispatch(receiveReservations(reservation));
};

export const removeReserve = (reservation) => ({
  type: REMOVE_RESERVATION,
  reservation,
});

export const addReserve = (reservation) => ({
  type: ADD_RESERVATION,
  reservation,
});



