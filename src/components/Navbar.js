import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../_actions/auth'
import {Link} from 'react-router-dom';
import BackButton from '../components/shared/BackButton';

export default function Navbar({canGoBack, view}) {
  const dispatch = useDispatch()
  const user = useSelector(({auth})=>auth.user)


  return (
  <div className="chat-navbar">
  <nav className="chat-navbar-inner">
    <div className="chat-navbar-inner-left">
      { canGoBack && <BackButton/>}
      { view !== 'Settings' &&
      <Link to="/settings" className="btn btn-outline-success ml-2">Настройки</Link>
      }
    </div>
    <h3 className="logo">By Bogdan Amyaga</h3>
    <div className="chat-navbar-inner-right">
    {user &&
        <>
        <img className="avatar mr-4 ml-4" src={user.avatar}></img>
        <span className="logged-in-user">{user.username}</span>
        <button onClick={()=>dispatch(logout())}
        className="btn  btn-outline-danger ml-2">Выйти</button>
        </>}
    </div>
  </nav>
  </div>
  )
}
