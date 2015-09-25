(function () {
    'use strict';

    module.exports = function () {

        var actual, expected;
        // General variables
        var myEmail = "miltos@example.com";
        var myPass = "passpass";
        var signIn = "Sign in";
        var wrongEmail = "stamos@example.com";
        var wrongPass = "wrongPassword";
        var invalidWord = "Invalid";

        // Npm modules
        var url = require("url");

        /**
         *  Scenario: A user can login with valid information
         */

        this.Given(/^I am signed out$/, function () {
            client.url(process.env.ROOT_URL);
            client.waitForExist(".container");
            client.waitForVisible(".container");
            client.waitForVisible("#login-sign-in-link");

            actual = client.getText("#login-sign-in-link");
            expected = "Sign in";

            expect(actual).toContain(expected);
        });

        this.Given(/^I am on the home page$/, function () {
                // We navigate into home page
                client.url(process.env.ROOT_URL);
        });

        this.When(/^I click on sign in link$/, function () {
            // We navigate into home page
            client.url(process.env.ROOT_URL);

            // Wait for the page to load
            client.waitForExist(".container", 1000);
            client.waitForVisible(".container", 1000);
            // We click the login button
            client.click("#login-sign-in-link");
        });

        this.When(/^I enter my authentication information$/, function () {
            return loginWithCredentials(browser, myEmail, myPass)
        });

        this.Then(/^I should be logged in$/, function () {

            //We wait if our email address will appear instead of Sign in
            client.waitForExist("#login-name-link");

            actual = client.getText("#login-name-link");
            expected = myEmail;
            expect(actual).toContain(expected);

        });

        /**
         * Scenario: A user cannot login with invalid information
         */

        this.When(/^I enter my false authentication information$/, function () {
            return loginWithCredentials(browser, wrongEmail, wrongPass);
        });

        this.Then(/^I should see a user not found error$/, function () {
            // We wait the User not found message to appear
            client.waitForExist(".error-message");

            actual = client.getText(".error-message");
            expected = "User not found";
            expect(actual).toContain(expected);

        });

        /**
         * Scenario: A user cannot login with invalid email address
         */

        this.When(/^I enter my invalid email address$/, function () {
            return loginWithCredentials(client, invalidWord, wrongPass);
        });

        this.Then(/^I should see an invalid email error message$/, function () {
            // We wait the Invalid email message to appear
            client.waitForExist(".error-message");

            actual = client.getText(".error-message");
            expected = "Invalid email";
            expect(actual).toContain(expected);

        });

        /**
         * Scenario: A user cannot login with invalid password
         */

        this.When(/^I enter my invalid password$/, function () {
            // We enter into sign in fields wrong information
            return loginWithCredentials(client, myEmail, wrongPass);
        });

        this.Then(/^I should see an incorrect password error message$/, function () {
            // We wait the Incorrect password message to appear
            client.waitForExist(".error-message");

            actual = client.getText(".error-message");
            expected = "Incorrect password";
            expect(actual).toBe(expected);
        });
    }

    /**
     * This function get the this object and en email and password and try to login the user
     * @param self
     * @param email
     * @param pass
     * @return {*|{phasedRegistrationNames}}
     */
    function loginWithCredentials(client, email, pass) {
        client.waitForExist("#login-email");
        // We set the values into email and password
        client.setValue("#login-email", email);
        client.setValue("#login-password", pass);

        // We click the Sign In button
        client.click('#login-buttons-password')
    }
})();