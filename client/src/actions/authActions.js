import { FETCHING_TOKEN, FETCHED_TOKEN, FETCHING_ERROR, USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LICIENSES_LOADED, LICIENSES_LOADING} from './types';
import {flashMessage} from './messageActions';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get('http://localhost:1812/auth/discord')
    .then((res)=>{
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch((err)=>{
        // error handler
    })
}

export const logout = () => (dispatch, getState) => {
    axios.post('http://localhost:1812/auth/logout')
    .then((res)=>{
        dispatch({
            type: LOGOUT_SUCCESS,
        });
        dispatch(flashMessage(res.data.msg, res.status));
    })
    .catch((err)=>{
        // error handler
    })
}