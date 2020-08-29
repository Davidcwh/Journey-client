export default error => {
    switch(error.name) {
        case "NotAuthorizedException":
            return "Incorrect email or/and password entered";

        case "UsernameExistsException":
            return "There is an existing account with the given email. Please login instead!";

        case "InvalidParameterException":
            return "Invalid email or/and password entered. Password have minimum length of 8 characters, and contain uppercase, lowercase, symbol and numeric characters.";
        
        case "InvalidPasswordException":
            return "Invalid password entered. Password have minimum length of 8 characters, and contain uppercase, lowercase, symbol and numeric characters."

        default:
            return "Sorry, there seems to be a problem, please try again"
    }
}