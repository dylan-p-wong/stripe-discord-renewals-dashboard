import { FLASH_MESSAGE, DELETE_MESSAGE } from './types';

export const flashMessage = (text, status) => (dispatch, getState) => {
    dispatch({
        type: FLASH_MESSAGE,
        payload: {
            text: text,
            status: status
        }
    });
    setTimeout(()=>{
        dispatch({type: DELETE_MESSAGE});
    }, 5000);
}

export const deleteMessage = () => (dispatch, getState) => {
    dispatch({
        type: DELETE_MESSAGE
    });
}