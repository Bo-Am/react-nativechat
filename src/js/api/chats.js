import db from '../db/firestore';
import firebase from 'firebase/app';

const extractSnapshotData = snapshot =>
  // если мы отправляем фетч запрос, то данные будут в snapshot.docs
  snapshot.docs.map(doc=> ({
    id: doc.id, ...doc.data()
  }))

export const fetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(extractSnapshotData)


export const createChat = chat => 
  db
  .collection('chats')
  .add(chat)
  .then(docRef => docRef.id)

export const joinChat = async (userId, chatId) =>{
  const userRef = db.doc(`profiles/${userId}`)
  const chatRef = db.doc(`chats/${chatId}`)
  // при присоединении к комнате в чате будет добавляться присоединенных пользователей
  await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)})
  await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)})
}

export const subscribeToChat = (chatId, onSubscribe) => 
  db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(snapshot =>{
      const chat = {id: snapshot.id, ...snapshot.data()}
      onSubscribe(chat)
    })

export const subscribeToProfile = (uid, onSubscribe) => 
db
  .collection('profiles')
  .doc(uid)
  .onSnapshot(snapshot =>onSubscribe(snapshot.data()))

export const sendChatMessage = (message, chatId)=> 
    db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(message.timestamp)
    .set(message)

export const subscribeToMessages = (chatId, onSubscribe) => 
    db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .onSnapshot(snapshot => onSubscribe(snapshot.docChanges()))
