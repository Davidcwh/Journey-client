import React from "react";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import { setIsLoggedIn, verifiedUserLogIn } from '../redux/actions';
import MyForm from '../components/MyForm';
import loginFormConfig from '../config/loginForm.json';

function Login({ setIsLoggedIn, verifiedUserLogIn }) {
    
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
            const errorResult = formFieldErrorHandler(validationRules, form);
            if(errorResult.errorFields.length > 0) {
                handleErrorFields(errorResult);
                return;
            }

            const user = await Auth.signIn(form.fieldNames.email.value, form.fieldNames.password.value);
            // console.log('user:');
            // console.dir(user);

            verifiedUserLogIn();
            history.push('/home');
        } catch (error) {
            if(error.name === "UserNotConfirmedException") {
                setIsLoggedIn(true);
                history.push('/home');
            } else {
                const authErrorMessage = formFieldAuthErrorHandler(error);
                const errorFields = [];
                for(let field in form.fieldNames) {
                    errorFields.push(field);
                }

                handleErrorFields({ errorMessages: [authErrorMessage], errorFields});
                return;
                //onError(error);
            }
        } finally {
            setFormLoading(false);
        }
    }

    return <MyForm formConfig={loginFormConfig} onSubmit={onSubmit} />
}

const mapDispatchToProps = dispatch => {
    return {
        setIsLoggedIn: (bool) => {dispatch(setIsLoggedIn(bool))},
        verifiedUserLogIn: () => {verifiedUserLogIn()(dispatch)}
    }
}

export default connect(null, mapDispatchToProps)(Login);