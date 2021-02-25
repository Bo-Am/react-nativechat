import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Home from '../views/Home';
import Chat from '../views/Chat';
import ChatCreate from '../views/ChatCreate'
import StoreProvider from '../store/StoreProvider';
import LoadingView from '../components/shared/LoadingView';

import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Settings from '../views/Settings';
import Welcome from '../views/Welcome';

import { listenToConnectionChanges } from '../_actions/app';
import { checkUserConnection } from '../_actions/connection';
import {listenToAuthChanges} from '../_actions/auth';
import {loadInitialSettings} from '../_actions/settings'

function AuthRoute({children, ...rest}){
  const user = useSelector(({auth})=> auth.user)
  // React.Children.only - проверяет, что у children есть только один дочерний элемент (элемент React), и возвращает его. В противном случае этот метод выдает ошибку.
  const onlyChild = React.Children.only(children)

  return(
    <Route 
    {...rest}
    render={props=>
      user ? 
      React.cloneElement(onlyChild, {...rest, ...props}) : 
      <Redirect to='/' />
    }/>
  )
}

const ContentWrapper = ({children})=> {

  const isDarkTheme = useSelector(({settings}) => settings.isDarkTheme);
return (
  <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
  )
}

function ChatApp() {
  const dispatch = useDispatch();
  const isChecking = useSelector(({auth}) => auth.isChecking);
  const isOnline = useSelector(({app}) => app.isOnline)
  const user = useSelector(({auth}) => auth.user)

  // функция, если отключено интернет соедиение и если аутентификация

  useEffect(() => {
    dispatch(loadInitialSettings())
   const unsubFromAuth = dispatch(listenToAuthChanges());
   const unsubFromConnection = dispatch(listenToConnectionChanges())

    return () => {
      unsubFromAuth()
      unsubFromConnection()
    }

  }, [dispatch])


  useEffect(()=>{
    let unsubFromUserConnection;
    if(user?.uid){
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid))
    }

    return ()=>{
      unsubFromUserConnection && unsubFromUserConnection()
    }
  }, [dispatch, user])

  if(!isOnline) {
    return <LoadingView message ="App has been disconnected..." />
  }

  if (isChecking) {
    return <LoadingView />
  }

  return (
      <Router>
        <ContentWrapper>
          <Switch>
            <Route path="/" exact>
              <Welcome/>
            </Route>
            <AuthRoute path="/home">
              <Home/>
            </AuthRoute>
            <AuthRoute path="/chatCreate">
              <ChatCreate/>
            </AuthRoute>
            <AuthRoute path="/chat/:id">
              <Chat/>
            </AuthRoute>
            <AuthRoute path="/settings">
              <Settings/>
            </AuthRoute>
          </Switch>
        </ContentWrapper>
      </Router>
  )
}


export default function App(){
  return (
    <StoreProvider>
      <ChatApp/>
    </StoreProvider>
  )
}
