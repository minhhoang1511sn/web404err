import { useUserContext } from "./context/user";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProtectedRoute from './helpers/protected-route';
import UserRedirectRoute from './helpers/user-redirect';
import * as ROUTES from './constant/routes';

import { lazy, Suspense } from "react";
import Header from "./pages/Header";



const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Resetpassword = lazy(()=> import('./pages/Resetpassword'))

function App() {
  const { user } = useUserContext();

  return (<>
    <Router>
      <Suspense fallback={<Header />}>
        <Switch>
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoute>
          <UserRedirectRoute
            user={user}
            path={ROUTES.LOGIN}
            loggedInPath={ROUTES.DASHBOARD}
            exact
          >
            <Login />
          </UserRedirectRoute>
          <UserRedirectRoute
            user={user}
            path={ROUTES.REGISTER}
            loggedInPath={ROUTES.DASHBOARD}
            exact
          >
            <Register />
          </UserRedirectRoute>

          <UserRedirectRoute
            user={user}
            path={ROUTES.RESETPASSWORD}
            loggedInPath={ROUTES.DASHBOARD}
            exact
          >
           <Resetpassword />
          </UserRedirectRoute>
        </Switch>
      </Suspense>
    </Router>

  </>

  );
}

export default App;
