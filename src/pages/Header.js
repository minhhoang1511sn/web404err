/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';
import * as ROUTES from '../constant/routes';

export default function Header() {
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const [postModalStatus, setPostModalStatus] = useState(false);

  function handleLogOut() {
    firebase.auth().signOut();
    window.location.reload();
  }

  return (
    <header
      className="bg-white border-b border-gray-primary mb-7 sticky top-0 z-20"
      style={{ height: '59px' }}
    >
      <div className="container px-2.5 mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full items-center">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link
                to={ROUTES.DASHBOARD}
           
              >
                <img
                  src="/images/logo.png"
                  alt="Margatsni branding"
                  className="mt-2 w-28"
                />
              </Link>
            </h1>
          </div>

          

          <nav
            aria-label="Main"
            className="text-gray-700 text-center align-items items-center flex"
          >
            {user ? (
              <>
                <button
                  type="button"
                  title="Add Post"
                  aria-label="Add Post"
                  className="sm:mr-3.5 mr-2"
                  onClick={() => setPostModalStatus((prev) => !prev)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter')
                      setPostModalStatus((prev) => !prev);
                  }}
                >
                  <svg
                    className="w-7 text-black-light cursor-pointer active:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
               
                <Link
                  to={ROUTES.DASHBOARD}
                  title="Dashboard"
                  aria-label="Dashboard"
                  className="mr-3.5 hidden sm:block"
                >
                  <svg
                    className="w-7 text-black-light cursor-pointer active:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
              

         


                <button
                  type="button"
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="sm:hidden"
                  onClick={handleLogOut}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleLogOut();
                  }}
                >
                  <svg
                    className="w-7 text-black-light cursor-pointer active:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

              </>
            ) : pathname.includes('reset') ? null : (
              <>
                <Link to={ROUTES.LOGIN} aria-label="Login">
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP} className="ml-2" aria-label="Sign Up">
                  <button
                    type="button"
                    className="font-bold text-sm text-blue-medium rounded w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
