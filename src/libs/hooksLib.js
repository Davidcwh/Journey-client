import { useState } from "react";

export function useFormFields(fieldNames) {
    const initialState = { errorMessages: [] };
    fieldNames.forEach(fieldName => {
        initialState[fieldName] = {
            value: "",
            hasError: false
        }
    })

    const [fields, setValues] = useState(initialState);

    return [
            fields,
            function(event) {

                setValues({
                    ...fields,
                    [event.target.name]: {
                        value: event.target.value,
                        hasError: false
                    }
                });
                
            },
            function({ errorFields, errorMessages }) {
                const newState = { ...fields };
                errorFields.forEach(errorField => {
                    newState[errorField].hasError = true;
                });
                newState.errorMessages = errorMessages;

                setValues(newState);
            }
    ];
}