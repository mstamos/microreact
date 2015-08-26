(function () {

    'use strict';

    module.exports = function () {

        var url = require('url');

        this.Given(/^I am a new user$/, function (callback) {
            callback();
        });

        this.Then(/^I should see the title on the header "([^"]*)"$/, function (expectedTitle) {
            console.log(expectedTitle);
            return this.client.
                waitForExist('.app-title').
                getText('.app-title').should.become(expectedTitle);
        });
    }
})();