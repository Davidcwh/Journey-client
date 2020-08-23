import React, { useState, useEffect } from 'react';
import Routes from "./Routes";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setIsLoggedIn } from './redux/actions';
import { Auth } from "aws-amplify";
import './App.css';

function App({ setIsLoggedIn }) {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsLoggedIn(true);
      history.push('/home');
    } catch(e) {
      if(e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }
  

  return (
    !isAuthenticating &&
    <div className="App">
      <Routes/>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      setIsLoggedIn: (bool) => {dispatch(setIsLoggedIn(bool))}
  }
}

export default connect(null, mapDispatchToProps)(App);
