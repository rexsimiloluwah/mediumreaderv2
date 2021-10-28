import {
    GET_ERRORS,
    CLEAR_ERRORS
} from '../actions/types';

const initialState = {};

export default function errorReducer(state=initialState, action){
    switch(action.type){
        case GET_ERRORS:
            return {
                id: action.payload.id,
                message: action.payload.message,
                status: action.payload.status
            }

        case CLEAR_ERRORS:
            return {
                message: null,
                status: null,
                id: null
            }

        default:
            return state
    }
}