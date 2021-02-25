import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {withBaseLayout} from '../js/layouts/Base';
import JoinedChatsList from '../components/JoinedChatsList';
import AvailableChatsList from '../components/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';

import {fetchChats} from '../_actions/chats';
import Notification from '../js/utils/notifications';

function Home() {
  const dispatch = useDispatch();
  const joinedChats = useSelector(({chats})=> chats.joined)
  const availableChats = useSelector(({chats})=> chats.available)

  useEffect(() => {
    Notification.setup()
    dispatch(fetchChats());
  }, [dispatch])
    return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats}/>
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Выберите тему:">
          <Link className='btn btn-outline-primary' to='/chatCreate'>Новая тема</Link>
        </ViewTitle>
        <AvailableChatsList chats={availableChats}/>  
      </div>
    </div>
  )
}


export default withBaseLayout(Home)
