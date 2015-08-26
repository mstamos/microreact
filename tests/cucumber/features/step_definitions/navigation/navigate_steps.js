( function () {
    'use strict';

    module.exports = function () {

        var url = require('url');

        this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
            return this.client.
                url(url.resolve(process.env.ROOT_URL, relativePath)).
                waitForExist('.app-title');
        });
    }
})()
