(function () {
    'use strict';

    module.exports = function () {

        // General variables
        var myEmail = "miltos@example.com";
        var pass = "passpass";
        var signIn = "Sign in";
        var wrongEmail = "stamos@example.com";
        var wrongPass = "wrongPassword";
        var invalidWord = "Invalid";

        // Npm modules
        var url = require("url");


        /**
         *  Scenario: A user can login with valid information
         */

        this.Given(/^I am signed out$/, function (callback) {
            return this.client.
                // We navigate into home page
                url(process.env.ROOT_URL).
                // We wait for the Sign In link to be visible
                waitForExist(".container").
                waitForVisible(".container").
                waitForVisible("#login-sign-in-link").
                getText("#login-sign-in-link", function (error, text) {
                    // We check if th link includes the words Sign in
                    return chai.expect(text).to.contain(signIn);
                });
        });

        this.Given(/^I am on the home page$/, function () {
            return this.client.
                // We navigate into home page
                url(process.env.ROOT_URL);
        });

        this.When(/^I click on sign in link$/, function () {
            // Wait
            return this.client.
                // We navigate into home page
                url(process.env.ROOT_URL).

                // Wait for the page to load
                waitForExist(".container", 1000).
                waitForVisible(".container", 1000).

                // We click the login button
                click("#login-sign-in-link");
        });

        this.When(/^I enter my authentication information$/, function (callback) {
            return this.client.
                waitForExist("#login-email").

                // We set the values into email and password
                setValue("#login-email", myEmail).
                setValue("#login-password", pass).

                // We click the Sign In button
                click('#login-buttons-password');
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
            // We enter into sign in fields wrong information
            return this.client.
                waitForExist("#login-email").
                // We set the values into email and password
                setValue("#login-email", wrongEmail).
                setValue("#login-password", wrongPass).

                // We click the Sign In button
                click('#login-buttons-password');
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
            // We enter into sign in fields wrong information
            return this.client.
                waitForExist("#login-email").
                // We set the values into email and password
                setValue("#login-email", "notAnEmail").
                setValue("#login-password", wrongPass).

                // We click the Sign In button
                click('#login-buttons-password');
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
         * Scenario: A user connot login with invalid password
         */

        this.When(/^I enter my invalid password$/, function (callback) {
            // We enter into sign in fields wrong information
            return this.client.
                waitForExist("#login-email").
                // We set the values into email and password
                setValue("#login-email", myEmail).
                setValue("#login-password", wrongPass).

                // We click the Sign In button
                click('#login-buttons-password');
        });

        this.Then(/^I should see an incorrect password error message$/, function (callback) {
            // We wait the Incorrect password message to appear
            return this.client.
                waitForExist(".error-message").
                getText(".error-message", function (error, message) {
                    return chai.expect(message).to.contain("Incorrect password");
                });
        });



    }
})();