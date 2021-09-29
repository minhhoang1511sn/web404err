import React,{useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserSignUpSchema } from '../helpers/validation';
import { Formik, Field, Form } from 'formik';
import { useFirebaseContext } from '../context/firebase';
import * as ROUTES from '../constant/routes'
import { doesUserExist, createFirestoreUser } from '../service/firebase';
import Background from './img/RegisterBackground.png'
import register from './img/registered.svg'

function Register() {
  const [serverError, setServerError] = useState('');
    const history = useHistory()
    const {firebase} = useFirebaseContext()
    const handleFirebaseRegister = async (formValues) => {
        const { email, password, username, fullName } = formValues;
        const usernameAlreadyExists = await doesUserExist(username);
    
        if (!usernameAlreadyExists) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const { user } = userCredential;
    
              user.updateProfile({
                displayName: username.toLowerCase(),
                photoURL:
                  'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
              });
    
              // TODO: Uncomment this when you go to production
              // user.sendEmailVerification();
    
              createFirestoreUser({
                userId: user.uid,
                username: username.toLowerCase(),
                userInfo: {
                  fullName,
                  website: '',
                  bio: '',
                  phoneNumber: '',
                },
                followers: [],
                following: [],
                emailAddress: email,
                photoURL:
                  'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
                dateCreated: Date.now(),
                verifiedUser: false,
                privateProfile: false,
                savedPosts: [],
                allowSuggestions: true,
                notification: {
                  chatAdd: 'on',
                  chatDelete: 'on',
                  chatLeave: 'on',
                  follow: 'on',
                  like: 'on',
                  message: 'off',
                },
              }).then(() => {
                history.push(ROUTES.DASHBOARD);
    
                // TODO: Find a way to make the header component update with the right data without having to force reload the page after routing
                window.location.reload();
              });
            })
            .catch((error) => setServerError(error.message));
        } else {
          setServerError('Username already exists, please try another!');
        }
      };
    return (<>
        <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen">
        <div className="md:flex md:w-3/6 hidden">
        <div style={{marginRight:"100px"}}>
        <img   src={Background}></img>
        </div>
        </div>
        <div className="flex flex-col md:w-3/5 w-full  border-2 max-w-sm">
          <div className="flex flex-col items-center bg-white px-5 py-9 border border-gray-primary mb-3 rounded">
          {serverError && (
            <p className="mb-5 pl-1 text-xs text-center text-red-primary">
              {serverError}
            </p>
          )}
            
          <Formik
            initialValues={{
              username: '',
              fullName: '',
              email: '',
              password: '',
            }}
            validationSchema={UserSignUpSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await handleFirebaseRegister(values);
              } finally {
                setSubmitting(false);
                resetForm();
              }
            }}
          >
            
            {({ isSubmitting, isValid, errors, touched }) => (
              <Form className="w-full">
                 <img style={{width:"90px",marginLeft:"120px",marginBottom:"5px"}} src={register}></img>
                 <h1 style={{textAlign:'center', fontSize:'30px', fontWeight:'bold',paddingBottom:'10px'}}>Sign Up</h1>
                <Field
                  type="text"
                  name="username"
                  aria-label="Enter your username"
                  placeholder="Username"
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.username && touched.username && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.username}
                  </p>
                )}
                <Field
                  type="text"
                  name="fullName"
                  aria-label="Enter your full name"
                  placeholder="Full Name"
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.fullName && touched.fullName && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.fullName}
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
                  className="text-sm focus:ring-gray-700 focus:border-gray-400 text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                />
                {errors.password && touched.password && (
                  <p className="mb-3 pl-1 text-xs text-red-primary">
                    {errors.password}
                  </p>
                )}
                <button
                  type="submit"
                  aria-label="Login to your account"
                  
                  disabled={!isValid}
                  className={`bg-blue-medium text-white w-full rounded h-8 mt-1 font-semibold ${
                    (!isValid || isSubmitting) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="text-gray-400 text-xs mt-5 text-center">
                  By signing up, you agree to our Terms . Learn how we collect,
                  use and share your data in our Data Policy and how we use
                  cookies and similar technology in our Cookies Policy .
                </p>
                <div style={{textAlign:"center"}}>
                    <a className="font-semibold text-blue-medium" href="/Login"> Back to Login Page</a>
                    </div>
              </Form>
            )}
          </Formik>
            </div>
            </div>
            </div>
            </>
    )
}

export default Register
