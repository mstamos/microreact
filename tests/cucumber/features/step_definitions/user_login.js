(function () {
    'use strict';

    module.exports = function () {
        var url = require('url');

        this.Given(/^I am logged in$/, function (callback) {
            this.client.
                url(process.env.ROOT_URL).
                waitForExist(".container", 1000).
                waitForVisible(".container", 1000).
                click("#login-sign-in-link").
                waitForExist("#login-email").
                setValue("#login-email", "miltos@example.com").
                setValue("#login-password", "passpass").
                click('#login-buttons-password').
                call(callback);


        });

        this.When(/^I click "([^"]*)" button$/, function (arg1, callback) {
            this.client.
                waitForExist(".submit-post-but").
                waitForVisible(".submit-post-but").
                pause(1000).
                click(".submit-post-but").call(callback);
        });

        this.Then(/^I should navigate to "([^"]*)" page$/, function (relativePath) {
            return this.client.
                url(url.resolve(process.env.ROOT_URL, relativePath)).
                waitForExist(".sub-post-but");
        });

        this.Then(/^I should see the "([^"]*)" button$/, function (buttonText) {
            console.log(buttonText);
            return this.client.
                waitForExist(".sub-post-but").
                getValue(".sub-post-but").should.become(buttonText);
        });



    }
})();