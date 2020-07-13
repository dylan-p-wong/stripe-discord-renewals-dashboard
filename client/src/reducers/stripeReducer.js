import { PAYMENT_PROCESSING, PAYMENT_SUCCESS, PAYMENT_FAIL, PAYMENT_UPDATING, PAYMENT_UPDATE_FAILED, PAYMENT_UPDATED, PAYMENT_CANCELING, PAYMENT_CANCELING_FAILED, PAYMENT_CANCELED } from '../actions/types';

const initialState = {
    isLoading: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case PAYMENT_PROCESSING: 
            return {
                ...state,
                isLoading: true,
            }
        case PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case PAYMENT_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case PAYMENT_UPDATING:
            return {
                ...state,
                isLoading: true,
            }
        case PAYMENT_UPDATE_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        case PAYMENT_UPDATED:
            return {
                ...state,
                isLoading: false,
            }
        case PAYMENT_CANCELING:
            return {
                ...state,
                isLoading: true,
            }
        case PAYMENT_CANCELING_FAILED:
            return {
                ...state,
                isLoading: false,
            }
        case PAYMENT_CANCELED:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}