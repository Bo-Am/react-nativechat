// компонент доступных на данный момент чатов-комнат
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {joinChat} from '../_actions/chats'

export default function AvailableChatsList({chats}) {
  const user = useSelector(({auth}) => auth.user);
  const dispatch = useDispatch()

  const askForConfirmation = chat => {
    const isConfirming = confirm(`Вы хотите присоединиться к теме: ${chat.name}?`)

    if(isConfirming){
      dispatch(joinChat(chat, user.uid))
    }
  }

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        { false &&
      <div className="container-fluid">
        <div className="alert alert-warning">Нет тем для обсуждения</div>
      </div> }
      {
        // к каждому элементу массива chats будет отрисовываться компонент
        chats.map(chat =>
          <div key={chat.id} className="col-lg-3 col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{chat.name}</h5>
                <p className="card-text">{chat.description}</p>
                <button
                  onClick={() => askForConfirmation(chat)}
                  className="btn btn-outline-primary">Присоединиться</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </div>
  )
}

