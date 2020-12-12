import { PAYMENT_PROCESSING, PAYMENT_SUCCESS, PAYMENT_FAIL, PAYMENT_UPDATING, PAYMENT_UPDATE_FAILED, PAYMENT_UPDATED, PAYMENT_CANCELING, PAYMENT_CANCELING_FAILED, PAYMENT_CANCELED } from './types';
import axios from 'axios';
import {flashMessage} from './messageActions';
import { loadLicenses } from './licenseActions';

export const purchase = (paymentID, discordID, email) => (dispatch, getState) => {
    dispatch({type: PAYMENT_PROCESSING});
    axios.post('http://localhost:1812/stripe/purchase', {
        paymentID: paymentID,
        discordID: discordID,
        email: email
    })
    .then((res)=>{
        dispatch({
            type: PAYMENT_SUCCESS,
            payload: res.data
        });
        dispatch(loadLicenses(discordID));
        dispatch(flashMessage(res.data.msg, res.status));
    })
    .catch((err)=>{
        dispatch(flashMessage(err.msg, err.status));
    })
}

// TODO
export const update = () => (dispatch, getState) => {
    
}

export const cancel = (key) => (dispatch, getState) => {
    dispatch({type: PAYMENT_CANCELING});
    axios.post('http://localhost:1812/stripe/cancel', {
        key: key
    })
    .then((res)=>{
        dispatch({
            type: PAYMENT_CANCELED,
            payload: res.data
        });
        dispatch(flashMessage(res.data.msg, res.status));
    })
    .catch((err)=>{
        dispatch(flashMessage(err.msg, err.status));
    })
}