import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import '../styles/Login.css';
import { setIsLoggedIn, verifiedUserLogIn } from '../redux/actions';
import { onError } from '../libs/errorLibs';
import { useFormFields } from "../libs/hooksLib";
import loginFormValidationRules from '../config/loginFormValidationRules.json';
import formFieldErrorHandler from '../libs/formFieldsErrorHandler';
import formFieldAuthErrorHandler from '../libs/formFieldsAuthErrorHandler';

function Login({ setIsLoggedIn, verifiedUserLogIn }) {
    const history = useHistory();
    const [isFormLoading, setFormLoading] = useState(false);
    const [fields, handleFieldChange, handleErrorFields] = useFormFields([ "email", "password" ]);
    
    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
            setFormLoading(true);
            const errorResult = formFieldErrorHandler(loginFormValidationRules, fields);
            if(errorResult.errorFields.length > 0) {
                handleErrorFields(errorResult);
                return;
            }

            const user = await Auth.signIn(fields.email.value, fields.password.value);
            console.log('user:');
            console.dir(user);

            verifiedUserLogIn();
            console.log("here")
            history.push('/home');
        } catch (error) {
            if(error.name === "UserNotConfirmedException") {
                setIsLoggedIn(true);
                history.push('/home');
            } else {
                const authErrorMessage = formFieldAuthErrorHandler(error);
                const errorFields = [];
                for(let field in fields) {
                    if(field !== "errorMessages") {
                        errorFields.push(field);
                    }
                }

                handleErrorFields({ errorMessages: [authErrorMessage], errorFields});
                return;
                //onError(error);
            }
        } finally {
            setFormLoading(false);
        }
    }

    const buttonLoadingClassName = isFormLoading ? "loading" : "";
    const fieldDisabledClassName = isFormLoading ? "disabled" : "";

    const displayErrorMessages = !(fields.errorMessages.length === 0);

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <Link to="/">
                    <h1 className="title nonselectable">Journey</h1>
                </Link>
                
                
                <h2 className="nonselectable">Login to your account</h2>

                <form className={`ui inverted form ${displayErrorMessages ? "error" : ""}`}>
                    <div className={`required field ${fieldDisabledClassName} ${fields.email.hasError ? "error" : ""}`}>
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={fields.email.value}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>            

                    <div className={`required field ${fieldDisabledClassName} ${fields.password.hasError ? "error" : ""}`}>
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={fields.password.value}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>

                    <div 
                        className={`ui fluid large inverted submit button ${buttonLoadingClassName}`}
                        onClick={handleSubmit}>
                        Login
                    </div>

                    <div className="ui message error">
                        <ul className="list">
                            {fields.errorMessages.map(errorMessage => {
                                return <li key={errorMessage}>{errorMessage}</li>
                            })}
                        </ul>
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