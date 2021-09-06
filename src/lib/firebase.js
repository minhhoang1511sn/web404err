import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7mgdzv-x5ndVeNLWN3VuAxOctGFd_utU",
    authDomain: "classroom-55e28.firebaseapp.com",
    projectId: "classroom-55e28",
    storageBucket: "classroom-55e28.appspot.com",
    messagingSenderId: "925479834309",
    appId: "1:925479834309:web:d2ca1677f082b192e456ac",
    measurementId: "G-HQC85Y6S3G"
};

 firebase.initializeApp(firebaseConfig);
export const { FieldValue } = firebase.firestore;
export {firebase}
