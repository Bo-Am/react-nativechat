import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../db/firestore';

// создается профиль пользователя
const createUserProfile = userProfile => 
  db
  .collection('profiles')
  .doc(userProfile.uid)
  .set(userProfile)

// Получение из БД пользователя (его uid)
export const getUserProfile = uid => 
  db
  .collection('profiles')
  .doc(uid)
  .get()
  .then(snapshot => snapshot.data())



// функция регистрации пользователя
export async function register({email, password, username, avatar}) {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
  const userProfile = {uid: user.uid, username, email, avatar, joinedChats: []}
  await createUserProfile(userProfile)
  return userProfile;
}

// функция аутентификации пользователя
export const login = async ({email, password}) => {
  const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
  const userProfile = await getUserProfile(user.uid);
  return userProfile
}

// функция выхода из приложения
export const logout = () => firebase.auth().signOut()

export const onAuthStateChanges = onAuth =>
  firebase.auth().onAuthStateChanged(onAuth)

