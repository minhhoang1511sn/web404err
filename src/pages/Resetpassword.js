import React,{useState} from 'react'
import { useFirebaseContext } from '../context/firebase';
import reset from './img/Resetpassicon.svg'
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
      <div style={{paddingTop:"200px", paddingRight:"550px", paddingLeft:"550px"}}>
        <div className="flex flex-col items-center bg-white px-5 mt-100  py-6  border border-gray-primary mb-3 rounded">
          <div >
          <img style={{width:"70px",marginLeft:"70px",marginBottom:"5px"}} src={reset}></img>
          <h1 style={{textAlign:'center', fontSize:'20px', fontWeight:'bold',paddingBottom:'10px'}}>Reset Password</h1>
            <form >
              <h4>Enter your email address: </h4>
              <input type="text" 
              className="text-sm focus:ring-gray-700 focus:border-gray-400 
              text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" 
               onChange={e=>setForgotEmail(e.target.value)} /> 
                    <button  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold ${
                     (isInvalid) &&'opacity-50 cursor-not-allowed'
                    }`} type="submit"  disabled={isInvalid} onClick={handleResetPassword}>Test </button>
                    <div style={{textAlign:"center"}}>
                    <a  className="text-blue-medium font-semibold" href="/Login"> Back to Login Page</a>
                    </div>
        </form>
        </div>
        </div>
      </div>
     
        
    )
}

export default Resetpassword
