import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";

// 管理者用ページ
const Admin = () => {
  return (
    <div></div>
  );
};

// ユーザー用ページ
const Main = () => {
  return (
    <div>
    </div>
  );
};

const PrivateRoute = ({
  children,
  isAdmin,
  token,
  ...rest
}) => {
  console.log(token, "token");
  console.log("isAdmin", isAdmin);
  return (
    <Route
      render={({ location }) =>
        token && isAdmin === "true" ? (
          <Route path="/admin">
            <Admin />
          </Route>
        ) : token && isAdmin === "false" ? (
          <Main />
        ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            )
      }
    />
  );
};

const App = () => {
  const [tokenCookie, setTokenCookie] = useCookies(["token"]);
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${tokenCookie.token}`,
  };

  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/service/login" />
          <Route path="/shop/login" />
          <Route path="/login" />
          <PrivateRoute
            token={tokenCookie.token}
            isAdmin={tokenCookie.is_admin}
          />
        </Switch>
      </Router>
    </CookiesProvider>
  );
};

export default App;
