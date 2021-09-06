import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constant/routes';

export default function ProtectedRoute({ user, children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (user) return children;
  
          if (!user) {
            return (
              <Redirect
                to={{
                  pathname: ROUTES.LOGIN,
                  state: { referrer: location },
                }}
              />
            );
          }
  
          return null;
        }}
      />
    );
  }