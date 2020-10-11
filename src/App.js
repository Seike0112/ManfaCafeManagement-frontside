import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import {
  LoginPage
} from './components/pages'
import { CookiesProvider, useCookies } from "react-cookie";


// ユーザー用ページ
const Main = () => {
  return (
    <div>
      メイン画面です。
    </div>
  );
};

// ログインページ制御
const PrivateRoute = ({
  children,
  token,
  ...rest
}) => {
  const [tokenCookie] = useCookies(["token", "position"]);
  console.log("PrivateRoute内position", tokenCookie.position);
  return (
    <Route
      render={({ location }) =>
        token && tokenCookie.position === "service" ? (
          <Route path="/service">

          </Route>
        ) :
          token && tokenCookie.position === "shop" ? (
            <Route path="/shop">

            </Route>
          ) :
            token && tokenCookie.position === "owner" ? (
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
  )
}

const App = () => {
  const [tokenCookie] = useCookies(["token", "position"]);
  axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${tokenCookie.token}`,
  };
  console.log("tokenCookie内容", tokenCookie)

  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path="/user/login" />
          <Route path="/admin/login" />
          {/* <Route path="/owner/login" component={LoginPage} /> */}
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            token={tokenCookie.token}
            position={tokenCookie.position}
          />
        </Switch>
      </Router>
    </CookiesProvider>
  );
};

export default App;
