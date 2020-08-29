import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import '../styles/Signup.css';
import { setIsLoggedIn } from '../redux/actions';
import { onError } from '../libs/errorLibs';
import { useFormFields } from "../libs/hooksLib";
import SignupFormValidationRules from '../config/SignupFormValidationRules.json';
import formFieldErrorHandler from '../libs/formFieldsErrorHandler';
import formFieldAuthErrorHandler from '../libs/formFieldsAuthErrorHandler';

function Signup({ setIsLoggedIn }) {
    const history = useHistory();
    const [form, handleFieldChange, handleErrorFields] = useFormFields([ "email", "password", "confirmPassword" ]);
    const [isFormLoading, setFormLoading] = useState(false);

    const { fieldNames, errorMessages } = form;
    const { email, password, confirmPassword } = fieldNames;

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
            setFormLoading(true);
            
            //Apply validation checks on field values
            const errorResult = formFieldErrorHandler(SignupFormValidationRules, form);
            if(errorResult.errorFields.length > 0) { // if errors are returned
                handleErrorFields(errorResult);      // Use hook to render highlight fields and error messages
                return;
            }

            // No validation errors here, so attempt sign up
            const newUser = await Auth.signUp({
                username: email.value,
                password: password.value
            });
            // console.log('new user:');
            // console.dir(newUser);

            setIsLoggedIn(true);    // Sign up successful, log new user in
            history.push('/home');  // Redirect to home page
        } catch (error) { // Error from signing up
            const authErrorMessage = formFieldAuthErrorHandler(error); // Process thrown aws amplify error and return the corresponding error message
            const errorFields = [];
            for(let field in fieldNames) {
                errorFields.push(field); // Highlight all fields in the form for error
            }

            handleErrorFields({ errorMessages: [authErrorMessage], errorFields}); // Use hook to render highlight fields and error messages
            //onError(error)
            return;
        } finally {
            setFormLoading(false);
        }
    }

    function getClassNameFromCondition(condition, className) {
        return condition ? className : "";
    }

    const formShowErrorCondition = !(errorMessages.length === 0) && !isFormLoading;

    console.dir(form)

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <Link to="/">
                    <h1 className="title nonselectable">Journey</h1>
                </Link>
                
                
                <h2 className="nonselectable">Sign up to get started</h2>

                <form className={`ui inverted form ${getClassNameFromCondition(formShowErrorCondition, "error")}`}>
                    <div className={`required field 
                        ${getClassNameFromCondition(isFormLoading, "disabled")} 
                        ${getClassNameFromCondition(email.hasError, "error")}`}>
                        <label className="label">Email Address</label>
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={email.value}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>            

                    <div className={`required field 
                        ${getClassNameFromCondition(isFormLoading, "disabled")} 
                        ${getClassNameFromCondition(password.hasError, "error")}`}>
                        <label className="label">Password</label>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={password.value}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>

                    <div className={`required field 
                        ${getClassNameFromCondition(isFormLoading, "disabled")} 
                        ${getClassNameFromCondition(confirmPassword.hasError, "error")}`}>
                        <label className="label">Confirm Password</label>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password"
                                value={confirmPassword.value}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>

                    <div 
                        class={`ui fluid large inverted submit button ${getClassNameFromCondition(isFormLoading, "loading")}`}
                        onClick={handleSubmit}>
                        Sign up
                    </div>

                    <div className="ui message error">
                        <ul className="list">
                            {errorMessages.map(errorMessage => {
                                return <li key={errorMessage}>{errorMessage}</li>
                            })}
                        </ul>
                    </div>
                </form>

                <div className="ui inverted message nonselectable">
                    Already have an account?
                    <Link className="login-link" to="/login"> Login here</Link>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setIsLoggedIn: (bool) => {dispatch(setIsLoggedIn(bool))}
    }
}

export default connect(null, mapDispatchToProps)(Signup);