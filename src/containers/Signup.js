import React from "react";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import { setIsLoggedIn } from '../redux/actions';
import MyForm from '../components/MyForm';
import signUpFormConfig from '../config/signupForm.json';

function Signup({ setIsLoggedIn }) {
    
    async function onSubmit(
        form,
        validationRules, 
        history, 
        setFormLoading, 
        handleErrorFields,
        formFieldErrorHandler,
        formFieldAuthErrorHandler
    ) {
        try {
            setFormLoading(true);
            
            //Apply validation checks on field values
            const errorResult = formFieldErrorHandler(validationRules, form);
            if(errorResult.errorFields.length > 0) { // if errors are returned
                handleErrorFields(errorResult);      // Use hook to render highlight fields and error messages
                return;
            }

            // No validation errors here, so attempt sign up
            const newUser = await Auth.signUp({
                username: form.fieldNames.email.value,
                password: form.fieldNames.password.value
            });
            // console.log('new user:');
            // console.dir(newUser);

            setIsLoggedIn(true);    // Sign up successful, log new user in
            history.push('/home');  // Redirect to home page
        } catch (error) { // Error from signing up
            const authErrorMessage = formFieldAuthErrorHandler(error); // Process thrown aws amplify error and return the corresponding error message
            const errorFields = [];
            for(let field in form.fieldNames) {
                errorFields.push(field); // Highlight all fields in the form for error
            }

            handleErrorFields({ errorMessages: [authErrorMessage], errorFields}); // Use hook to render highlight fields and error messages
            //onError(error)
            return;
        } finally {
            setFormLoading(false);
        }
    }

    return <MyForm formConfig={signUpFormConfig} onSubmit={onSubmit} />
}

const mapDispatchToProps = dispatch => {
    return {
        setIsLoggedIn: (bool) => {dispatch(setIsLoggedIn(bool))}
    }
}

export default connect(null, mapDispatchToProps)(Signup);