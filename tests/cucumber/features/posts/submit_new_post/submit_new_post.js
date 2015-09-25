(function () {
    'use strict';

    module.exports = function () {
        var actual, expected;

        /**
         *   Scenario: Submit a new post
         */

        var url = require('url');

        this.Given(/^I am logged in$/, function () {

            // Wait
            // We navigate into home page
            client.url(process.env.ROOT_URL);

            // Wait for the page to load
            client.waitForExist(".container", 1000);
            client.waitForVisible(".container", 1000);

            // We click the login button
            client.click("#login-sign-in-link");
            client.waitForExist("#login-email");

            // We set the values into email and password
            client.setValue("#login-email", "miltos@example.com");
            client.setValue("#login-password", "passpass");

            // We click the Sign In button
            client.click('#login-buttons-password');
        });

        this.Given(/^I navigate to submit new post page$/, function () {
            // We wait for the submit button to exist
            client.waitForExist(".submit-post-but");
            client.waitForVisible(".submit-post-but");
            //pause(1000).
            // We click the submit button
            client.click(".submit-post-but");
            client.isVisible(".sub-post-but");
        });

        this.When(/^I fill in all form's fields$/, function () {
            // We just wait for the submit button to exist and then
            // we fill the fields
            client.waitForExist(".sub-post-but");
            client.setValue("#title", "Meteor Point");
            client.setValue("#url", "http://www.meteorpoint.com");
        });

        this.When(/^I submit the form/, function () {
            // We click on submit button
            client.submitForm(".sub-post-but");
        });

        this.Then(/^I should see the new post$/, function () {
            // After the post submission we wait for post-title to exist and check if it is equal with
            // the passing post title from above
            client.waitForExist(".post-title");

            actual = client.getText(".post-title");
            expected = "Meteor Point";

            expect(actual).toBe(expected);
        });

        /**
         * Scenario: Existing Post
         */

        this.Given(/^I fill form's fields with existing post$/, function () {

            client.waitForExist(".sub-post-but");
            client.setValue("#title", "Introducing Telescope");
            client.setValue("#url", "http://sachagreif.com/introducing-telescope/");
        });

        this.Then(/^I should see an error message$/, function () {
            // We check if the error class is visible on the screen
            client.waitForExist(".error-alert");
            client.isVisible(".error-alert");
        });
    }

})();