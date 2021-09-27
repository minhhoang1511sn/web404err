 import { firebase, FieldValue } from '../lib/firebase';
const _DB = firebase.firestore();

export async function doesUserExist(username) {
    const { docs } = await _DB
      .collection('users')
      .where('username', '==', username)
      .get();
  
    return docs.map((doc) => doc.data()).length;
  }

export async function createFirestoreUser(userObject) {
    return _DB.collection('users').add(userObject);
  }
  export async function getUserDataByUsername(username) {
    const { docs } = await _DB
      .collection('users')
      .where('username', '==', username)
      .get();
  
    const [user] = docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
  
    return user;
  }
  export async function getUserDataByUserId(userId) {
    const { docs } = await _DB
      .collection('users')
      .where('userId', '==', userId)
      .get();
  
    const [user] = docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
  
    return user;
  }
  export async function getData() {
    const { docs } = await _DB
      .collection('users')
      .get();
  
    const user = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
   
    return user;
  }