import {
    GET_ERRORS,
    CLEAR_ERRORS
} from './types';

export const returnErrors = (message, status, id=null) => (dispatch, getState) => {
    dispatch({
        type: GET_ERRORS,
        payload: {
            message,
            status,
            id
        }
    })
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}