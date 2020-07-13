import { FLASH_MESSAGE, DELETE_MESSAGE } from '../actions/types';

const initialState = {
    status: null,
    text: null,
}

export default function (state = initialState, action) {
    console.log(action.type);
    switch(action.type){
        case FLASH_MESSAGE:
            return {
                ...state,
                status: action.payload.status,
                text: action.payload.text
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                status: null,
                text: null
            }
        default:
            return state
    }
}