
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import { Dashboard } from "./view/Dashboard";
import { Login } from "./view/Login";

function App() {
  // const initSpotifyToken = (): void => {
  /* await axios(spotify_token_uri, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_API_SECRET).toString('base64')
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  }).then(res => {
    console.log(res)
    //store.dispatch({ type: SET_TOKEN, payload:  JSON.parse(JSON.stringify(res.data.access_token)) });
  }).catch(error => console.log(error)); */
  //};

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
