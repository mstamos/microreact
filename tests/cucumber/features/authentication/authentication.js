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
            var client = this.client;
            browser.url(process.env.ROOT_URL);
            browser.waitForExist(".container");
            browser.waitForVisible(".container");
            browser.waitForVisible("#login-sign-in-link");

            actual = browser.getText("#login-sign-in-link");
            expected = "Sign in";

            expect(actual).toContain(expected);
        });

        this.Given(/^I am on the home page$/, function () {
            return this.client.
                // We navigate into home page
                url(process.env.ROOT_URL);
        });

        this.When(/^I click on sign in link$/, function () {
            // Wait
            var client = this.client;
            // We navigate into home page
            client.url(process.env.ROOT_URL);

            // Wait for the page to load
            client.waitForExist(".container", 1000);
            client.waitForVisible(".container", 1000)

            // We click the login button
            client.click("#login-sign-in-link");
        });

        this.When(/^I enter my authentication information$/, function (callback) {
            return loginWithCredentials(browser, myEmail, wrongPass);
        });

        this.Then(/^I should be logged in$/, function (callback) {
            return this.client.
                //We wait if our email address will appear instead of Sign in
                waitForExist("#login-name-link", 500).
                getText("#login-name-link", function (error, email) {
                    return chai.expect(email).to.contain(myEmail);
                });
        });

        /**
         * Scenario: A user cannot login with invalid information
         */

        this.When(/^I enter my false authentication information$/, function () {
            return loginWithCredentials(browser, myEmail, wrongPass);
        });

        this.Then(/^I should see a user not found error$/, function () {
            // We wait the User not found message to appear
            return this.client.
                waitForExist(".error-message").
                getText(".error-message", function (error, message) {
                    return chai.expect(message).to.contain("User not found");
                });
        });

        /**
         * Scenario: A user cannot login with invalid email address
         */

        this.When(/^I enter my invalid email address$/, function (callback) {
            return loginWithCredentials(browser, myEmail, wrongPass);
        });

        this.Then(/^I should see an invalid email error message$/, function (callback) {
            // We wait the Invalid email message to appear
            return this.client.
                waitForExist(".error-message").
                getText(".error-message", function (error, message) {
                    return chai.expect(message).to.contain("Invalid email");
                });
        });

        /**
         * Scenario: A user cannot login with invalid password
         */

        this.When(/^I enter my invalid password$/, function () {
            // We enter into sign in fields wrong information
            return loginWithCredentials(browser, myEmail, wrongPass);
        });

        this.Then(/^I should see an incorrect password error message$/, function () {
            // We wait the Incorrect password message to appear
            browser.waitForExist(".error-message");
            actual = browser.getText(".error-message");
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
    function loginWithCredentials(browser, email, pass) {
        browser.waitForExist("#login-email");
        // We set the values into email and password
        browser.setValue("#login-email", email);
        browser.setValue("#login-password", pass);

        // We click the Sign In button
        browser.click('#login-buttons-password')
    }
})();