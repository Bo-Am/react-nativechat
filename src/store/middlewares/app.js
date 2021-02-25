
import Notification from '../../js/utils/notifications';
import Storage from '../../js/utils/storage'

// приложение будет отображать уведомление онлайн/оффлайн
export default store => next => action => {
  switch(action.type){
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':{
      const {showNotifications} = store.getState().settings

      if(showNotifications){
        Notification.show({title: 'Connection status:', body: action.isOnline ? 'Online' : 'Offline'})
      }
    }

    // в localstorage будет записываться settings конфигурация (значения true/false)
    case 'SETTINGS_UPDATE': {
      const {setting, value} = action;
      const currentSettings = Storage.getItem('app-settings');
      const settings = {...currentSettings, [setting]: value}
      Storage.setItem('app-settings', settings)
    }
    case 'AUTH_LOGOUT_SUCCESS': {
      const {messagesSubs} = store.getState().chats;
      if(messagesSubs) {
        Object.keys(messagesSubs).forEach(messageSub => {
          messagesSubs[messageSub]()
        })

      }
    }

  }
    
  next(action);
}


