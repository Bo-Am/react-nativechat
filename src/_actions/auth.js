import * as api from '../js/api/auth';
// регистрация пользователя, где передаются данные формы
export const registerUser = formData => dispatch =>{ 
  dispatch({type: 'AUTH_REGISTER_INIT'});
  return api.register(formData)
  .then(user=>  dispatch({type: 'AUTH_REGISTER_SUCCESS', user}))
    .catch(error => dispatch({type: 'AUTH_REGISTER_ERROR', error}))
}
// логин пользователя, где передаются данные формы
export const loginUser = formData => dispatch => {
  dispatch({type: 'AUTH_LOGIN_INIT'});
  api
    .login(formData)
    .then(user=>  dispatch({type: 'AUTH_LOGIN_SUCCESS', user}))
    .catch(error => {
      dispatch({type: 'AUTH_LOGIN_ERROR', error})
    })
}


// выход пользователя из системы
export const logout = () => dispatch =>
  api
    .logout()
    .then(_ => {
      dispatch({type: 'AUTH_LOGOUT_SUCCESS'});
      dispatch({type: 'CHATS_FETCH_RESTART'});
    })

export const listenToAuthChanges = () => dispatch => {
  dispatch({type: 'AUTH_ON_INIT'});
  return api.onAuthStateChanges(async authUser => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      dispatch({type: 'AUTH_ON_SUCCESS', user: userProfile});
    } else {
      dispatch({type: 'AUTH_ON_ERROR'});
    }
  })
}
