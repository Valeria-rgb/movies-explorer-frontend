import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import AccountMenu from "../AccountMenu/AccountMenu";

function App() {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = React.useState(false);

    function handleAccountMenuClick() {
        setIsAccountMenuOpen(!isAccountMenuOpen);
    }

    function closeAccountMenu() {
        setIsAccountMenuOpen(false);
    }

  return (
    <div className="app">
        <Header
            onMenuClick={handleAccountMenuClick}
        />
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
        <Footer/>
        <AccountMenu
            isOpen={isAccountMenuOpen}
            onClose={closeAccountMenu}/>
    </div>
  );
}

export default App;
