export default error => {
    switch(error.name) {
        case "NotAuthorizedException":
            return "Incorrect email or password entered";
        
        default:
            break;
    }
}