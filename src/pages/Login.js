import React,{useState, useCallback} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserLoginSchema } from '../helpers/validation';
import { Formik, Field, Form } from 'formik';
import { useFirebaseContext } from '../context/firebase';
import { Link } from 'react-router-dom';
import socialMediaAuth from '../service/auth';
import { googleProvider } from './authMethod';
import ReCAPTCHA from "react-google-recaptcha";


function Login() {
  const [enabledButton,setEnableButton]= useState(false);
  const [serverError, setServerError] = useState('');
    const history = useHistory()
    const {firebase} = useFirebaseContext()
    const handleOnclick = async (provider) =>{
      const res = await socialMediaAuth(provider);
      console.log(res);
    }
    function onChange(enabledButton) {
     setEnableButton(true);
    }

    const handleFirebaseLogin = async (formValues) => {
        const { email, password } = formValues;
    
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
        
          history.push('/');
          window.location.reload();
        } catch (error) {
          setServerError(error.message);
        }
      };
    return (<>
        <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
        <div className="md:flex md:w-3/6 hidden">
            <p>This is left</p>
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
              }
            }}
          >
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
             
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
                  onChange = {()=>{onChange(isValid)}}
                   />
                <button
                  type="submit"
                  aria-label="Login to your account"
                  disabled={!enabledButton}
                  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold ${
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
                                <span className="fa fa-google text-sm ">Forgot password?</span ></Link>
                            </div>
              </Form>
            )}
          </Formik>
           </div>
            <div className="flex flex-col items-center bg-white px-5   py-6  border border-gray-primary mb-3 rounded">
              <p className="text-sm">Don't have an account? <a className="font-semibold text-blue-medium" href="/register">Sign Up</a></p>
            </div>
            {/* login with google */}
             <div className="flex flex-col items-center bg-white px-5   py-6  border border-gray-primary mb-3 rounded">
              <button onClick={()=>handleOnclick(googleProvider)} type="submit" aria-label="Login to your account" className={`bg-red-600 text-white w-full rounded h-8 font-semibold `}  >
                 Login with google
                </button>
            </div>
            
            </div>
            </div>
            </>
    )
}

export default Login
