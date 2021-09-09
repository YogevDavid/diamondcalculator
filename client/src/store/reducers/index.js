import { combineReducers } from 'redux';
import auth from './auth';
import diamonds from './diamonds';
import calcLogics from './calcLogics';

export default combineReducers({
  auth,
  diamonds,
  calcLogics,
});
