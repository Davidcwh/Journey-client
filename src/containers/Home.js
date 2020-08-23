import React from "react";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { setIsAuthenticated } from "../redux/actions";
import '../styles/Home.css';

function Home( { setIsAuthenticated }) {
    const history = useHistory();

    async function handleLogout() {
        await Auth.signOut();
        setIsAuthenticated(false);
        history.push('/');
    }

    return (
        <div className="home">
            <h1>Home Page</h1>
            <div 
                className="ui fluid large inverted submit button"
                onClick={handleLogout}>
                Log Out
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setIsAuthenticated: (bool) => {dispatch(setIsAuthenticated(bool))}
    }
}

export default connect(null, mapDispatchToProps)(Home);