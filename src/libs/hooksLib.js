import { useState } from "react";

export function useFormFields(fieldNames) {
    const initialState = { fieldNames: {}, errorMessages: [] };
    fieldNames.forEach(fieldName => {
        initialState.fieldNames[fieldName] = {
            value: "",
            hasError: false
        }
    })

    const [form, setValues] = useState(initialState);

    return [
            form,
            function(event) {
                setValues({
                    errorMessages: form.errorMessages,
                    fieldNames: {
                        ...form.fieldNames,
                        [event.target.name]: {
                            value: event.target.value,
                            hasError: false
                        }
                    }
                    
                });
                
            },
            function({ errorFields, errorMessages }) {
                const newState = { errorMessages, fieldNames: {} };
                for(let field in form.fieldNames) {
                    newState.fieldNames[field] = {
                        value: form.fieldNames[field].value,
                        hasError: false
                    }
                }

                errorFields.forEach(errorField => {
                    if(newState.fieldNames[errorField]) {
                        newState.fieldNames[errorField].hasError = true;
                    }
                });

                setValues(newState);
            }
    ];
}