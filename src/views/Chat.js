import React from 'react';
import {useEffect, useRef, useCallback} from 'react';
import {withBaseLayout} from '../js/layouts/Base';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import ChatMessagesList from '../components/ChatMessagesList';
import ChatUsersList from '../components/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import LoadingView from '../components/shared/LoadingView';
import Messanger from '../components/Messanger';

import {
  subscribeToChat, 
  subscribeToProfile, 
  sendChatMessage,
  subscribeToMessages,
  registerMessageSubscription
} from '../_actions/chats'

function Chat() {
  const {id} = useParams();
  const peopleWatchers = useRef({});
  const messageList = useRef()
  const dispatch = useDispatch();
  const activeChat = useSelector(({chats})=> chats.activeChats[id]);
  const messages = useSelector(({chats}) => chats.messages[id]);
  const messagesSub = useSelector(({chats})=> chats.messagesSubs[id])
  const joinedUsers = activeChat?.joinedUsers

  // сайд-эффект ComponentWillUnmount
  useEffect (()=>{
    const unsubFromChat = dispatch(subscribeToChat(id))

    // регистрация пользователя к сообщениям
    if(!messagesSub) {
      const unsubFromMessages =  dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages))
    }
    
    return () => {
      unsubFromChat()
      unsubFromJoinedUsers()
    }
  }, [])

  // сайд-эффект ComponentDidMount
  useEffect(()=>{
    joinedUsers && subscribeToJoinedUsers(joinedUsers)
  }, [joinedUsers])

  const subscribeToJoinedUsers = useCallback(jUsers =>{
    jUsers.forEach(user=>{
      if(!peopleWatchers.current[user.uid]) {
        peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
      }
    })
  }, [dispatch, id])

  // функция при отправке сообщения, скроллиться будет сразу в конец при отправке сообщения
  const sendMessage = useCallback(message => {
    dispatch(sendChatMessage(message, id)).then(_ => messageList.current.scrollIntoView(false))
  }, [id])

  const unsubFromJoinedUsers = useCallback(() =>{
    Object.keys(peopleWatchers.current)
      .forEach(id=>peopleWatchers.current[id]())
  }, [peopleWatchers.current])

  if(!activeChat?.id){
    return <LoadingView message='Loading Chat...'/>
  }

  return (
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <ChatUsersList users={activeChat?.joinedUsers} />
        </div>
        <div className="col-9 fh">
          {activeChat?.name && <ViewTitle text={`Тема:${activeChat?.name}`}/>}
          <ChatMessagesList 
          innerRef = {messageList}
          messages={messages}/>
          <Messanger onSubmit={sendMessage}/>
        </div>
      </div>
  )
}


export default withBaseLayout(Chat, {canGoBack: true})
