import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import LoginForm from '../components/LoginForm';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function Welcome() {

  const [isLoginView, setIsLogin]=useState(true);
  const user = useSelector(({auth})=>auth.user);

  const optInText = isLoginView ? ['Нужен аккаунт?', 'Зарегистрируйтесь'] : ['Уже зарегистрировались?', 'Войти']

  if(user){
    return <Redirect to="/home" />
  }

  return (
      <div className="centered-view">
        <div className="centered-container">
        {isLoginView ? <LoginForm/> : <RegisterForm/>}
          <small className="form-text mt-2">{optInText[0]}
            <span
              onClick={() => setIsLogin(!isLoginView)}
              className="btn btn-outline-dark ml-2">{optInText[1]}</span></small>
        </div>
      </div>
  )
}
