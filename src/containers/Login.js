import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import '../styles/Login.css';
import { setIsAuthenticated } from '../redux/actions';
import { onError } from '../libs/errorLibs';

function Login({ setIsAuthenticated }) {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonLoading, setButtonLoading] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
            setButtonLoading(true);
            const user = await Auth.signIn(email, password);
            console.log('user:');
            console.dir(user);
            setIsAuthenticated(true);
            history.push('/home');
        } catch (e) {
            onError(e);
        } finally {
            setButtonLoading(false);
        }
    }

    const buttonDisabledClassName = !validateForm() ? "disabled" : "";
    const buttonLoadingClassName = isButtonLoading ? "loading" : "";

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <Link to="/">
                    <h1 className="title nonselectable">Journey</h1>
                </Link>
                
                
                <h2 className="nonselectable">Login to your account</h2>

                <form className="ui inverted form">
                    <div className="required field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>            

                    <div className="required field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div 
                        class={`ui fluid large inverted submit button ${buttonDisabledClassName} ${buttonLoadingClassName}`}
                        onClick={handleSubmit}>
                        Login
                    </div>
                </form>

                <div className="ui inverted message nonselectable">
                    New to us?
                    <Link className="sign-up-link" to="/signup"> Sign up here</Link>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setIsAuthenticated: (bool) => {dispatch(setIsAuthenticated(bool))}
    }
}

export default connect(null, mapDispatchToProps)(Login);