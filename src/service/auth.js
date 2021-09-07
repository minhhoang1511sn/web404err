import {firebase} from "../lib/firebase";
const socialMediaAuth = (provider) =>{

   return firebase.auth().signInWithPopup(provider).then((res)=>{
        return res.user;
    }).catch(error => {
     switch (error.code) {
        case 'auth/email-already-in-use':
          console.log(`Email address ${this.state.email} already in use.`);
          break;
        case 'auth/invalid-email':
          console.log(`Email address ${this.state.email} is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          console.log(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
        default:
          console.log(error.message);
          break;
      }
  })
}
export default socialMediaAuth;