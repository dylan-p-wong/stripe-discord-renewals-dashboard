import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    console.log(action.type);
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isAuthenticated: true
            }
        case AUTH_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isLoading: false,
                isAuthenticated: false
            }
        default:
            return state
    }
}