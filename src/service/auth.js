import {firebase} from "../lib/firebase";
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();

const socialMediaAuth = (provider) =>{
     return firebase.auth().signInWithPopup(provider).then((res)=>{
               return res.user;
         }).catch(error => {
           console.error(error)
 })
}


export default socialMediaAuth;