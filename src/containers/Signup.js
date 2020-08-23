import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import '../styles/Signup.css';
import { setIsLoggedIn } from '../redux/actions';
import { onError } from '../libs/errorLibs';
import { useFormFields } from "../libs/hooksLib";

function Signup({ setIsLoggedIn }) {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isFormLoading, setFormLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
            setFormLoading(true);
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            console.log('new user:');
            console.dir(newUser);

            setIsLoggedIn(true);
            history.push('/home');
        } catch (e) {
            onError(e);
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
                
                
                <h2 className="nonselectable">Sign up to get started</h2>

                <form className="ui inverted form">
                    <div className={`required field ${fieldDisabledClassName}`}>
                        <label className="label">Email Address</label>
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
                        <label className="label">Password</label>
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

                    <div className={`required field ${fieldDisabledClassName}`}>
                        <label className="label">Confirm Password</label>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password"
                                value={fields.confirmPassword}
                                onChange={handleFieldChange}/>
                        </div>
                    </div>

                    <div 
                        class={`ui fluid large inverted submit button ${buttonDisabledClassName} ${buttonLoadingClassName}`}
                        onClick={handleSubmit}>
                        Sign up
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