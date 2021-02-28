import {combineReducers} from 'redux';
import {createErrorReducer, createIsFetchingReducer} from './common';

// reducer для сбора ошибок в login, для сокращения записи сделан createErrorReducer
const createLoginReducer = ()=> 
  combineReducers({
    isChecking: createIsFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN')
  })

// reducer для сбора ошибок в register, для сокращения записи сделан createErrorReducer
const createRegisterReducer = () =>
  combineReducers({
    isChecking: createIsFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER')
  })


function createAuthReducer(){
  const user = (state = null, action)=>{
    switch(action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_ON_INIT':
        // если вышла ошибка, или проинициализирован, то пользователь не меняется - остается null
        return null;
      case 'AUTH_REGISTER_SUCCESS':
      case 'AUTH_LOGIN_SUCCESS':
      case 'AUTH_ON_SUCCESS':
        // если пользователь зарегистрировался или залогинился
        return action.user;
      default:
        return state;
    }
  }


  return combineReducers({
    user,
    isChecking: createIsFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer()
  })
}

export default createAuthReducer()

