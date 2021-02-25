import React, {useState} from 'react';
import {createTimestamp} from '../js/utils/time'

function Messanger({onSubmit}) {

  const [value, setValue] = useState('')
  
  //при нажатии на Enter обнуляется поле, вызывается функция отправки сообщения 
  const onKeyPress = event =>{
    if(event.key === "Enter"){
      event.preventDefault();
      sendMessage()
      setValue('');
    }
  }

  const sendMessage = () => { 
    // проверка при отправке пустого сообщения (не будет ничего отправлять, ничего не будет происходить. Метод trim сокращает пробелы)
    if(value.trim()=== ''){return; }

    const message = {
      content: value.trim(),
      timestamp: createTimestamp()
    }

    onSubmit(message);
  }

  return (
    <div className="chat-input form-group mt-3 mb-0">
            <textarea
            onChange={event =>setValue(event.target.value)} 
            onKeyPress={onKeyPress}
            value={value}
            className="form-control" row="3" placeholder="Отправьте сообщение...">
            </textarea> 
    </div>
  )
}

export default Messanger
