import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundWindow from "../NotFoundWindow/NotFoundWindow";

function App() {
  return (
    <div className="app">
        <Switch>
      <Route path="/signup">
        <Register/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route exact path="/">
          <Main/>
      </Route>
      <Route path="/movies">
        <Movies/>
      </Route>
      <Route path="/saved-movies">
        <SavedMovies/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
        </Switch>
    </div>
  );
}

export default App;
