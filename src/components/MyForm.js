import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import '../styles/myForm.css';
import { useFormFields } from "../libs/hooksLib";
import formFieldErrorHandler from '../libs/formFieldsErrorHandler';
import formFieldAuthErrorHandler from '../libs/formFieldsAuthErrorHandler';

function MyForm({ formConfig, onSubmit }) {
    const { fields, validationRules, title, button, bottomMessage } = formConfig;

    const history = useHistory();
    const [isFormLoading, setFormLoading] = useState(false);
    const [form, handleFieldChange, handleErrorFields] = useFormFields(fields.map(field => field.name));

    const { fieldNames, errorMessages } = form;
    
    async function handleSubmit(event) {
        event.preventDefault();
        
        await onSubmit(event,
                       validationRules, 
                       history, 
                       setFormLoading, 
                       handleErrorFields,
                       formFieldErrorHandler,
                       formFieldAuthErrorHandler);
    }

    function getClassNameFromCondition(condition, className) {
        return condition ? className : "";
    }

    const formShowErrorCondition = !(errorMessages.length === 0) && !isFormLoading;

    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <Link to={title.link}>
                    <h1 className="title nonselectable">{title.mainLabel}</h1>
                </Link>
                
                
                <h2 className="nonselectable">{title.subLabel}</h2>

                <form className={`ui inverted form ${getClassNameFromCondition(formShowErrorCondition, "error")}`}>
                    {
                        fields.map(field => {
                            return (
                                <div key={field.name} 
                                    className={`required field
                                    ${getClassNameFromCondition(isFormLoading, "disabled")} 
                                    ${getClassNameFromCondition(fieldNames[field.name].hasError, "error")}`}>
                                    <div className="ui left icon input">
                                        <i className={`${field.icon} icon`}></i>
                                        <input 
                                            type={field.input.type} 
                                            name={field.input.name} 
                                            placeholder={field.input.placeholder}
                                            value={fieldNames[field.name].value}
                                            onChange={handleFieldChange}/>
                                    </div>
                                </div> 
                            )
                        })
                    }

                    <div 
                        className={`ui fluid large inverted submit button ${getClassNameFromCondition(isFormLoading, "loading")}`}
                        onClick={handleSubmit}>
                        {button.label}
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
                    {bottomMessage.nonLinkText}
                        <Link className="sign-up-link" to={bottomMessage.link}>{bottomMessage.linkText}</Link>
                </div>
            </div>
        </div>
    )
}

export default myForm;