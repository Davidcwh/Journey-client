import React from "react";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { userLogOut } from "../redux/actions";
import '../styles/Home.css';

function Home( { userLogOut }) {
    const history = useHistory();

    async function handleLogout() {
        await Auth.signOut();
        userLogOut();
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
        userLogOut: () => {dispatch(userLogOut())}
    }
}

export default connect(null, mapDispatchToProps)(Home);