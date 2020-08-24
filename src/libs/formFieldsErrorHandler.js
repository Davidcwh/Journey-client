export default (rules, fields) => {
    const errorResult = { 
        errorMessages: [],
        errorFields: []
     };
    rules.forEach(rule => {
        switch(rule.condition) {
            case "exists":
                if(fields[rule.fieldName].value.length === 0) {
                    if(!errorResult.errorFields.includes(rule.fieldName)) {
                        errorResult.errorFields.push(rule.fieldName);
                    }

                    errorResult.errorMessages.push(`Please enter your ${rule.fieldName}`);
                }

                break;

            default:
                break;
        }
    });

    return errorResult;
}