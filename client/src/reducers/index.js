import { combineReducers } from 'redux';
import authReducer from './authReducer';
import stripeReducer from './stripeReducer';
import licenseReducer from './licenseReducer';
import messageReducer from './flashMessageReducer';

export default combineReducers({
    auth: authReducer,
    stripe: stripeReducer,
    license: licenseReducer,
    message: messageReducer
});