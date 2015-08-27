(function () {
    'use strict';

    module.exports = function () {

        // General variables
        var myEmail = "miltos@example.com";
        var pass = "passpass";
        var signIn = "Sign in"

        // Npm modules
        var url = require("url");

        this.Given(/^I am signed out$/, function (callback) {
            return this.client.
                // We navigate into home page
                url(process.env.ROOT_URL).
                // We wait for the Sign In link to be visible
                waitForExist(".container").
                waitForVisible(".container").
                waitForVisible("#login-sign-in-link").
                getText("#login-sign-in-link", function (error, text) {
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
    }
})();