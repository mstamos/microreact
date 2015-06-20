var AuthenticationModule = (function () {
    /**
     * This method get registered data and check each of them if it is null. If it is then throw an error
     * @param registerData
     */
    this.notEmptyFields = function (registerData) {
        if (!registerData.username) {
            throwError( 'username_not_empty');
        } else if (!registerData.email) {
            throwError('email_not_empty');
        } else if (!registerData.password) {
            throwError('password_not_empty');
        }
    }

    /**
     * This function checks if the password is valid. Valid password means with at least 6 characters
     * @param password
     * @returns {boolean}
     */
    this.isValidPassword = function (password) {
        if (password.length < 6) {
            console.log('Your password should be 6 characters or longer.');
            throwError( 'password_six_char');
            return false;
        }
        return true;
    }

    /**
     * This function check if the email address is empty or not
     * @param value
     * @returns {boolean}
     */
    this.isEmail =  function (value) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(value)) {
            return true;
        }
        console.log('Please enter a valid email address.');
        return false;
    };

    /**
     * This function makes the appropriate checks for form's fields
     * Check if
     * All fields aren't null
     * Valid Password
     * Is email
     * @param registerData
     */
    this.checkFields = function (registerData) {
        this.notEmptyFields(registerData);
        if (!this.isValidPassword(registerData.password)) {
            throwError( 'password_six_char');
        }
        if (!this.isEmail(registerData.email)) {
            throwError( 'valid_email_address');
        }
    };


    this.isNotEmpty = function (value) {
        if (value && value !== '') {
            return true;
        }
        console.log('Please fill in all required fields.');
        return false;
    };

    this.trimInput = function (value) {
        return value.replace(/^\s*|\s*$/g, '');
    };

    this.areValidPasswords = function(password, confirm) {
        if (!this.isValidPassword(password)) {
            return false;
        }
        if (password !== confirm) {
            console.log('Your two passwords are not equivalent.');
            return false;
        }
        return true;
    };
    return {
        isEmail: isEmail,
        isValidPassword: isValidPassword,
        checkFields: checkFields,
        notEmptyFields: notEmptyFields,
        trimInput: trimInput,
        areValidPasswords: areValidPasswords
    }
})();

Authentication = AuthenticationModule || {};
