export default (rules, fields) => {
    const errorResult = { 
        errorMessages: [],
        errorFields: []
     };
    rules.forEach(rule => {
        switch(rule.condition) {
            case "exists":
                if(fields.fieldNames[rule.fieldName].value.length === 0) {
                    if(!errorResult.errorFields.includes(rule.fieldName)) {
                        errorResult.errorFields.push(rule.fieldName);
                    }

                    errorResult.errorMessages.push(`Please enter your ${rule.fieldName}`);
                }

                break;

            case "equals":
                // if either one the fields are not present, break
                if(!fields.fieldNames[rule.fieldName] || !fields.fieldNames[rule.otherFieldName]) {
                    break;
                }

                if(fields.fieldNames[rule.fieldName].value !== fields.fieldNames[rule.otherFieldName].value) {
                    if(!errorResult.errorFields.includes(rule.fieldName)) {
                        errorResult.errorFields.push(rule.fieldName);
                    }

                    if(!errorResult.errorFields.includes(rule.otherFieldName)) {
                        errorResult.errorFields.push(rule.otherFieldName);
                    }

                    errorResult.errorMessages.push(`Please confirm your ${rule.fieldName} correctly`);
                }

                break;

            default:
                break;
        }
    });

    return errorResult;
}