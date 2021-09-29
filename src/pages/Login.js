import React,{useState, useCallback} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserLoginSchema } from '../helpers/validation';
import { Formik, Field, Form } from 'formik';
import { useFirebaseContext } from '../context/firebase';
import { Link } from 'react-router-dom';
import socialMediaAuth,{facebookProvider, githubProvider, googleProvider} from '../service/auth';
import ReCAPTCHA from "react-google-recaptcha";
import user from "./img/user.svg"
import Background from "./img/Study.png"


const check = false;
function Login() {
  const [enabledButton,setEnableButton]= useState(false);
  const [serverError, setServerError] = useState('');
    const history = useHistory()
    const {firebase} = useFirebaseContext()
    const handleOnclick = async (provider) =>{
      const res = await socialMediaAuth(provider);
      console.log(res);
    }

    function onChange() {
     setEnableButton(true);

    }
    const handleFirebaseLogin = async (formValues) => {
        const { email, password } = formValues;
    
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        
          history.push('/');
          window.location.reload();
          check = true;
        } catch (error) {
          setServerError(error.message);
          
        }
      };
    return (<>
        <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
        <div style={{boxSizing:'border-box',alignItems:'center'}}  className="md:flex md:w-3/6 hidden">
          <div style={{marginRight:"100px"}}>
        <img   src={Background}></img>
        </div>
        </div>
        <div className="flex flex-col md:w-3/5 w-full max-w-sm">
          <div className="flex flex-col items-center bg-white px-5   py-6  border border-gray-primary mb-3 rounded">
            <h1 className="flex justify-center w-full mb-4">
          {serverError}
            </h1>
            
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={UserLoginSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await handleFirebaseLogin(values);
              } finally {
                setSubmitting(false);
                setServerError('Wrong password or username')
                resetForm();
                setEnableButton(false);
              }
            }}
          >
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
             <img style={{width:"90px",marginLeft:"120px",marginBottom:"5px"}} src={user}></img>
             <h1 style={{textAlign:'center', fontSize:'30px', fontWeight:'bold',paddingBottom:'10px'}}>Sign In</h1>
                {errors.username && touched.username && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.username}
                  </p>
                )}
             
            
                <Field
                  type="text"
                  name="email"
                  aria-label="Enter your email address"
                  placeholder="Email address"
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.email && touched.email && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.email}
                  </p>
                )}
                <Field
                  type="password"
                  name="password"
                  aria-label="Enter your password"
                  placeholder="Password"
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 
                  text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.password && touched.password && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.password}
                  </p>
                )}
                
                <ReCAPTCHA
                  sitekey="6Lf7PkgcAAAAACdG0qV65G_O28FjXyQu95pNzPMt"
                  onChange = {()=>{onChange()}}
                   />
                <button
                  
                  type="submit"
                  aria-label="Login to your account"
                  disabled={!enabledButton}
                  
                  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold but ${
                    (!enabledButton||!isValid) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Login' : 'Login Up'}
                </button>

                <p className="text-gray-400 text-xs mt-5 text-center">
                  By signing up, you agree to our Terms . Learn how we collect,
                  use and share your data in our Data Policy and how we use
                  cookies and similar technology in our Cookies Policy .
                </p>
                <div className="border-b border-gray-primary w-full flex justify-center mt-5 mb-3"><p className="transform translate-y-2 uppercase bg-white max-w-max px-5 text-xs text-gray-400 font-semibold select-none"></p></div>
                   <div className="form-group text-center mt-3">
                      <Link className='#60A5FA'  to='./Resetpassword' >
                                <span className="fa fa-google text-sm  " >Forgot password? </span ></Link>||
                                <a className="font-semibold text-blue-medium" href="/register"> Sign Up</a>
                            </div>
              </Form>
            )}
          </Formik>
           </div>
            {/* login with google */}
             <div className="items-center bg-white px-5   py-6  border border-gray-primary mb-3 rounded">
              <button onClick={()=>handleOnclick(googleProvider)} type="submit" aria-label="Login with google" style={{paddingLeft:"90px", paddingRight:"10px"}}  >
                 <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                </button>
                <button onClick={()=>handleOnclick(facebookProvider)} type="submit" aria-label="Login with facebook" style={{ paddingRight:"10px"}} >
                <img src="https://img.icons8.com/fluency/48/000000/facebook-new.png"/>
                </button>
                <button onClick={()=>handleOnclick(githubProvider)} type="submit" aria-label="Login with github" style={{ paddingRight:"10px"}}  >
                <img src="https://img.icons8.com/ios-filled/50/000000/github.png"/>
                </button>
            </div>
            
            </div>
            </div>
            </>
    )
}

export default Login
