import React,{useState} from 'react'
import { useFirebaseContext } from '../context/firebase';
function Resetpassword() {
    const {firebase} = useFirebaseContext()
    const [ForgotEmail, setForgotEmail] = useState(''); 
    const isInvalid = ForgotEmail === '';
    const handleResetPassword = async(e) =>
    {
        e.preventDefault()
        firebase.auth().sendPasswordResetEmail(ForgotEmail)
  .then(() => {
      alert("send")
      setForgotEmail('')
      })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    setForgotEmail('')
    // ..
  });
    } 
    return (
     
        <div className="flex flex-col items-center bg-white px-5 mt-100  py-6  border border-gray-primary mb-3 rounded">
            <form >
            <input type="text" 
            className="text-sm focus:ring-gray-700 focus:border-gray-400 
            text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
            onChange={e=>setForgotEmail(e.target.value)} /> 
          <button className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold ${
                     (isInvalid) &&'opacity-50 cursor-not-allowed'
                    }`} type="submit"  disabled={isInvalid} onClick={handleResetPassword}>Test </button>
        </form>
        </div>
    )
}

export default Resetpassword
