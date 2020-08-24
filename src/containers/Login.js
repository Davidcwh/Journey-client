import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import '../styles/Login.css';
import { setIsLoggedIn, verifiedUserLogIn } from '../redux/actions';
import { onError } from '../libs/errorLibs';
import { useFormFields } from "../libs/hooksLib";

function Login({ setIsLoggedIn, verifiedUserLogIn }) {
    const history = useHistory();
    const [isFormLoading, setFormLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields( {
        email: "",
        password: ""
    })

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
            setFormLoading(true);
            const user = await Auth.signIn(fields.email, fields.password);
            console.log('user:');
            console.dir(user);

            verifiedUserLogIn();
            console.log("here")
            history.push('/home');
        } catch (e) {
            if(e.name === "UserNotConfirmedException") {
                setIsLoggedIn(true);
                history.push('/home');
            } else {
                onError(e);
            }
        } finally {
            setFormLoading(false);
        }
    }

    const buttonDisabledClassName = !validateForm() ? "disabled" : "";
    const buttonLoadingClassName = isFormLoading ? "loading" : "";
    const fieldDisabledClassName = isFormLoading ? "disabled" : "";

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <Link to="/">
                    <h1 className="title nonselectable">Journey</h1>
                </Link>
                
                
                <h2 className="nonselectable">Login to your account</h2>

                <form className="ui inverted form">
                    <div className={`required field ${fieldDisabledClassName}`}>
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={fields.email}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>            

                    <div className={`required field ${fieldDisabledClassName}`}>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={fields.password}
                                onChange={handleFieldChange}/>
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
        setIsLoggedIn: (bool) => {dispatch(setIsLoggedIn(bool))},
        verifiedUserLogIn: () => {verifiedUserLogIn()(dispatch)}
    }
}

export default connect(null, mapDispatchToProps)(Login);