import * as React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import CreateUrl from './pages/CreateUrl';
import DisplayMessage from './pages/DisplayMessage';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Urls from './pages/Urls';
import { UserContext } from './providers/UserProvider';
import { CommonResponse, UserResponse } from './types';
import { getMethod } from './utils/fetchData';

const App = () => {
  const { loggedIn, setLoggedIn, setUserInfo, setLoading } = React.useContext(UserContext);
  const { pathname } = useLocation();
  React.useEffect(() => {
    const pathBool = (pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/urls' || pathname === '/create');
    if (!loggedIn && pathBool) {
      getMethod<CommonResponse<UserResponse | string>>('/me').then(data => {
        if (data.status === 'SUCCESS') {
          setUserInfo(data.data as UserResponse);
          setLoggedIn(true);
        }
        setLoading(false);
      }).catch(err => {
        setLoading(false);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          component={(): JSX.Element => (
            <>
              <NavBar />
              <Home />
            </>
          )}
        />
        <Route
          exact
          path="/login"
          component={(): JSX.Element => (
            <>
              <NavBar />
              <Login />
            </>
          )}
        />
        <Route
          exact
          path="/register"
          component={(): JSX.Element => (
            <>
              <NavBar />
              <Register />
            </>
          )}
        />
        <Route
          exact
          path="/urls"
          component={(): JSX.Element => (
            <>
              <NavBar />
              <Urls />
            </>
          )}
        />
        <Route
          exact
          path="/create"
          component={(): JSX.Element => (
            <>
              <NavBar />
              <CreateUrl />
            </>
          )}
        />
        <Route
          exact
          path="/notFound"
          component={(): JSX.Element => <NotFound />}
        />
        <Route
          exact
          path="/:id"
          component={(): JSX.Element => <DisplayMessage />}
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
