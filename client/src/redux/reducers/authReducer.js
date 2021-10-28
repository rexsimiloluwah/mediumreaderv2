import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_TOKEN_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_AUTH_SUCCESS,
    LOADING,
    LOADED
} from '../actions/types';
import { toast } from 'react-toastify';

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    user: {}
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            toast.success("Login successful");
            return {
                token: action.payload.accessToken,
                isAuthenticated: true,
                user: {
                    ...action.payload
                }
            }

        case LOGIN_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }

        case LOADING:
            return {
                ...state,
                isLoading: true
            }

        case LOADED:
            return {
                ...state,
                isLoading: false
            }
    

        case REFRESH_AUTH_SUCCESS:
            return {
                token: null,
                isAuthenticated: true,
                user: {
                    ...action.payload
                }
            }

        default:
            return {
                ...state
            }
    }
}