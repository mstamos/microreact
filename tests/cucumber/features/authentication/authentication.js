(function () {
    'use strict';

    module.exports = function () {
        var url = require('url');

        this.Given(/^I am logged in$/, function (callback) {

            // Wait
            this.client.
                // We navigate into home page
                url(process.env.ROOT_URL).

                // Wait for the page to load
                waitForExist(".container", 1000).
                waitForVisible(".container", 1000).

                // We click the login button
                click("#login-sign-in-link").
                waitForExist("#login-email").

                // We set the values into email and password
                setValue("#login-email", "miltos@example.com").
                setValue("#login-password", "passpass").

                // We click the Sign In button
                click('#login-buttons-password').
                call(callback);
        });

        this.When(/^I click "([^"]*)" button$/, function () {
            return this.client.
                // We wait for the submit button to exist
                waitForExist(".submit-post-but").
                waitForVisible(".submit-post-but").
                //pause(1000).
                // We click the submit button
                click(".submit-post-but");
        });

        this.Then(/^I should navigate to "([^"]*)" page$/, function (relativePath) {
            // We navigate to passing path
            return this.client.
                url(url.resolve(process.env.ROOT_URL, relativePath)).
                waitForExist(".sub-post-but");
        });

        this.Then(/^I should see the "([^"]*)" button$/, function (buttonText) {

            return this.client.
                // We wait for the submit button to exist
                waitForExist(".sub-post-but").
                // We get the button's value and we check if it is equal to passing value
                getValue(".sub-post-but").should.become(buttonText);
        });
    }
})();