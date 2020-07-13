import { LICIENSES_LOADING, LICIENSES_LOADED } from '../actions/types';

const initialState = {
    isLoading: false,
    licenses: null
}

export default function (state = initialState, action) {
    switch(action.type){
        case LICIENSES_LOADING: 
            return {
                ...state,
                isLoading: true,
            }
        case LICIENSES_LOADED:
            return {
                ...state,
                isLoading: false,
                licenses: action.payload
            }
        default:
            return state;
    }
}